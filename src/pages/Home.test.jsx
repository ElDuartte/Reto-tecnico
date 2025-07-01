import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock the useProducts hook to control its return values
vi.mock('../hooks/useProducts', () => ({
  useProducts: vi.fn(),
}));

import Home from './Home';
import { useProducts } from '../hooks/useProducts';

describe('Home component', () => {
  it('renders loading state', () => {
    useProducts.mockReturnValue({ filtered: [], loading: true, error: null });
    render(<Home />);
    expect(screen.getByText('Loading products…')).toBeInTheDocument();
  });

  it('renders error state', () => {
    useProducts.mockReturnValue({
      filtered: [],
      loading: false,
      error: 'Oops',
    });
    render(<Home />);
    expect(screen.getByText('Error: Oops')).toBeInTheDocument();
  });

  it('renders the mocked product and count', () => {
    const mockFiltered = [
      {
        id: '2',
        brand: 'Samsung',
        name: 'Galaxy S21',
        basePrice: 899,
        imageUrl: 'https://example.com/phone.jpg',
      },
    ];
    useProducts.mockReturnValue({
      filtered: mockFiltered,
      loading: false,
      error: null,
    });

    render(<Home />);

    // Search input exists
    expect(
      screen.getByPlaceholderText('Search for a smartphone...')
    ).toBeInTheDocument();
    // Result count
    expect(screen.getByText('1 result found')).toBeInTheDocument();
    // Product details
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument();
    expect(screen.getByText('$899')).toBeInTheDocument();
  });
});
