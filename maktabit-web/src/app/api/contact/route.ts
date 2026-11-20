import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

interface ContactPayloadInput {
  name?: unknown
  email?: unknown
  topic?: unknown
  message?: unknown
  turnstileToken?: unknown
  website?: unknown // Honeypot field
}

// Rate limiter sederhana berbasis IP di memori (Maks. 5 request per 10 menit)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipRequestLog.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recent)
    return true
  }

  recent.push(now)
  ipRequestLog.set(ip, recent)
  return false
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateContactInput(body: ContactPayloadInput) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const topic = typeof body.topic === 'string' ? body.topic.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const turnstileToken =
    typeof body.turnstileToken === 'string' ? body.turnstileToken.trim() : ''
  const honeypot = typeof body.website === 'string' ? body.website.trim() : ''

  if (honeypot.length > 0) {
    return { error: 'Permintaan terdeteksi sebagai spam otomatis.' }
  }

  if (name.length < 2 || name.length > 120) {
    return { error: 'Nama lengkap wajib diisi (2–120 karakter).' }
  }

  if (!EMAIL_REGEX.test(email) || email.length > 160) {
    return { error: 'Format alamat email tidak valid.' }
  }

  if (topic.length < 2 || topic.length > 160) {
    return { error: 'Topik kebutuhan wajib dipilih.' }
  }

  if (message.length < 10 || message.length > 4000) {
    return { error: 'Detail pesan wajib diisi minimal 10 karakter.' }
  }

  return {
    data: {
      name,
      email,
      topic,
      message,
      turnstileToken,
    },
  }
}

async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    // Lewati verifikasi jika TURNSTILE_SECRET_KEY belum dikonfigurasi di .env
    return true
  }

  if (!token) {
    return false
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', token)
    if (ip && ip !== 'unknown') {
      formData.append('remoteip', ip)
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const result = (await res.json()) as { success?: boolean }
    return Boolean(result.success)
  } catch (err) {
    console.error('Gagal memverifikasi Cloudflare Turnstile:', err)
    return false
  }
}

async function sendEmailNotification(params: {
  senderName: string
  senderEmail: string
  topic: string
  message: string
  docId: number | string
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) return

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'hello@maktabit.tech'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'MaktabIT CMS <onboarding@resend.dev>'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3390'

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        reply_to: params.senderEmail,
        subject: `[MaktabIT Contact] ${params.topic} — dari ${params.senderName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6; color: #0f172a;">
            <h2 style="margin-bottom: 4px;">Pesan Konsultasi Baru — MaktabIT Technology</h2>
            <p style="margin-top: 0; color: #64748b; font-size: 14px;">Pesan ini telah tersimpan otomatis di Payload CMS.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Nama Pengirim:</strong> ${params.senderName}</p>
            <p><strong>Email:</strong> ${params.senderEmail}</p>
            <p><strong>Topik Kebutuhan:</strong> ${params.topic}</p>
            <p><strong>Detail Pesan:</strong></p>
            <div style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${params.message}</div>
            <p style="margin-top: 20px;">
              <a href="${siteUrl}/admin/collections/contact-messages/${params.docId}" style="background: #0284c7; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-weight: bold; display: inline-block;">
                Buka Pesan di Admin CMS
              </a>
            </p>
          </div>
        `,
      }),
    })
  } catch (err) {
    console.warn('Gagal mengirim email notifikasi Resend:', err)
  }
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            'Terlalu banyak pengiriman pesan dalam waktu singkat. Silakan coba lagi beberapa menit kemudian.',
        },
        { status: 429 },
      )
    }

    const body = (await request.json()) as ContactPayloadInput
    const validated = validateContactInput(body)

    if ('error' in validated) {
      return NextResponse.json({ error: validated.error }, { status: 400 })
    }

    const { name, email, topic, message, turnstileToken } = validated.data

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, clientIp)
    if (!isTurnstileValid) {
      return NextResponse.json(
        { error: 'Verifikasi keamanan anti-spam gagal. Silakan muat ulang halaman.' },
        { status: 400 },
      )
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const savedMessage = await payload.create({
      collection: 'contact-messages',
      data: {
        senderName: name,
        senderEmail: email,
        topic,
        message,
        status: 'unread',
      },
    })

    // Kirim notifikasi email secara non-blocking jika RESEND_API_KEY tersedia
    await sendEmailNotification({
      senderName: name,
      senderEmail: email,
      topic,
      message,
      docId: savedMessage.id,
    })

    return NextResponse.json(
      {
        success: true,
        message: `Terima kasih, ${name}! Pesan Anda untuk MaktabIT Technology telah diterima.`,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error pada POST /api/contact:', error)
    return NextResponse.json(
      {
        error: 'Terjadi kesalahan pada server saat menyimpan pesan Anda. Silakan coba lagi.',
      },
      { status: 500 },
    )
  }
}
