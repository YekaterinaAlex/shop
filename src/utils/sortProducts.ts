import type { Product } from '../types/Product';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  }
  if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
}
