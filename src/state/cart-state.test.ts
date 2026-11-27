import { beforeEach, describe, expect, it, vi } from 'vitest';
import { products } from '../data/products';

const CART_STORAGE_KEY = 'candle-shop-cart';

describe('cart-state', () => {
  let cartState: typeof import('./cart-state');

  let getItemMock: ReturnType<typeof vi.fn>;
  let setItemMock: ReturnType<typeof vi.fn>;
  let dispatchEventMock: ReturnType<typeof vi.fn>;

  const firstProduct = products[0];
  const secondProduct = products[1];

  beforeEach(async () => {
    vi.resetModules();

    getItemMock = vi.fn((): string | null => null);
    setItemMock = vi.fn();
    dispatchEventMock = vi.fn();

    vi.stubGlobal('localStorage', {
      getItem: getItemMock,
      setItem: setItemMock,
    });

    vi.stubGlobal('window', {
      dispatchEvent: dispatchEventMock,
    });

    cartState = await import('./cart-state');
  });

  describe('getCart', () => {
    it('should return an empty cart initially', () => {
      expect(cartState.getCart()).toEqual([]);
    });

    it('should load cart data from localStorage', async () => {
      getItemMock.mockReturnValue(JSON.stringify([{ productId: firstProduct.id, quantity: 2 }]));

      vi.resetModules();
      cartState = await import('./cart-state');

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 2 }]);
    });

    it('should return an empty cart when localStorage contains invalid JSON', async () => {
      getItemMock.mockReturnValue('invalid JSON');

      vi.resetModules();
      cartState = await import('./cart-state');

      expect(cartState.getCart()).toEqual([]);
    });

    it('should ignore invalid cart entries from localStorage', async () => {
      getItemMock.mockReturnValue(
        JSON.stringify([
          { productId: firstProduct.id, quantity: 2 },
          { productId: 999, quantity: 1 },
          { productId: secondProduct.id, quantity: 0 },
          { productId: firstProduct.id, quantity: 1.5 },
          null,
          { productId: firstProduct.id },
        ]),
      );

      vi.resetModules();
      cartState = await import('./cart-state');

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 2 }]);
    });

    it('should return an empty cart when localStorage contains a non-array value', async () => {
      getItemMock.mockReturnValue(JSON.stringify({ productId: firstProduct.id }));

      vi.resetModules();
      cartState = await import('./cart-state');

      expect(cartState.getCart()).toEqual([]);
    });
  });

  describe('addToCart', () => {
    it('should add a new product to the cart', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 1 }]);
    });

    it('should increase quantity when the product already exists', () => {
      cartState.addToCart(firstProduct.id);
      cartState.addToCart(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 2 }]);
    });

    it('should add different products separately', () => {
      cartState.addToCart(firstProduct.id);
      cartState.addToCart(secondProduct.id);

      expect(cartState.getCart()).toEqual([
        { productId: firstProduct.id, quantity: 1 },
        { productId: secondProduct.id, quantity: 1 },
      ]);
    });
  });

  describe('increaseQuantity', () => {
    it('should increase the quantity of an existing product', () => {
      cartState.addToCart(firstProduct.id);

      cartState.increaseQuantity(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 2 }]);
    });

    it('should add a product if it is not in the cart', () => {
      cartState.increaseQuantity(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 1 }]);
    });
  });

  describe('decreaseQuantity', () => {
    it('should decrease the quantity of a product', () => {
      cartState.addToCart(firstProduct.id);
      cartState.increaseQuantity(firstProduct.id);

      cartState.decreaseQuantity(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 1 }]);
    });

    it('should not decrease quantity below 1', () => {
      cartState.addToCart(firstProduct.id);

      cartState.decreaseQuantity(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 1 }]);
    });

    it('should do nothing if the product is not in the cart', () => {
      cartState.decreaseQuantity(firstProduct.id);

      expect(cartState.getCart()).toEqual([]);
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from the cart', () => {
      cartState.addToCart(firstProduct.id);
      cartState.addToCart(secondProduct.id);

      cartState.removeFromCart(firstProduct.id);

      expect(cartState.getCart()).toEqual([{ productId: secondProduct.id, quantity: 1 }]);
    });

    it('should leave the cart empty when removing the last product', () => {
      cartState.addToCart(firstProduct.id);

      cartState.removeFromCart(firstProduct.id);

      expect(cartState.getCart()).toEqual([]);
    });
  });

  describe('getCartSubtotal', () => {
    it('should return 0 for an empty cart', () => {
      expect(cartState.getCartSubtotal()).toBe(0);
    });

    it('should calculate the subtotal for one product', () => {
      cartState.addToCart(firstProduct.id);
      cartState.increaseQuantity(firstProduct.id);

      expect(cartState.getCartSubtotal()).toBe(firstProduct.price * 2);
    });

    it('should calculate the subtotal for different products', () => {
      cartState.addToCart(firstProduct.id);
      cartState.addToCart(secondProduct.id);

      expect(cartState.getCartSubtotal()).toBe(firstProduct.price + secondProduct.price);
    });
  });

  describe('getDiscountAmount', () => {
    it('should return 10% discount for the SALE10 promo code', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getDiscountAmount('SALE10')).toBe(firstProduct.price * 0.1);
    });

    it('should accept the promo code regardless of letter case', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getDiscountAmount('sale10')).toBe(firstProduct.price * 0.1);
    });

    it('should ignore whitespace around the promo code', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getDiscountAmount(' SALE10 ')).toBe(firstProduct.price * 0.1);
    });

    it('should return 0 in the case of invalid promo code', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getDiscountAmount('INVALID')).toBe(0);
    });

    it('should return 0 in the case of empty cart', () => {
      expect(cartState.getDiscountAmount('SALE10')).toBe(0);
    });
  });

  describe('getCartTotal', () => {
    it('should return the subtotal without a promo code', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getCartTotal()).toBe(firstProduct.price);
    });

    it('should apply a 10% discount with SALE10', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getCartTotal('SALE10')).toBe(firstProduct.price * 0.9);
    });

    it('should not apply a discount for an invalid promo code', () => {
      cartState.addToCart(firstProduct.id);

      expect(cartState.getCartTotal('INVALID')).toBe(firstProduct.price);
    });
  });

  describe('getActivePromoCode and setActivePromoCode', () => {
    it('should return an empty promo code initially', () => {
      expect(cartState.getActivePromoCode()).toBe('');
    });

    it('should save and return the active promo code', () => {
      cartState.setActivePromoCode('SALE10');

      expect(cartState.getActivePromoCode()).toBe('SALE10');
    });

    it('should allow clearing the active promo code', () => {
      cartState.setActivePromoCode('SALE10');
      cartState.setActivePromoCode('');

      expect(cartState.getActivePromoCode()).toBe('');
    });
  });

  describe('localStorage and cartchange event', () => {
    it('should save cart data to localStorage after adding a product', () => {
      cartState.addToCart(firstProduct.id);

      expect(setItemMock).toHaveBeenCalledWith(
        CART_STORAGE_KEY,
        JSON.stringify([{ productId: firstProduct.id, quantity: 1 }]),
      );
    });

    it('should dispatch cartchange event after saving the cart', () => {
      cartState.addToCart(firstProduct.id);

      expect(dispatchEventMock).toHaveBeenCalledTimes(1);
      expect(dispatchEventMock).toHaveBeenCalledWith(expect.any(Event));
    });

    it('should not save the cart when decreasing quantity below 1', () => {
      cartState.addToCart(firstProduct.id);

      setItemMock.mockClear();
      dispatchEventMock.mockClear();

      cartState.decreaseQuantity(firstProduct.id);

      expect(setItemMock).not.toHaveBeenCalled();
      expect(dispatchEventMock).not.toHaveBeenCalled();
    });

    it('should keep the cart in memory when localStorage is unavailable', () => {
      setItemMock.mockImplementation(() => {
        throw new Error('Storage unavailable');
      });

      expect(() => cartState.addToCart(firstProduct.id)).not.toThrow();

      expect(cartState.getCart()).toEqual([{ productId: firstProduct.id, quantity: 1 }]);
    });
  });
});
