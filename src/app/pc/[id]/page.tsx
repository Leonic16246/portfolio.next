import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/components/card/card';
import { getPCItem } from '@/lib/pc';

export default async function PCDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getPCItem(id);

  if (!item) notFound();

  const specs = [
    { label: 'CPU', value: item.cpu },
    { label: 'GPU', value: item.gpu },
    { label: 'Note', value: item.note },
  ];

  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width">

        {/* Back link */}
        <div className="w-full">
          <Link
            href="/pc"
            className="font-geist-mono text-sm tracking-wider uppercase text-white/60 hover:text-white/80 transition-colors duration-150"
          >
            ← Back
          </Link>
        </div>

        {/* Header card */}
        <Card>
          <h1 className="text-6xl font-bold tracking-tight text-white/90">
            {item.name || 'Unnamed'}
          </h1>
          <p className="mt-4 font-geist-mono text-lg uppercase text-white/70">
            PC #{item.pcId}
          </p>
        </Card>

        {/* Specs card */}
        <Card>
          <h2 className="text-4xl font-bold text-white/90">Specs</h2>
          <div className="mt-6 space-y-6">
            {specs.map(({ label, value }) => (
              <div key={label} className="border-white/10">
                <p className="font-geist-mono text-sm tracking-wider uppercase text-white/90">
                  {label}
                </p>
                <p className="text-lg text-white/80">{value || 'N/A'}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
