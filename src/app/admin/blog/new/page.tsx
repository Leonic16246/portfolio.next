import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Card from '@/components/card/card'
import PostForm from '@/components/admin/blog/postform'

export default async function NewPostPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <Card>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white/90 leading-none">
          New Post
        </h1>
      </Card>
      <Card>
        <PostForm userId={user.id} />
      </Card>
    </>
  )
}
