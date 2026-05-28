import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "px-3 lg:px-5 py-2 rounded-full font-bold text-sm lg:text-base text-gray-700 transition-all duration-300",
        "bg-white/80 hover:bg-primary hover:text-black backdrop-blur-md border border-gray-300 shadow-sm"
      )}
    >
      {i18n.language === 'en' ? 'हिंदी' : 'English'}
    </button>
  );
}
