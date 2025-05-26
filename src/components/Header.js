import React, { useState, useEffect } from 'react'; // Importar useState y useEffect
import { Link, NavLink } from 'react-router-dom'; // Usar NavLink para los enlaces del menú
import './Header.css';
// import logo from '../assets/logo-cineflow.png';

// Iconos (puedes usar react-icons si prefieres)
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);
const MenuIconHamburguer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Efecto para cerrar el menú si se cambia el tamaño de la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Efecto para añadir/quitar clase al body para prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Limpieza por si el componente se desmonta
    return () => document.body.classList.remove('no-scroll');
  }, [isMobileMenuOpen]);


  return (
    <>
      <header className={`app-header ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <div className="logo">
          <Link to="/"> {/* Enlazar logo a la home */}
            {/* <img src={logo} alt="CineFlow Logo" /> */}
            <span>CineFlow</span>
          </Link>
        </div>
        <nav className="navigation">
          {/* Icono de búsqueda siempre visible (o puedes moverlo al menú móvil también) */}
          <button className="nav-icon search-icon" aria-label="Buscar">
            <SearchIcon />
          </button>

          {/* Botón de Menú Hamburguesa (solo móvil) */}
          <button className="nav-icon menu-icon-mobile" aria-label="Menú" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIconHamburguer />}
          </button>

          {/* Navegación para Desktop */}
          <div className="desktop-nav-links">
            <NavLink to="/cartelera">Cartelera</NavLink>
            <NavLink to="/proximos-estrenos">Próximos Estrenos</NavLink>
            <NavLink to="/mi-cuenta">Mi Cuenta</NavLink>
            <NavLink to="/admin/dashboard" className="admin-link-desktop">Admin Panel</NavLink> {/* Enlace a Admin */}
          </div>
        </nav>
      </header>

      {/* Menú Desplegable Móvil */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/cartelera" onClick={toggleMobileMenu}>Cartelera</NavLink>
        <NavLink to="/proximos-estrenos" onClick={toggleMobileMenu}>Próximos Estrenos</NavLink>
        <NavLink to="/mi-cuenta" onClick={toggleMobileMenu}>Mi Cuenta</NavLink>
        <NavLink to="/admin/dashboard" onClick={toggleMobileMenu}>Panel de Administración</NavLink>
        {/* Puedes añadir más enlaces aquí, como el de búsqueda si lo quitas del header principal en móvil */}
      </div>
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </>
  );
};

export default Header;