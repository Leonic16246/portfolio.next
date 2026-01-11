import { createClient } from '@/lib/supabase-server'
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
    return <div>Error loading posts</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts?.map(post => (
          <article key={post.id} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
            <time className="text-sm text-gray-500 mt-2 block">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}