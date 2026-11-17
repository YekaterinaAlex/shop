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
    { text: 'Cart', href: '#/cart' },
  ];

  links.forEach(({ text, href }) => {
    const link = document.createElement('a');

    link.className = 'header__link';
    link.href = href;
    link.textContent = text;

    nav.append(link);
  });

  container.append(logo, nav);
  header.append(container);

  return header;
}
