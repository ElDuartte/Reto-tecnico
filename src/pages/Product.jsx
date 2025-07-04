import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import ProductCard from '../components/ProductCard';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorTouched, setColorTouched] = useState(false);
  const [storageTouched, setStorageTouched] = useState(false);
  const navigate = useNavigate();

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
    //scroll up after the user clicks on a new product
    // instead of staying at the bottom looking at the carousel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <section className="container">
        <Link to="/">&lt; Back</Link>
      </section>
      <div className="container__product">
        <section className="product-detail">
          <div className="product-detail__left">
            <img
              src={selectedColor.imageUrl}
              alt={selectedColor.name}
              className="product-detail__image"
            />
          </div>

          <div className="product-detail__right">
            <h1 className="product-detail__title">
              {product.brand} {product.name}
            </h1>

            <div className="product-detail__price">
              {!storageTouched && 'From '}
              {selectedStorage.price} EUR
            </div>

            <div className="product-detail__storage">
              <h4>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h4>
              <div className="storage-options">
                {product.storageOptions.map((option) => (
                  <button
                    key={option.capacity}
                    onClick={() => {
                      setSelectedStorage(option);
                      setStorageTouched(true);
                    }}
                    className={`storage-button ${
                      storageTouched &&
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
                      onClick={() => {
                        setSelectedColor(color);
                        setColorTouched(true);
                      }}
                      className={`color-square ${selectedColor.name === color.name ? 'selected' : ''} ${!colorTouched ? 'untouched' : ''}`}
                      style={{ backgroundColor: color.hexCode }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p>{selectedColor.name}</p>
              </div>
            </div>
            <button
              className="cart__button"
              disabled={!(colorTouched && storageTouched)}
              onClick={() => {
                const cartItem = {
                  id: product.id,
                  uniqueId: `${product.id}-${selectedColor.name}-${selectedStorage.capacity}-${Date.now()}`,
                  brand: product.brand,
                  name: product.name,
                  price: selectedStorage.price,
                  storage: selectedStorage.capacity,
                  color: selectedColor.name,
                  imageUrl: selectedColor.imageUrl,
                };

                // Bring the curent cart from localStorage
                const existingCart =
                  JSON.parse(localStorage.getItem('cart')) || [];

                // add the new item
                const updatedCart = [...existingCart, cartItem];

                // Save and update the cart
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                window.dispatchEvent(new Event('cartUpdated'));
                navigate('/cart');
              }}
            >
              Add To Cart
            </button>
          </div>
        </section>
        <section className="product-specs">
          <h2 className="specs-title">SPECIFICATIONS</h2>
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
        <section className="product-similar">
          <h2 className="specs-title__similar">SIMILAR ITEMS</h2>
          <div className="container__carousel">
            {product.similarProducts.map((similar, key) => (
              <ProductCard product={similar} key={key} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Product;
