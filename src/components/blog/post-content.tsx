import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="
      prose
      prose-invert
      prose-xl max-w-none
      prose-headings:text-white prose-headings:font-semibold
      prose-p:text-white
      prose-a:text-white/80 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white
      prose-code:text-white/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-geist-mono prose-code:text-sm
      prose-pre:bg-transparent prose-pre:p-0
      prose-blockquote:border-white/10 prose-blockquote:text-white/40
      prose-hr:border-white/10
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          code(props) {
            const { children, className, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={oneDark}
                customStyle={{ borderRadius: '0.5rem', margin: 0 }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
