import { describe, expect, it } from 'vitest';
import { products } from '../../data/products';
import { CartItem } from './cart-item';

describe('CartItem', () => {
  const product = products[0];

  const getElement = <T extends HTMLElement>(container: HTMLElement, selector: string): T => {
    const element = container.querySelector<T>(selector);

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    return element;
  };

  it('should render the cart item with the correct product ID', () => {
    const cartItem = CartItem(product, 2);

    expect(cartItem.tagName).toBe('ARTICLE');
    expect(cartItem.className).toBe('cart-item');
    expect(cartItem.dataset.productId).toBe(String(product.id));
  });

  it('should display the product image and name', () => {
    const cartItem = CartItem(product, 2);

    const image = getElement<HTMLImageElement>(cartItem, '.cart-item__image');
    const name = getElement<HTMLHeadingElement>(cartItem, 'h2');

    expect(image.getAttribute('src')).toBe(product.image);
    expect(image.alt).toBe(product.name);
    expect(name.textContent).toBe(product.name);
  });

  it('should display the correct candle description', () => {
    const cartItem = CartItem(product, 1);

    const description = getElement<HTMLParagraphElement>(cartItem, '.cart-item__info p');

    const expectedDescription =
      product.candleType === 'container' ? 'Scented Candle' : 'Decorative Candle';

    expect(description.textContent).toBe(expectedDescription);
  });

  it('should display the unit price and line total', () => {
    const quantity = 3;
    const cartItem = CartItem(product, quantity);

    const price = getElement<HTMLElement>(cartItem, '.cart-item__price');
    const lineTotal = getElement<HTMLElement>(cartItem, '.cart-item__total');

    expect(price.textContent).toBe(`$${product.price.toFixed(2)} each`);
    expect(lineTotal.textContent).toBe(`$${(product.price * quantity).toFixed(2)}`);
  });

  it('should display the correct quantity', () => {
    const cartItem = CartItem(product, 3);

    const quantityValue = getElement<HTMLElement>(cartItem, '.quantity-control__value');

    expect(quantityValue.textContent).toBe('3');
  });

  it('should disable the decrease button when quantity is 1', () => {
    const cartItem = CartItem(product, 1);

    const decreaseButton = getElement<HTMLButtonElement>(cartItem, '[data-action="decrease"]');

    expect(decreaseButton.disabled).toBe(true);
    expect(decreaseButton.getAttribute('aria-label')).toBe(`Decrease ${product.name} quantity`);
  });

  it('should enable the decrease button when quantity is greater than 1', () => {
    const cartItem = CartItem(product, 2);

    const decreaseButton = getElement<HTMLButtonElement>(cartItem, '[data-action="decrease"]');

    expect(decreaseButton.disabled).toBe(false);
  });

  it('should render the increase button with the correct action', () => {
    const cartItem = CartItem(product, 1);

    const increaseButton = getElement<HTMLButtonElement>(cartItem, '[data-action="increase"]');

    expect(increaseButton.textContent).toBe('+');
    expect(increaseButton.type).toBe('button');
    expect(increaseButton.getAttribute('aria-label')).toBe(`Increase ${product.name} quantity`);
  });

  it('should render all quantity controls', () => {
    const cartItem = CartItem(product, 2);

    expect(cartItem.querySelector('[data-action="decrease"]')).not.toBeNull();
    expect(cartItem.querySelector('[data-action="increase"]')).not.toBeNull();
    expect(cartItem.querySelector('[data-action="remove"]')).not.toBeNull();
  });
});
