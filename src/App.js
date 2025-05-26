import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen'; 
import PublicRegistrationPage from './screens/PublicRegistrationPage';
// import LoginScreen from './screens/LoginScreen'; 
import MovieDetailScreen from './screens/MovieDetailScreen';
// Importaciones de Admin
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'; // Crea este componente básico
import AdminMovieListScreen from './screens/admin/AdminMovieListScreen';
import AdminMovieFormScreen from './screens/admin/AdminMovieFormScreen';
// import AdminCustomerListScreen from './screens/admin/AdminCustomerListScreen';
// import AdminPurchaseHistoryScreen from './screens/admin/AdminPurchaseHistoryScreen';

// En App.js
import TicketQuantityScreen from './screens/TicketQuantityScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen'; // Crearemos esta después

// ...

// ...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Usuario */}
        <Route path="/" element={<HomeScreen />} />
        
        <Route path="/register" element={<PublicRegistrationPage />} />
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        
        <Route path="/pelicula/:movieId" element={<MovieDetailScreen />} />
        <Route path="/seleccionar-boletos" element={<TicketQuantityScreen />} />
        <Route path="/seleccionar-asientos" element={<SeatSelectionScreen />} />

        {/* Rutas de Administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} /> {/* Redirige /admin a /admin/dashboard */}
          <Route path="dashboard" element={<AdminDashboardScreen />} />
          <Route path="movies" element={<AdminMovieListScreen />} />
          <Route path="movies/new" element={<AdminMovieFormScreen />} />
          <Route path="movies/edit/:movieId" element={<AdminMovieFormScreen />} />
          {/* <Route path="customers" element={<AdminCustomerListScreen />} /> */}
          {/* <Route path="purchases" element={<AdminPurchaseHistoryScreen />} /> */}
          {/* Ruta catch-all para admin si es necesario */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Ruta catch-all general */}
        {/* <Route path="*" element={<NotFoundScreen />} /> */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;