// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductDetailsPage } from './ProductDetailsPage';
import { addToCart } from '../../state/cart-state';
import { products } from '../../data/products';

vi.mock('../../state/cart-state', () => ({
  addToCart: vi.fn(),
}));

describe('ProductDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the product name', () => {
    const page = ProductDetailsPage(1);

    expect(page.textContent).toContain('Cloud');
  });

  it('renders the product description', () => {
    const page = ProductDetailsPage(1);
    const product = products.find((item) => item.id === 1);

    if (!product) {
      throw new Error('Product not found in test data');
    }

    expect(page.textContent).toContain(product.description);
  });

  it('renders the product price', () => {
    const page = ProductDetailsPage(1);

    expect(page.textContent).toContain('$12');
  });

  it('renders the product image', () => {
    const page = ProductDetailsPage(1);
    const image = page.querySelector('img');

    expect(image).not.toBeNull();
    expect(image?.alt).toBe('Cloud');
    expect(image?.getAttribute('src')).toBeTruthy();
  });

  it('adds the product to cart when button is clicked', () => {
    const page = ProductDetailsPage(1);
    const button = page.querySelector('button');

    expect(button).not.toBeNull();

    button?.click();

    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it('shows an error for an invalid product id', () => {
    const page = ProductDetailsPage(999);

    expect(page.textContent).toContain('Product not found');
  });
});
