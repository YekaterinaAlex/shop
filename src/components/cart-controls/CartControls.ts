import { addToCart, decreaseQuantity, getCart, increaseQuantity } from '../../state/cart-state';
import './cart-controls.css';

export function CartControls(productId: number, productName: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'cart-controls';

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.className = 'product-card-button';
  addButton.textContent = 'Add to Cart';

  const quantityControl = document.createElement('div');
  quantityControl.className = 'quantity-control';
  quantityControl.setAttribute('aria-label', `${productName} quantity`);

  const decreaseButton = document.createElement('button');
  decreaseButton.type = 'button';
  decreaseButton.textContent = '−';
  decreaseButton.setAttribute('aria-label', `Decrease ${productName} quantity`);

  const quantityValue = document.createElement('span');

  const increaseButton = document.createElement('button');
  increaseButton.type = 'button';
  increaseButton.textContent = '+';
  increaseButton.setAttribute('aria-label', `Increase ${productName} quantity`);

  quantityControl.append(decreaseButton, quantityValue, increaseButton);

  function updateControls(): void {
    const cartItem = getCart().find((item) => item.productId === productId);

    if (!cartItem) {
      addButton.hidden = false;
      quantityControl.hidden = true;
      return;
    }

    quantityValue.textContent = String(cartItem.quantity);
    addButton.hidden = true;
    quantityControl.hidden = false;
  }

  addButton.addEventListener('click', () => {
    addToCart(productId);
    updateControls();
  });

  decreaseButton.addEventListener('click', () => {
    decreaseQuantity(productId);
    updateControls();
  });

  increaseButton.addEventListener('click', () => {
    increaseQuantity(productId);
    updateControls();
  });

  container.append(addButton, quantityControl);

  updateControls();

  window.addEventListener('cartchange', updateControls);

  return container;
}
