import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/about',
}))

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

describe('Header', () => {
  it('highlights the active nav link based on pathname', () => {
    render(<Header />)

    const aboutLink = screen.getAllByText('About')[0]
    expect(aboutLink.className).toContain('bg-white/10')
  })

  it('toggles the mobile panel from the burger button', async () => {
    const user = userEvent.setup()
    render(<Header />)

    // Nav links render once (desktop) until the mobile panel opens
    expect(screen.getAllByText('Projects')).toHaveLength(1)

    await user.click(screen.getByLabelText('Toggle menu'))
    expect(screen.getAllByText('Projects')).toHaveLength(2)

    await user.click(screen.getByLabelText('Toggle menu'))
    expect(screen.getAllByText('Projects')).toHaveLength(1)
  })
})
