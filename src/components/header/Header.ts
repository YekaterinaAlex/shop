import { getCart } from '../../state/cart-state';
import './header.css';

export function Header(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  const container = document.createElement('div');
  container.className = 'header__container';

  const logo = document.createElement('a');
  logo.className = 'header__logo';
  logo.href = '#/';
  logo.textContent = 'Candle & Co.';

  const nav = document.createElement('nav');
  nav.className = 'header__nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const links = [
    { text: 'About Us', href: '#/' },
    { text: 'Shop', href: '#/catalog' },
  ];

  links.forEach(({ text, href }) => {
    const link = document.createElement('a');

    link.className = 'header__link';
    link.href = href;
    link.textContent = text;

    nav.append(link);
  });

  const cartLink = document.createElement('a');
  cartLink.className = 'header__link header__cart';
  cartLink.href = '#/cart';
  cartLink.textContent = 'Cart';

  const cartBadge = document.createElement('span');
  cartBadge.className = 'header__cart-badge';

  cartLink.append(cartBadge);
  nav.append(cartLink);

  function updateCartBadge(): void {
    const totalItems = getCart().reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = String(totalItems);
    cartLink.setAttribute('aria-label', `Cart, ${totalItems} items`);
  }

  updateCartBadge();

  window.addEventListener('cartchange', updateCartBadge);

  container.append(logo, nav);
  header.append(container);

  return header;
}
