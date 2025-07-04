import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useIsMobile } from '../../hooks/useIsMobile';

describe('useIsMobile', () => {
  it('should return true if window width < 600', () => {
    window.innerWidth = 500; // ✅ corregido
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false if window width >= 600', () => {
    window.innerWidth = 800; // ✅ corregido
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update value on resize', () => {
    const { result } = renderHook(() => useIsMobile());

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });
});
