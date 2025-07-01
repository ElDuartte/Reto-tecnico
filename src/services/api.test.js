import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('api service (basic)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test the index, getProducts
  it('getProducts() fetches data from API and returns it', async () => {
    const mockData = [{ id: '1', name: 'Phone 1' }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

    const { getProducts } = await import('./api.js');
    const result = await getProducts('/products');

    expect(fetch).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  // tEst getElementById
  it('getProductById() fetches single product by ID', async () => {
    const mockProduct = { id: '123', name: 'Phone 123' };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProduct });

    const { getProductById } = await import('./api.js');
    const result = await getProductById('123');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/123'),
      expect.any(Object)
    );
    expect(result).toEqual(mockProduct);
  });

  // if theres errors in the api
  it('handles API errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error from API' }),
    });

    const { getProducts } = await import('./api.js');

    await expect(getProducts('/fail')).rejects.toThrow('Error from API');
  });
});
