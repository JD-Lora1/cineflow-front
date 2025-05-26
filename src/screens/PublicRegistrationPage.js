import React from 'react';
import Header from '../components/Header'; // Tu header principal
import Footer from '../components/Footer'; // Tu footer principal
import RegistrationForm from '../components/auth/RegistrationForm'; // El formulario que acabamos de crear
import './PublicAuthPage.css'; // Un CSS para esta página contenedora

const PublicRegistrationPage = () => {
  return (
    <div className="public-auth-page-layout">
      <Header />
      <main className="public-auth-main-content">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default PublicRegistrationPage;