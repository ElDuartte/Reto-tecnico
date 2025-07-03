import { useEffect, useState } from 'react';

export function useCartCount() {
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem('cart'))?.length || 0
  );

  useEffect(() => {
    const updateCount = () => {
      setCount(JSON.parse(localStorage.getItem('cart'))?.length || 0);
    };

    window.addEventListener('storage', updateCount);
    window.addEventListener('cartUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cartUpdated', updateCount);
    };
  }, []);

  return count;
}
