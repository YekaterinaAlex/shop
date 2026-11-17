export function CartPage(): HTMLElement {
  const section = document.createElement('section');

  const title = document.createElement('h1');
  title.textContent = 'Shopping Cart';

  section.append(title);

  return section;
}
