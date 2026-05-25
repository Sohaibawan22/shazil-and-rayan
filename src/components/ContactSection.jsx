import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ContactSection = ({ fadeInUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    serviceType: 'Car Transportation',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Car Transportation',
    "logistics Services",
  ];

  const contactDetails = [
    {
      icon: <Mail size={16} className="stroke-[2.5px]" />,
      label: 'Email',
      value: 'tauqeer6342@gmail.com',
      href: 'mailto:tauqeer6342@gmail.com'
    },
    {
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
        </svg>
      ),
      label: 'WhatsApp',
      value: '+923006631918',
      href: 'https://wa.me/923006631918'
    },
    {
      icon: <Phone size={16} className="stroke-[2.5px]" />,
      label: 'Phone',
      value: '+923006631918',
      href: 'tel:+923006631918'
    },
    {
      icon: <MapPin size={16} className="stroke-[2.5px]" />,
      label: 'Location',
      value: 'Siraj Brothers Plot No. 681-A,Gate No. 6New Truck Stand, Hawksbay Road, Karachi',
      href: `https://www.google.com/maps/place/24%C2%B052'03.1%22N+66%C2%B057'06.0%22E/@24.8675213,66.9490929,17z/data=!3m1!4b1!4m4!3m3!8m2!3d24.8675213!4d66.9516678?hl=en&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D`
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    // Format fields elegantly into the single 'message' block for the backend model
    const messagePayload = `Service Type: ${formData.serviceType}
Location Name: ${formData.location}
Description: ${formData.description}`;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: messagePayload
      });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        serviceType: 'Car Transportation',
        description: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Details & Google Map (5 Cols) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-start text-left lg:sticky lg:top-24"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp}
          >
            {/* Section Subtitle */}
            <span className="text-[#F5C71A] font-extrabold tracking-[0.18em] text-[11px] sm:text-xs uppercase mb-3.5 block" style={{ fontFamily: 'Outfit, sans-serif' }}>
              CONTACT US
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-[38px] font-black leading-none mb-8 text-[#111827] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Get In Touch
            </h2>

            {/* Contact Items List */}
            <div className="flex flex-col gap-5 mb-8">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#F5C71A]/10 border border-[#F5C71A]/20 flex items-center justify-center text-[#F5C71A] shrink-0">
                    {detail.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-extrabold text-[13px] leading-tight mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {detail.label}
                    </span>
                    <a 
                      href={detail.href}
                      target={detail.label === 'WhatsApp' || detail.label === 'Location' ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-gray-500 font-semibold text-xs transition-colors hover:text-[#F5C71A]"
                    >
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Card */}
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100 h-[210px] relative mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.1729094038166!2d67.06646831500414!3d24.858276784055278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ee44e33aa13%3A0xe54e6fa16b08053a!2sKarachi%20Logistics%20Hub!5e0!3m2!1sen!2spk!4v1614234567890!5m2!1sen!2spk"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="SR Interprise Location Map"
              />
            </div>

            {/* Open Maps Button */}
            <a 
              href="https://www.google.com/maps/place/Kalri,+Pakistan/@32.7308565,71.773703,16z/data=!4m15!1m8!3m7!1s0x3927376a88d7fc5d:0x17e6737e47512aaf!2sKalri,+Pakistan!3b1!8m2!3d32.7304028!4d71.7785585!16s%2Fm%2F047c87q!3m5!1s0x3927376a88d7fc5d:0x17e6737e47512aaf!8m2!3d32.7304028!4d71.7785585!16s%2Fm%2F047c87q?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-[#1a1a1a] text-white font-extrabold text-[10px] tracking-widest py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md uppercase"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              OPEN IN GOOGLE MAPS
            </a>
          </motion.div>

          {/* Right Column: Premium Booking / Contact Form (7 Cols) */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-[#FAFBFD] border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Request A Quote / Booking
              </h3>

              {success && (
                <motion.div 
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-start gap-3"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-extrabold text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Thank you!</h4>
                    <p className="text-xs font-semibold">Your booking request has been submitted successfully. Our team will contact you shortly.</p>
                  </div>
                </motion.div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-lg text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                
                {/* Full Name */}
                <div className="flex flex-col text-left">
                  <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-gray-400 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div className="flex flex-col text-left">
                    <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-gray-400 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300"
                    />
                  </div>

                  {/* Mobile No */}
                  <div className="flex flex-col text-left">
                    <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-gray-400 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Location Name */}
                  <div className="flex flex-col text-left">
                    <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Location Name
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Karachi to Lahore"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-gray-400 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300"
                    />
                  </div>

                  {/* Type of Service */}
                  <div className="flex flex-col text-left">
                    <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Type of Service
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300 cursor-pointer appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236B7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem', backgroundRepeat: 'no-repeat' }}
                    >
                      {servicesList.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col text-left">
                  <label className="text-slate-800 font-extrabold text-xs tracking-wider mb-2 uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    placeholder="Provide vehicle details (make, model, year) or custom pickup/delivery specifications..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-gray-400 font-semibold text-xs focus:outline-none focus:border-[#F5C71A] focus:ring-1 focus:ring-[#F5C71A] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F5C71A] hover:bg-[#E0B212] disabled:bg-gray-200 disabled:text-gray-400 text-black font-extrabold text-xs tracking-widest py-4 mt-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,199,26,0.4)] transform hover:-translate-y-0.5 active:scale-95 uppercase cursor-pointer"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {loading ? 'Submitting Request...' : (
                    <>
                      SUBMIT BOOKING REQUEST <Send size={13} className="stroke-[3px]" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
