'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import PostContent from '@/components/blog/post-content'

interface PostFormProps {
  userId: string
  post?: {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string
    published: boolean
  }
}

export default function PostForm({ userId, post }: PostFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
  
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [published, setPublished] = useState(post?.published || false)
  const [loading, setLoading] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!post) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const postData = {
      title,
      slug,
      content,
      excerpt,
      published,
      author_id: userId,
    }

    let error

    if (post) {
      const result = await supabase
        .from('posts')
        .update(postData)
        .eq('id', post.id)
      error = result.error
    } else {
      const result = await supabase
        .from('posts')
        .insert([postData])
      error = result.error
    }

    if (error) {
      alert('Error saving post: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/admin/blog')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="mt-2 block w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder-white/40 transition focus:border-white/25"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70">
            Slug
          </label>
          <div className="mt-2 flex">
            <span className="inline-flex items-center rounded-l-lg border border-r-0 border-white/10 bg-white/5 px-4 font-geist-mono text-sm text-white/50">
              /blog/
            </span>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="block w-full min-w-0 flex-1 rounded-r-lg border border-white/10 bg-black/40 px-4 py-3 font-geist-mono text-white/90 placeholder-white/40 transition focus:border-white/25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="mt-2 block w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder-white/40 transition focus:border-white/25"
            placeholder="A brief summary of your post"
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="content" className="block font-geist-mono text-sm tracking-widest uppercase text-white/70">
              Content
            </label>
            <span className="font-geist-mono text-sm tracking-wider uppercase text-white/40">
              Markdown supported
            </span>
          </div>
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="block w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-geist-mono text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
              placeholder="Write your post content here..."
            />
            <div className="max-h-[32rem] overflow-y-auto rounded-lg border border-white/10 bg-black/40 px-4 py-3">
              {content ? (
                <PostContent content={content} />
              ) : (
                <p className="font-geist-mono text-sm tracking-wider uppercase text-white/40">
                  Preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-white/90"
          />
          <div>
            <label htmlFor="published" className="font-geist-mono text-sm tracking-widest uppercase text-white/70">
              Published
            </label>
            <p className="mt-1 text-white/50">Make this post public</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border-2 border-white/25 px-6 py-2.5 text-center text-white/90 transition hover:bg-white/5 hover:border-white/50 active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}
