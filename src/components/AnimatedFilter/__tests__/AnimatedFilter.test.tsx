import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AnimatedFilter from '../AnimatedFilter'
import { NO_RESULT_TEXT } from '../constants';

const mockBooks = [
  {
    id: '1',
    name: 'Test Book 1',
    category: 'Fantasy',
    image: 'https://via.placeholder.com/150x200?text=1',
  },
  {
    id: '2',
    name: 'Test Book 2',
    category: 'Science Fiction',
    image: 'https://via.placeholder.com/150x200?text=2',
  },
  {
    id: '3',
    name: 'Test Book 3',
    category: 'Thriller',
    image: 'https://via.placeholder.com/150x200?text=3',
  },
];

  describe('AnimatedFilter', () => {
    const setup = () =>
      render(
        <AnimatedFilter
          items={mockBooks}
          filterKey="category"
          filters={['All', 'Fantasy', 'Science Fiction', 'Thriller', 'Mystery']}
          renderItem={(item) => <p>{item.name}</p>}
        />
      );
    it('renders all books initially', () => {
      setup();
      expect(screen.getByText('Test Book 1')).toBeInTheDocument()
      expect(screen.getByText('Test Book 2')).toBeInTheDocument()
      expect(screen.getByText('Test Book 3')).toBeInTheDocument()
    })

    it('filters books by genre when button is clicked', async () => {
      setup();
      const button = screen.getByRole('button', { name: /fantasy/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Test Book 1')).toBeInTheDocument()
        expect(screen.queryByText('Test Book 2')).toBeNull()
        expect(screen.queryByText('Test Book 3')).toBeNull()
      })
    })

    it('renders fallback message when no results are found', async () => {
      setup();
      const button = screen.getByRole('button', { name: /mystery/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText(NO_RESULT_TEXT)).toBeInTheDocument()
      })
    })

    it('shows all books when "All" button is clicked', async () => {
      setup();
      const allButton = screen.getByRole('button', { name: /all/i })
      fireEvent.click(allButton)

      await waitFor(() => {
        expect(screen.getByText('Test Book 1')).toBeInTheDocument()
        expect(screen.getByText('Test Book 2')).toBeInTheDocument()
        expect(screen.getByText('Test Book 3')).toBeInTheDocument()
      })
    })
  })
