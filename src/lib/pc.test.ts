import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPCList, getPCItem, type PCItem } from './pc'

const item: PCItem = {
  pcId: 0,
  name: 'Leonic',
  cpu: 'Core i7 2610QM',
  gpu: 'Radeon ATI 5500M',
  note: 'Laptop',
}

function mockFetch(response: { ok?: boolean; status?: number; body?: unknown }) {
  const { status = 200, ok = status >= 200 && status < 300, body = null } = response
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

beforeEach(() => {
  vi.stubEnv('DOTNET_API_URL', 'http://api.test')
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('getPCList', () => {
  it('returns the list on a successful response', async () => {
    mockFetch({ body: [item] })
    await expect(getPCList()).resolves.toEqual([item])
  })

  it('requests the collection endpoint without a search param by default', async () => {
    const fetchMock = mockFetch({ body: [] })
    await getPCList()
    expect(fetchMock).toHaveBeenCalledWith('http://api.test/api/pc', {
      next: { revalidate: 30 },
    })
  })

  it('appends the search term and bypasses the cache when searching', async () => {
    const fetchMock = mockFetch({ body: [] })
    await getPCList('i7')
    expect(fetchMock).toHaveBeenCalledWith('http://api.test/api/pc?search=i7', {
      next: { revalidate: 0 },
    })
  })

  it('returns null when the API responds with an error status', async () => {
    mockFetch({ status: 500 })
    await expect(getPCList()).resolves.toBeNull()
  })

  it('returns null when the request throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    await expect(getPCList()).resolves.toBeNull()
  })

  it('returns null when DOTNET_API_URL is unset', async () => {
    vi.stubEnv('DOTNET_API_URL', '')
    mockFetch({ body: [item] })
    await expect(getPCList()).resolves.toBeNull()
  })
})

describe('getPCItem', () => {
  it('returns the item on a successful response', async () => {
    mockFetch({ body: item })
    await expect(getPCItem('0')).resolves.toEqual(item)
  })

  it('requests the item endpoint for the given id', async () => {
    const fetchMock = mockFetch({ body: item })
    await getPCItem('0')
    expect(fetchMock).toHaveBeenCalledWith('http://api.test/api/pc/0', {
      next: { revalidate: 60 },
    })
  })

  it('returns null when the item does not exist', async () => {
    mockFetch({ status: 404 })
    await expect(getPCItem('999')).resolves.toBeNull()
  })

  it('returns null when the API responds with an error status', async () => {
    mockFetch({ status: 500 })
    await expect(getPCItem('0')).resolves.toBeNull()
  })

  it('returns null when the request throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    await expect(getPCItem('0')).resolves.toBeNull()
  })

  it('returns null when DOTNET_API_URL is unset', async () => {
    vi.stubEnv('DOTNET_API_URL', '')
    mockFetch({ body: item })
    await expect(getPCItem('0')).resolves.toBeNull()
  })
})
