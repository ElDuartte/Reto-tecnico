import { renderHook, act } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import { useCartSync } from '../../hooks/useCartSync';

vi.mock('../../utils/cart', () => ({
  getCart: vi.fn(),
}));

import { getCart } from '../../utils/cart';

describe('useCartSync', () => {
  it('should initialize with cart items from localStorage', () => {
    getCart.mockReturnValue([{ id: '1', name: 'Phone', price: '100' }]);

    const { result } = renderHook(() => useCartSync());

    expect(result.current).toEqual([{ id: '1', name: 'Phone', price: '100' }]);
  });

  it('should update cart on "cartUpdated" event', () => {
    getCart.mockReturnValue([{ id: '2', name: 'Tablet', price: '200' }]);

    const { result } = renderHook(() => useCartSync());

    act(() => {
      window.dispatchEvent(new Event('cartUpdated'));
    });

    expect(result.current).toEqual([{ id: '2', name: 'Tablet', price: '200' }]);
  });
});