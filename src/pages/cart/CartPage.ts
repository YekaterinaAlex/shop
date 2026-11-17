import { products } from '../../data/products';
import {
  getCart,
  getCartSubtotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../state/cart-state';
import { CartItem } from '../../components/cart-item/cart-item';
import { OrderSummary } from '../../components/order-summary/order-summary';
import './cart.css';

export function CartPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'cart';

  let activePromoCode = '';

  function render(): void {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const title = document.createElement('h1');
    title.textContent = `Your items (${totalItems})`;

    if (cart.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'cart__empty';

      const message = document.createElement('p');
      message.textContent = 'Your cart is empty.';

      const link = document.createElement('a');
      link.href = '#/catalog';
      link.textContent = '← Continue shopping';

      emptyState.append(message, link);
      section.replaceChildren(title, emptyState);

      return;
    }

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'cart__items';

    cart.forEach((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) return;

      itemsContainer.append(CartItem(product, item.quantity));
    });

    const summary = OrderSummary(getCartSubtotal(), activePromoCode, (code) => {
      activePromoCode = code;
    });

    section.replaceChildren(title, itemsContainer, summary);
  }

  section.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest<HTMLButtonElement>('button[data-action]');

    if (!button) return;

    const action = button.dataset.action;

    const article = button.closest<HTMLElement>('[data-product-id]');

    if (!article) return;

    const productId = Number(article.dataset.productId);

    if (action === 'increase') {
      increaseQuantity(productId);
    }

    if (action === 'decrease') {
      decreaseQuantity(productId);
    }

    if (action === 'remove') {
      removeFromCart(productId);
    }

    render();
  });

  render();

  return section;
}
