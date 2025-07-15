import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock of the hok
vi.mock('../../hooks/useCartCount', () => ({
  useCartCount: () => 3,
}));

describe('Navbar', () => {
  it('renders logo and links to home', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders bag icon and links to cart', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const bag = screen.getByAltText('Bag icon');
    expect(bag).toBeInTheDocument();
    expect(bag.closest('a')).toHaveAttribute('href', '/cart');
  });

  it('shows the correct cart count', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
