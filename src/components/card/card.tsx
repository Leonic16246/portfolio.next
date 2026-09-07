import type { ReactNode } from 'react'

/** The four bracket marks that frame every card surface. */
export function CardCorners() {
  return (
    <>
      <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/25" />
      <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/25" />
      <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/25" />
      <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/25" />
    </>
  )
}

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full rounded border-2 bg-neutral-950 border-white/5 transition hover:border-white/10 px-10 py-12">
      <CardCorners />
      {children}
    </div>
  )
}
