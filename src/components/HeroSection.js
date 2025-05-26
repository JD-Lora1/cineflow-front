import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  // URL de una imagen de fondo cinematográfica (reemplaza con una tuya o de Unsplash, etc.)
  const heroImageUrl = "https://images.unsplash.com/photo-1621795307430-3ff25aa08945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Bienvenido a CineFlow</h1>
        <button className="cta-button">
          Ver Cartelera
          <span className="button-shine"></span>
        </button>
      </div>
      <div className="scroll-indicator">
        <span></span><span></span><span></span>
      </div>
    </section>
  );
};

export default HeroSection;