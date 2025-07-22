import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, borderClass = '', refCallback, dataId }) {
  const navigate = useNavigate();

  return (
    <div
      className={`product-card ${borderClass}`}
      data-id={dataId}
      ref={refCallback}
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/product/${product.id}`);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <img
        className="product-card__image"
        src={product.image}
        alt={product.name}
      />
      <div className="product-card__text">
        <h2 className="product-card__model">{product.name}</h2>
        <p className="product-card__details">
          Hp: {product.hp} Attack: {product.attack}
        </p>
        <p className="product-card__details">Type: {product.type}</p>
        <p className="product-card__details">$ {product.hp + product.attack}</p>
      </div>
    </div>
  );
}

export default ProductCard;
