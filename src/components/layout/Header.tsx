import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close contact menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className={`text-4xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-sm flex items-center transition-colors duration-300 ${
          location.pathname.includes('/about') || location.pathname.includes('/news') 
            ? 'text-white' 
            : 'text-gray-900'
        }`}>
          <span>V</span>
          <span className="text-primary mx-0.5">.</span>
          <span>C</span>
        </div>
        
        {/* Desktop Glassmorphism Nav Pill (Absolute Centered) */}
        <nav className="hidden md:flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-sm absolute left-1/2 -translate-x-1/2 w-max max-w-[60vw] overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none' }}>
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link 
                key={link.key}
                to={link.to} 
                className={`text-sm lg:text-base font-bold px-3 lg:px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
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
        
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Quick Contact Button */}
          <div className="relative" ref={contactRef}>
            <button 
              onClick={() => setIsContactOpen(!isContactOpen)}
              className={`px-3 lg:px-5 py-2 text-gray-700 bg-white/80 backdrop-blur-md border border-gray-300 rounded-full shadow-sm hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-1.5 lg:gap-2 ${isContactOpen ? 'bg-primary border-primary text-black' : ''}`}
              aria-label="Contact Options"
            >
              <Phone size={18} className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-gray-400 font-light text-sm lg:text-base leading-none">/</span>
              <Mail size={18} className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            
            {/* Contact Dropdown menu */}
            <div className={`absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[180px] flex flex-col gap-1 transition-all duration-300 origin-top-right ${isContactOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <a href="tel:+917412994434" onClick={() => setIsContactOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-900 font-bold whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={16} />
                </div>
                {i18n.language === 'hi' ? 'कॉल करें' : 'Call'}
              </a>
              <a href="mailto:contact@virenderchoudhary.com" onClick={() => setIsContactOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-900 font-bold whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <Mail size={16} />
                </div>
                {i18n.language === 'hi' ? 'ईमेल करें' : 'Email'}
              </a>
            </div>
          </div>

          <LanguageToggle />
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-gray-900 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} className="w-5 h-5" /> : <Menu size={20} className="w-5 h-5" />}
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
