import React from 'react';
import './Header.css';
// import logo from '../assets/logo-cineflow.png'; // Descomenta si tienes un logo

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        {/* <img src={logo} alt="CineFlow Logo" /> */}
        <span>CineFlow</span> {/* Placeholder si no hay imagen de logo */}
      </div>
      <nav className="navigation">
        {/* Iconos de búsqueda y menú (usaremos texto como placeholder) */}
        <button className="nav-icon search-icon" aria-label="Buscar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        <button className="nav-icon menu-icon" aria-label="Menú">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {/* Navegación para Desktop */}
        <div className="desktop-nav-links">
            <a href="#cartelera">Cartelera</a>
            <a href="#proximos">Próximos Estrenos</a>
            <a href="#cuenta">Mi Cuenta</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;