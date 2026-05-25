import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Car } from 'lucide-react';
import axios from 'axios';

// Fallback high-quality vehicles matching the mockup exactly
const DEFAULT_VEHICLES = [
  {
    _id: 'default-v1',
    name: 'Multi Car Carrier',
    capacity: '7-10 Cars',
    description: 'Best for multiple vehicle transport',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'default-v2',
    name: 'Enclosed Carrier',
    capacity: '2-4 Cars',
    description: 'Premium protection for luxury & classic cars',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'default-v3',
    name: 'Flatbed Carrier',
    capacity: '1-3 Cars',
    description: 'Ideal for exotic & low clearance vehicles',
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'default-v4',
    name: 'Single Car Transport',
    capacity: '1 Car',
    description: 'Quick and safe delivery for individual cars',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800'
  }
];

const VehiclesSection = ({ fadeInUp }) => {
  const [vehicles, setVehicles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then(r => {
        if (r.data) {
          setVehicles(r.data);
        }
      })
      .catch(err => {
        console.warn('Backend API unavailable. Using fallback design vehicles.', err);
        setVehicles(DEFAULT_VEHICLES);
      });
  }, []);

  const nextSlide = () => {
    if (vehicles.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % (vehicles.length - 2 > 0 ? vehicles.length - 2 : vehicles.length));
  };

  const prevSlide = () => {
    if (vehicles.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + (vehicles.length - 2 > 0 ? vehicles.length - 2 : vehicles.length)) % (vehicles.length - 2 > 0 ? vehicles.length - 2 : vehicles.length));
  };

  // Helper to construct absolute image path correctly
  const getVehicleImg = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    
    // In case of old relative uploads
    return `http://localhost:5000${url}`;
  };

  return (
    <section id="vehicles" className="pb-20 md:pb-24 bg-[#0B0D12] text-white relative overflow-hidden">
      
      {/* Glow orb */}
      <div className="orb w-[500px]   left-[-200px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,199,26,0.3) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header with Slider Controls - Completely removed all pt classes to eradicate empty spacing */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <motion.div 
            className="text-left max-w-xl" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp}
          >
            <div className="section-badge-gold mt-10">OUR VEHICLES <span className='text-[#F5C71A]'>30+ Vehicles</span></div>
            
            <h2 className="text-3xl md:text-[38px] font-black tracking-tight text-white mt-1 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Transport Fleet <span className='text-[#F5C71A]'>30+ Vehicles</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              We offer modern vehicle carriers equipped with safety and security tracking.
            </p>
          </motion.div>

          {/* Slider Buttons */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button 
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-[#F5C71A] bg-transparent text-[#F5C71A] flex items-center justify-center transition-all duration-300 hover:bg-[#F5C71A] hover:text-black hover:shadow-[0_0_15px_rgba(245,199,26,0.3)] active:scale-95"
              aria-label="Previous Vehicle"
            >
              <ChevronLeft size={22} className="stroke-[2.5px]" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-[#F5C71A] bg-transparent text-[#F5C71A] flex items-center justify-center transition-all duration-300 hover:bg-[#F5C71A] hover:text-black hover:shadow-[0_0_15px_rgba(245,199,26,0.3)] active:scale-95"
              aria-label="Next Vehicle"
            >
              <ChevronRight size={22} className="stroke-[2.5px]" />
            </button>
          </div>
        </div>

        {/* Dynamic sliding container */}
        <div className="overflow-hidden py-4 -my-4 relative">
          <motion.div 
            ref={sliderRef}
            className="flex gap-6 md:gap-8"
            animate={{ x: `calc(-${currentIndex * (300 + 32)}px)` }} // Dynamic translation calculation
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ width: 'max-content' }}
          >
            {vehicles.map((vehicle, i) => (
              <div 
                key={vehicle._id} 
                className="fleet-card w-[290px] sm:w-[330px] rounded-xl overflow-hidden cursor-default shrink-0 flex flex-col"
              >
                {/* Truck Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={getVehicleImg(vehicle.imageUrl)}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  {/* Subtle dark bottom fade */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,19,25,1) 0%, transparent 35%)' }} />
                </div>

                {/* Fleet Card Info */}
                <div className="p-6 flex flex-col flex-1 bg-[#111319]">
                  {/* Title */}
                  <h3 className="text-white font-extrabold text-[17px] tracking-wide mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {vehicle.name}
                  </h3>
                  
                  {/* Divider line */}
                  <div className="w-full h-[1px] bg-white/5 mb-4" />

                  {/* Details Block */}
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    {/* Capacity Badge */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-[#F5C71A]/10 border border-[#F5C71A]/20 px-2.5 py-1 rounded text-[#F5C71A] font-extrabold text-[10px] tracking-wider uppercase">
                      <Car size={12} className="stroke-[2.5px]" />
                      {vehicle.capacity}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-[11px] font-semibold leading-relaxed text-right">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default VehiclesSection;
