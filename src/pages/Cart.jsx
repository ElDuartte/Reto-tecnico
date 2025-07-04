import React from 'react';
import { useEffect, useState } from 'react';
import { useCartCount } from '../hooks/useCartCount';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart } from '../utils/cart';

function Cart() {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  useEffect(() => {
    setCart(getCart());

    const handleCartChange = () => {
      setCart(getCart());
    };

    window.addEventListener('cartUpdated', handleCartChange);
    return () => window.removeEventListener('cartUpdated', handleCartChange);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDelete = (uniqueId) => {
    removeFromCart(uniqueId);
  };

  const cartCount = useCartCount();

  return (
    <div className="container container__cart">
      <h2>Cart ({cartCount})</h2>
      <div className="container-card__details">
        {cart.map((item) => (
          <div className="card__details" key={item.uniqueId}>
            <img src={item.imageUrl} alt={item.name} className="card__image" />
            <div className="card-container__details">
              <div className="card-container__text">
                <p className="card__text">
                  {item.brand} {item.name}
                </p>
                <p className="card__text">
                  {item.storage} | {item.color}
                </p>
                <p className="card__text card-text__price">{item.price} EUR</p>
              </div>
              <button
                onClick={() => handleDelete(item.uniqueId)}
                className="button__delete"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <section className="container container__total">
        {isMobile ? (
          <>
            {cartCount > 0 && (
              <div className="cart-total-wrapper">
                <p className="cart-description__total">TOTAL</p>
                <p className="cart-description__price">{totalPrice} EUR</p>
              </div>
            )}
            <div className="cart-buttons-wrapper">
              <Link
                to="/"
                className={`cart-button cart-button__continue ${cartCount > 0 ? '' : 'cart-button__continue-mobile'}`}
              >
                CONTINUE SHOPPING
              </Link>
              {cartCount > 0 && <button className="cart-button">PAY</button>}
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="cart-button cart-button__continue">
              CONTINUE SHOPPING
            </Link>
            <div className="container__price-pay">
              {cartCount > 0 && (
                <>
                  <p className="cart__total">TOTAL {totalPrice} EUR</p>
                  <button className="cart-button">PAY</button>
                </>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Cart;
