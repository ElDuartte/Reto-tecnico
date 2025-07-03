import { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <img src={item.imageUrl} alt={item.name} width={100} />
          <p>
            {item.brand} {item.name}
          </p>
          <p>Color: {item.color}</p>
          <p>Storage: {item.storage}</p>
          <p>Price: {item.price} EUR</p>
        </div>
      ))}
    </div>
  );
}
export default Cart;