import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Keyboard } from './Keyboard'

describe('SynthKey', () => {
  it('renders a Key', () => {
    render(<Keyboard />)
    expect(screen.getByText('C4')).toBeInTheDocument()
    expect(screen.getByText('D4')).toBeInTheDocument()
    expect(screen.getByText('E4')).toBeInTheDocument()
    expect(screen.getByText('F4')).toBeInTheDocument()
    expect(screen.getByText('G4')).toBeInTheDocument()
    expect(screen.getByText('A4')).toBeInTheDocument()
    expect(screen.getByText('B4')).toBeInTheDocument()
    expect(screen.getByText('C5')).toBeInTheDocument()
  })
})
