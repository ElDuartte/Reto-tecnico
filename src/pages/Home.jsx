import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function Home() {
  const [search, setSearch] = useState('');
  // Debounced search term to avoid triggering fetch on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    // 300 milliseconds delay to smooth out the user experience
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { products = [], error } = useProducts(debouncedSearch, 25, 0);

  const displayed = products.slice(0, 20);

  const navigate = useNavigate();
  return (
    <div className="home-page">
      <div className="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Search for a smartphone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <p className="results-count">
          {displayed.length} result{displayed.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {error && <div className="error">Error: {error}</div>}

      <div className="product-card__grid">
        {displayed.map((p) => (
          <div
            className="product-card"
            key={p.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${p.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/product/${p.id}`);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <img
              className="product-card__image"
              src={p.imageUrl}
              alt={p.name}
            />
            <div className="product-card__text">
              <p className="product-card__brand">{p.brand.toUpperCase()}</p>
              <div className="product-card__model-price">
                <h2 className="product-card__model">{p.name}</h2>
                <h2 className="product-card__price">${p.basePrice}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
