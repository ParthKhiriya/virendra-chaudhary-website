import { useTranslation } from 'react-i18next';
import ContactSection from '../components/sections/Contact';
import { Mail } from 'lucide-react';
import { Instagram, Facebook, Twitter } from '../components/icons/SocialIcons';

export default function ContactPage() {
  const { i18n } = useTranslation();

  const socials = [
    {
      name: 'Instagram',
      handle: '@virenderchoudharyrj21',
      icon: Instagram,
      link: 'https://www.instagram.com/virenderchoudharyrj21?igsh=MWVjZThvYTFwdWp1aw==',
      color: 'hover:text-pink-600',
      bgHover: 'group-hover:bg-pink-50',
      hintEn: 'Click to open',
      hintHi: 'खोलने के लिए क्लिक करें'
    },
    {
      name: 'Facebook',
      handle: 'Virender Choudhary',
      icon: Facebook,
      link: 'https://www.facebook.com/share/18RXy3ZZ4A/?mibextid=wwXIfr',
      color: 'hover:text-blue-600',
      bgHover: 'group-hover:bg-blue-50',
      hintEn: 'Click to open',
      hintHi: 'खोलने के लिए क्लिक करें'
    },
    {
      name: 'X (Twitter)',
      handle: '@virender_rj21',
      icon: Twitter,
      link: 'https://x.com/virender_rj21?s=21',
      color: 'hover:text-gray-900',
      bgHover: 'group-hover:bg-gray-200',
      hintEn: 'Click to open',
      hintHi: 'खोलने के लिए क्लिक करें'
    },
    {
      name: 'Email',
      handle: 'contact@virenderchoudhary.com',
      icon: Mail,
      link: 'mailto:contact@virenderchoudhary.com',
      color: 'hover:text-red-500',
      bgHover: 'group-hover:bg-red-50',
      hintEn: 'Click to send mail',
      hintHi: 'ईमेल भेजने के लिए क्लिक करें'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      {/* Get in Touch Section */}
      <section className="relative w-full py-16 md:py-20 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full px-6 relative z-10 flex flex-col">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-primary mb-6 md:mb-8 rounded-full shadow-[0_0_10px_rgba(255,200,1,0.5)]" />
            <h1 
              className="text-4xl md:text-5xl lg:text-7xl font-black text-primary uppercase drop-shadow-lg tracking-tighter mb-4"
            >
              {i18n.language === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              {i18n.language === 'hi' 
                ? 'हमसे संपर्क करें और अपने विचार साझा करें' 
                : 'We would love to hear from you. Drop us a message.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full max-w-5xl mx-auto">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <a 
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-[2] transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
                  
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center transition-colors duration-500 ${social.bgHover}`}>
                    <Icon className={`w-7 h-7 text-gray-700 transition-colors duration-500 ${social.color}`} />
                  </div>
                  
                  <div className="flex flex-col items-center md:items-start text-center md:text-left pt-1 min-w-0 flex-1 w-full">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {social.name}
                    </p>
                    <h3 
                      className="text-[17px] md:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 truncate w-full"
                      title={social.handle}
                    >
                      {social.handle}
                    </h3>
                    <p className="text-xs text-primary/60 group-hover:text-primary mt-1.5 md:mt-2 font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-300">
                      {i18n.language === 'hi' ? social.hintHi : social.hintEn}
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </p>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden md:block">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map and Contacts Section */}
      <div className="relative z-10 w-full mt-4 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <ContactSection />
      </div>
    </div>
  );
}
