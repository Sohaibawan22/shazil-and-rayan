import React from 'react';
import { Helmet } from 'react-helmet-async';

// Import newly separated components
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import VehiclesSection from '../components/VehiclesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  // Shared animation variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>Alwan Car Go - Premium Vehicle Transportation</title>
        <meta name="description" content="Alwan Car Go offers safe, professional, and reliable vehicle transportation services across cities. Book your car transport today." />
        <meta property="og:title" content="Alwan Car Go - Premium Vehicle Transportation" />
        <meta property="og:description" content="Safe and professional vehicle transportation services." />
      </Helmet>

      {/* Hero Section */}
      <HeroSection fadeInUp={fadeInUp} />

      {/* Services Section */}
      <ServicesSection fadeInUp={fadeInUp} />

      {/* Vehicles Section */}
      <VehiclesSection fadeInUp={fadeInUp} />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection fadeInUp={fadeInUp} />
    </>
  );
};

export default Home;
