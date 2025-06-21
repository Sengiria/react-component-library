import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import InputField from '../InputField'

describe('InputField', () => {
  it('renders with label', () => {
    render(<InputField label="Email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('floats label when input is focused', () => {
    render(<InputField label="Email" />)
    const input = screen.getByLabelText(/email/i)
    fireEvent.focus(input)
    const label = screen.getByText(/email/i)
    expect(label.className).toContain('top-1')
  })

  it('floats label when input has text', () => {
    render(<InputField label="Email" />)
    const input = screen.getByLabelText(/email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    const label = screen.getByText(/email/i)
    expect(label.className).toContain('top-1')
  })

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn()
    render(<InputField label="Email" onChange={handleChange} />)
    const input = screen.getByLabelText(/email/i)
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('uses correct input type for hidden=false', () => {
    render(<InputField label="Username" hidden={false} />)
    const input = screen.getByLabelText(/username/i)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('toggles password visibility', () => {
    render(<InputField label="Password" hidden />)
    const input = screen.getByLabelText(/password/i, { selector: 'input' })
    const toggle = screen.getByRole('button', { name: /show password/i })
    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('applies required attribute when set', () => {
    render(<InputField label="Email" required />)
    const input = screen.getByLabelText(/email/i)
    expect(input).toBeRequired()
  })
})
