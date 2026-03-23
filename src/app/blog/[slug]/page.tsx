import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) {
    console.error('Post not found:', slug, error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Back link — top */}
      <div>
        <a
          href="/blog"
          className="font-geist-mono text-xs uppercase text-white/30 hover:text-white/70 transition-colors duration-150"
        >
          ← Back to Blog
        </a>
      </div>

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-5xl font-bold text-white/90 leading-tight max-w-3xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">{post.excerpt}</p>
        )}
        <time className="mt-5 block font-geist-mono text-[10px] uppercase text-white/75">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      {/* Content */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-12 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
        <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
        <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
        <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white/90 prose-headings:font-semibold prose-headings:tracking-tight
          prose-p:text-white/60 prose-p:leading-relaxed
          prose-a:text-white/70 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white
          prose-strong:text-white/80
          prose-code:text-white/70 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-geist-mono prose-code:text-sm
          prose-pre:bg-transparent prose-pre:p-0
          prose-blockquote:border-white/10 prose-blockquote:text-white/40
          prose-hr:border-white/10
          prose-li:text-white/60
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
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Back link */}
      <div className="pb-2">
        <a
          href="/blog"
          className="font-geist-mono text-xs uppercase text-white/30 hover:text-white/70 transition-colors duration-150"
        >
          ← Back to Blog
        </a>
      </div>

    </div>
  )
}