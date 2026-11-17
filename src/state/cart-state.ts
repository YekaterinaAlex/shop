import { products } from '../data/products';

export type CartEntry = {
  productId: number;
  quantity: number;
};

let cart: CartEntry[] = [];

const PROMO_CODE = 'SALE10';
const DISCOUNT_RATE = 0.1;

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
}

export function increaseQuantity(productId: number): void {
  addToCart(productId);
}

export function decreaseQuantity(productId: number): void {
  const item = cart.find((item) => item.productId === productId);

  if (!item || item.quantity <= 1) return;

  item.quantity -= 1;
}

export function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.productId !== productId);
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
