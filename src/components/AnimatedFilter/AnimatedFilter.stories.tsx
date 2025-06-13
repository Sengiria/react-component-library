import type { Meta, StoryObj } from '@storybook/react';
import AnimatedFilter from './AnimatedFilter';
import { mockBooks } from './data/mockBooks';
import { NO_RESULT_TEXT, DEFAULT_FILTER_KEY, ALL_FILTER_KEY } from './constants';
import type { BookItem } from './types';

// Fix for Storybook -> It is only needed here because Storybook uses a generic-agnostic Meta typing system that doesn't support generic inference automatically
const BoundBookFilter = AnimatedFilter<BookItem>;

const bookItems: BookItem[] = mockBooks.map((book) => ({
  id: book.id,
  name: book.title,
  author: book.author,
  category: book.genre,
  image: book.cover,
}));

const meta: Meta<typeof AnimatedFilter> = {
  title: 'Components/AnimatedFilter',
  component: AnimatedFilter,
  tags: ['autodocs'],
  argTypes: {
    filterKey: {
      control: 'text',
      description: 'Object key used for filtering',
    },
    filters: {
      control: { type: 'object' },
      description: 'List of filter buttons (must include "All")',
    },
    emptyText: {
      control: 'text',
      description: 'Message shown when no results are found',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BoundBookFilter>;

export const BookFilter: Story = {
  args: {
    items: bookItems,
    filterKey: DEFAULT_FILTER_KEY,
    filters: [ALL_FILTER_KEY, ...new Set(bookItems.map((b) => b.category))],
    emptyText: NO_RESULT_TEXT,
    renderItem: (item) => (
      <>
        <div className="w-full aspect-[2/3] mb-2 overflow-hidden rounded shadow">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/150x200?text=No+Image';
            }}
          />
        </div>
        <p className="text-sm font-semibold my-2">{item.name}</p>
        <p className="text-xs text-gray-500 mb-1 italic">{item.author}</p>
        <p className="text-xs text-gray-400 mb-2">{item.category}</p>
      </>
    ),
  },
};
