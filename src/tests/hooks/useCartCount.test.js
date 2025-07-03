import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartCount } from '../../hooks/useCartCount';

describe('useCartCount', () => {
  beforeEach(() => {
    // Set up a fake cart in localStorage
    localStorage.setItem('cart', JSON.stringify([{ id: 1 }, { id: 2 }]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns initial cart count from localStorage', () => {
    const { result } = renderHook(() => useCartCount());
    expect(result.current).toBe(2);
  });

  it('updates count when "cartUpdated" event is dispatched', () => {
    const { result } = renderHook(() => useCartCount());

    act(() => {
      localStorage.setItem('cart', JSON.stringify([{ id: 1 }]));
      window.dispatchEvent(new Event('cartUpdated'));
    });

    expect(result.current).toBe(1);
  });
});
