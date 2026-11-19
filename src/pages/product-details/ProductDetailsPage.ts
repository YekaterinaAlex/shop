import { products } from '../../data/products';
import { addToCart } from '../../state/cart-state';

import './product-details.css';

export function ProductDetailsPage(id: number): HTMLElement {
  const section = document.createElement('section');
  section.className = 'product-details';

  const product = products.find((item) => item.id === id);

  if (!product) {
    const message = document.createElement('p');
    message.textContent = 'Product not found';
    section.append(message);
    return section;
  }

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;

  const title = document.createElement('h1');
  title.textContent = product.name;

  const description = document.createElement('p');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.textContent = `$${product.price}`;

  const wax = document.createElement('p');
  wax.textContent = `Wax: ${product.waxType}`;

  const weight = document.createElement('p');
  weight.textContent = `Weight: ${product.weight} g`;

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';

  button.addEventListener('click', () => {
    addToCart(product.id);
  });

  const info = document.createElement('div');
  info.className = 'product-details-info';

  info.append(title, price, description, wax, weight, button);

  section.append(image, info);

  return section;
}
