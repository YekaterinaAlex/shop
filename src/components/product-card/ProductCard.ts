import type { Product } from '../../types/Product';
import { CartControls } from '../cart-controls/CartControls';
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

  const cartControls = CartControls(product.id, product.name);

  card.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.cart-controls')) {
      return;
    }

    window.location.hash = `#/product/${product.id}`;
  });

  card.append(image, title, type, price, cartControls);

  return card;
}
