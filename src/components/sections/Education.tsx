import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/1-2.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/2-2.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/3-2.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/4.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/5.png"
];

export default function Education() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Intro animation
  useGSAP(() => {
    gsap.fromTo(headerRef.current, 
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
  }, { scope: container });

  const getSlideStyle = (index: number) => {
    if (index === currentIndex) {
      return {
        zIndex: 10,
        scale: 1,
        opacity: 1,
        x: '0%',
        display: 'block'
      };
    } else if (index === (currentIndex + 1) % images.length) {
      return {
        zIndex: 5,
        scale: 0.85,
        opacity: 0.6,
        x: '60%',
        display: 'block'
      };
    } else if (index === (currentIndex - 1 + images.length) % images.length) {
      return {
        zIndex: 5,
        scale: 0.85,
        opacity: 0.6,
        x: '-60%',
        display: 'block'
      };
    } else {
      return {
        zIndex: 0,
        scale: 0.8,
        opacity: 0,
        x: index > currentIndex ? '80%' : '-80%',
        display: 'none'
      };
    }
  };

  return (
    <section 
      id="education" 
      ref={container}
      className="relative w-full py-24 md:py-32 bg-gray-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center mb-12 md:mb-16 px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center flex flex-col items-center">
          <div className="w-16 h-1 bg-primary mb-6 md:mb-8 rounded-full" />
          <h2 
            className={`text-3xl md:text-5xl lg:text-6xl font-black text-primary uppercase drop-shadow-lg mb-4 ${i18n.language === 'hi' ? 'tracking-[0.05em]' : 'tracking-tighter'}`}
          >
            {t('education.title')}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t('education.desc')}
          </p>
        </div>
      </div>

      {/* JioHotstar Style Slider */}
      <div className="relative w-full max-w-[100vw] h-[50vh] md:h-[65vh] flex justify-center items-center">
        <AnimatePresence initial={false} custom={direction}>
          {images.map((src, index) => {
            const style = getSlideStyle(index);
            if (style.display === 'none') return null;

            return (
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? '80%' : '-80%' }}
                animate={{
                  opacity: style.opacity,
                  scale: style.scale,
                  x: style.x,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`absolute w-[85vw] md:w-[65vw] h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ${index === currentIndex ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ zIndex: style.zIndex }}
                onClick={() => {
                  if (index === (currentIndex + 1) % images.length) handleNext();
                  if (index === (currentIndex - 1 + images.length) % images.length) handlePrev();
                }}
                drag={index === currentIndex ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
              >
                <img 
                  src={src} 
                  alt={`Education ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Cinematic Bottom Gradient (Active Only) */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/30 hover:bg-white hover:text-black text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-20 shadow-lg border border-white/10"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/30 hover:bg-white hover:text-black text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-20 shadow-lg border border-white/10"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
