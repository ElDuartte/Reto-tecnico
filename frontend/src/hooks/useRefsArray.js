import { useRef } from 'react';

// Purpose:
// Create and manage an array of refs, one for each product card.

// Why?
//   To measure the position of each product card in the DOM, we need a ref pointing to every single one.
// You can’t measure layout(like offsetTop, getBoundingClientRect, etc.) without these references.

export function useRefsArray(length) {
  const refs = useRef([]);

  if (refs.current.length !== length) {
    refs.current = Array.from(
      { length },
      (_, i) => refs.current[i] || { current: null }
    );
  }

  return refs.current;
}
