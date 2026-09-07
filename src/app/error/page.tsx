import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className="min-h-screen p-8">

      <div className="flex flex-col items-center gap-8 mx-auto w-full max-w-[1000px]">

        {/* Error card */}
        <div className="relative w-full rounded-lg border bg-neutral-950 border-white/10 transition hover:border-white/20 px-10 py-12">
          <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />

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
        </div>
      </div>
    </div>
  )
}
