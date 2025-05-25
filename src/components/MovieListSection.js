import React from 'react';
import MovieCard from './MovieCard';
import './MovieListSection.css';

const MovieListSection = ({ title, movies }) => {
  // Datos de películas de ejemplo
  const exampleMovies = movies || [
    { id: 1, title: "Destino Final: Lazos de sangre", posterUrl: "https://static1.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2025/02/01567833_poster_w780.jpg", genre: "Sci-Fi, Terror", duration: "2h 32min" },
    { id: 2, title: "Lilo y Stitch: Live action", posterUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.youloveit.com%2Fuploads%2Fposts%2F2024-11%2Fmedium%2F1732789325_youloveit_com_lilo_and_stitch_2025_poster.jpg&f=1&nofb=1&ipt=599caa6bea7b9d10629d878d17de9c9fd59e1b62e0b979500d3b6f29e333d952", genre: "Infantil", duration: "2h 18min" },
    { id: 3, title: "Dune: Parte Dos", posterUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2F5aUVLiqcW0kFTBfGsCWjvLas91w.jpg&f=1&nofb=1&ipt=6ef7cd45e715eb10bb68ecdc5092a23c8105cf73516a6868175f223936a9eeeb", genre: "Sci-Fi", duration: "2h 46min" },
    { id: 4, title: "Oppenheimer", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", genre: "Biografía", duration: "3h 00min" },
    { id: 5, title: "Blade Runner 2049", posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", genre: "Sci-Fi", duration: "2h 44min" },
    { id: 6, title: "Interestelar", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", genre: "Sci-Fi", duration: "2h 49min" },
    { id: 7, title: "El Origen", posterUrl: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", genre: "Sci-Fi", duration: "2h 28min" },
    { id: 8, title: "Mad Max: Furia en el Camino", posterUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foyster.ignimgs.com%2Fwordpress%2Fstg.ign.com%2F2015%2F03%2FMM-Main-Poster.jpg&f=1&nofb=1&ipt=81d7e69c45ed01fe50c898c721a24875cb8115373c26b3b76faf5a839a4d18aa", genre: "Acción", duration: "2h 00min" },
  ];

  return (
    <section className="movie-list-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-carousel">
        {exampleMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieListSection;