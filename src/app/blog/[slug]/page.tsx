import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PostContent from '@/components/blog/post-content'

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
          className="relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
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
          className="relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12"
        >
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

          <PostContent content={post.content} />
        </div>
      </div>
    </div>
  )
}