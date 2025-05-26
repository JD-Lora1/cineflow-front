import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
// Importa tus iconos (SVG inline, react-icons, etc.)
// Ejemplo con react-icons
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null); // Para detectar clics fuera del menú

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cerrar menú si se hace clic fuera de él en móvil
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Si el clic fue en el botón de menú, no hagas nada (toggleMobileMenu lo maneja)
        if (event.target.closest('.menu-icon-mobile')) {
          return;
        }
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);


  // Cerrar menú si se cambia el tamaño de la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header className={`app-header ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="header-content-wrapper"> {/* Nuevo wrapper para mejor control */}
        <div className="logo">
          <Link to="/">
            <span>CineFlow</span>
          </Link>
        </div>

        {/* Contenedor para navegación de escritorio y botón de menú móvil */}
        <nav className="navigation" ref={menuRef}> {/* Añadir ref aquí */}
          {/* Navegación para Desktop */}
          <div className="desktop-nav-links">
            <NavLink to="/#cartelera">Cartelera</NavLink>
            <NavLink to="/proximos-estrenos">Próximos Estrenos</NavLink>
            <NavLink to="/mi-cuenta">Mi Cuenta</NavLink>
            <NavLink to="/register">Registrate</NavLink>
          </div>

          {/* Icono de búsqueda (podría estar antes o después de los enlaces de desktop) */}
          <button className="nav-icon search-icon" aria-label="Buscar">
            <FaSearch />
          </button>

          {/* Botón de Menú Hamburguesa (solo móvil) */}
          <button className="nav-icon menu-icon-mobile" aria-label="Menú" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menú Desplegable Móvil (integrado) */}
          {isMobileMenuOpen && (
            <div className="mobile-nav-dropdown">
              <NavLink to="/#cartelera" onClick={() => setIsMobileMenuOpen(false)}>Cartelera</NavLink>
              <NavLink to="/proximos-estrenos" onClick={() => setIsMobileMenuOpen(false)}>Próximos Estrenos</NavLink>
              <NavLink to="/mi-cuenta" onClick={() => setIsMobileMenuOpen(false)}>Mi Cuenta</NavLink>
              <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>Registrate</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;