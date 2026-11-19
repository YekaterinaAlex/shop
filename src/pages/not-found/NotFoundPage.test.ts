// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the 404 error code', () => {
    const page = NotFoundPage();

    const errorCode = page.querySelector('.not-found-code');

    expect(errorCode?.textContent).toBe('404');
  });

  it('renders the page title', () => {
    const page = NotFoundPage();

    const title = page.querySelector('h1');

    expect(title?.textContent).toBe('Oops! Page Not Found');
  });

  it('renders the error message', () => {
    const page = NotFoundPage();

    const message = page.querySelector('.not-found-message');

    expect(message?.textContent).toBe(
      "Looks like this page has melted away. Let's get you back to something lovely.",
    );
  });

  it('renders a link to the catalog', () => {
    const page = NotFoundPage();

    const link = page.querySelector<HTMLAnchorElement>('.not-found-button');

    expect(link).not.toBeNull();
    expect(link?.textContent).toBe('Back to Shop');
    expect(link?.getAttribute('href')).toBe('#/catalog');
  });

  it('uses the correct CSS class', () => {
    const page = NotFoundPage();

    expect(page.classList.contains('not-found')).toBe(true);
  });

  it('renders only one main heading', () => {
    const page = NotFoundPage();

    expect(page.querySelectorAll('h1')).toHaveLength(1);
  });
});
