import './not-found.css';

export function NotFoundPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'not-found';

  const content = document.createElement('div');
  content.className = 'not-found-content';

  const errorCode = document.createElement('span');
  errorCode.className = 'not-found-code';
  errorCode.textContent = '404';

  const title = document.createElement('h1');
  title.className = 'not-found-title';
  title.textContent = 'Oops! Page Not Found';

  const message = document.createElement('p');
  message.className = 'not-found-message';
  message.textContent =
    "Looks like this page has melted away. Let's get you back to something lovely.";

  const link = document.createElement('a');
  link.className = 'not-found-button';
  link.href = '#/catalog';
  link.textContent = 'Back to Shop';

  content.append(errorCode, title, message, link);
  section.append(content);

  return section;
}
