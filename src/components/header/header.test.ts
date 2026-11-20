import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

const { getCartMock } = vi.hoisted(() => ({
  getCartMock: vi.fn(),
}));

vi.mock('../../state/cart-state', () => ({
  getCart: getCartMock,
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCartMock.mockReturnValue([]);
  });

  it('should render the header element', () => {
    const header = Header();

    expect(header.tagName).toBe('HEADER');
    expect(header.className).toBe('header');
  });

  it('should render the logo with the correct text and link', () => {
    const header = Header();
    const logo = header.querySelector<HTMLAnchorElement>('.header__logo');

    expect(logo).not.toBeNull();
    expect(logo?.textContent).toBe('Candle & Co.');
    expect(logo?.getAttribute('href')).toBe('#/');
  });

  it('should render the navigation with the correct accessible label', () => {
    const header = Header();
    const nav = header.querySelector('nav');

    expect(nav).not.toBeNull();
    expect(nav?.className).toBe('header__nav');
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should render About Us and Shop navigation links', () => {
    const header = Header();
    const links = header.querySelectorAll<HTMLAnchorElement>(
      '.header__nav > .header__link:not(.header__cart)',
    );

    expect(links).toHaveLength(2);

    expect(links[0].textContent).toBe('About Us');
    expect(links[0].getAttribute('href')).toBe('#/');

    expect(links[1].textContent).toBe('Shop');
    expect(links[1].getAttribute('href')).toBe('#/catalog');
  });

  it('should render the cart link', () => {
    const header = Header();
    const cartLink = header.querySelector<HTMLAnchorElement>('.header__cart');

    expect(cartLink).not.toBeNull();
    expect(cartLink?.textContent).toContain('Cart');
    expect(cartLink?.getAttribute('href')).toBe('#/cart');
  });

  it('should render the cart badge', () => {
    const header = Header();
    const badge = header.querySelector('.header__cart-badge');

    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe('0');
  });

  it('should display zero items when the cart is empty', () => {
    getCartMock.mockReturnValue([]);

    const header = Header();
    const badge = header.querySelector('.header__cart-badge');

    expect(badge?.textContent).toBe('0');
  });

  it('should display the total quantity of items in the cart', () => {
    getCartMock.mockReturnValue([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]);

    const header = Header();
    const badge = header.querySelector('.header__cart-badge');

    expect(badge?.textContent).toBe('5');
  });

  it('should set the cart link accessible label with the total quantity', () => {
    getCartMock.mockReturnValue([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ]);

    const header = Header();
    const cartLink = header.querySelector('.header__cart');

    expect(cartLink?.getAttribute('aria-label')).toBe('Cart, 5 items');
  });

  it('should update the cart badge when cartchange event is dispatched', () => {
    getCartMock.mockReturnValue([{ productId: 1, quantity: 1 }]);

    const header = Header();
    const badge = header.querySelector('.header__cart-badge');

    expect(badge?.textContent).toBe('1');

    getCartMock.mockReturnValue([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ]);

    window.dispatchEvent(new Event('cartchange'));

    expect(badge?.textContent).toBe('3');
  });

  it('should update the cart link accessible label after cartchange event', () => {
    getCartMock.mockReturnValue([{ productId: 1, quantity: 1 }]);

    const header = Header();

    getCartMock.mockReturnValue([{ productId: 1, quantity: 4 }]);

    window.dispatchEvent(new Event('cartchange'));

    const cartLink = header.querySelector('.header__cart');

    expect(cartLink?.getAttribute('aria-label')).toBe('Cart, 4 items');
  });
});
