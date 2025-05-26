import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardScreen.css';

// Reemplazar emojis con SVGs o componentes de iconos
// Ejemplo usando SVGs inline (puedes moverlos a archivos .svg e importarlos, o usar una librería como react-icons)
const IconFilm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm0 2h2v2H4V6Zm0 4h2v2H4v-2Zm0 4h2v2H4v-2Zm16 0h-2v-2h2v2Zm0-4h-2V8h2v2Zm0-4h-2V6h2v2Z" />
    <path d="M8 6h8v12H8V6Z" />
  </svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M16 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-2 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" />
    <path d="M12 2a10 10 0 0 0-6.324 17.663C6.576 18.66 8.83 18 12 18s5.424.66 6.324 1.663A10 10 0 0 0 12 2Zm0 14c-2.828 0-5.225-.795-5.225-1.75S9.172 12.5 12 12.5s5.225.795 5.225 1.75S14.828 16 12 16Z" />
  </svg>
);
const IconTicket = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M9 9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm6 0a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Z" />
    <path fillRule="evenodd" d="M2 7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a3 3 0 0 0 0 6v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a3 3 0 1 0 0-6V7Zm15.636 4.47A1.5 1.5 0 0 1 16.5 12.53l-.001.002-3.05 3.051-.002.001a1.5 1.5 0 0 1-2.121-2.121l.001-.002L14.379 10.41l.002-.002A1.5 1.5 0 0 1 17.636 11.47ZM6.313 13.52a1.5 1.5 0 0 1 2.122-2.121l.002.002 3.05-3.05.001.002a1.5 1.5 0 1 1 2.122 2.12l-.002-.001-3.05 3.05-.001-.002a1.5 1.5 0 0 1-2.121 2.122l.002-.002L6.364 12.53l-.001-.002A1.5 1.5 0 0 1 6.313 13.52Z" clipRule="evenodd" />
  </svg>
);


const AdminDashboardScreen = () => {
  const stats = { /* ... tus datos ... */ };

  return (
    <div className="admin-dashboard-screen">
      <header className="dashboard-page-header"> {/* Título específico de la página */}
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Resumen general de la actividad en CineFlow.</p>
      </header>

      <section className="stats-cards-container">
        <div className="stat-card">
          <div className="stat-card-icon-wrapper"><IconFilm /></div>
          <div className="stat-info">
            <h3>{stats.totalMovies}</h3>
            <p>Películas Totales</p>
          </div>
          <Link to="/admin/movies" className="stat-card-link">Gestionar Películas</Link>
        </div>

        {/* Repetir para otras tarjetas, usando los iconos correspondientes */}
        <div className="stat-card">
          <div className="stat-card-icon-wrapper"><IconFilm /></div> {/* O un ícono específico de "activo" */}
          <div className="stat-info">
            <h3>{stats.activeMovies}</h3>
            <p>Películas Activas</p>
          </div>
          <Link to="/admin/movies" className="stat-card-link">Ver Listado</Link>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon-wrapper"><IconUsers /></div>
          <div className="stat-info">
            <h3>{stats.newCustomersThisMonth}</h3>
            <p>Nuevos Clientes (Mes)</p>
          </div>
          <Link to="/admin/customers" className="stat-card-link">Gestionar Clientes</Link>
        </div>

         <div className="stat-card">
          <div className="stat-card-icon-wrapper"><IconTicket /></div>
          <div className="stat-info">
            <h3>{stats.ticketsSoldToday}</h3>
            <p>Entradas Vendidas (Hoy)</p>
          </div>
          <Link to="/admin/purchases" className="stat-card-link">Ver Compras</Link>
        </div>
      </section>

      <section className="quick-actions-section">
        <h2 className="section-heading">Accesos Rápidos</h2>
        <div className="quick-actions-buttons">
          <Link to="/admin/movies/new" className="admin-button admin-button-primary">
            Añadir Película
          </Link>
          <Link to="/admin/reports" className="admin-button admin-button-secondary">
            Generar Reportes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardScreen;