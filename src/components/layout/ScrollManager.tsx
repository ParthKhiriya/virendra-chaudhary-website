import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable native browser scroll restoration to prevent conflicts with Lenis & GSAP
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always scroll to top on route change
    window.scrollTo(0, 0);
    
    // Refresh GSAP ScrollTrigger after a tiny delay to allow the DOM to render and layout to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
