import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Globe, Signal, Building, Library, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, i18n } = useTranslation();
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pointersContainerRef = useRef<HTMLDivElement>(null);

  const pointerIcons = [
    GraduationCap,
    Globe,
    Signal,
    Building,
    Library,
    Users
  ];

  const pointers = t('about.pointers', { returnObjects: true }) as Array<{ title: string, desc: string }>;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom', // Trigger immediately as it enters screen
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(titleRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    .fromTo(textRef1.current, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 
      "-=0.2"
    )
    .fromTo(textRef2.current, 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 
      "-=0.2"
    )
    .fromTo(imageRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      "-=0.4"
    );

    // Animate the pointer cards staggering in
    if (pointersContainerRef.current) {
      gsap.fromTo(pointersContainerRef.current.children, 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.04,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: pointersContainerRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, { scope: container });

  return (
    <section 
      id="about" 
      ref={container}
      className="relative w-full min-h-[80vh] bg-white py-32 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial glow for premium depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center md:text-left md:items-start">
        
        {/* Title above grid to allow exact text-image alignment */}
        <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-12">
          <div className="w-24 h-1.5 bg-primary mb-8 rounded-full opacity-80" />
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-primary uppercase drop-shadow-sm ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
          >
            {t('about.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          {/* Left Side: Text */}
          <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <div className="space-y-8 text-xl md:text-2xl text-gray-600 font-medium leading-relaxed tracking-wide text-justify w-full">
              <p ref={textRef1}>
                {t('about.p1')}
              </p>
              <p ref={textRef2}>
                {t('about.p2')}
              </p>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-12 lg:mt-0" ref={imageRef}>
            <div tabIndex={0} className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                src="https://virendra.achtunglabs.co/wp-content/uploads/2026/02/Untitled-design-36.png" 
                alt="Virender Choudhary" 
                tabIndex={0} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-black/5 rounded-3xl pointer-events-none" />
              {/* Subtle hover overlay */}
              <div tabIndex={0} className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 6 Clickable Pointers Grid */}
        <div 
          ref={pointersContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 w-full"
        >
          {pointers.map((pointer, idx) => {
            const Icon = pointerIcons[idx];
            return (
              <Link 
                key={idx}
                to="/life-journey"
                tabIndex={0} className="group relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-200 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg overflow-hidden cursor-pointer flex flex-col items-start gap-3 md:gap-4"
              >
                {/* Hover Glow Effect */}
                <div tabIndex={0} className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Card Content Wrapper: Row on mobile, Col on desktop */}
                <div className="flex flex-row md:flex-col items-start gap-4 md:gap-0 w-full relative z-10">
                  {/* Icon Container */}
                  <div tabIndex={0} className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center md:mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:border-primary/30">
                    <Icon tabIndex={0} className="w-5 h-5 md:w-6 md:h-6 text-gray-900 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  
                  {/* Text Container */}
                  <div className="flex flex-col flex-1">
                    <h3 tabIndex={0} className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-4 tracking-wide group-hover:text-primary transition-colors duration-500">
                      {pointer.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
                      {pointer.desc}
                    </p>
                  </div>
                </div>

                {/* Minimalist Arrow */}
                <div tabIndex={0} className="absolute bottom-5 right-5 md:bottom-8 md:right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
