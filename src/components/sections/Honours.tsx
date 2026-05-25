import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Honours() {
  const { t, i18n } = useTranslation();
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth * 0.85;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useGSAP(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Columns stagger animation
    if (columnsRef.current) {
      gsap.fromTo(columnsRef.current.children, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: columnsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, { scope: container });

  const columns = [
    {
      image: "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/1-3.png",
      title: t('honours.col1.title'),
      text: t('honours.col1.text')
    },
    {
      image: "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/2-3.png",
      title: t('honours.col2.title'),
      text: t('honours.col2.text')
    },
    {
      image: "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/3-3.png",
      title: t('honours.col3.title'),
      text: t('honours.col3.text')
    }
  ];

  return (
    <section 
      id="honours" 
      ref={container}
      className="relative w-full py-24 md:py-32 bg-gray-50 flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
          <h2 
            ref={titleRef}
            className={`text-3xl md:text-5xl lg:text-6xl font-black text-primary uppercase drop-shadow-sm ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
          >
            {t('honours.title')}
          </h2>
        </div>

        {/* 3 Column Grid / Mobile Slider */}
        <div className="relative w-full" ref={columnsRef}>
          {/* Hide webkit scrollbar with a style tag for cleaner inline approach */}
          <style>{`
            #honours-slider::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div 
            id="honours-slider"
            ref={sliderRef} 
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 xl:gap-12 w-full pb-4 md:pb-0 px-[7.5vw] md:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {columns.map((col, idx) => (
              <div 
                key={idx}
                tabIndex={0} className="flex flex-col group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl active:shadow-2xl focus:shadow-2xl hover:-translate-y-2 active:-translate-y-2 focus:-translate-y-2 transition-all duration-500 border border-gray-100 w-[85vw] max-w-[85vw] md:w-auto md:max-w-none h-[75vh] max-h-[600px] md:h-auto md:max-h-none snap-center md:snap-align-none shrink-0 relative"
              >
                {/* Image & Number Header */}
                <div className="relative shrink-0 w-full">
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img 
                      src={col.image} 
                      alt={col.title}
                      tabIndex={0} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 group-active:scale-105 group-focus:scale-105"
                    />
                    <div tabIndex={0} className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Decorative Number */}
                  <div className="absolute bottom-0 right-4 md:right-6 translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white text-gray-900 font-bold text-lg md:text-xl z-20">
                    0{idx + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-1 relative overflow-y-auto">
                  <h3 tabIndex={0} className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-primary group-active:text-primary group-focus:text-primary transition-colors duration-300 pr-8 md:pr-0 shrink-0">
                    {col.title}
                  </h3>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify">
                    {col.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider Controls */}
          <div className="flex md:hidden justify-center items-center gap-4 mt-6">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-900 active:scale-95 transition-transform hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-900 active:scale-95 transition-transform hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
