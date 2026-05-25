import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

// Newspaper cutouts extracted from the original site
const newsImages = [
  "/images/news/new_news.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.03-PM.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.02-PM-3.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.02-PM-2.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.02-PM-1.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.02-PM.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.01-PM-2.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.01-PM-1.jpeg",
  "https://virendra.achtunglabs.co/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-09-at-8.49.01-PM.jpeg"
];

export default function News() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const container = useRef<HTMLElement>(null);

  // Auto play
  useEffect(() => {
    // Disable autoplay if modal is open
    if (selectedImage) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, selectedImage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % newsImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + newsImages.length) % newsImages.length);
  };

  const getSlideStyle = (index: number) => {
    if (index === currentIndex) {
      return {
        zIndex: 10,
        scale: 1,
        opacity: 1,
        x: '0%',
        display: 'block'
      };
    } else if (index === (currentIndex + 1) % newsImages.length) {
      return {
        zIndex: 5,
        scale: 0.85,
        opacity: 0.6,
        x: '60%',
        display: 'block'
      };
    } else if (index === (currentIndex - 1 + newsImages.length) % newsImages.length) {
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-950 flex flex-col relative overflow-hidden text-white">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <section ref={container} className="relative w-full py-12 md:py-20 flex-1 flex flex-col justify-center">
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center mb-12 md:mb-16 px-6">
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-1 bg-primary mb-6 md:mb-8 rounded-full shadow-[0_0_15px_rgba(255,200,1,0.5)]" />
            <h1 
              className="text-4xl md:text-5xl lg:text-7xl font-black text-primary uppercase drop-shadow-lg tracking-tighter mb-4"
            >
              {t('news.title', 'News')}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              {i18n.language === 'hi' 
                ? 'मीडिया कवरेज और समाचार' 
                : 'Media Coverage and News'}
            </p>
          </div>
        </div>

        {/* JioHotstar Style Slider for Newspaper Cutouts */}
        <div className="relative w-full max-w-[100vw] h-[55vh] md:h-[65vh] flex justify-center items-center">
          <AnimatePresence initial={false} custom={direction}>
            {newsImages.map((src, index) => {
              const style = getSlideStyle(index);
              if (style.display === 'none') return null;
              
              const isCenter = index === currentIndex;

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
                  className={`absolute w-[85vw] md:w-[55vw] lg:w-[45vw] h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-900 ${isCenter ? 'cursor-pointer group' : 'cursor-pointer'}`}
                  style={{ 
                    zIndex: style.zIndex,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setSelectedImage(src);
                    } else {
                      if (index === (currentIndex + 1) % newsImages.length) handleNext();
                      if (index === (currentIndex - 1 + newsImages.length) % newsImages.length) handlePrev();
                    }
                  }}
                  drag={isCenter ? "x" : false}
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
                    alt={`Newspaper cutout ${index + 1}`}
                    // Crop to the heading section
                    className="w-full h-full object-cover object-top opacity-95 transition-transform duration-700 pointer-events-none"
                  />
                  
                  {/* Subtle reflection/gradient for inactive slides */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 pointer-events-none transition-opacity duration-300" />
                  )}

                  {/* Read More Overlay on Hover for Center Slide */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center pointer-events-none">
                      <div className="bg-primary/90 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-5 h-5" />
                        <span>Read Full News</span>
                      </div>
                    </div>
                  )}
                  
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-8 lg:left-24 xl:left-48 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full flex items-center justify-center transition-all z-30 shadow-xl border border-white/20 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-8 lg:right-24 xl:right-48 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full flex items-center justify-center transition-all z-30 shadow-xl border border-white/20 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 flex-wrap justify-center max-w-[80vw]">
            {newsImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 h-2.5 bg-primary shadow-[0_0_10px_rgba(255,200,1,0.6)]' : 'w-2 h-2 bg-white/30 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Lightbox / Modal for Full News Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-900 shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
              // Style specifically for hiding standard scrollbar while allowing scrolling
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                .relative::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <img 
                src={selectedImage} 
                alt="Full News Article"
                className="w-full h-auto object-contain block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
