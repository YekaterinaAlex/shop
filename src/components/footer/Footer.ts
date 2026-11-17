import './footer.css';

export function Footer(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const container = document.createElement('div');
  container.className = 'footer-container';

  const brand = document.createElement('div');
  brand.className = 'footer-brand';

  const logo = document.createElement('a');
  logo.className = 'footer-logo';
  logo.href = '#/';
  logo.textContent = 'Candle & Co.';

  const description = document.createElement('p');
  description.className = 'footer-description';
  description.textContent = 'Handcrafted candles for cozy moments.';

  brand.append(logo, description);

  const nav = document.createElement('nav');
  nav.className = 'footer-nav';
  nav.setAttribute('aria-label', 'Footer navigation');

  const links = [
    { text: 'About Us', href: '#/' },
    { text: 'Shop', href: '#/catalog' },
    { text: 'Cart', href: '#/cart' },
  ];

  links.forEach(({ text, href }) => {
    const link = document.createElement('a');
    link.className = 'footer-link';
    link.href = href;
    link.textContent = text;

    nav.append(link);
  });

  container.append(brand, nav);
  footer.append(container);
  return footer;
}
