import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCart, addToCart, removeFromCart } from '../../utils/cart';

describe('Cart utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks(); // reset mocks after every tst
  });

  it('getCart should return empty array if cart is not set', () => {
    expect(getCart()).toEqual([]);
  });

  it('addToCart should add an item to localStorage', () => {
    const item = { id: 1, name: 'Phone' };

    addToCart(item);
    const result = getCart();

    expect(result).toEqual([item]);
  });

  it('removeFromCart should remove an item by id from localStorage', () => {
    const item1 = { id: 1, name: 'Phone' };
    const item2 = { id: 2, name: 'Tablet' };

    addToCart(item1);
    addToCart(item2);

    removeFromCart(1);
    const result = getCart();

    expect(result).toEqual([item2]);
  });
});
