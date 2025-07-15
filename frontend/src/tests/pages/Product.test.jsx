import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Product from '../../pages/Product';
import * as api from '../../services/api';

// Mock getProductById
vi.mock('../../services/api', () => ({
  getProductById: vi.fn(),
}));

const mockProduct = {
  id: 'APL-I15PM',
  brand: 'Apple',
  name: 'iPhone 15 Pro Max',
  description: 'The latest iPhone',
  imageUrl: 'http://example.com/iphone.webp',
  specs: {
    screen: '6.7 inch OLED',
    resolution: '2796 x 1290',
    processor: 'A17 Pro',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '4323mAh',
    os: 'iOS 17',
    screenRefreshRate: '120Hz',
  },
  storageOptions: [
    { capacity: '128GB', price: 1319 },
    { capacity: '256GB', price: 1449 },
  ],
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#000000',
      imageUrl: 'http://example.com/black.png',
    },
    {
      name: 'White',
      hexCode: '#FFFFFF',
      imageUrl: 'http://example.com/white.png',
    },
  ],
  similarProducts: [],
};

describe('Product Page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    vi.clearAllMocks();
  });

  it('renders loading and then product data', async () => {
    api.getProductById.mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/APL-I15PM']}>
        <Routes>
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading product...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Apple iPhone 15 Pro Max/i)).toBeInTheDocument();
    });

    expect(screen.getByText('128GB')).toBeInTheDocument();
    expect(screen.getByText('COLOR. PICK YOUR FAVOURITE.')).toBeInTheDocument();
  });

  it('renders error if fetch fails', async () => {
    api.getProductById.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/product/APL-I15PM']}>
        <Routes>
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading product...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  it('enables "Add To Cart" after selecting both color and storage', async () => {
    api.getProductById.mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/APL-I15PM']}>
        <Routes>
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/Apple iPhone 15 Pro Max/i);

    const colorButtons = screen.getAllByRole('button', { name: /Black|White/ });
    const storageButtons = screen.getAllByRole('button', {
      name: /128GB|256GB/,
    });

    // Re-select color and storage
    await userEvent.click(storageButtons[1]);
    await userEvent.click(colorButtons[1]);

    const cartButton = screen.getByRole('button', { name: /Add To Cart/i });
    expect(cartButton).toBeEnabled();
  });
});
