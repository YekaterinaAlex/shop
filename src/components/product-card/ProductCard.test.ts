// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import { addToCart, getCart } from '../../state/cart-state';
import type { Product } from '../../types/Product';

vi.mock('../../state/cart-state', () => ({
  addToCart: vi.fn(),
  decreaseQuantity: vi.fn(),
  increaseQuantity: vi.fn(),
  getCart: vi.fn(() => []),
}));

const product: Product = {
  id: 1,
  name: 'Cloud',
  description: 'A beautiful sculptural candle',
  candleType: 'sculptural',
  waxType: 'soy',
  price: 12,
  weight: 180,
  image: '/cloud.png',
};

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCart).mockReturnValue([]);
    window.location.hash = '#/catalog';
  });

  it('displays product information', () => {
    const card = ProductCard(product);

    expect(card.querySelector('.product-card-title')?.textContent).toBe('Cloud');
    expect(card.querySelector('.product-card-type')?.textContent).toBe('Sculptural Candles');
    expect(card.querySelector('.product-card-price')?.textContent).toBe('$12');
  });

  it('displays the product image', () => {
    const card = ProductCard(product);
    const image = card.querySelector('img');

    expect(image?.getAttribute('src')).toBe('/cloud.png');
    expect(image?.alt).toBe('Cloud');
  });

  it('adds product to cart when button is clicked', () => {
    const card = ProductCard(product);
    const button = card.querySelector<HTMLButtonElement>('.product-card-button');

    button?.click();

    expect(addToCart).toHaveBeenCalledWith(1);
  });

  it('opens product details when card is clicked', () => {
    const card = ProductCard(product);

    card.click();

    expect(window.location.hash).toBe('#/product/1');
  });

  it('does not open product details when Add to Cart is clicked', () => {
    const card = ProductCard(product);
    document.body.append(card);

    const button = card.querySelector<HTMLButtonElement>('.product-card-button');
    button?.click();

    expect(window.location.hash).toBe('#/catalog');

    card.remove();
  });
});
