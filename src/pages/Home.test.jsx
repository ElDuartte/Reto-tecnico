import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../services/api', () => ({
  apiTest: [
    {
      id: '2',
      brand: 'Samsung',
      name: 'Galaxy S21',
      basePrice: 899,
      imageUrl: 'https://example.com/phone.jpg',
    },
  ],
}));

import Home from './Home';

describe('Home component', () => {
  it('renders the mocked product', () => {
    render(<Home />);

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument();
    expect(screen.getByText('$899')).toBeInTheDocument();
  });
});
