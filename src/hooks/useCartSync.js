import { useEffect, useState } from 'react';
import { getCart } from '../utils/cart';

export function useCartSync() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());

    const handleCartChange = () => {
      setCart(getCart());
    };

    window.addEventListener('cartUpdated', handleCartChange);
    return () => window.removeEventListener('cartUpdated', handleCartChange);
  }, []);

  return cart;
}
