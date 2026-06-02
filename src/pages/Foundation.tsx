import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Target, Users, BookOpen, ShieldCheck, Megaphone, Smartphone, Heart, Network } from 'lucide-react';

const ImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Auto slide every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div tabIndex={0} className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-100 aspect-[635/415] group/slider w-full h-full">
      {images && images.length > 0 ? (
        <>
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} image ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
          
          {/* Slider Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-500 backdrop-blur-md ${
                    dotIdx === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
    </div>
  );
};

export default function Foundation() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initiatives = t('foundationPage.initiatives', { returnObjects: true }) as Array<{
    title: string;
    date: string;
    location: string;
    desc: string;
    images?: string[];
  }>;

  const objectives = t('foundationPage.objectives', { returnObjects: true }) as Array<{title: string, desc: string}>;
  const aboutDesc = t('foundationPage.aboutDesc', { returnObjects: true }) as string[];

  // Define icons mapping for objectives
  const objIcons = [Target, Users, BookOpen, ShieldCheck, Megaphone, Smartphone, Heart, Network];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FAFAFA] overflow-hidden">
      
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-8 [word-spacing:0.15em]">
            {t('foundationPage.name')}
          </h1>
          <div className="w-16 h-1.5 bg-primary mx-auto mb-10 rounded-full" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-[#F5F5F5] p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-left mb-16 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-[1.5] transition-transform duration-700 ease-in-out opacity-50" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3 [word-spacing:0.15em]">
            {t('foundationPage.aboutTitle')}
          </h2>
          <div className="space-y-4">
            {aboutDesc.map((paragraph, idx) => (
              <p key={idx} className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Objectives Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter [word-spacing:0.15em]">
            {t('foundationPage.objectivesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {objectives.map((obj, idx) => {
            const Icon = objIcons[idx % objIcons.length];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group flex flex-col items-center text-center cursor-default lg:col-span-2 ${idx === 3 ? 'lg:col-start-2' : ''}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-[2] transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors shadow-sm relative z-10">
                  <Icon className="w-8 h-8 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-3 relative z-10 [word-spacing:0.1em]">
                  {obj.title}
                </h3>
                <p className="text-gray-600 font-medium text-base md:text-lg leading-snug relative z-10">
                  {obj.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="animate-bounce p-3 bg-white rounded-full border border-gray-200 text-primary shadow-lg">
            <ChevronDown size={24} />
          </div>
        </motion.div>
      </section>

      {/* Initiatives - Alternating Rows Layout */}
      <section className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 md:space-y-32">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tighter [word-spacing:0.15em]">
            {t('foundationPage.title')}
          </h2>
        </div>
        {initiatives.map((item, index) => {
          const isEven = index % 2 === 1; // 0 is odd in visual terms (image left), 1 is even (image right)
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
            >
              
              {/* Image Carousel Column */}
              <div tabIndex={0} className="w-full md:flex-1 relative group">
                <div tabIndex={0} className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <ImageSlider images={item.images || []} title={item.title} />
              </div>

              {/* Text Column */}
              <div className="w-full md:flex-1 space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                  <span className="text-primary mr-4">{(index + 1).toString().padStart(2, '0')}</span>
                  {item.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
                  {item.date && (
                    <div className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800 uppercase tracking-wider">
                      <Calendar size={18} className="text-primary" />
                      {item.date}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-800 uppercase tracking-wider">
                      <MapPin size={18} className="text-primary" />
                      {item.location}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium text-justify">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          );
        })}
      </section>

    </div>
  );
}
