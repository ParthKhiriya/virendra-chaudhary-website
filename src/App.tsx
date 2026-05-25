import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LenisProvider from './components/layout/LenisProvider';
import CustomCursor from './components/layout/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import Foundation from './pages/Foundation';
import Gallery from './pages/Gallery';
import NewsPage from './pages/News';
import ContactPage from './pages/ContactPage';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // iOS Safari does not natively focus non-input elements on tap.
    // This forces focus on any tapped element that has a tabIndex, button, or link.
    // Combined with our group-focus/focus variants, this makes hover effects "stick" on tap!
    const handleTouch = (e: TouchEvent) => {
      const target = (e.target as Element).closest('[tabIndex], a, button, .group') as HTMLElement;
      if (target && typeof target.focus === 'function') {
        target.focus();
      }
    };
    document.addEventListener('touchstart', handleTouch, { passive: true });
    return () => document.removeEventListener('touchstart', handleTouch);
  }, []);

  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 relative">
          <div className="noise-overlay" />
          <CustomCursor />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/foundation" element={<Foundation />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contacts" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;
