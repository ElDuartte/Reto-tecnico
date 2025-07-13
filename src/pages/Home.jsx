import React, { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useResponsiveBorders } from '../hooks/useResponsiveBorders';
import { useRefsArray } from '../hooks/useRefsArray';
import ProductCard from '../components/ProductCard'; // 🔧 Asegúrate de que esta ruta sea correcta

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

  const refs = useRefsArray(displayed.length);
  const borderClasses = useResponsiveBorders(refs);

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
        {displayed.map((product, index) => {
          const ref = refs[index];
          const borderClass = borderClasses[product.id]?.join(' ') ?? '';
          {/* console.log('ID:', product.id, 'classes:', borderClasses[product.id]); */}

          return (
            <ProductCard
              key={product.id}
              product={product}
              borderClass={borderClass}
              refCallback={ref}
              dataId={String(product.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
