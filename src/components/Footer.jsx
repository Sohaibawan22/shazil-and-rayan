import React from 'react';
import { Link } from 'react-router-dom';
import Truck from '../assets/Truck.svg'; // Custom truck icon for the logo

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#07080C] text-gray-400 pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          
          {/* Column 1: Brand & Socials (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            {/* Logo */}
            <div className="flex items-center gap-3.5 mb-5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {/* Custom Golden Sports Car SVG Logo */}
              <div className="flex items-center justify-center shrink-0">
                <img src={Truck} alt="Shazil & Rayan Logo" className="w-8 h-8 group-hover:animate-pulse" />
              </div>
              
              {/* Text Logo */}
              <div className="flex flex-col leading-none">
                <span className="font-black text-[15px] text-white tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>Shazil And Rayan</span>
                <span className="font-extrabold text-[11px] text-[#F5C71A] tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>CARGO CAR CARRIER SERVICES</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-xs font-semibold leading-relaxed mb-6 max-w-xs">
              We provide safe, secure and reliable vehicle transport services all over Pakistan.
            </p>

            {/* Social Icons inside sleek round borders */}
            <div className="flex items-center gap-3">
              {[
                {
                  name: 'fb',
                  svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                },
                {
                  name: 'ig',
                  svg: <g><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></g>
                },
                {
                  name: 'wa',
                  svg: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.name === 'wa' ? 'https://wa.me/923001234567' : '#'}
                  target={social.name === 'wa' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 text-white flex items-center justify-center transition-all duration-300 hover:border-[#F5C71A] hover:text-[#F5C71A]"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-white font-extrabold text-[14px] tracking-wider mb-5 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-xs text-gray-400">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'Vehicles', id: 'vehicles' },
                { label: 'About Us', id: 'about' },
                { label: 'Contact Us', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="hover:text-[#F5C71A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-white font-extrabold text-[14px] tracking-wider mb-5 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-xs text-gray-400">
              {[
                'Car Transportation',
                'Door to Door Delivery',
                'Intercity Transport',
                'Fully Insured',
                '24/7 Support'
              ].map((srv) => (
                <li key={srv}>
                  <a 
                    href="#services" 
                    onClick={(e) => handleNavClick(e, 'services')}
                    className="hover:text-[#F5C71A] transition-colors"
                  >
                    {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (4 Cols) */}
          

        </div>

        {/* Bottom divider line */}
        <div className="w-full h-[1px] bg-white/5 my-8" />

        {/* Footer Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-gray-500">
          <span>© {currentYear} Shazil And Rayan Interprise. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
