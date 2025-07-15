import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/api';

// The API sometimes returns duplicated products (based on ID).
// To ensure we always get the desired number of unique products,
// we request a few extra items (limit + 10) and filter out duplicates locally.
// Ideally, this should be handled on the backend/API side.

export function useProducts(searchTerm = '', limit, offset = 0) {
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts('/products', {
          params: { search: searchTerm, limit: limit + 10, offset }, // pedir más por si hay duplicados
        });
        if (!cancelled) setRawProducts(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch products');
          setRawProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [searchTerm, limit, offset]);

  const products = useMemo(() => {
    const unique = new Map();
    for (const p of rawProducts) {
      if (!unique.has(p.id)) unique.set(p.id, p);
      if (unique.size === limit) break;
    }
    return Array.from(unique.values());
  }, [rawProducts, limit]);

  return { products, loading, error };
}
