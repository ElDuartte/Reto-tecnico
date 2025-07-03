import { useEffect, useRef } from 'react';

function FadeInOnChange({ children, watch }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.remove('fade-in-transition');
    void ref.current.offsetWidth;
    ref.current.classList.add('fade-in-transition');
  }, [watch]);

  return (
    <div ref={ref} className="fade-in-transition">
      {children}
    </div>
  );
}

export default FadeInOnChange;
