import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Card from '@/components/card/card'
import PostForm from '@/components/admin/blog/postform'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEditPost({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) {
    notFound()
  }

  return (
    <>
      <Card>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white/90 leading-none">
          Edit Post
        </h1>
        <p className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70 break-words">
          /blog/{post.slug}
        </p>
      </Card>
      <Card>
        <PostForm userId={user.id} post={post} />
      </Card>
    </>
  )
}
