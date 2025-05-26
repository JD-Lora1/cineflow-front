import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const heroImageUrl = "https://images.unsplash.com/photo-1621795307430-3ff25aa08945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleScrollToCartelera = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del ancla
    const section = document.getElementById('cartelera-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Bienvenido a CineFlow</h1>
        <a
          href="#cartelera-section"
          className="cta-button"
          onClick={handleScrollToCartelera} // Para scroll suave
        >
          Ver Cartelera
        </a>
        {/* Opción con RouterLink si prefieres (requiere configuración de scroll):
        <RouterLink to="/#cartelera-section" className="cta-button" onClick={handleScrollToCartelera}>
            Ver Cartelera
            <span className="button-shine"></span>
        </RouterLink>
        */}
      </div>
      <div className="scroll-indicator">
        <span></span><span></span><span></span>
      </div>
    </section>
  );
};

export default HeroSection;