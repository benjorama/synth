import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SynthKey } from './SynthKey'

describe('SynthKey', () => {
  it('renders a Key', () => {
    render(<SynthKey pitch='C4' />)
  })
})
