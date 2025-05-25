import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#sobre-nosotros">Sobre Nosotros</a>
          <a href="#contacto">Contacto</a>
          <a href="#faq">FAQs</a>
          <a href="#terminos">Términos y Condiciones</a>
        </div>
        <div className="social-icons">
          {/* Reemplaza con tus iconos SVG o de una librería */}
          <a href="#" aria-label="Facebook">F</a>
          <a href="#" aria-label="Instagram">I</a>
          <a href="#" aria-label="Twitter">T</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} CineFlow. Todos los derechos reservados.</p>
        <p className="design-credit">Una experiencia cinematográfica por [Tu Nombre/Empresa]</p>
      </div>
       <div className="footer-film-strip"></div>
    </footer>
  );
};

export default Footer;