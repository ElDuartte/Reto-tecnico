import { useEffect, useState } from 'react';

export function useIsMobile(threshold = 600) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < threshold);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < threshold;
      setIsMobile((prev) => (prev !== isNowMobile ? isNowMobile : prev));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [threshold]);

  return isMobile;
}
