import { describe, expect, it } from 'vitest';
import { getVisibleProducts } from './getVisibleProducts';
import type { ProductFilters } from './getVisibleProducts';
import type { Product } from '../types/Product';

const testProducts: Product[] = [
  {
    id: 1,
    name: 'Cloud',
    description: 'Cloud candle',
    candleType: 'sculptural',
    waxType: 'soy',
    price: 12,
    weight: 200,
    image: 'cloud.jpg',
  },
  {
    id: 2,
    name: 'Honeycomb',
    description: 'Honeycomb candle',
    candleType: 'sculptural',
    waxType: 'beeswax',
    price: 16,
    weight: 250,
    image: 'honeycomb.jpg',
  },
  {
    id: 3,
    name: 'Amber Glow',
    description: 'Amber candle',
    candleType: 'container',
    waxType: 'soy',
    price: 22,
    weight: 300,
    image: 'amber.jpg',
  },
];

const defaultFilters: ProductFilters = {
  categories: [],
  waxTypes: [],
  minPrice: 11,
  maxPrice: 26,
  searchQuery: '',
  sortBy: 'featured',
};

describe('getVisibleProducts', () => {
  it('returns all products when no filters are selected', () => {
    const result = getVisibleProducts(testProducts, defaultFilters);

    expect(result.map((product) => product.name)).toEqual(['Cloud', 'Honeycomb', 'Amber Glow']);
  });

  it('filters products by category', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      categories: ['sculptural'],
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud', 'Honeycomb']);
  });

  it('filters products by wax type', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      waxTypes: ['soy'],
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud', 'Amber Glow']);
  });

  it('filters products by price range', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      minPrice: 15,
      maxPrice: 22,
    });

    expect(result.map((product) => product.name)).toEqual(['Honeycomb', 'Amber Glow']);
  });

  it('filters products by search query', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      searchQuery: 'cloud',
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud']);
  });

  it('searches case-insensitively', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      searchQuery: 'AMBER',
    });

    expect(result.map((product) => product.name)).toEqual(['Amber Glow']);
  });

  it('trims whitespace from search query', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      searchQuery: '  cloud  ',
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud']);
  });

  it('combines multiple filters', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      categories: ['sculptural'],
      waxTypes: ['soy'],
      minPrice: 11,
      maxPrice: 15,
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud']);
  });

  it('sorts products by price ascending', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      sortBy: 'price-asc',
    });

    expect(result.map((product) => product.price)).toEqual([12, 16, 22]);
  });

  it('sorts products by price descending', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      sortBy: 'price-desc',
    });

    expect(result.map((product) => product.price)).toEqual([22, 16, 12]);
  });

  it('returns an empty array when no products match', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      searchQuery: 'xyz',
    });

    expect(result).toEqual([]);
  });

  it('returns an empty array for an empty product list', () => {
    const result = getVisibleProducts([], defaultFilters);

    expect(result).toEqual([]);
  });

  it('includes products at the price range boundaries', () => {
    const result = getVisibleProducts(testProducts, {
      ...defaultFilters,
      minPrice: 12,
      maxPrice: 16,
    });

    expect(result.map((product) => product.name)).toEqual(['Cloud', 'Honeycomb']);
  });

  it('does not mutate the original products array', () => {
    const originalOrder = testProducts.map((product) => product.id);

    getVisibleProducts(testProducts, {
      ...defaultFilters,
      sortBy: 'price-desc',
    });

    expect(testProducts.map((product) => product.id)).toEqual(originalOrder);
  });
});
