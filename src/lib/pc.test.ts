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

function mockUnparseableBody() {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => {
      throw new SyntaxError('Unexpected token < in JSON at position 0')
    },
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

let errorSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  vi.stubEnv('DOTNET_API_URL', 'http://api.test')
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  errorSpy.mockRestore()
})

function connectionRefused() {
  const error = new TypeError('fetch failed')
  error.cause = { errors: [{ code: 'ECONNREFUSED' }, { code: 'ECONNREFUSED' }] }
  return error
}

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

  it('returns null when a 200 carries a body that is not JSON', async () => {
    mockUnparseableBody()
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

  it('returns null when a 200 carries a body that is not JSON', async () => {
    mockUnparseableBody()
    await expect(getPCItem('0')).resolves.toBeNull()
  })

  it('returns null when DOTNET_API_URL is unset', async () => {
    vi.stubEnv('DOTNET_API_URL', '')
    mockFetch({ body: item })
    await expect(getPCItem('0')).resolves.toBeNull()
  })
})

describe('failure reporting', () => {
  it('logs the status when the list endpoint responds with an error', async () => {
    mockFetch({ status: 500 })
    await getPCList()
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('500'))
  })

  it('names the underlying connection failure instead of swallowing it', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(connectionRefused()))
    await getPCList()
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('ECONNREFUSED'))
  })

  it('identifies which search failed, so a dead backend is traceable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(connectionRefused()))
    await getPCList('i7')
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('search: i7'))
  })

  it('logs the status when the item endpoint responds with an error', async () => {
    mockFetch({ status: 500 })
    await getPCItem('0')
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('500'))
  })

  it('stays quiet on a 404, which is a normal outcome rather than a failure', async () => {
    mockFetch({ status: 404 })
    await expect(getPCItem('999')).resolves.toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('names the parse failure when the body is not JSON', async () => {
    mockUnparseableBody()
    await getPCList()
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Unexpected token'))
  })
})
