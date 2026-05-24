import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Truck, MapPin, Phone, MessageSquare } from 'lucide-react';

const HeroSection = ({ fadeInUp }) => {
  const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent("Hello SR interprise  I would like to get a quote for vehicle transport.")}`;

  const handleBookNow = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOurServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-black pt-28 pb-20 md:py-0"
    >
      {/* Background Image & Slick Premium Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=2000"
          alt="SR Interprise Car Go Carrier Truck"
          className="w-full h-full object-cover opacity-35 object-center"
        />
        {/* Sleek radial and linear gradients for ultimate visual excellence */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,8,16,0.95) 0%, rgba(6,8,16,0.85) 45%, rgba(6,8,16,0.4) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 30%, transparent 20%, rgba(6,8,16,0.8) 80%)' }} />
      </div>

      {/* Grid overlay for high-tech texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Subtitle Gold Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#F5C71A] font-extrabold tracking-[0.18em] text-[11px] sm:text-xs uppercase mb-3.5 block" style={{ fontFamily: 'Outfit, sans-serif' }}>
                SAFE. SECURE. ON TIME.
              </span>
            </motion.div>

            {/* Giant Premium Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-2 text-white tracking-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              initial={{ opacity: 0, y: 25 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
            >
            SHAZIL AND RAYAN   <br className="hidden sm:inline font-bold" /> 
               <span 
      className="text-white font-bold block mb-5 tracking-wide"
      style={{ 
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(14px, 4vw, 20px)'
      }}
    >
      CARGO CAR CARRIER SERVICES
    </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-gray-300 text-[14px] sm:text-[16px] leading-relaxed mb-8 max-w-xl font-medium"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We provide professional goods transportation, logistics management, and car carrier trailer services with safety, speed, and reliability. From commercial cargo delivery to secure vehicle transportation, our modern fleet and experienced team ensure smooth transport solutions for businesses and individuals nationwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="#contact" 
                onClick={handleBookNow}
                className="bg-[#F5C71A] hover:bg-[#E0B212] text-black font-extrabold text-xs tracking-widest px-8 py-3.5 rounded flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,199,26,0.5)] transform hover:-translate-y-0.5 active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                BOOK NOW <ChevronRight size={15} className="stroke-[3px]" />
              </a>
              <a 
                href="#services" 
                onClick={handleOurServices}
                className="border border-[#F5C71A] text-white hover:bg-[#F5C71A] hover:text-black font-extrabold text-xs tracking-widest px-8 py-3.5 rounded flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                OUR SERVICES
              </a>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Feature Box */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              className="w-full max-w-[360px] rounded-xl border border-white/10 p-7 md:p-8 shadow-2xl relative overflow-hidden shrink-0"
              style={{ 
                background: 'rgba(25, 28, 41, 0.45)', 
                backdropFilter: 'blur(16px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {/* Highlight background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5C71A]/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#F5C71A]/20 bg-[#F5C71A]/10 text-[#F5C71A]">
                    <Truck size={18} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-sm tracking-wide mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Fast & Safe Delivery
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold">On-time, every time</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#F5C71A]/20 bg-[#F5C71A]/10 text-[#F5C71A]">
                    <MapPin size={18} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-sm tracking-wide mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      All Over Pakistan
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold">From city to city</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[#F5C71A]/20 bg-[#F5C71A]/10 text-[#F5C71A]">
                    <Phone size={18} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-sm tracking-wide mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      24/7 Support
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold">We are always here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* WhatsApp Floating Banner at the bottom right of the Hero Section */}
      <motion.div 
        className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-[11px] sm:text-xs tracking-wider px-4 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg shadow-[#25d366]/20 hover:scale-105"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {/* WhatsApp Logo */}
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
          Chat on WhatsApp
        </a>
      </motion.div>

      {/* Elegant Downward-Dipping Curved Section Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-full h-[35px] md:h-[60px] fill-white text-white">
          <path d="M0,0 C240,90 480,120 720,120 C960,120 1200,90 1440,0 L1440,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
