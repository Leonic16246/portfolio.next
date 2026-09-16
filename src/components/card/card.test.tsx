import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './card'

describe('Card', () => {
  it('renders its children', () => {
    render(<Card><p>Inside the card</p></Card>)
    expect(screen.getByText('Inside the card')).toBeInTheDocument()
  })

  it('frames the surface with four corner marks', () => {
    const { container } = render(<Card>content</Card>)
    expect(container.querySelectorAll('span.absolute')).toHaveLength(4)
  })
})
