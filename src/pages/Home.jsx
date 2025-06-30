import React, { useState } from 'react';
import { apiTest } from '../../services/api';

function Home() {
  const [search, setSearch] = useState('');

  // TODO change this to work with API filtering
  // needs to search in real time with name and brand
  // needs to show the user the number of results found

  // TODO filter the first 20 phones in the grid

  const filteredProducts = apiTest.filter(
    (product) =>
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {filteredProducts.length} result
          {filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="product-card product-card--home">
        {filteredProducts.map((product, key) => (
          <div className="product-card__body" key={key}>
            <img
              className="product-card__image"
              src={product.imageUrl}
              alt=""
            />
            <div className="product-card__text">
              <p className="product-card__brand">{product.brand}</p>
              <div className="product-card__model-price">
                <h2 className="product-card__model">{product.name}</h2>
                <h2 className="product-card__price">${product.basePrice}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
