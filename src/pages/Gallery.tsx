import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/27.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/28.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/30.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/24.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/25.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/23.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/16.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/15.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/14.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/13.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/12.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/11.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/9.png",
  "https://virendra.achtunglabs.co/wp-content/uploads/2017/11/1.png"
];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FAFAFA] overflow-hidden">
      
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-6">
            {t('galleryPage.title')}
          </h1>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full" />
        </motion.div>
      </section>

      {/* Modern Asymmetric Bento Grid */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[150px] md:auto-rows-[250px] gap-3 md:gap-4">
          {galleryImages.map((src, index) => {
            // Create a varied grid layout by applying different spans
            let spanClasses = 'col-span-1 row-span-1';
            
            // Create a dynamic pattern out of 14 images
            if (index === 0) spanClasses = 'col-span-2 row-span-2'; // Large hero image
            else if (index === 3) spanClasses = 'col-span-1 row-span-2'; // Tall vertical image
            else if (index === 6) spanClasses = 'col-span-2 row-span-1'; // Wide horizontal image
            else if (index === 8) spanClasses = 'col-span-2 row-span-2'; // Large middle image
            else if (index === 11) spanClasses = 'col-span-1 row-span-2'; // Tall vertical image
            else if (index === 13) spanClasses = 'col-span-2 row-span-1'; // Final podium image to perfectly close the grid

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer bg-gray-100 ${spanClasses}`}
                onClick={() => setSelectedImage(src)}
              >
                <motion.img 
                  layoutId={`gallery-image-${src}`}
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  tabIndex={0} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
                
                {/* Modern Hover Gradient & Icon */}
                <div tabIndex={0} className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 flex items-center justify-center">
                  <div tabIndex={0} className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-gray-900 transform translate-y-10 group-hover:translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 shadow-[0_0_30px_rgba(255,200,1,0.5)]">
                    <ZoomIn size={24} />
                  </div>
                </div>

                {/* Subtle border overlay */}
                <div tabIndex={0} className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[15px] p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-primary text-white hover:text-gray-900 rounded-full flex items-center justify-center transition-colors duration-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={28} />
            </motion.button>

            {/* Modal Image */}
            <motion.img 
              layoutId={`gallery-image-${selectedImage}`}
              src={selectedImage} 
              alt="Expanded view" 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
