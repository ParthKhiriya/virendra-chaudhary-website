import { useTranslation } from 'react-i18next';
import { AtSign, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const navLinks = [
    { key: 'home', to: '/' },
    { key: 'about', to: '/about' },
    { key: 'foundation', to: '/#foundation' },
    { key: 'gallery', to: '/#gallery' },
    { key: 'news', to: '/#news' },
    { key: 'contact', to: '/#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gray-950 text-gray-300 pt-20 pb-8 border-t border-gray-900 relative z-10 overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Tagline */}
          <div className="lg:col-span-5 pr-0 lg:pr-12 flex flex-col items-start">
            <img 
              src="https://virendra.achtunglabs.co/wp-content/uploads/2018/05/2.png" 
              alt="Virendra Chaudhary" 
              className="w-32 md:w-40 h-32 md:h-40 object-cover rounded-full border-2 border-gray-800 shadow-xl mb-6 hover:border-primary transition-colors duration-300"
            />
            <h3 
              onClick={scrollToTop}
              className={`text-2xl md:text-3xl font-black text-white uppercase tracking-tighter cursor-pointer hover:text-primary transition-colors duration-300 inline-block mb-4 ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
            >
              {i18n.language === 'hi' ? 'वीरेंद्र चौधरी' : 'Virendra Chaudhary'}
            </h3>
            <div className="w-12 h-1 bg-primary mb-6 rounded-full" />
            <p className="text-gray-400 leading-relaxed max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.to}
                    className="text-gray-400 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-6">
              {t('footer.contactInfo')}
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-primary transition-colors mt-0.5" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-primary transition-colors" />
                <a href="tel:+917412994434" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +91 7412994434
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <AtSign className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-primary transition-colors" />
                <a 
                  href="https://www.instagram.com/virenderchoudharyrj21" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  @virenderchoudharyrj21
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
