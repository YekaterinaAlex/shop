import { describe, expect, it } from 'vitest';
import { sortProducts } from './sortProducts';
import type { Product } from '../types/Product';

const testProducts = [
  { id: 1, name: 'Cloud', price: 12 },
  { id: 2, name: 'Twist', price: 14 },
  { id: 3, name: 'Bubble', price: 11 },
] as Product[];

describe('sortProducts', () => {
  it('keeps original order for featured', () => {
    const result = sortProducts(testProducts, 'featured');

    expect(result.map((product) => product.name)).toEqual(['Cloud', 'Twist', 'Bubble']);
  });

  it('sorts prices from low to high', () => {
    const result = sortProducts(testProducts, 'price-asc');

    expect(result.map((product) => product.price)).toEqual([11, 12, 14]);
  });

  it('sorts prices from high to low', () => {
    const result = sortProducts(testProducts, 'price-desc');

    expect(result.map((product) => product.price)).toEqual([14, 12, 11]);
  });

  it('does not change the original products array', () => {
    sortProducts(testProducts, 'price-asc');

    expect(testProducts.map((product) => product.price)).toEqual([12, 14, 11]);
  });
});
