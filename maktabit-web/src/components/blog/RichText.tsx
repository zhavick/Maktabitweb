import React from 'react'

interface LexicalNode {
  type?: string
  tag?: string
  listType?: 'bullet' | 'number' | 'check'
  text?: string
  format?: number | string
  url?: string
  fields?: {
    url?: string
    newTab?: boolean
  }
  value?: {
    url?: string
    alt?: string
    caption?: string
  }
  children?: LexicalNode[]
}

export interface RichTextProps {
  content:
    | {
        root?: {
          children?: unknown[]
        }
      }
    | null
    | undefined
  className?: string
}

function renderTextNode(node: LexicalNode, key: React.Key): React.ReactNode {
  let content: React.ReactNode = node.text ?? ''
  const fmt = typeof node.format === 'number' ? node.format : 0

  if (fmt & 16) {
    content = (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-sky-700">
        {content}
      </code>
    )
  }
  if (fmt & 1) {
    content = <strong className="font-semibold text-slate-900">{content}</strong>
  }
  if (fmt & 2) {
    content = <em>{content}</em>
  }
  if (fmt & 8) {
    content = <span className="underline">{content}</span>
  }
  if (fmt & 4) {
    content = <span className="line-through">{content}</span>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderNodes(nodes: LexicalNode[] | undefined): React.ReactNode {
  if (!nodes || !Array.isArray(nodes)) return null

  return nodes.map((node, index) => {
    switch (node.type) {
      case 'text':
        return renderTextNode(node, index)

      case 'linebreak':
        return <br key={index} />

      case 'paragraph':
        return (
          <p key={index} className="mb-5 text-base leading-relaxed text-slate-700 sm:text-lg">
            {renderNodes(node.children)}
          </p>
        )

      case 'heading': {
        const tag = node.tag || 'h2'
        const children = renderNodes(node.children)
        if (tag === 'h1') {
          return (
            <h1
              key={index}
              className="font-display mt-10 mb-4 text-2xl font-extrabold text-slate-900 sm:text-3xl"
            >
              {children}
            </h1>
          )
        }
        if (tag === 'h3') {
          return (
            <h3
              key={index}
              className="font-display mt-7 mb-3 text-lg font-bold text-slate-900 sm:text-xl"
            >
              {children}
            </h3>
          )
        }
        if (tag === 'h4') {
          return (
            <h4 key={index} className="font-display mt-6 mb-2 text-base font-bold text-slate-900">
              {children}
            </h4>
          )
        }
        return (
          <h2
            key={index}
            className="font-display mt-9 mb-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
          >
            {children}
          </h2>
        )
      }

      case 'list': {
        if (node.listType === 'number') {
          return (
            <ol
              key={index}
              className="mb-6 list-decimal space-y-2 pl-6 text-base text-slate-700 sm:text-lg"
            >
              {renderNodes(node.children)}
            </ol>
          )
        }
        return (
          <ul
            key={index}
            className="mb-6 list-disc space-y-2 pl-6 text-base text-slate-700 sm:text-lg"
          >
            {renderNodes(node.children)}
          </ul>
        )
      }

      case 'listitem':
        return (
          <li key={index} className="leading-relaxed">
            {renderNodes(node.children)}
          </li>
        )

      case 'quote':
        return (
          <blockquote
            key={index}
            className="my-6 rounded-r-2xl border-l-4 border-sky-500 bg-slate-50 py-4 pr-5 pl-5 text-base text-slate-700 italic"
          >
            {renderNodes(node.children)}
          </blockquote>
        )

      case 'horizontalrule':
        return <hr key={index} className="my-8 border-slate-200" />

      case 'link':
      case 'autolink': {
        const href = node.fields?.url || node.url || '#'
        const newTab = node.fields?.newTab ?? href.startsWith('http')
        return (
          <a
            key={index}
            href={href}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className="font-medium text-sky-600 underline underline-offset-4 hover:text-sky-700"
          >
            {renderNodes(node.children)}
          </a>
        )
      }

      case 'upload': {
        const imgUrl = node.value?.url
        if (!imgUrl) return null
        return (
          <figure key={index} className="my-8 overflow-hidden rounded-2xl border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgUrl}
              alt={node.value?.alt || 'Ilustrasi Artikel'}
              className="w-full object-cover"
            />
            {node.value?.caption && (
              <figcaption className="bg-slate-50 px-4 py-2.5 text-center text-xs text-slate-500">
                {node.value.caption}
              </figcaption>
            )}
          </figure>
        )
      }

      default:
        if (node.children) {
          return <div key={index}>{renderNodes(node.children)}</div>
        }
        return null
    }
  })
}

export function RichText({ content, className = '' }: RichTextProps) {
  const rootChildren = (content?.root?.children as LexicalNode[] | undefined) ?? []

  return (
    <div className={`prose prose-slate max-w-none ${className}`}>
      {renderNodes(rootChildren)}
    </div>
  )
}
