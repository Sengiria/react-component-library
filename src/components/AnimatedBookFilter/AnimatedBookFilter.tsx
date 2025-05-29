import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBooks } from '../../data/mockBooks';

const genres = ['All', 'Fantasy', 'Science Fiction', 'Thriller', 'Mystery'];

export function AnimatedBookFilter() {
  const [filter, setFilter] = useState('All');

  const filteredBooks =
    filter === 'All'
      ? mockBooks
      : mockBooks.filter((book) => book.genre === filter);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer transition ${filter === genre
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {genre}
          </button>
        ))}
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No results found</p>
      ) : (
      <motion.div
        layout
        className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] min-h-[400px]"
      >
        <AnimatePresence>
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              className="rounded flex flex-col items-center text-center cursor-pointer max-w-[200px] w-full mx-auto"
            >

              <div className="w-full aspect-[2/3] mb-2 overflow-hidden rounded shadow">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/150x200?text=No+Image';
                  }}
                />
              </div>
              <p className="text-sm font-semibold my-2">{book.title}</p>
              <p className="text-xs text-gray-500 mb-2">{book.author}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      )}
    </div>
  );
}