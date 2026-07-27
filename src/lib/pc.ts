export type PCItem = {
  pcId: number
  name: string
  cpu: string
  gpu: string
  note: string
}

function pcUrl(path = ''): URL {
  return new URL(`${process.env.DOTNET_API_URL}/api/pc${path}`)
}

export async function getPCList(search?: string): Promise<PCItem[] | null> {
  try {
    const url = pcUrl()
    if (search) url.searchParams.set('search', search)

    const res = await fetch(url.toString(), {
      next: { revalidate: search ? 0 : 30 }
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getPCItem(id: string): Promise<PCItem | null> {
  try {
    const res = await fetch(pcUrl(`/${id}`).toString(), {
      next: { revalidate: 60 }
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  } catch {
    return null
  }
}
