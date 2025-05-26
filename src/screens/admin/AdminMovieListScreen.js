import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Para el botón "Añadir Nueva"
// import AdminLayout from '../../components/admin/AdminLayout'; // Ya no es necesario si se usa en el router

// Datos de ejemplo (reemplazar con API call)
const sampleMovies = [
  { id: '1', title: 'Dune: Parte Dos', genre: 'Sci-Fi', duration: '2h 46min', status: 'Activa', posterUrl: 'https://image.tmdb.org/t/p/w92/5aUVLiqcW0kFTBfGsCWjvLas91w.jpg' },
  { id: '2', title: 'Oppenheimer', genre: 'Biografía', duration: '3h 00min', status: 'Activa', posterUrl: 'https://image.tmdb.org/t/p/w92/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { id: '3', title: 'Película Inhabilitada', genre: 'Drama', duration: '1h 50min', status: 'Inhabilitada', posterUrl: 'https://placehold.co/92x138/1A1A1A/B08D57?text=Poster' },
];

const AdminMovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [loading, setLoading] = useState(true); // Para feedback de carga

  useEffect(() => {
    // Simular carga de datos
    // setLoading(true);
    // Aquí iría la llamada a tu API para obtener las películas
    setMovies(sampleMovies);
    // setLoading(false);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMovie = (movieId) => {
    // Lógica para inhabilitar/borrar película (API call)
    console.log('Inhabilitar/Borrar película:', movieId);
    // Actualizar el estado local o volver a cargar
    setMovies(prevMovies => prevMovies.map(m => m.id === movieId ? {...m, status: m.status === 'Activa' ? 'Inhabilitada' : 'Activa'} : m ));
    alert(`Película ${movieId} ${movies.find(m=>m.id === movieId)?.status === 'Activa' ? 'inhabilitada' : 'habilitada'}. (Simulado)`);
  };

  // if (loading) return <p>Cargando películas...</p>; // O un spinner estilizado

  return (
  <div className="admin-movie-list-screen">
    <header className="admin-page-header">
      <h1 className="page-title">Gestión de Películas</h1>
      <Link to="/admin/movies/new" className="admin-button admin-button-primary">
        Añadir Nueva Película
      </Link>
    </header>

    <input
      type="text"
      placeholder="Buscar películas por título..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="admin-input search-bar"
      style={{ maxWidth: '100%', marginBottom: '1.5rem' }} // Full-width en móvil
    />

    {filteredMovies.length > 0 ? (
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Título</th>
              <th>Género</th>
              {/* <th className="hide-on-mobile">Duración</th> */}
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <img
                    src={movie.posterUrl || 'https://placehold.co/40x60/1A1A1A/B08D57?text=N/A'}
                    alt={movie.title}
                    style={{
                      width: '40px',
                      height: 'auto',
                      borderRadius: '3px',
                      verticalAlign: 'middle'
                    }}
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                {/* <td className="hide-on-mobile">{movie.duration}</td> */}
                <td>
                  <span className={`status-badge ${movie.status === 'Activa' ? 'status-active' : 'status-inactive'}`}>
                    {movie.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <Link to={`/admin/movies/edit/${movie.id}`} className="edit-btn" title="Editar">
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="delete-btn"
                    title={movie.status === 'Activa' ? 'Inhabilitar' : 'Habilitar'}
                  >
                    {movie.status === 'Activa' ? '🗑️' : '🔄'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No se encontraron películas con ese criterio.</p>
    )}
  </div>
);

};

export default AdminMovieListScreen;