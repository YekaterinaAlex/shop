import { filters } from '../../data/filters';
import type { SortOption } from '../../utils/sortProducts';
import './sidebar.css';

export function Sidebar(
  onChange: (
    categories: string[],
    waxTypes: string[],
    sortBy: SortOption,
    minPrice: number,
    maxPrice: number,
  ) => void,
): HTMLElement {
  const MIN_PRICE = 11;
  const MAX_PRICE = 26;
  const PRICE_SPAN = MAX_PRICE - MIN_PRICE;

  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  const selectedCategories: string[] = [];
  const selectedWaxTypes: string[] = [];
  let selectedSort: SortOption = 'featured';

  function notifyChange(): void {
    onChange(
      selectedCategories,
      selectedWaxTypes,
      selectedSort,
      Number(minSlider.value),
      Number(maxSlider.value),
    );
  }

  function createCheckbox(
    value: string,
    label: string,
    selectedValues: string[],
  ): HTMLLabelElement {
    const wrapper = document.createElement('label');
    wrapper.className = 'sidebar-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;

    const text = document.createElement('span');
    text.textContent = label;

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedValues.push(value);
      } else {
        const index = selectedValues.indexOf(value);

        if (index !== -1) {
          selectedValues.splice(index, 1);
        }
      }

      notifyChange();
    });

    wrapper.append(checkbox, text);

    return wrapper;
  }

  const title = document.createElement('h2');
  title.textContent = 'Categories';

  aside.append(title);

  filters.candleType.forEach(({ value, label }) => {
    aside.append(createCheckbox(value, label, selectedCategories));
  });

  const waxTitle = document.createElement('h2');
  waxTitle.textContent = 'Wax Type';

  aside.append(waxTitle);

  filters.waxType.forEach(({ value, label }) => {
    aside.append(createCheckbox(value, label, selectedWaxTypes));
  });

  const sortTitle = document.createElement('h2');
  sortTitle.textContent = 'Sort By';

  aside.append(sortTitle);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  sortOptions.forEach(({ value, label }) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'sort';
    radio.value = value;

    radio.addEventListener('change', () => {
      if (radio.checked) {
        selectedSort = value as SortOption;

        notifyChange();
      }
    });

    if (value === 'featured') {
      radio.checked = true;
    }

    const wrapper = document.createElement('label');
    wrapper.className = 'sidebar-option';

    const text = document.createElement('span');
    text.textContent = label;

    wrapper.append(radio, text);
    aside.append(wrapper);
  });

  const priceTitle = document.createElement('h2');
  priceTitle.textContent = 'Price Range';

  const priceRange = document.createElement('div');
  priceRange.className = 'price-range';

  const activeTrack = document.createElement('div');
  activeTrack.className = 'price-range-active';

  priceRange.append(activeTrack);

  const minSlider = document.createElement('input');
  minSlider.type = 'range';
  minSlider.min = String(MIN_PRICE);
  minSlider.max = String(MAX_PRICE);
  minSlider.value = String(MIN_PRICE);
  minSlider.setAttribute('aria-label', 'Minimum price');

  const maxSlider = document.createElement('input');
  maxSlider.type = 'range';
  maxSlider.min = String(MIN_PRICE);
  maxSlider.max = String(MAX_PRICE);
  maxSlider.value = String(MAX_PRICE);
  maxSlider.setAttribute('aria-label', 'Maximum price');

  function updateTrack(): void {
    const min = Number(minSlider.value);
    const max = Number(maxSlider.value);

    activeTrack.style.left = `${((min - MIN_PRICE) / PRICE_SPAN) * 100}%`;
    activeTrack.style.width = `${((max - min) / PRICE_SPAN) * 100}%`;

    if (min === max && min === MIN_PRICE) {
      maxSlider.style.zIndex = '3';
      minSlider.style.zIndex = '2';
    } else if (min === max && max === MAX_PRICE) {
      minSlider.style.zIndex = '3';
      maxSlider.style.zIndex = '2';
    } else {
      minSlider.style.zIndex = '2';
      maxSlider.style.zIndex = '3';
    }
  }

  updateTrack();

  const priceLabels = document.createElement('div');
  priceLabels.className = 'price-labels';

  const minLabel = document.createElement('span');
  minLabel.textContent = `$${MIN_PRICE}`;

  const maxLabel = document.createElement('span');
  maxLabel.textContent = `$${MAX_PRICE}`;

  priceLabels.append(minLabel, maxLabel);
  priceRange.append(minSlider, maxSlider);

  const selectedPrice = document.createElement('p');
  selectedPrice.className = 'selected-price';
  selectedPrice.textContent = `$${MIN_PRICE} – $${MAX_PRICE}`;

  function updatePrice(): void {
    selectedPrice.textContent = `$${minSlider.value} – $${maxSlider.value}`;

    updateTrack();
    notifyChange();
  }

  minSlider.addEventListener('input', () => {
    const min = Math.min(Number(minSlider.value), Number(maxSlider.value));

    minSlider.value = String(min);
    updatePrice();
  });

  maxSlider.addEventListener('input', () => {
    const max = Math.max(Number(maxSlider.value), Number(minSlider.value));

    maxSlider.value = String(max);
    updatePrice();
  });

  aside.append(priceTitle, selectedPrice, priceRange, priceLabels);

  return aside;
}
