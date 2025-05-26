// src/components/admin/AdminLayout.js
import React from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom'; // Usar NavLink para .active
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>CineFlow ADMIN</span>
        </div>
        <nav className="admin-nav">
          <ul>
            {/* Usar NavLink para obtener la clase 'active' automáticamente */}
            <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/movies">Películas</NavLink></li>
            <li><NavLink to="/admin/customers">Clientes</NavLink></li>
            <li><NavLink to="/admin/purchases">Compras</NavLink></li>
          </ul>
        </nav>
        <div className="admin-sidebar-footer">
          <RouterLink to="/">Volver a CineFlow</RouterLink>
        </div>
      </aside>
      <main className="admin-main-content">
        <header className="admin-main-header">
          {/* Espacio para el nombre del usuario admin o un menú de usuario */}
          <div className="admin-user-menu">
            {/* Ejemplo: <span>Admin User</span> <button>Logout</button> */}
          </div>
        </header>
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;