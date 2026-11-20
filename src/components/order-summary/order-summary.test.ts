import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OrderSummary } from './order-summary';

vi.mock('../../state/cart-state', () => ({
  getDiscountAmount: vi.fn((code: string) => (code.trim().toUpperCase() === 'SALE10' ? 10 : 0)),
}));

describe('OrderSummary', () => {
  let onApplyPromo: (code: string) => void;
  let section: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();

    onApplyPromo = vi.fn<(code: string) => void>();
    section = OrderSummary(100, '', onApplyPromo);
  });

  const getElement = <T extends HTMLElement>(selector: string): T => {
    const element = section.querySelector<T>(selector);

    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    return element;
  };

  const getPromoInput = (): HTMLInputElement => getElement<HTMLInputElement>('#promo-code');

  const getApplyButton = (): HTMLButtonElement =>
    getElement<HTMLButtonElement>('.order-summary__apply');

  const getPromoMessage = (): HTMLElement =>
    getElement<HTMLElement>('.order-summary__promo-message');

  const getDiscountRow = (): HTMLElement => getElement<HTMLElement>('.order-summary__discount');

  const getTotalValue = (): HTMLElement =>
    getElement<HTMLElement>('.order-summary__row--total strong');

  it('should render the order summary', () => {
    expect(section.tagName).toBe('SECTION');
    expect(section.className).toBe('order-summary');
    expect(section.querySelector('h2')?.textContent).toBe('Order Summary');
  });

  it('should display the subtotal', () => {
    expect(section.textContent).toContain('Subtotal');
    expect(section.querySelector('.order-summary__row strong')?.textContent).toBe('$100.00');
  });

  it('should display the shipping information', () => {
    expect(section.textContent).toContain('Shipping');
    expect(section.textContent).toContain('Calculated at checkout');
  });

  it('should display the total without a discount', () => {
    expect(getTotalValue().textContent).toBe('$100.00');
    expect(getDiscountRow().hidden).toBe(true);
  });

  it('should apply a valid promo code', () => {
    getPromoInput().value = 'SALE10';
    getApplyButton().click();

    expect(onApplyPromo).toHaveBeenCalledWith('SALE10');
    expect(getDiscountRow().hidden).toBe(false);
    expect(getDiscountRow().textContent).toContain('-$10.00');
    expect(getTotalValue().textContent).toBe('$90.00');
    expect(getPromoMessage().textContent).toBe('Promo code applied! You saved 10%.');
    expect(getPromoMessage().className).toContain('order-summary__promo-message--success');
  });

  it('should normalize the promo code before applying it', () => {
    getPromoInput().value = ' sale10 ';
    getApplyButton().click();

    expect(onApplyPromo).toHaveBeenCalledWith('SALE10');
    expect(getTotalValue().textContent).toBe('$90.00');
  });

  it('should reject an invalid promo code', () => {
    getPromoInput().value = 'WRONG';
    getApplyButton().click();

    expect(onApplyPromo).toHaveBeenCalledWith('');
    expect(getDiscountRow().hidden).toBe(true);
    expect(getTotalValue().textContent).toBe('$100.00');
    expect(getPromoMessage().textContent).toBe('Invalid promo code.');
    expect(getPromoMessage().className).toContain('order-summary__promo-message--error');
  });

  it('should show a message when the promo code is empty', () => {
    getApplyButton().click();

    expect(onApplyPromo).toHaveBeenCalledWith('');
    expect(getPromoMessage().textContent).toBe('Please enter a promo code.');
  });

  it('should apply the promo code when Enter is pressed', () => {
    getPromoInput().value = 'SALE10';
    getPromoInput().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(onApplyPromo).toHaveBeenCalledWith('SALE10');
    expect(getTotalValue().textContent).toBe('$90.00');
  });

  it('should clear the applied promo code when the input becomes empty', () => {
    section = OrderSummary(100, 'SALE10', onApplyPromo);

    const input = getPromoInput();
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(onApplyPromo).toHaveBeenCalledWith('');
    expect(getDiscountRow().hidden).toBe(true);
    expect(getTotalValue().textContent).toBe('$100.00');
    expect(getPromoMessage().textContent).toBe('');
  });

  it('should initialize with an already applied promo code', () => {
    section = OrderSummary(100, 'SALE10', onApplyPromo);

    expect(getPromoInput().value).toBe('SALE10');
    expect(getDiscountRow().hidden).toBe(false);
    expect(getDiscountRow().textContent).toContain('-$10.00');
    expect(getTotalValue().textContent).toBe('$90.00');
    expect(getPromoMessage().textContent).toBe('Promo code applied! You saved 10%.');
  });

  it('should keep the checkout button disabled', () => {
    const checkoutButton = getElement<HTMLButtonElement>('.btn-primary');

    expect(checkoutButton.textContent).toBe('Proceed to Checkout');
    expect(checkoutButton.disabled).toBe(true);
  });

  it('should render the continue shopping link', () => {
    const link = getElement<HTMLAnchorElement>('a');

    expect(link.textContent).toBe('← Continue shopping');
    expect(link.getAttribute('href')).toBe('#/catalog');
  });
});
