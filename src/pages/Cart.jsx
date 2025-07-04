import React from 'react';
import { useCartCount } from '../hooks/useCartCount';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../utils/cart';
import { useCartSync } from '../hooks/useCartSync';
import { useIsMobile } from '../hooks/useIsMobile';

function Cart() {
  const cart = useCartSync();
  const isMobile = useIsMobile();

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const cartCount = useCartCount();

  const handleDelete = (uniqueId) => {
    removeFromCart(uniqueId);
  };

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
