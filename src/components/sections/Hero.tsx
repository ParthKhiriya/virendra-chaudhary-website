import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const IMAGES = [
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/Untitled-design-42.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/Untitled-design-36.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/2-3.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/3-3.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/1-2.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/2-2.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/4.png',
  'https://virendra.achtunglabs.co/wp-content/uploads/2026/02/5.png'
];

// Shuffle arrays so each row feels organic
const row1 = [...IMAGES].sort(() => Math.random() - 0.5);
const row2 = [...IMAGES].sort(() => Math.random() - 0.5);
const row3 = [...IMAGES].sort(() => Math.random() - 0.5);

export default function Hero() {
  const { t, i18n } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const marquee1 = useRef<HTMLDivElement>(null);
  const marquee2 = useRef<HTMLDivElement>(null);
  const marquee3 = useRef<HTMLDivElement>(null);

  const isHi = i18n.language === 'hi';

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      ).fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      );
    }

    // Infinite marquee animations
    // By wrapping exactly 4 identical sets, xPercent: 0 to -50 will shift exactly two sets seamlessly
    if (marquee1.current) {
      gsap.fromTo(marquee1.current, 
        { xPercent: 0 },
        { xPercent: -50, ease: 'none', duration: 90, repeat: -1 }
      );
    }
    if (marquee2.current) {
      gsap.fromTo(marquee2.current, 
        { xPercent: -50 },
        { xPercent: 0, ease: 'none', duration: 120, repeat: -1 }
      );
    }
    if (marquee3.current) {
      gsap.fromTo(marquee3.current, 
        { xPercent: 0 },
        { xPercent: -50, ease: 'none', duration: 100, repeat: -1 }
      );
    }
  }, [t, i18n.language]);

  // Bento grid style image rendering
  const renderRow = (images: string[], isBento: boolean = false) => {
    return images.map((src, i) => (
      <div 
        key={i} 
        className={`shrink-0 rounded-2xl overflow-hidden opacity-90 hover:opacity-100 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FFC801]/20 hover:z-10 transition-all duration-500 cursor-pointer relative
          ${isBento && i % 3 === 0 ? 'w-[400px] h-[300px]' : 'w-[250px] h-[300px]'}
          ${isBento && i % 4 === 0 ? 'w-[300px] h-[300px]' : ''}
        `}
      >
        <img src={src} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
      </div>
    ));
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
      
      {/* Bento Grid Background (Rotated) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
        <div className="flex flex-col gap-6 w-[150vw] h-[150vh] -rotate-[15deg] scale-[1.25] justify-center">
          
          {/* Row 1 */}
          <div className="flex gap-6 w-max" ref={marquee1}>
            <div className="flex gap-6 shrink-0">{renderRow(row1, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row1, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row1, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row1, true)}</div>
          </div>
          
          {/* Row 2 */}
          <div className="flex gap-6 w-max" ref={marquee2}>
            <div className="flex gap-6 shrink-0">{renderRow(row2, false)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row2, false)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row2, false)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row2, false)}</div>
          </div>
          
          {/* Row 3 */}
          <div className="flex gap-6 w-max" ref={marquee3}>
            <div className="flex gap-6 shrink-0">{renderRow(row3, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row3, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row3, true)}</div>
            <div className="flex gap-6 shrink-0">{renderRow(row3, true)}</div>
          </div>

        </div>
      </div>

      {/* Vignette Overlay for premium depth */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(250,250,250,0.6)_100%)]" />

      {/* Kinetic Typography Foreground */}
      <div className="relative z-20 text-center px-4 pointer-events-none">
        <h1 
          ref={titleRef}
          className={`font-black uppercase text-gray-900 mb-6 drop-shadow-sm tracking-tighter ${isHi ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-[3rem] md:text-[5rem] lg:text-[7rem]'}`}
        >
          {t('hero.title')}
        </h1>
        <p 
          ref={subtitleRef}
          className="inline-block text-lg md:text-2xl text-primary font-bold tracking-wide bg-white/90 backdrop-blur-md px-8 py-3 rounded-full border border-gray-200 shadow-sm"
        >
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
