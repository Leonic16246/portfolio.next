import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PostForm from '@/components/admin/postform'

export default async function NewPostPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <PostForm userId={user.id} />
    </div>
  )
}