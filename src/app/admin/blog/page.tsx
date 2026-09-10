import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Card from '@/components/card/card'
import DeleteButton from '@/components/admin/blog/deletebutton'

export const dynamic = 'force-dynamic'

export default async function AdminPost() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  const count = posts?.length ?? 0

  return (
    <>
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white/90 leading-none">
              Posts
            </h1>
            <p className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70">
              {count} post{count !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="shrink-0 rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95"
          >
            New post
          </Link>
        </div>
      </Card>

      {count > 0 ? (
        <Card>
          {/* Table, once the container reaches its widest step */}
          <div className="hidden min-[1069px]:block overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-white/10">
                  {['Title', 'Status', 'Created'].map((col, i) => (
                    <th
                      key={col}
                      className={`${i === 0 ? 'w-[46%]' : 'w-[18%]'} py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70`}
                    >
                      {col}
                    </th>
                  ))}
                  <th className="w-[18%] py-4 text-right font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts!.map((post) => (
                  <tr key={post.id} className="border-b border-white/10 last:border-b-0">
                    <td className="py-4 pr-6 break-words">
                      <p className="text-lg text-white/90">{post.title}</p>
                      <p className="font-geist-mono text-sm text-white/50">/{post.slug}</p>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="inline-block rounded border border-white/15 px-2 py-1 font-geist-mono text-xs tracking-widest uppercase text-white/70">
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 pr-6 font-geist-mono text-sm text-white/70">
                      {new Date(post.created_at).toLocaleDateString('en-UK')}
                    </td>
                    <td className="py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="font-geist-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                      <span className="mx-3 text-white/20">/</span>
                      <DeleteButton postId={post.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stacked rows for the narrower container steps */}
          <div className="min-[1069px]:hidden space-y-6">
            {posts!.map((post) => (
              <div key={post.id} className="border-l border-white/10 pl-5">
                <p className="text-2xl text-white/90 font-semibold break-words">{post.title}</p>
                <p className="mt-1 font-geist-mono text-sm text-white/50 break-words">/{post.slug}</p>
                <p className="mt-2 font-geist-mono text-sm tracking-widest uppercase text-white/70">
                  {post.published ? 'Published' : 'Draft'} — {new Date(post.created_at).toLocaleDateString('en-UK')}
                </p>
                <p className="mt-3">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="font-geist-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  <span className="mx-3 text-white/20">/</span>
                  <DeleteButton postId={post.id} />
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50">
            No posts yet
          </p>
        </Card>
      )}
    </>
  )
}
