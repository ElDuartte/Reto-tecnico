import React from 'react';
import { useNavigate } from 'react-router-dom';
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      key={product.id}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        className="product-card__image"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="product-card__text">
        <p className="product-card__brand">{product.brand.toUpperCase()}</p>
        <div className="product-card__model-price">
          <h2 className="product-card__model">{product.name}</h2>
          <h2 className="product-card__price">${product.basePrice}</h2>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
