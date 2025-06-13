import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnimatedFilterProps } from './types';
import { DEFAULT_FILTER_KEY, NO_RESULT_TEXT } from './constants';

const AnimatedFilter = <T extends { id: string | number }>({
  items = [],
  filterKey = DEFAULT_FILTER_KEY as keyof T,
  filters = [],
  emptyText = NO_RESULT_TEXT,
  renderItem,
}: AnimatedFilterProps<T>) => {
  const [filter, setFilter] = useState(filters[0]);
  const filteredItems =
    filter === filters[0] ? items : items.filter((item) => item[filterKey] === filter);

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {filters.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer transition ${
              filter === option ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">{emptyText}</p>
      ) : (
        <motion.div
          layout
          className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] min-h-[400px]"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
                transition={{ duration: 0.3 }}
                className="rounded flex flex-col items-center text-center cursor-pointer max-w-[200px] w-full mx-auto"
              >
                {renderItem ? renderItem(item) : <pre>{JSON.stringify(item, null, 2)}</pre>}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedFilter;