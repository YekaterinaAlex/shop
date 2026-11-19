import type { Product } from '../../types/Product';
import { addToCart, decreaseQuantity, getCart, increaseQuantity } from '../../state/cart-state';
import './product-card.css';

export function ProductCard(product: Product): HTMLElement {
  const card = document.createElement('article');
  card.className = 'product-card';

  const image = document.createElement('img');
  image.className = 'product-card-image';
  image.src = product.image;
  image.alt = product.name;

  const title = document.createElement('p');
  title.className = 'product-card-title';
  title.textContent = product.name;

  const type = document.createElement('p');
  type.className = 'product-card-type';
  type.textContent =
    product.candleType === 'sculptural' ? 'Sculptural Candles' : 'Container Candles';

  const price = document.createElement('p');
  price.className = 'product-card-price';
  price.textContent = `$${product.price}`;

  const button = document.createElement('button');
  button.className = 'product-card-button';
  button.type = 'button';

  const quantityControl = document.createElement('div');
  quantityControl.className = 'quantity-control';
  quantityControl.hidden = true;
  quantityControl.setAttribute('aria-label', `${product.name} quantity`);

  const decreaseButton = document.createElement('button');
  decreaseButton.type = 'button';
  decreaseButton.textContent = '−';
  decreaseButton.setAttribute('aria-label', `Decrease ${product.name} quantity`);

  const quantityValue = document.createElement('span');

  const increaseButton = document.createElement('button');
  increaseButton.type = 'button';
  increaseButton.textContent = '+';
  increaseButton.setAttribute('aria-label', `Increase ${product.name} quantity`);

  quantityControl.append(decreaseButton, quantityValue, increaseButton);

  function updateButton(): void {
    const cartItem = getCart().find((item) => item.productId === product.id);

    if (!cartItem) {
      button.textContent = 'Add to Cart';
      button.hidden = false;
      quantityControl.hidden = true;
      return;
    }

    quantityValue.textContent = String(cartItem.quantity);
    button.hidden = true;
    quantityControl.hidden = false;
  }

  button.addEventListener('click', () => {
    addToCart(product.id);
    updateButton();
  });

  decreaseButton.addEventListener('click', () => {
    decreaseQuantity(product.id);
    updateButton();
  });

  increaseButton.addEventListener('click', () => {
    increaseQuantity(product.id);
    updateButton();
  });

  updateButton();
  window.addEventListener('cartchange', updateButton);

  card.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.closest('button')) {
      return;
    }

    window.location.hash = `#/product/${product.id}`;
  });

  card.append(image, title, type, price, button, quantityControl);

  return card;
}
