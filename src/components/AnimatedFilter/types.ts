export type FilterItem = {
  id: string
  name: string
  category: string
  image: string
}

export type BookItem = {
  id: string;
  name: string;
  author: string;
  category: string;
  image: string;
};


export interface AnimatedFilterProps<T extends { id: string | number }> {
  items?: T[];
  filterKey?: keyof T;
  filters?: string[];
  emptyText?: string;
  renderItem?: (item: T) => React.ReactNode;
}