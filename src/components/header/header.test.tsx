import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './header'

const push = vi.fn()
const refresh = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh }),
  usePathname: () => '/about',
}))

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

const getUser = vi.fn()
const signOut = vi.fn()

vi.mock('@supabase/ssr', () => ({
  createBrowserClient: () => ({
    auth: { getUser, signOut },
  }),
}))

beforeEach(() => {
  push.mockClear()
  refresh.mockClear()
  getUser.mockReset()
  signOut.mockReset()
})

describe('Header', () => {
  it('shows the logged-out state when there is no session', async () => {
    getUser.mockResolvedValue({ data: { user: null } })
    render(<Header />)

    await waitFor(() => expect(getUser).toHaveBeenCalled())
    expect(screen.queryByText(/@/)).not.toBeInTheDocument()
  })

  it('shows the user email and logs out on click', async () => {
    getUser.mockResolvedValue({ data: { user: { email: 'email@example.com' } } })
    signOut.mockResolvedValue({ error: null })
    const user = userEvent.setup()

    render(<Header />)

    await screen.findByText('email@example.com') // waits for fetchUser() to resolve, panel is hidden but in DOM

    await user.click(screen.getByLabelText('Account menu'))
    await user.click(screen.getByText('Log out'))

    expect(signOut).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/')
  })

  it('hides the account button while the auth check is still pending', () => {
    getUser.mockReturnValue(new Promise(() => {})) // never resolves
    render(<Header />)

    const wrapper = screen.getByLabelText('Account menu').parentElement
    expect(wrapper).toHaveClass('invisible')
  })

  it('highlights the active nav link based on pathname', async () => {
    getUser.mockResolvedValue({ data: { user: null } })
    render(<Header />)

    const aboutLink = screen.getAllByText('About')[0]
    expect(aboutLink.className).toContain('bg-white/10')
  })
})