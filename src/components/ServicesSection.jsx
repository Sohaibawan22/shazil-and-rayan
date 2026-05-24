import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, Map, Shield, Headset } from 'lucide-react';
import axios from 'axios';

// Elegant default services data matching the mockup exactly
const DEFAULT_SERVICES = [
  {
    _id: 'default-1',
    title: 'Car Transportation',
    description: 'Safe and secure transport for all types of cars.',
    icon: 'Car'
  },
  {
    _id: 'default-2',
    title: 'Door to Door Delivery',
    description: 'We pick and drop your vehicle at your location.',
    icon: 'ShieldCheck'
  },
  {
    _id: 'default-3',
    title: 'Intercity Transport',
    description: 'We transport vehicles to all major cities.',
    icon: 'Map'
  },
  {
    _id: 'default-4',
    title: 'Fully Insured',
    description: 'Your vehicle is fully insured for complete peace of mind.',
    icon: 'Shield'
  },
  {
    _id: 'default-5',
    title: '24/7 Support',
    description: 'Our support team is available round the clock.',
    icon: 'Headset'
  }
];

// Helper to render gold icons dynamically
const renderServiceIcon = (iconName) => {
  const props = { size: 36, className: "text-[#F5C71A] stroke-[1.8px] mb-5" };
  switch (iconName) {
    case 'Car':
    case 'Truck':
      return <Car {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Map':
    case 'MapPin':
      return <Map {...props} />;
    case 'Shield':
    case 'Lock':
      return <Shield {...props} />;
    case 'Headset':
    case 'Headphones':
    default:
      return <Headset {...props} />;
  }
};

const ServicesSection = ({ fadeInUp }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/services`)
      .then(r => {
        if (r.data && r.data.length > 0) {
          setServices(r.data);
        } else {
          setServices(DEFAULT_SERVICES);
        }
      })
      .catch(err => {
        console.warn('Backend API unavailable. Using fallback design services.', err);
        setServices(DEFAULT_SERVICES);
      });
  }, []);

  return (
    <section id="services" className="pt-20 pb-16 md:pt-24 md:pb-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp}
        >
          <div className="section-badge-gold">OUR SERVICES</div>
          <h2 className="text-3xl md:text-[38px] font-black tracking-tight text-[#111827] mt-1 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            What We Offer
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto font-medium">
            We provide premium and dependable logistics solutions tailored to satisfy your transportation needs.
          </p>
        </motion.div>

        {/* 5-Column Grid Layout for Large Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((service, i) => (
            <motion.div 
              key={service._id} 
              className="premium-card-white p-6 rounded-xl flex flex-col items-center text-center group cursor-default"
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-[#F5C71A]/5 border border-[#F5C71A]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#F5C71A]/10">
                {renderServiceIcon(service.icon || 'Car')}
              </div>
              
              {/* Title */}
              <h3 className="text-slate-900 font-extrabold text-[15px] tracking-wide mb-2.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elegant Curved Divider transitioning from White to Dark Vehicles Section (#0B0D12) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-full h-[35px] md:h-[60px] fill-[#0B0D12] text-[#0B0D12]">
          <path d="M0,0 C240,90 480,120 720,120 C960,120 1200,90 1440,0 L1440,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default ServicesSection;
