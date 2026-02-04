'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) {
      alert('Error deleting post: ' + error.message)
      return
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  )
}