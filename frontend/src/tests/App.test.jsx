import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';

// Mock of the components of the page (the other pages...)
vi.mock('../pages/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('../pages/Product', () => ({ default: () => <div>Product Page</div> }));
vi.mock('../pages/Cart', () => ({ default: () => <div>Cart Page</div> }));
vi.mock('../components/Navbar', () => ({ default: () => <nav>Navbar</nav> }));


describe('App routes', () => {
  it('should render Home component on "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });

  it('should render Product component on "/product/1"', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Product Page')).toBeInTheDocument();
  });

  it('should render Cart component on "/cart"', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Cart Page')).toBeInTheDocument();
  });
});
