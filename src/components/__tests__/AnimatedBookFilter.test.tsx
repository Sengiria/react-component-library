import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AnimatedBookFilter } from '../AnimatedBookFilter/AnimatedBookFilter'

vi.mock('../../data/mockBooks', () => ({
  mockBooks: [
    { id: '1', title: 'Test Book 1', author: 'Author 1', genre: 'Fantasy', cover: 'https://via.placeholder.com/150x200?text=1' },
    { id: '2', title: 'Test Book 2', author: 'Author 2', genre: 'Science Fiction', cover: 'https://via.placeholder.com/150x200?text=2' },
    { id: '3', title: 'Test Book 3', author: 'Author 3', genre: 'Thriller', cover: 'https://via.placeholder.com/150x200?text=3' },
  ],
}))

describe('AnimatedBookFilter', () => {
  it('renders all books initially', () => {
    render(<AnimatedBookFilter />)
    expect(screen.getByText('Test Book 1')).toBeInTheDocument()
    expect(screen.getByText('Test Book 2')).toBeInTheDocument()
    expect(screen.getByText('Test Book 3')).toBeInTheDocument()
  })

  it('filters books by genre when button is clicked', async () => {
    render(<AnimatedBookFilter />)
    const button = screen.getByRole('button', { name: /fantasy/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Book 2')).toBeNull()
      expect(screen.queryByText('Test Book 3')).toBeNull()
    })
  })

  it('renders fallback message when no results are found', async () => {
    render(<AnimatedBookFilter />)
    const button = screen.getByRole('button', { name: /mystery/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument()
    })
  })

  it('shows all books when "All" button is clicked', async () => {
    render(<AnimatedBookFilter />)
    const allButton = screen.getByRole('button', { name: /all/i })
    fireEvent.click(allButton)

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument()
      expect(screen.getByText('Test Book 2')).toBeInTheDocument()
      expect(screen.getByText('Test Book 3')).toBeInTheDocument()
    })
  })
})
