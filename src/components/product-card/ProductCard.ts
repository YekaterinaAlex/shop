import type { Product } from '../../types/Product';
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
  button.textContent = 'Add to Cart';

  card.append(image, title, type, price, button);

  return card;
}
