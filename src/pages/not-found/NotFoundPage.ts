export function NotFoundPage(): HTMLElement {
  const section = document.createElement('section');

  const title = document.createElement('h1');
  title.textContent = '404 — Page Not Found';

  const message = document.createElement('p');
  message.textContent = 'Sorry, this page does not exist.';

  const link = document.createElement('a');
  link.href = '#/';
  link.textContent = 'Back to Home';

  section.append(title, message, link);

  return section;
}
