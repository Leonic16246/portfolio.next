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
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto">

        {/* Header */}
        <div className="relative bg-neutral-950 w-full rounded-2xl px-10 py-12 ring-1 ring-white/10 shadow-2xl overflow-hidden">
          <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
          <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
          <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
          <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

          <h1 className="text-7xl font-light text-white/90 leading-none">My</h1>
          <h2 className="text-7xl font-bold text-white/90 leading-none">Blog</h2>
          <p className="mt-4 font-geist-mono tracking-wide text-sm uppercase text-white/80">
            {posts?.length ?? 0} post{posts?.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Posts */}
        {posts && posts.length > 0 ? (
          <div className="w-full">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                <article className="relative bg-neutral-950 rounded-2xl px-10 py-8 mb-4 ring-1 ring-white/10 shadow-2xl overflow-hidden hover:ring-white/20 hover:bg-white/[0.02] transition-all duration-200">
                  <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
                  <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
                  <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
                  <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-white/90 font-semibold text-4xl group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-white/80 text-xl leading-relaxed">{post.excerpt}</p>
                      )}
                    </div>
                    <time className="font-geist-mono text-sm tracking-wider uppercase text-white/70">
                      {new Date(post.created_at).toLocaleDateString('en-UK', {
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
    </div>
  )
}