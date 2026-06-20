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
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Back link */}
        <div className="w-full">
          <a
            href="/blog"
            className="font-geist-mono text-sm tracking-wider uppercase text-white/60 hover:text-white/80 transition-colors duration-150"
          >
            ← Back
          </a>
        </div>

        {/* Header card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <h1 className="text-6xl font-bold tracking-tight text-white/90 max-w-3xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-2xl text-white/90 max-w-2xl">{post.excerpt}</p>
          )}
          <time className="mt-5 block font-geist-mono tracking-wider uppercase text-white/90">
            {new Date(post.created_at).toLocaleDateString('en', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Content card */}
        <div
          className="fade-in relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

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
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}