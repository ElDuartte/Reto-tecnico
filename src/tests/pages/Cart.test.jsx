import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from '../../pages/Cart';

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
  };
});

// Mock the hook
vi.mock('../../hooks/useCartCount', () => ({
  useCartCount: () => 2,
}));

// Mock of utils/cart.js
vi.mock('../../utils/cart', () => ({
  getCart: () => [
    {
      id: '1',
      brand: 'BrandX',
      name: 'Phone 1',
      price: '100',
      imageUrl: 'phone.jpg',
      storage: '128GB',
      color: 'Black',
    },
    {
      id: '2',
      brand: 'BrandY',
      name: 'Phone 2',
      price: '200',
      imageUrl: 'phone2.jpg',
      storage: '256GB',
      color: 'White',
    },
  ],
  removeFromCart: vi.fn(),
}));

describe('Cart Page', () => {
  it('renders cart items and total price', () => {
    render(<Cart />);

    // Cart title
    expect(screen.getByText(/Cart \(2\)/)).toBeInTheDocument();

    // Product names
    expect(screen.getByText(/BrandX Phone 1/)).toBeInTheDocument();
    expect(screen.getByText(/BrandY Phone 2/)).toBeInTheDocument();

    // Total price
    expect(screen.getAllByText(/TOTAL 300 EUR|300 EUR/)[0]).toBeInTheDocument();
  });
});
