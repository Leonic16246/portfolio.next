import Link from 'next/link';
import { notFound } from 'next/navigation';

type PCItem = {
  pcId: number;
  name: string;
  cpu: string;
  gpu: string;
  note: string;
};

async function getPCItem(id: string): Promise<PCItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/pc/${id}`, {
      next: { revalidate: 60 }
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch {
    return null;
  }
}

export default async function PCDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getPCItem(id);

  if (!item) notFound();

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Back button */}
      <Link
        href="/pc"
        className="inline-flex items-center gap-2 font-geist-mono text-xs tracking-widest uppercase text-white/40 hover:text-white/60 transition-colors"
      >
        ← Back
      </Link>

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />
        <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">
          {item.name || 'Unnamed'}
        </h1>
        <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/40">
          PC #{item.pcId}
        </p>
      </div>

      {/* Details */}
      <div className="relative bg-neutral-950 rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden">
        {[
          { label: 'CPU', value: item.cpu },
          { label: 'GPU', value: item.gpu },
          { label: 'Note', value: item.note },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-baseline justify-between px-10 py-6 border-b border-white/[0.05] last:border-b-0">
            <span className="font-geist-mono text-[10px] tracking-widest uppercase text-white/40">
              {label}
            </span>
            <span className="text-sm text-white/80 font-geist-mono">
              {value || '—'}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}