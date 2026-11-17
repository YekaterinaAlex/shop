import { products } from '../../data/products';
import './cart-item.css';

type Product = (typeof products)[number];

export function CartItem(product: Product, quantity: number): HTMLElement {
  const article = document.createElement('article');
  article.className = 'cart-item';
  article.dataset.productId = String(product.id);

  const image = document.createElement('img');
  image.className = 'cart-item__image';
  image.src = product.image;
  image.alt = product.name;

  const info = document.createElement('div');
  info.className = 'cart-item__info';

  const name = document.createElement('h2');
  name.textContent = product.name;

  const description = document.createElement('p');
  description.textContent =
    product.candleType === 'container' ? 'Scented Candle' : 'Decorative Candle';

  const price = document.createElement('p');
  price.className = 'cart-item__price';
  price.textContent = `$${product.price.toFixed(2)} each`;

  const lineTotal = document.createElement('p');
  lineTotal.className = 'cart-item__total';
  lineTotal.textContent = `$${(product.price * quantity).toFixed(2)}`;

  info.append(name, description, price, lineTotal);

  const controls = document.createElement('div');
  controls.className = 'cart-item__controls';

  const quantityControl = document.createElement('div');
  quantityControl.className = 'quantity-control';

  const decreaseButton = document.createElement('button');
  decreaseButton.type = 'button';
  decreaseButton.textContent = '−';
  decreaseButton.setAttribute('aria-label', `Decrease ${product.name} quantity`);
  decreaseButton.dataset.action = 'decrease';
  decreaseButton.disabled = quantity <= 1;

  const quantityValue = document.createElement('span');
  quantityValue.className = 'quantity-control__value';
  quantityValue.textContent = String(quantity);

  const increaseButton = document.createElement('button');
  increaseButton.type = 'button';
  increaseButton.textContent = '+';
  increaseButton.setAttribute('aria-label', `Increase ${product.name} quantity`);
  increaseButton.dataset.action = 'increase';

  quantityControl.append(decreaseButton, quantityValue, increaseButton);

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'cart-item__remove';
  removeButton.setAttribute('aria-label', `Remove ${product.name} from cart`);
  removeButton.dataset.action = 'remove';

  const removeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  removeIcon.setAttribute('viewBox', '0 0 50 50');
  removeIcon.setAttribute('aria-hidden', 'true');

  const removePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  removePath.setAttribute(
    'd',
    'M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z',
  );

  removeIcon.append(removePath);
  removeButton.append(removeIcon);

  controls.append(quantityControl, removeButton);

  article.append(image, info, controls);

  return article;
}
