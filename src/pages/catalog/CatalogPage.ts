export function CatalogPage(): HTMLElement {
  const section = document.createElement('section');

  const title = document.createElement('h1');
  title.textContent = 'Shop Candles';

  section.append(title);

  return section;
}
