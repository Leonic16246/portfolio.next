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

function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error)
  const cause = error.cause as { code?: string; errors?: { code?: string }[] } | undefined
  const code = cause?.code ?? cause?.errors?.find((e) => e?.code)?.code
  return code ? `${error.message} (${code})` : error.message
}

export async function getPCList(search?: string): Promise<PCItem[] | null> {
  const target = search ? `list (search: ${search})` : 'list'
  try {
    const url = pcUrl()
    if (search) url.searchParams.set('search', search)

    const res = await fetch(url.toString(), {
      next: { revalidate: search ? 0 : 30 }
    })
    if (!res.ok) {
      console.error(`[pc] ${target}: API responded ${res.status} ${res.statusText}`)
      return null
    }
    return await res.json()
  } catch (error) {
    console.error(`[pc] ${target}: ${describeError(error)}`)
    return null
  }
}

export async function getPCItem(id: string): Promise<PCItem | null> {
  try {
    const res = await fetch(pcUrl(`/${id}`).toString(), {
      next: { revalidate: 60 }
    })
    // A missing item is a normal outcome, not a failure worth logging.
    if (res.status === 404) return null
    if (!res.ok) {
      console.error(`[pc] item ${id}: API responded ${res.status} ${res.statusText}`)
      return null
    }
    return await res.json()
  } catch (error) {
    console.error(`[pc] item ${id}: ${describeError(error)}`)
    return null
  }
}
