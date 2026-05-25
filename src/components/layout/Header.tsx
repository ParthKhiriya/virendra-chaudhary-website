import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { key: 'home', to: '/', label: t('nav.home') },
    { key: 'about', to: '/about', label: t('nav.about') },
    { key: 'foundation', to: '/foundation', label: t('nav.foundation') },
    { key: 'gallery', to: '/gallery', label: t('nav.gallery') },
    { key: 'news', to: '/news', label: t('nav.news') },
    { key: 'contact', to: '/contacts', label: t('nav.contact') },
  ];

  const isActive = (to: string) => {
    const currentPath = location.pathname + location.hash;
    // For home, just match / if no hash
    if (to === '/' && currentPath === '/') return true;
    if (to !== '/' && currentPath === to) return true;
    // Also mark home as active if we are on home but have a hash, but technically the hash link is active then.
    // Let's just do exact match.
    return false;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-auto">
      <div className="flex justify-between items-center max-w-7xl mx-auto relative z-50">
        
        {/* Logo Initials - Heavy & Stylized */}
        <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-sm flex items-center">
          <span>V</span>
          <span className="text-primary mx-0.5">.</span>
          <span>C</span>
        </div>
        
        {/* Desktop Glassmorphism Nav Pill */}
        <nav className="hidden md:flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-sm">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link 
                key={link.key}
                to={link.to} 
                className={`text-base lg:text-lg font-bold px-4 lg:px-6 py-2.5 rounded-full transition-all duration-300 ${
                  active 
                    ? 'bg-primary text-black shadow-md' 
                    : 'text-gray-700 hover:bg-primary/20 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-gray-900 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link, index) => {
            const active = isActive(link.to);
            return (
              <Link 
                key={link.key}
                to={link.to} 
                className={`text-3xl font-black uppercase transition-colors duration-300 transform ${
                  active ? 'text-primary' : 'text-gray-900 hover:text-primary'
                } ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
