import { useEffect, useState } from 'react';
import { useCartCount } from '../hooks/useCartCount';
import { getCart, removeFromCart } from '../utils/cart'; // adjust path

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());

    const handleCartChange = () => {
      setCart(getCart());
    };

    window.addEventListener('cartUpdated', handleCartChange);
    return () => window.removeEventListener('cartUpdated', handleCartChange);
  }, []);

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const cartCount = useCartCount();


  console.log(cartCount);

  return (
    <div className="container container__cart">
      <h2>Cart ({cartCount})</h2>
      <div className="container-card__details">
        {cart.map((item) => (
        <div className="card__details" key={item.id}>
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
            <a onClick={() => handleDelete(item.id)} className="button__delete">
              Remove
            </a>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
