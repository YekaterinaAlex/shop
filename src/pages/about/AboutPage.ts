export function AboutPage(): HTMLElement {
  const section = document.createElement('section');

  const title = document.createElement('h1');
  title.textContent = 'About Us';

  section.append(title);

  return section;
}
