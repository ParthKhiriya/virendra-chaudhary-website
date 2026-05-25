import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ContactSection from '../components/sections/Contact';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const { i18n } = useTranslation();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      {/* Get in Touch Section */}
      <section className="relative w-full py-16 md:py-20 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full px-6 relative z-10 flex flex-col">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="w-16 h-1 bg-primary mb-6 md:mb-8 rounded-full shadow-[0_0_10px_rgba(255,200,1,0.5)]" />
            <h1 
              className="text-4xl md:text-5xl lg:text-7xl font-black text-primary uppercase drop-shadow-lg tracking-tighter mb-4"
            >
              {i18n.language === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              {i18n.language === 'hi' 
                ? 'हमसे संपर्क करें और अपने विचार साझा करें' 
                : 'We would love to hear from you. Drop us a message.'}
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            tabIndex={0} className="bg-white rounded-3xl shadow-[0_0_40px_rgba(255,200,1,0.15)] p-8 md:p-12 border-2 border-primary/20 hover:border-primary/50 active:border-primary/50 focus:border-primary/50 relative overflow-hidden group transition-all duration-500"
          >
            <div tabIndex={0} className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -z-10 group-hover:scale-[2 group-active:scale-[2 group-focus:scale-[2.5] transition-transform duration-700 ease-in-out" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {i18n.language === 'hi' ? 'आपका नाम' : 'Your Name'}
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {i18n.language === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                {i18n.language === 'hi' ? 'संदेश' : 'Message'}
              </label>
              <textarea 
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none"
                placeholder={i18n.language === 'hi' ? 'अपना संदेश यहां लिखें...' : 'How can we help you?'}
              ></textarea>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary text-gray-900 font-bold uppercase tracking-wider px-10 py-4 rounded-xl hover:bg-gray-900 active:bg-gray-900 focus:bg-gray-900 hover:text-primary active:text-primary focus:text-primary hover:-translate-y-1 active:-translate-y-1 focus:-translate-y-1 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl active:shadow-xl focus:shadow-xl disabled:opacity-70 disabled:hover:translate-y-0 active:translate-y-0 focus:translate-y-0 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <span>{i18n.language === 'hi' ? 'भेज रहा है...' : 'Sending...'}</span>
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{i18n.language === 'hi' ? 'संदेश भेजें' : 'Send Message'}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 font-bold animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{i18n.language === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message sent successfully!'}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 font-bold animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{i18n.language === 'hi' ? 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to send message. Please check your keys.'}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Map and Contacts Section */}
      <div className="relative z-10 w-full mt-4 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)] overflow-hidden">
        <ContactSection />
      </div>
    </div>
  );
}
