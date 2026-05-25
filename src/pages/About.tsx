import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, GraduationCap, Building, Medal, Users, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineData = t('aboutPage.timeline', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    org: string;
    desc: string;
  }>;

  const awardsData = t('aboutPage.awards.items', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    desc: string;
  }>;

  const affiliationsData = t('aboutPage.affiliations.items', { returnObjects: true }) as Array<{
    role: string;
    org: string;
    loc: string;
    desc: string;
  }>;

  const getIcon = (index: number) => {
    if (index === 0) return <GraduationCap size={20} className="text-white" />;
    if (index === 1) return <Briefcase size={20} className="text-white" />;
    if (index >= 4) return <Building size={20} className="text-white" />;
    return <Briefcase size={20} className="text-white" />;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FAFAFA] overflow-hidden">
      
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-8">
            {t('about.title')}
          </h1>
          <div className="w-16 h-1.5 bg-primary mx-auto mb-10 rounded-full" />
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify md:text-center font-medium">
            {t('aboutPage.personalDetails')}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="animate-bounce p-3 bg-white rounded-full border border-gray-200 text-primary shadow-lg">
            <ChevronDown size={24} />
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-6 relative z-10 mb-32">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full overflow-hidden">
           <motion.div 
             className="w-full h-full bg-gradient-to-b from-primary via-primary to-transparent origin-top"
             initial={{ scaleY: 0 }}
             whileInView={{ scaleY: 1 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />
        </div>
        
        {/* Timeline Start Dot */}
        <div className="absolute left-6 md:left-1/2 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-[6px] md:-translate-x-1/2 -mt-2 border-4 border-white shadow-sm z-20" />
        
        {/* Timeline End Dot */}
        <div className="absolute left-6 md:left-1/2 bottom-0 w-4 h-4 bg-gray-300 rounded-full transform -translate-x-[6px] md:-translate-x-1/2 -mb-2 border-4 border-white shadow-sm z-20" />

        <div className="relative space-y-8 md:space-y-12 py-12">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} tabIndex={0} className="relative flex flex-col md:flex-row items-center md:justify-between w-full group">
                
                {/* Timeline Node (Icon) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                  tabIndex={0} className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gray-800 group-hover:bg-primary transition-colors duration-500 border-4 border-[#FAFAFA] flex items-center justify-center z-20 shadow-lg"
                >
                  <div tabIndex={0} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {getIcon(index)}
                  </div>
                </motion.div>

                {/* Content Box */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'}`}
                >
                  <div tabIndex={0} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 group-hover:shadow-primary/20 group-hover:border-primary/30 group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                    
                    <div tabIndex={0} className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className={`flex items-center gap-2 mb-3 text-primary font-bold tracking-widest text-sm uppercase ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <Calendar size={16} />
                      {item.year}
                    </div>
                    
                    <h3 tabIndex={0} className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <h4 tabIndex={0} className="text-lg font-bold text-gray-700 mb-4 pb-4 border-b border-gray-100 group-hover:border-primary/20 transition-colors duration-300">
                      {item.org}
                    </h4>
                    
                    <p className="text-gray-500 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Social Work Section */}
      <section className="bg-white py-24 border-y border-gray-100 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartHandshake size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
              {t('aboutPage.socialWork.title')}
            </h2>
            <div className="w-16 h-1.5 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify font-medium">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              {t('aboutPage.socialWork.p1')}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              {t('aboutPage.socialWork.p2')}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            tabIndex={0} className="mt-16 p-8 md:p-12 bg-white rounded-3xl text-center relative overflow-hidden group shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary/80 to-primary" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl md:text-3xl font-bold text-gray-800 italic leading-relaxed relative z-10">
              {t('aboutPage.socialWork.quote')}
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Awards & Affiliations Sections (Stacked Vertically) */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10 space-y-32">
        
        {/* Awards */}
        <div>
          <div className="flex flex-col items-center justify-center gap-4 mb-16 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Medal size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">
              {t('aboutPage.awards.title')}
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mt-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {awardsData.map((award, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                tabIndex={0} className="bg-white flex flex-col items-center justify-center p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 relative group"
              >
                <div tabIndex={0} className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                <span className="text-base font-bold text-primary tracking-widest uppercase mb-4 block">
                  {award.year}
                </span>
                <h4 tabIndex={0} className="text-2xl font-black text-gray-900 leading-snug group-hover:text-primary transition-colors duration-300 z-10">
                  {award.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Affiliations (Table Format) */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 mb-16 text-center">
            <div className="w-16 h-16 bg-gray-900 text-primary rounded-full flex items-center justify-center shadow-lg">
              <Users size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter">
              {t('aboutPage.affiliations.title')}
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mt-4" />
          </div>
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-primary">
                    <th className="py-3 px-3 md:py-5 md:px-6 text-xs md:text-sm font-bold uppercase tracking-wider">{t('aboutPage.affiliations.table.role')}</th>
                    <th className="py-3 px-3 md:py-5 md:px-6 text-xs md:text-sm font-bold uppercase tracking-wider">{t('aboutPage.affiliations.table.org')}</th>
                    <th className="py-3 px-3 md:py-5 md:px-6 text-xs md:text-sm font-bold uppercase tracking-wider">{t('aboutPage.affiliations.table.loc')}</th>
                    <th className="py-3 px-3 md:py-5 md:px-6 text-xs md:text-sm font-bold uppercase tracking-wider">{t('aboutPage.affiliations.table.desc')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {affiliationsData.map((aff, idx) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      tabIndex={0} className="hover:bg-primary/5 transition-colors group"
                    >
                      <td tabIndex={0} className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-base font-bold text-gray-800 align-top group-hover:text-primary transition-colors">
                        {aff.role}
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-base font-bold text-gray-900 align-top">
                        {aff.org}
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-base font-semibold text-gray-700 align-top">
                        {aff.loc}
                      </td>
                      <td className="py-3 px-3 md:py-4 md:px-6 text-xs md:text-base text-gray-600 font-medium align-top">
                        {aff.desc}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
