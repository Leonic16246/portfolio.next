type PCItem = {
  pcId: number;
  name: string;
  cpu: string;
  gpu: string;
  note: string;
};

async function getPCData(): Promise<PCItem[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/api/pc`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PC() {
  const data = await getPCData();

  if (data === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="font-geist-mono text-xs tracking-widest uppercase text-white/30">
          Failed to load PC data
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6 space-y-6">

      {/* Header */}
      <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

        <h1 className="text-7xl font-bold tracking-tight text-white/90 leading-none">PC Builds</h1>
        <p className="mt-5 font-geist-mono text-sm tracking-[0.2em] uppercase text-white/40">
          {data.length} build{data.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div className="relative bg-neutral-950 rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden">

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['Name', 'CPU', 'GPU', 'Note'].map((col) => (
                    <th key={col} className="px-8 py-4 text-left font-geist-mono text-[10px] tracking-widest uppercase text-white/60">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.pcId}
                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-150 last:border-b-0"
                  >
                    <td className="px-8 py-4 text-sm font-medium text-white/80">{item.name || '—'}</td>
                    <td className="px-8 py-4 text-sm text-white/80 font-geist-mono">{item.cpu || '—'}</td>
                    <td className="px-8 py-4 text-sm text-white/80 font-geist-mono">{item.gpu || '—'}</td>
                    <td className="px-8 py-4 text-sm text-white/80">{item.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden divide-y divide-white/[0.04]">
            {data.map((item) => (
              <div key={item.pcId} className="px-6 py-6 space-y-3">
                <p className="text-white/80 font-medium">{item.name || 'Unnamed'}</p>
                <div className="space-y-1.5">
                  {[
                    { label: 'CPU', value: item.cpu },
                    { label: 'GPU', value: item.gpu },
                    { label: 'Note', value: item.note },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline gap-4">
                      <span className="font-geist-mono text-[10px] tracking-widest uppercase text-white/80">{label}</span>
                      <span className="text-sm text-white/50 font-geist-mono">{value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative bg-neutral-950 rounded-2xl px-10 py-14 ring-1 ring-white/10 flex items-center justify-center">
          <p className="font-geist-mono text-xs tracking-widest uppercase text-white/25">No PC builds found</p>
        </div>
      )}

    </div>
  );
}