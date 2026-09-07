import Card from '@/components/card/card'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width">

        {/* Error card */}
        <Card>
          <div className="flex flex-col">
            <p className="text-7xl font-light tracking-tight text-white/80 leading-none">Oops!</p>
            <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">Error</h1>
            <h2 className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70">
              Something went wrong
            </h2>
            <h3 className="mt-4 text-xl text-white/80 leading-relaxed">
              We encountered an unexpected error while processing your request.
            </h3>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/"
                className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95"
              >
                Go Home
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
