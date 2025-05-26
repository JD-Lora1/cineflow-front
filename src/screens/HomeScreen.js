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
        <div id="cartelera-section"> 
          <MovieListSection title="En Cartelera Ahora" />
        </div>
        <MovieListSection title="Próximos Estrenos" />
      </main>
      <Footer />
    </div>
  );
};

export default HomeScreen;