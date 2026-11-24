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
});
