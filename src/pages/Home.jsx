import React from 'react';
import { apiTest } from '../../services/api';

function Home() {
  const api = apiTest;
  return (
    <div className="product-card product-card--home">
      {api.map((product, key) => (
        <div className="product-card__body" key={key}>
          <img className="product-card__image" src={product.imageUrl} alt="" />
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
  );
}

export default Home;
