import { useEffect, useState } from 'react';

// Purpose:
// Use those refs to analyze layout and determine border classes (e.g., left, center, right, bottom).

// Why?
// Once we have the actual DOM elements via the refs, this hook calculates:

// Horizontal position in each row → assigns border-1, border-2, border-3.
// Whether the element has another below → assigns border-4.

export function useResponsiveBorders(refs) {
  const [borderClasses, setBorderClasses] = useState({});

  useEffect(() => {
    let raf;
    let attempts = 0;

    const updateBorders = () => {
      const elements = refs.map((r) => r?.current).filter(Boolean);

      if (elements.length === 0 && attempts < 10) {
        attempts++;
        raf = requestAnimationFrame(updateBorders);
        return;
      }

      if (elements.length === 0) {
        // console.warn(
        //   '❌ No se encontraron elementos después de varios intentos.'
        // );
        return;
      }

      const newBorders = {};
      const rows = [];

      // Agrupar por filas (según offsetTop)
      elements.forEach((el) => {
        const top = el.offsetTop;
        let row = rows.find((r) => Math.abs(r.top - top) < 5);
        if (!row) {
          row = { top, items: [] };
          rows.push(row);
        }
        row.items.push(el);
      });

      // Asignar bordes horizontales
      rows.forEach((row) => {
        row.items.forEach((el, i) => {
          const id = String(el.dataset.id);
          if (!newBorders[id]) newBorders[id] = [];

          if (i === 0) newBorders[id].push('border-1');
          else if (i === row.items.length - 1) newBorders[id].push('border-3');
          else newBorders[id].push('border-2');
        });
      });

      // Asignar borde inferior (si no hay uno debajo en la misma columna)
      elements.forEach((el) => {
        const id = String(el.dataset.id);
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const elTop = el.offsetTop;

        let hasBelow = false;

        elements.forEach((other) => {
          if (other === el) return;

          const otherRect = other.getBoundingClientRect();
          const otherCenterX = otherRect.left + otherRect.width / 2;
          const sameColumn = Math.abs(centerX - otherCenterX) < 5;
          const isBelow = other.offsetTop > elTop;

          if (sameColumn && isBelow) hasBelow = true;
        });

        if (!hasBelow) {
          if (!newBorders[id]) newBorders[id] = [];
          newBorders[id].push('border-4');
        }
      });

      setBorderClasses(newBorders);
    };

    raf = requestAnimationFrame(updateBorders);

    window.addEventListener('resize', updateBorders);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateBorders);
    };
  }, [refs.length]);

  return borderClasses;
}
