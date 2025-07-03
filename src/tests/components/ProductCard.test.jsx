import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock before importing the component
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

import ProductCard from '../../../src/components/ProductCard';

describe('ProductCard', () => {
  it('renders product info and navigates on click', () => {
    const mockProduct = {
      id: 'APL-I15PM',
      brand: 'Apple',
      name: 'iPhone 15 Pro Max',
      basePrice: 1319,
      imageUrl: 'http://example.com/iphone.webp',
    };

    render(<ProductCard product={mockProduct} />);

    // Assert text is rendered
    expect(screen.getByText('APPLE')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
    expect(screen.getByText('$1319')).toBeInTheDocument();

    // Simulate click
    fireEvent.click(screen.getByRole('img'));

    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/product/APL-I15PM');
  });
});
