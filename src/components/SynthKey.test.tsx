import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { WhiteKey } from './WhiteKey'

describe('SynthKey', () => {
  it('renders a Key', () => {
    render(<WhiteKey pitch='C4' />)
    expect(screen.getByText('C4')).toBeInTheDocument()
  })
})
