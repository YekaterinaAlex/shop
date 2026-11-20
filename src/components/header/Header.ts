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

  const menuButton = document.createElement('button');
  menuButton.className = 'header__menu-button';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'header-navigation');

  for (let i = 0; i < 3; i += 1) {
    const line = document.createElement('span');
    line.className = 'header__menu-line';
    menuButton.append(line);
  }

  const nav = document.createElement('nav');
  nav.className = 'header__nav';
  nav.id = 'header-navigation';
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

  function closeMenu(): void {
    nav.classList.remove('header__nav--open');
    menuButton.classList.remove('header__menu-button--open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('header__nav--open');

    menuButton.classList.toggle('header__menu-button--open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu',
    );
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  updateCartBadge();

  window.addEventListener('cartchange', updateCartBadge);

  container.append(logo, menuButton, nav);
  header.append(container);

  return header;
}
