import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/is-admin'
import { redirect } from 'next/navigation'

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blog', label: 'Posts' },
  { href: '/admin/blog/new', label: 'New Post' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user is admin
  if (!(await isAdmin(supabase))) {
    redirect('/')
  }

  return (
    <div className="min-h-screen">

      {/* Admin sub-navigation */}
      <nav className="border-b border-white/10">
        <div className="content-width flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {adminLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-geist-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="font-geist-mono text-sm tracking-wider text-white/40 truncate">
              {user.email}
            </span>
            <Link
              href="/blog"
              className="font-geist-mono text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              View Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content - pages compose Cards straight into this column */}
      <main className="py-8">
        <div className="content-width flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  )
}
