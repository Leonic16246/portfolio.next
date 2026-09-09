import Link from 'next/link';
import PCSearch from './PCSearch';
import Card from '@/components/card/card';
import { getPCList } from '@/lib/pc';

function SortLink({
  label,
  field,
  currentSort,
  search,
}: {
  label: string;
  field: string;
  currentSort?: string;
  search?: string;
}) {
  const isAsc = currentSort === field;
  const isDesc = currentSort === `-${field}`;
  const nextSort = isAsc ? `-${field}` : field;

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  params.set('sort', nextSort);

  return (
    <Link
      href={`/pc?${params.toString()}`}
      className="inline-flex items-center gap-1 hover:text-white/80 transition-colors"
    >
      {label}
      <span className="flex flex-col leading-none text-[8px]">
        <span className={isAsc ? 'text-white/80' : 'text-white/40'}>▲</span>
        <span className={isDesc ? 'text-white/80' : 'text-white/40'}>▼</span>
      </span>
    </Link>
  );
}

export default async function PC({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; search?: string }>;
}) {
  const { sort, search } = await searchParams;
  const data = await getPCList(search);
  const failed = data === null;

  const sorted = [...(data ?? [])].sort((a, b) => {
    if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
    if (sort === '-name') return (b.name || '').localeCompare(a.name || '');
    return a.pcId - b.pcId;
  });

  return (
    <div className="min-h-screen py-8">

      <div className="flex flex-col items-center gap-8 content-width">

        {/* Header card */}
        <Card>
          <p className="text-5xl md:text-8xl font-light tracking-tight text-white/80 leading-none">PC</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white/90 leading-none">Builds</h1>
          <p className="mt-4 font-geist-mono text-lg tracking-[0.2em] uppercase text-white/70">
            {failed ? 'Unavailable' : `${sorted.length} build${sorted.length !== 1 ? 's' : ''}`}
          </p>
        </Card>

        {/* Search */}
        <div className="w-full">
          <PCSearch search={search} />
        </div>

        {/* Results */}
        {failed ? (
          <Card>
            <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50">
              Failed to load PC data
            </p>
          </Card>
        ) : sorted.length > 0 ? (
          <Card>

            {/* Table, once the container reaches its widest step */}
            <div className="hidden min-[1069px]:block overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="w-[28%] py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                      <SortLink label="Name" field="name" currentSort={sort} search={search} />
                    </th>
                    {['CPU', 'GPU', 'Note'].map((col) => (
                      <th key={col} className="w-[24%] py-4 pr-6 last:pr-0 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((item) => (
                    <tr key={item.pcId} className="border-b border-white/10 last:border-b-0">
                      <td className="py-4 pr-6 text-lg text-white/90 break-words">
                        <Link href={`/pc/${item.pcId}`} className="hover:text-white transition-colors">
                          {item.name || '—'}
                        </Link>
                      </td>
                      <td className="py-4 pr-6 text-lg text-white/80 break-words">{item.cpu || '—'}</td>
                      <td className="py-4 pr-6 text-lg text-white/80 break-words">{item.gpu || '—'}</td>
                      <td className="py-4 text-lg text-white/80 break-words">{item.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stacked rows for the narrower container steps */}
            <div className="min-[1069px]:hidden space-y-6">
              {sorted.map((item) => (
                <Link
                  key={item.pcId}
                  href={`/pc/${item.pcId}`}
                  className="block border-l border-white/10 pl-5 hover:border-white/25 transition-colors"
                >
                  <p className="text-2xl text-white/90 font-semibold">{item.name || 'Unnamed'}</p>
                  {[
                    { label: 'CPU', value: item.cpu },
                    { label: 'GPU', value: item.gpu },
                    { label: 'Note', value: item.note },
                  ].map(({ label, value }) => (
                    <p key={label} className="mt-1 font-geist-mono text-sm tracking-widest uppercase text-white/70 break-words">
                      {label}: <span className="text-white/80">{value || '—'}</span>
                    </p>
                  ))}
                </Link>
              ))}
            </div>

          </Card>
        ) : (
          <Card>
            <p className="font-geist-mono text-sm tracking-widest uppercase text-white/50">
              {search ? `No results for "${search}"` : 'No PC builds found'}
            </p>
          </Card>
        )}

      </div>
    </div>
  );
}
