import { getDiscountAmount } from '../../state/cart-state';
import './order-summary.css';

const PROMO_CODE = 'SALE10';

export function OrderSummary(
  subtotal: number,
  promoCode = '',
  onApplyPromo: (code: string) => void = () => {},
): HTMLElement {
  const section = document.createElement('section');
  section.className = 'order-summary';

  const title = document.createElement('h2');
  title.textContent = 'Order Summary';

  const subtotalRow = document.createElement('div');
  subtotalRow.className = 'order-summary__row';

  const subtotalLabel = document.createElement('span');
  subtotalLabel.textContent = 'Subtotal';

  const subtotalValue = document.createElement('strong');
  subtotalValue.textContent = `$${subtotal.toFixed(2)}`;

  subtotalRow.append(subtotalLabel, subtotalValue);
  const promoSection = document.createElement('div');
  promoSection.className = 'order-summary__promo';

  const promoLabel = document.createElement('label');
  promoLabel.htmlFor = 'promo-code';
  promoLabel.textContent = 'Promo code';

  const promoControls = document.createElement('div');
  promoControls.className = 'order-summary__promo-controls';

  const promoInput = document.createElement('input');
  promoInput.type = 'text';
  promoInput.id = 'promo-code';
  promoInput.placeholder = 'Enter promo code';
  promoInput.value = promoCode;

  const applyButton = document.createElement('button');
  applyButton.type = 'button';
  applyButton.textContent = 'Apply';
  applyButton.className = 'order-summary__apply';

  const promoMessage = document.createElement('p');
  promoMessage.className = 'order-summary__promo-message';
  promoMessage.setAttribute('aria-live', 'polite');

  promoControls.append(promoInput, applyButton);
  promoSection.append(promoLabel, promoControls, promoMessage);

  const discountRow = document.createElement('div');
  discountRow.className = 'order-summary__row order-summary__discount';
  discountRow.hidden = true;

  const discountLabel = document.createElement('span');
  discountLabel.textContent = 'Discount';

  const discountValue = document.createElement('strong');

  discountRow.append(discountLabel, discountValue);

  const shippingRow = document.createElement('div');
  shippingRow.className = 'order-summary__row';

  const shippingLabel = document.createElement('span');
  shippingLabel.textContent = 'Shipping';

  const shippingValue = document.createElement('span');
  shippingValue.textContent = 'Calculated at checkout';

  shippingRow.append(shippingLabel, shippingValue);

  const divider = document.createElement('hr');

  const totalRow = document.createElement('div');
  totalRow.className = 'order-summary__row order-summary__row--total';

  const totalLabel = document.createElement('span');
  totalLabel.textContent = 'Total';

  const totalValue = document.createElement('strong');

  totalRow.append(totalLabel, totalValue);

  function updateTotals(code: string): void {
    const discount = getDiscountAmount(code);
    const total = subtotal - discount;

    discountRow.hidden = discount === 0;
    discountValue.textContent = `-$${discount.toFixed(2)}`;
    totalValue.textContent = `$${total.toFixed(2)}`;
  }

  applyButton.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();

    if (code === PROMO_CODE) {
      onApplyPromo(code);
      updateTotals(code);
      promoMessage.textContent = 'Promo code applied! You saved 10%.';
      promoMessage.className = 'order-summary__promo-message order-summary__promo-message--success';
    } else {
      onApplyPromo('');
      updateTotals('');
      promoMessage.textContent = code ? 'Invalid promo code.' : 'Please enter a promo code.';
      promoMessage.className = 'order-summary__promo-message order-summary__promo-message--error';
    }
  });

  if (promoCode === PROMO_CODE) {
    updateTotals(promoCode);
    promoMessage.textContent = 'Promo code applied! You saved 10%.';
    promoMessage.classList.add('order-summary__promo-message--success');
  } else {
    updateTotals('');
  }

  const checkoutButton = document.createElement('button');
  checkoutButton.className = 'btn-primary';
  checkoutButton.type = 'button';
  checkoutButton.textContent = 'Proceed to Checkout';
  checkoutButton.disabled = true;

  const continueLink = document.createElement('a');
  continueLink.href = '#/catalog';
  continueLink.textContent = '← Continue shopping';

  section.append(
    title,
    subtotalRow,
    promoSection,
    discountRow,
    shippingRow,
    divider,
    totalRow,
    checkoutButton,
    continueLink,
  );

  return section;
}
