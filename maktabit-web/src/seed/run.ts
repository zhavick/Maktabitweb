import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedDatabase } from './index'

async function run() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await seedDatabase(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error('Gagal menjalankan seed database:', err)
  process.exit(1)
})
