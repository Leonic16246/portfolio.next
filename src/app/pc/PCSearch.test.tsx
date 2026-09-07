import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PCSearch from './PCSearch'

const push = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/pc',
}))

beforeEach(() => {
  push.mockClear()
})

const input = () => screen.getByPlaceholderText('Search...')
const submit = () => screen.getByRole('button', { name: 'Search' })
const clear = () => screen.queryByRole('button', { name: 'Clear search' })

describe('PCSearch', () => {
  it('seeds the field from the active search term', () => {
    render(<PCSearch search="i7" />)
    expect(input()).toHaveValue('i7')
  })

  it('starts empty when no search is active', () => {
    render(<PCSearch />)
    expect(input()).toHaveValue('')
  })

  it('navigates to the search term on submit', async () => {
    const user = userEvent.setup()
    render(<PCSearch />)

    await user.type(input(), 'radeon')
    await user.click(submit())

    expect(push).toHaveBeenCalledWith('/pc?search=radeon')
  })

  it('trims surrounding whitespace off the term', async () => {
    const user = userEvent.setup()
    render(<PCSearch />)

    await user.type(input(), '   i7   ')
    await user.click(submit())

    expect(push).toHaveBeenCalledWith('/pc?search=i7')
  })

  it('navigates to the bare path when the term is only whitespace', async () => {
    const user = userEvent.setup()
    render(<PCSearch />)

    await user.type(input(), '   ')
    await user.click(submit())

    expect(push).toHaveBeenCalledWith('/pc')
  })

  it('percent-encodes a term containing spaces', async () => {
    const user = userEvent.setup()
    render(<PCSearch />)

    await user.type(input(), 'core i7')
    await user.click(submit())

    expect(push).toHaveBeenCalledWith('/pc?search=core+i7')
  })

  it('offers the clear control only while the field has content', async () => {
    const user = userEvent.setup()
    render(<PCSearch />)

    expect(clear()).not.toBeInTheDocument()
    await user.type(input(), 'x')
    expect(clear()).toBeInTheDocument()
  })

  it('clears the field and returns to the unfiltered list', async () => {
    const user = userEvent.setup()
    render(<PCSearch search="i7" />)

    await user.click(clear()!)

    expect(input()).toHaveValue('')
    expect(push).toHaveBeenCalledWith('/pc')
  })

  it('follows the active search when it changes from outside', () => {
    const { rerender } = render(<PCSearch search="i7" />)
    expect(input()).toHaveValue('i7')

    rerender(<PCSearch search="radeon" />)
    expect(input()).toHaveValue('radeon')
  })

  it('keeps an unsubmitted draft when a rerender leaves the search alone', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<PCSearch search="i7" />)

    await user.clear(input())
    await user.type(input(), 'draft')
    rerender(<PCSearch search="i7" />)

    expect(input()).toHaveValue('draft')
  })
})
