// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders filter sections', () => {
    const sidebar = Sidebar(onChange);

    const headings = Array.from(sidebar.querySelectorAll('h2')).map(
      (heading) => heading.textContent,
    );

    expect(headings).toEqual(['Categories', 'Wax Type', 'Sort By', 'Price Range']);
  });

  it('renders category and wax type checkboxes', () => {
    const sidebar = Sidebar(onChange);

    const checkboxes = sidebar.querySelectorAll('input[type="checkbox"]');

    expect(checkboxes).toHaveLength(4);
  });

  it('selects a category', () => {
    const sidebar = Sidebar(onChange);

    const checkbox = sidebar.querySelector<HTMLInputElement>(
      'input[type="checkbox"][value="sculptural"]',
    );

    if (!checkbox) {
      throw new Error('Category checkbox not found');
    }

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith(['sculptural'], [], 'featured', 11, 26);
  });

  it('removes a selected category', () => {
    const sidebar = Sidebar(onChange);

    const checkbox = sidebar.querySelector<HTMLInputElement>(
      'input[type="checkbox"][value="sculptural"]',
    );

    if (!checkbox) {
      throw new Error('Category checkbox not found');
    }

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onChange).toHaveBeenLastCalledWith([], [], 'featured', 11, 26);
  });

  it('selects a wax type', () => {
    const sidebar = Sidebar(onChange);

    const checkbox = sidebar.querySelector<HTMLInputElement>('input[type="checkbox"][value="soy"]');

    if (!checkbox) {
      throw new Error('Wax type checkbox not found');
    }

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith([], ['soy'], 'featured', 11, 26);
  });

  it('changes sorting option', () => {
    const sidebar = Sidebar(onChange);

    const radio = sidebar.querySelector<HTMLInputElement>('input[type="radio"][value="price-asc"]');

    if (!radio) {
      throw new Error('Sort radio button not found');
    }

    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith([], [], 'price-asc', 11, 26);
  });
  it('updates minimum price', () => {
    const sidebar = Sidebar(onChange);

    const minSlider = sidebar.querySelector<HTMLInputElement>('input[aria-label="Minimum price"]');

    if (!minSlider) {
      throw new Error('Minimum price slider not found');
    }

    minSlider.value = '15';
    minSlider.dispatchEvent(new Event('input', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith([], [], 'featured', 15, 26);

    expect(sidebar.querySelector('.selected-price')?.textContent).toBe('$15 – $26');
  });

  it('updates maximum price', () => {
    const sidebar = Sidebar(onChange);

    const maxSlider = sidebar.querySelector<HTMLInputElement>('input[aria-label="Maximum price"]');

    if (!maxSlider) {
      throw new Error('Maximum price slider not found');
    }

    maxSlider.value = '20';
    maxSlider.dispatchEvent(new Event('input', { bubbles: true }));

    expect(onChange).toHaveBeenCalledWith([], [], 'featured', 11, 20);

    expect(sidebar.querySelector('.selected-price')?.textContent).toBe('$11 – $20');
  });

  it('prevents minimum price from exceeding maximum price', () => {
    const sidebar = Sidebar(onChange);

    const minSlider = sidebar.querySelector<HTMLInputElement>('input[aria-label="Minimum price"]');

    const maxSlider = sidebar.querySelector<HTMLInputElement>('input[aria-label="Maximum price"]');

    if (!minSlider || !maxSlider) {
      throw new Error('Price sliders not found');
    }

    maxSlider.value = '18';
    maxSlider.dispatchEvent(new Event('input', { bubbles: true }));

    minSlider.value = '22';
    minSlider.dispatchEvent(new Event('input', { bubbles: true }));

    expect(minSlider.value).toBe('18');

    expect(onChange).toHaveBeenLastCalledWith([], [], 'featured', 18, 18);
  });
});
