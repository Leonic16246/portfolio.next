import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, created_at, author_id')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="font-geist-mono text-xs uppercase text-white/30">Error loading posts</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-7xl font-light text-white/90 leading-none">My</h1>
        <h2 className="mt-1 text-7xl font-bold text-white/90 leading-none">Blog.</h2>
        <p className="mt-5 font-geist-mono text-sm uppercase text-white/40">
          {posts?.length ?? 0} post{posts?.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Posts */}
      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <article className="relative bg-neutral-950 rounded-2xl px-8 py-8 ring-1 ring-white/10 shadow-2xl overflow-hidden hover:ring-white/20 hover:bg-white/[0.02] transition-all duration-200">
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

                <div className="flex items-start justify-between gap-8">
                  <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-white/90 font-semibold text-xl group-hover:text-white transition-colors duration-150">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-white/50 text-sm leading-relaxed">{post.excerpt}</p>
                    )}
                  </div>
                  <time className="font-geist-mono text-[10px] uppercase text-white/25 shrink-0 pt-1">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 flex items-center justify-center">
          <p className="font-geist-mono text-xs uppercase text-white/25">No posts yet</p>
        </div>
      )}

    </div>
  )
}