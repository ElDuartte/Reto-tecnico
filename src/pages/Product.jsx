import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedColor(data.colorOptions?.[0]);
        setSelectedStorage(data.storageOptions?.[0]);
      } catch (err) {
        setError(err.message || 'Error loading product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container">
      <section className="product-detail">
        <div className="product-detail__left">
          <img
            src={selectedColor.imageUrl}
            alt={selectedColor.name}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__right">
          <h1 className='product-detail__title'>
            {product.brand} {product.name}
          </h1>
          {/* <p>{product.description}</p> */}

          <div className="product-detail__price">
            {selectedStorage.price} EUR
          </div>

          <div className="product-detail__storage">
            <h4>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h4>
            <div className="storage-options">
              {product.storageOptions.map((option) => (
                <button
                  key={option.capacity}
                  onClick={() => setSelectedStorage(option)}
                  className={`storage-button ${
                    selectedStorage.capacity === option.capacity
                      ? 'selected'
                      : ''
                  }`}
                >
                  {option.capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail__colors">
            <h4>COLOR. PICK YOUR FAVOURITE.</h4>
            <div className="color-options__container">
              <div className="color-options">
                {product.colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`color-circle ${
                      selectedColor.name === color.name ? 'selected' : ''
                    }`}
                    style={{ backgroundColor: color.hexCode }}
                    title={color.name}
                  />
                ))}
              </div>
              <p>{selectedColor.name}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="product-specs">
        <h2 className="specs-title">Specifications</h2>
        <div className="specs-grid">
          <div className="spec-row">
            <span className="spec-key">BRAND</span>
            <span>{product.brand}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">NAME</span>
            <span>{product.name}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">DESCRIPTION</span>
            <span>{product.description}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">SCREEN</span>
            <span>{product.specs.screen}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">RESOLUTION</span>
            <span>{product.specs.resolution}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">PROCESSOR</span>
            <span>{product.specs.processor}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">MAIN CAMERA</span>
            <span>{product.specs.mainCamera}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">SELFIE CAMERA</span>
            <span>{product.specs.selfieCamera}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">BATTERY</span>
            <span>{product.specs.battery}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">OS</span>
            <span>{product.specs.os}</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">SCREEN REFRESH RATE</span>
            <span>{product.specs.screenRefreshRate}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
