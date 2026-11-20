// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductDetailsPage } from './ProductDetailsPage';
import { products } from '../../data/products';
import { addToCart, getCart } from '../../state/cart-state';

vi.mock('../../state/cart-state', () => ({
  addToCart: vi.fn(),
  increaseQuantity: vi.fn(),
  decreaseQuantity: vi.fn(),
  getCart: vi.fn(() => []),
}));

describe('ProductDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCart).mockReturnValue([]);
  });

  it('renders the product name', () => {
    const page = ProductDetailsPage(1);

    expect(page.querySelector('h1')?.textContent).toBe('Cloud');
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

    expect(page.querySelector('.product-details-price')?.textContent).toBe('$12');
  });

  it('renders the product image', () => {
    const page = ProductDetailsPage(1);
    const image = page.querySelector('img');

    expect(image?.alt).toBe('Cloud');
    expect(image?.getAttribute('src')).toBeTruthy();
  });

  it('renders the Add to Cart button', () => {
    const page = ProductDetailsPage(1);

    const button = page.querySelector('.cart-controls .product-card-button');

    expect(button?.textContent).toBe('Add to Cart');
  });

  it('adds the product to cart when clicked', () => {
    const page = ProductDetailsPage(1);

    const button = page.querySelector<HTMLButtonElement>('.cart-controls .product-card-button');

    if (!button) {
      throw new Error('Add to Cart button not found');
    }

    button.click();

    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it('renders a back to catalog link', () => {
    const page = ProductDetailsPage(1);

    const link = page.querySelector<HTMLAnchorElement>('.product-details-back');

    expect(link?.textContent).toBe('← Back to Catalog');
    expect(link?.getAttribute('href')).toBe('#/catalog');
  });

  it('shows a message for an invalid product id', () => {
    const page = ProductDetailsPage(999);

    expect(page.textContent).toContain('Product not found');
  });
});
