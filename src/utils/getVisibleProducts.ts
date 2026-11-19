import type { Product } from '../types/Product';
import { sortProducts } from './sortProducts';
import type { SortOption } from './sortProducts';

export interface ProductFilters {
  categories: string[];
  waxTypes: string[];
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: SortOption;
}

export function getVisibleProducts(products: Product[], filters: ProductFilters): Product[] {
  const filtered = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.candleType);

    const matchesWax = filters.waxTypes.length === 0 || filters.waxTypes.includes(product.waxType);

    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.searchQuery.trim().toLowerCase());

    return matchesCategory && matchesWax && matchesPrice && matchesSearch;
  });

  return sortProducts(filtered, filters.sortBy);
}
