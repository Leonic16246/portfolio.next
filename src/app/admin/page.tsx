import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Card from '@/components/card/card'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', false)

  const stats = [
    { label: 'Total Posts', value: totalPosts ?? 0 },
    { label: 'Published', value: publishedPosts ?? 0 },
    { label: 'Drafts', value: draftPosts ?? 0 },
  ]

  return (
    <>
      <Card>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white/90 leading-none">
          Dashboard
        </h1>
        <div className="mt-8">
          <Link
            href="/admin/blog/new"
            className="inline-block rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95"
          >
            Create New Post
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map(({ label, value }) => (
          <Card key={label}>
            <p className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
              {label}
            </p>
            <p className="mt-4 text-6xl font-bold tracking-tight text-white/90 leading-none">
              {value}
            </p>
          </Card>
        ))}
      </div>
    </>
  )
}
