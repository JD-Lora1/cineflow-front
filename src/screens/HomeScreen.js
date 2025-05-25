import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieListSection from '../components/MovieListSection';
import Footer from '../components/Footer';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <Header />
      <main>
        <HeroSection />
        <MovieListSection title="En Cartelera Ahora" />
        <MovieListSection title="Próximos Estrenos" />
        {/* Puedes añadir más secciones aquí */}
      </main>
      <Footer /> {/* Añade el Footer al final */}
    </div>
  );
};

export default HomeScreen;