import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/api';

export function useProducts(searchTerm = '') {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on mount once
  useEffect(() => {
    let cancelled = false;
    // if the component unmounts before the fetch,
    // finishes and doesn't try to call setState on an unmounted component
    async function load() {
      try {
        const data = await getProducts('/products');
        if (!cancelled) setAll(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to fetch products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Split the search term into individual words trimmed and lowercase
  // "iphone", "pro"
  const terms = useMemo(
    () => searchTerm.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [searchTerm]
  );

  // check if the products ID are unique or remove duplicates
  const uniqueAll = useMemo(() => {
    const map = new Map();
    all.forEach((product) => {
      if (!map.has(product.id)) {
        map.set(product.id, product);
      }
    });
    return Array.from(map.values());
  }, [all]);

  // filter each term, must be found in either name or brand
  const filtered = useMemo(() => {
    // If no search terms, return deduplicated list
    if (!terms.length) return uniqueAll;

    // Filter based on every search term.
    // the search token needs to match either with the name or the brand
    const matches = uniqueAll.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const brand = (p.brand || '').toLowerCase();
      return terms.every((term) => name.includes(term) || brand.includes(term));
    });

    // Return the matches or [] if none
    return matches;
  }, [uniqueAll, terms]);

  return { filtered, loading, error };
}

export default useProducts;
