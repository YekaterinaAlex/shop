import { products } from '../data/products';

export type CartEntry = {
  productId: number;
  quantity: number;
};

const CART_STORAGE_KEY = 'candle-shop-cart';

const PROMO_CODE = 'SALE10';
const DISCOUNT_RATE = 0.1;

function loadCart(): CartEntry[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) return [];

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter((item): item is CartEntry => {
      if (typeof item !== 'object' || item === null) return false;

      return (
        Number.isInteger(item.productId) &&
        products.some((product) => product.id === item.productId) &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1
      );
    });
  } catch {
    return [];
  }
}

function saveCart(): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Keep the cart in memory if localStorage is unavailable.
  }

  window.dispatchEvent(new Event('cartchange'));
}

let cart: CartEntry[] = loadCart();

export function getCart(): CartEntry[] {
  return cart;
}

export function addToCart(productId: number): void {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  saveCart();
}

export function increaseQuantity(productId: number): void {
  addToCart(productId);
}

export function decreaseQuantity(productId: number): void {
  const item = cart.find((item) => item.productId === productId);

  if (!item || item.quantity <= 1) return;

  item.quantity -= 1;
  saveCart();
}

export function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.productId !== productId);
  saveCart();
}

export function getCartSubtotal(): number {
  return cart.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId);

    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

export function getDiscountAmount(promoCode: string): number {
  if (promoCode.trim().toUpperCase() !== PROMO_CODE) {
    return 0;
  }

  return getCartSubtotal() * DISCOUNT_RATE;
}

export function getCartTotal(promoCode = ''): number {
  return getCartSubtotal() - getDiscountAmount(promoCode);
}
