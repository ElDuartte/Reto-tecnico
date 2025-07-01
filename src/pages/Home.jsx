// TODO change this to work with API filtering --- DONE
// needs to search in real time with name and brand using API filtering --- I'm going to make a custom hook
// needs to show the user the number of results found

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch products once on mount
    async function fetchData() {
      try {
        const data = await getProducts('/products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter products by name or brand in real-time
  const filteredProducts = products.filter(
    (product) =>
      product.brand.toLowerCase().includes(search.toLowerCase()) ||
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Show the first 20 phones in the grid
  const displayed = filteredProducts.slice(0, 20);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>Error: {error}</div>;

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
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="product-card product-card--home">
        {displayed.map((product, key) => (
          <div className="product-card__body" key={key}>
            <img
              className="product-card__image"
              src={product.imageUrl}
              alt={product.name}
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
