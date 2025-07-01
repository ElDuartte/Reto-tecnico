import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useProducts hook
vi.mock('../../hooks/useProducts', () => ({
  useProducts: vi.fn(),
}));

import { useProducts } from '../../hooks/useProducts';
import Home from '../../pages/Home';

describe('Home component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    useProducts.mockReset();
  });

  it('renders error state', () => {
    // Arrange: hook returns an error
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Error happened',
    });

    // Act
    render(<Home />);

    // Assert
    expect(screen.getByText('Error: Error happened')).toBeInTheDocument();
  });

  it('renders products and count correctly', () => {
    // Arrange: hook returns one product
    const mockProducts = [
      {
        id: 'APL-I15PM',
        brand: 'Apple',
        name: 'iPhone 15 Pro Max',
        basePrice: 1319,
        imageUrl: 'http://example.com/iphone.webp',
      },
    ];
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    // Act
    render(<Home />);

    // Assert: result count
    expect(screen.getByText('1 result found')).toBeInTheDocument();
    // Assert: product details
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
    expect(screen.getByText('$1319')).toBeInTheDocument();
  });
});
