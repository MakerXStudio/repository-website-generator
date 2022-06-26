import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

export type MarkdownProps = {
  children: string
  className?: string | undefined
} & Pick<ReactMarkdownOptions, 'transformLinkUri'>

export const Markdown = ({ children, transformLinkUri, className = 'w-full markdown' }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={className}
      transformLinkUri={transformLinkUri}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              style={theme as any}
              PreTag="div"
              customStyle={{ fontSize: '16px', fontFamily: 'mono' }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
