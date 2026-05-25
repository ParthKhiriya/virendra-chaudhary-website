import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: "JsbAHWDbdIQ",
    title: "Janpaksh Fellowship Program 2026"
  },
  {
    id: "GAh3J0CqCRQ",
    title: "Janpaksh Mobile Journalism Conference 2025"
  },
  {
    id: "CM1HfGsJirE",
    title: "Virender Choudhary | Dr. Sahdev Choudhary Foundation"
  }
];

export default function News() {
  const { t, i18n } = useTranslation();
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

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

    // Cards stagger animation
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

  return (
    <section 
      id="news" 
      ref={container}
      className="relative w-full py-24 md:py-32 bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center px-6">
          <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
          <h2 
            ref={titleRef}
            className={`text-3xl md:text-5xl lg:text-6xl font-black text-primary uppercase drop-shadow-sm ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
          >
            {t('news.title')}
          </h2>
        </div>

        {/* Video Grid / Slider */}
        <div className="relative w-full" ref={columnsRef}>
          {/* Hide webkit scrollbar */}
          <style>{`
            #news-slider::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div 
            id="news-slider"
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 w-full pb-8 md:pb-0 px-[7.5vw] md:px-6 lg:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video, idx) => (
              <div 
                key={idx}
                tabIndex={0} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl active:shadow-2xl focus:shadow-2xl hover:-translate-y-3 active:-translate-y-3 focus:-translate-y-3 transition-all duration-500 w-[85vw] shrink-0 snap-center md:w-auto md:snap-align-none border border-gray-100/50"
              >
                {/* Accent Glow on Hover */}
                <div tabIndex={0} className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 group-active:bg-primary/5 group-focus:bg-primary/5 transition-colors duration-500 z-0 pointer-events-none" />
                
                {/* 9:16 Aspect Ratio Container for Shorts */}
                <div className="relative w-full pt-[177.77%] bg-black/5 z-10 overflow-hidden">
                  <iframe 
                    loading="lazy" 
                    title={video.title}
                    src={`https://www.youtube.com/embed/${video.id}?feature=oembed&rel=0`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>

                {/* Decorative Bottom Line */}
                <div tabIndex={0} className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-500 z-20" />
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-8 text-primary animate-pulse opacity-80">
            <span className="text-xs uppercase tracking-widest font-bold">
              {i18n.language === 'hi' ? 'और देखें' : 'Swipe to view more'}
            </span>
            <MoveRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
