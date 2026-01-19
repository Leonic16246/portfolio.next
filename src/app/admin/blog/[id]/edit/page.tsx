import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import PostForm from '@/components/admin/postform'

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
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Edit Post</h1>
      <PostForm userId={user.id} post={post} />
    </div>
  )
}