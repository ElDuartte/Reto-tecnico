// src/tests/hooks/useProducts.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProducts } from '../../hooks/useProducts';

// Mock the services/api module and its getProducts export
vi.mock('../../services/api', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '../../services/api';
const mockGetProducts = getProducts;

describe('useProducts hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('initially sets loading=true and then returns empty products', async () => {
    // Arrange: API returns empty array
    mockGetProducts.mockResolvedValueOnce([]);

    // Act: render hook
    const { result } = renderHook(() => useProducts('', 5, 0));

    // Assert initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.products).toEqual([]);

    // Wait for loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // After fetch
    expect(result.current.error).toBeNull();
    expect(result.current.products).toEqual([]);
  });

  it('eliminate duplicates and limits unique products when duplicates present', async () => {
    // Arrange: API returns a mix of duplicates and extra items in one call
    const rawData = [
      { id: '1', name: 'A' },
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' },
      { id: '3', name: 'C' },
      { id: '4', name: 'D' },
    ];
    // API call single
    mockGetProducts.mockResolvedValueOnce(rawData);

    const { result } = renderHook(() => useProducts('', 3, 0));

    // Wait for loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Should call API once
    expect(mockGetProducts).toHaveBeenCalledTimes(1);

    // Should return first 3 unique IDs: 1,2,3
    expect(result.current.products.map((p) => p.id)).toEqual(['1', '2', '3']);
    expect(result.current.error).toBeNull();
  });

  it('handles API errors', async () => {
    mockGetProducts.mockRejectedValueOnce(new Error('API failure'));

    const { result } = renderHook(() => useProducts('test', 2, 0));

    // Wait for loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('API failure');
    expect(result.current.products).toEqual([]);
  });
});
