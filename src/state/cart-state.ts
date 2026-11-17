import { products } from '../data/products';

export type CartEntry = {
  productId: number;
  quantity: number;
};

let cart: CartEntry[] = [];

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

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity === 0) {
    removeFromCart(productId);
  }
}

export function removeFromCart(productId: number): void {
  cart = cart.filter((item) => item.productId !== productId);
}

export function getCartTotal(): number {
  return cart.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId);

    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}
