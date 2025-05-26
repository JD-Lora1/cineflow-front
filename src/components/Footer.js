import React from 'react';
import { Link } from 'react-router-dom'; // Usar Link de react-router-dom para navegación interna
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa'; // Más iconos de redes

// Opcional: SVGs para los badges de las tiendas de apps
const GooglePlayBadge = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Disponible en Google Play">
    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png" alt="Disponible en Google Play" className="store-badge" />
  </a>
);
const AppStoreBadge = () => (
  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Descargar en la App Store">
    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Descargar en la App Store" className="store-badge apple" />
  </a>
);
// Nota: Necesitarás alojar o encontrar URLs para los badges de Huawei AppGallery si quieres incluirlo.

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-main-content"> {/* Wrapper para el contenido principal del footer */}
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Sobre CineFlow</h4>
            <ul>
              <li><Link to="/quienes-somos">Quiénes somos</Link></li>
              <li><Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link></li>
              <li><Link to="/prensa">Sala de prensa</Link></li>
              <li><Link to="/blog">Nuestro Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Atención al Cliente</h4>
            <ul>
              <li><Link to="/contacto">Contáctanos (PQRS)</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes (FAQ)</Link></li>
              <li><Link to="/mapa-del-sitio">Mapa del Sitio</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/terminos-condiciones">Términos y Condiciones</Link></li>
              <li><Link to="/politica-privacidad">Política de Privacidad</Link></li>
              <li><Link to="/politica-cookies">Política de Cookies</Link></li>
              <li><Link to="/admin/dashboard" className="footer-admin-link">Acceso Admin</Link></li> {/* Enlace Admin aquí */}
            </ul>
          </div>

          <div className="footer-column app-download-column">
            <h4>Descarga nuestra App</h4>
            <div className="store-badges-container">
              <GooglePlayBadge />
              <AppStoreBadge />
              {/* <HuaweiAppGalleryBadge /> */}
            </div>
          </div>
        </div>

        <div className="footer-social-and-bottom">
          <div className="social-icons-footer">
            <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com/tu-perfil" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com/tu-cuenta" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://youtube.com/tu-canal" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://tiktok.com/@tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <p>© {new Date().getFullYear()} CineFlow. Todos los derechos reservados.</p>
        <p className="design-credit">Una experiencia cinematográfica creada por VB</p>
      </div>
      <div className="footer-film-strip"></div> {/* Tira de película decorativa */}
    </footer>
  );
};

export default Footer;