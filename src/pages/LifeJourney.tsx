import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LifeJourney() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = t('lifeJourney.sections', { returnObjects: true }) as Array<{ title: string, desc: string }>;
  const isHindi = i18n.language === 'hi';

  // For parallax on the header image
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    // GSAP ScrollTrigger for alternating timeline items
    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { 
          opacity: 0, 
          y: 50,
          x: index % 2 === 0 ? -30 : 30
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [sections] });

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden font-sans" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900/60 z-10" />
          <img 
            src="https://virendra.achtunglabs.co/wp-content/uploads/2018/05/2.png" 
            alt="Virender Choudhary" 
            className="w-full h-full object-cover object-top filter grayscale brightness-75"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8" />
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase drop-shadow-2xl ${isHindi ? 'tracking-[0.05em]' : 'tracking-tighter'}`}>
              {t('lifeJourney.pageTitle')}
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 mt-6 font-medium tracking-wide">
              {t('lifeJourney.pageSubtitle')}
            </p>
          </motion.div>
        </div>

        {/* Diagonal Cut Bottom */}
        <div className="absolute -bottom-1 left-0 right-0 z-20 overflow-hidden line-height-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
            <path d="M1200 120L0 120 0 0 1200 120z" className="fill-[#FAFAFA]"></path>
          </svg>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Central Line */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-32 w-0.5 bg-gray-200 -translate-x-1/2" />

        <div className="space-y-16 md:space-y-32 relative z-10">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const number = String(index + 1).padStart(2, '0');

            return (
              <div 
                key={index} 
                className={`timeline-item flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Empty Half for spacing on Desktop */}
                <div className="hidden md:block md:w-[45%]" />

                {/* Central Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-100 shadow-xl items-center justify-center z-20 group">
                  <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-150 transition-transform duration-500" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] relative ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  {/* Decorative Number */}
                  <div className={`absolute top-0 -z-10 text-[8rem] md:text-[10rem] font-black text-gray-200 select-none ${isEven ? 'right-0 md:right-8' : 'left-0 md:left-8'} -translate-y-1/2`}>
                    {number}
                  </div>

                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-primary/20 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 relative group overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 relative z-10 group-hover:text-primary transition-colors duration-500">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed text-justify relative z-10">
                      {section.desc}
                    </p>

                    {/* Minimalist Accent Line */}
                    <div className={`w-16 h-1 bg-primary rounded-full mt-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${isEven ? 'md:ml-auto' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
