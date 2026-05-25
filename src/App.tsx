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

function App() {
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
