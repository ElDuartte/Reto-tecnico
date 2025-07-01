import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/api';

// The API has duplicated elements, I have notice only one.
// because of it I have decided on this approach.
// Ideally the change should be in the API.

// Parameter limit is the hard limit of the data asked in the API
// is controlled by the components using it

export function useProducts(searchTerm = '', limit, offset = 0) {
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [effectiveLimit, setEffectiveLimit] = useState(limit);
  const [duplicatesCount, setDuplicatesCount] = useState(0);

  // Fetch data based on effectiveLimit
  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts('/products', {
          params: { search: searchTerm, limit: effectiveLimit, offset },
        });
        if (!cancelled) {
          setRawProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch products');
          setRawProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    // Reset rawProducts and duplicatesCount on new search
    setRawProducts([]);
    setDuplicatesCount(0);
    setEffectiveLimit(limit);
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [searchTerm, limit, offset]);

  // after rawProducts load, compute duplicates and request extra if needed
  useEffect(() => {
    if (!loading && rawProducts.length) {
      const uniqueIds = new Set(rawProducts.map((p) => p.id));
      const dupCount = rawProducts.length - uniqueIds.size;
      if (dupCount > 0 && dupCount !== duplicatesCount) {
        setDuplicatesCount(dupCount);
        setEffectiveLimit((prev) => prev + dupCount);
      }
    }
  }, [rawProducts, loading, duplicatesCount]);

  // Final unique products limited to original limit
  const products = useMemo(() => {
    // new Map() to save unique data pairs (key value)
    const map = new Map();
    for (const p of rawProducts) {
      if (!map.has(p.id) && map.size < limit) {
        map.set(p.id, p);
      }
      if (map.size === limit) break;
    }
    return Array.from(map.values());
  }, [rawProducts, limit]);

  return { products, loading, error };
}

export default useProducts;
