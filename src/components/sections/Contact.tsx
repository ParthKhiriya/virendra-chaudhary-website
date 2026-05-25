import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, AtSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left column animation
    gsap.fromTo(leftRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Right column animation
    gsap.fromTo(rightRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        
        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Text Content */}
          <div ref={leftRef} className="w-full lg:w-1/2 flex flex-col justify-start">
            <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
            <h2 
              className={`text-3xl md:text-5xl lg:text-6xl font-black text-primary uppercase drop-shadow-sm mb-12 ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
            >
              {t('contact.title')}
            </h2>

            <div className="flex flex-col gap-8">
              {/* Call Us */}
              <div tabIndex={0} className="group flex items-start gap-6">
                <div tabIndex={0} className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <Phone className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t('contact.call')}</p>
                  <a href="tel:+917412994434" className="text-xl md:text-2xl font-semibold text-gray-900 hover:text-primary transition-colors">
                    +91 7412994434
                  </a>
                </div>
              </div>

              {/* Location */}
              <div tabIndex={0} className="group flex items-start gap-6">
                <div tabIndex={0} className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <MapPin className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t('contact.visit')}</p>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                    First India News, No. 9, S.B Tower Ground Floor, Sahakar Marg, Jyothi Nagar, Lalkothi, Jaipur, Rajasthan 302001
                  </p>
                </div>
              </div>

              {/* Social / Connect */}
              <div tabIndex={0} className="group flex items-start gap-6">
                <div tabIndex={0} className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <AtSign className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t('contact.message')}</p>
                  <a 
                    href="https://www.instagram.com/virenderchoudharyrj21" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
                  >
                    @virenderchoudharyrj21
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map Embed */}
          <div ref={rightRef} className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
              <iframe 
                src="https://maps.google.com/maps?t=m&output=embed&iwloc=near&z=12&q=First+India+News+%28+%E0%A4%AB%E0%A4%BC%E0%A4%B0%E0%A5%8D%E0%A4%B8%E0%A5%8D%E0%A4%9F+%E0%A4%87%E0%A4%82%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A4%BE+%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%9C%E0%A4%BC+%29%2C+No.+9%2C+S.B+Tower+Ground+Floor%2C+Sahakar+Marg%2C+Jyothi+Nagar%2C+Lalkothi%2C+Jaipur%2C+Rajasthan+302001"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
