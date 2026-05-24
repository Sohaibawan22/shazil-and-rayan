import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const handleLearnMore = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const bulletPoints = [
    'Experienced & Professional Team',
    'Safe & Secure Transportation',
    'On-time Delivery Commitment'
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-center text-left"
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            {/* Subtitle Badge */}
            <span className="text-[#F5C71A] font-extrabold tracking-[0.18em] text-[11px] sm:text-xs uppercase mb-3.5 block" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ABOUT US
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl md:text-[38px] font-black leading-[1.15] mb-5 text-[#111827] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We Are  Shazil And Rayan interprise
            </h2>

            {/* Paragraph Text */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
               Shazil And Rayan interprise is a professional vehicle transportation company providing safe, secure and timely delivery services to all major cities. Customer satisfaction is our top priority.
            </p>

            {/* Key Bullet List */}
            <ul className="flex flex-col gap-3.5 mb-8">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-slate-800 font-extrabold text-[13px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <div className="w-[18px] h-[18px] rounded-full bg-[#F5C71A]/10 border border-[#F5C71A]/30 flex items-center justify-center text-[#F5C71A]">
                    <Check size={11} className="stroke-[3.5px]" />
                  </div>
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div>
              <a 
                href="#contact"
                onClick={handleLearnMore}
                className="bg-[#F5C71A] hover:bg-[#E0B212] text-black font-extrabold text-xs tracking-widest px-8 py-3.5 rounded inline-flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,199,26,0.5)] transform hover:-translate-y-0.5 active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                LEARN MORE <ArrowRight size={14} className="stroke-[3px]" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Beautiful Loaded Carrier Image */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100 max-h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1000"
                alt="Multi Car Carrier loaded on a highway"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              />
              {/* Subtle top/bottom overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
