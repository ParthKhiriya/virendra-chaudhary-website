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
        "px-4 lg:px-6 py-2.5 rounded-full font-bold text-base lg:text-lg text-gray-700 transition-all duration-300",
        "bg-white/80 hover:bg-primary active:bg-primary focus:bg-primary hover:text-black active:text-black focus:text-black backdrop-blur-md border border-gray-300 shadow-sm"
      )}
    >
      {i18n.language === 'en' ? 'हिंदी' : 'English'}
    </button>
  );
}
