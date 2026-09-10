import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Card from '@/components/card/card'

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
  }

  const count = posts?.length ?? 0

  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width">

        {/* Posts */}
        {error ? (
          <Card>
            <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50">
              Error loading posts
            </p>
          </Card>
        ) : count > 0 ? (
          posts!.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block w-full group">
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-xl text-white/80 leading-relaxed">{post.excerpt}</p>
                    )}
                  </div>
                  <time className="shrink-0 font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    {new Date(post.created_at).toLocaleDateString('en-UK', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50">
              No posts yet
            </p>
          </Card>
        )}

      </div>
    </div>
  )
}
