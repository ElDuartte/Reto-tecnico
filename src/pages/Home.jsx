// needs to show the user the number of results found

import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';


function Home() {
  const [search, setSearch] = useState('');
  const { filtered, loading, error } = useProducts(search);

  // only show up to 20 at a time
  const displayed = filtered.slice(0, 20);

  if (loading) return <div>Loading products…</div>;
  if (error)   return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <div className="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Search for a smartphone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <p className="results-count">
          {displayed.length} result{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="product-card product-card--home">
        {displayed.map((p, key) => (
          <div className="product-card__body" key={key}>
            <img
              className="product-card__image"
              src={p.imageUrl}
              alt={p.name}
            />
            <div className="product-card__text">
              <p className="product-card__brand">{p.brand}</p>
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