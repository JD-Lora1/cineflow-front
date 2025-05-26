import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Datos de ejemplo para edición
const sampleMovieForEdit = {
  id: '1',
  title: 'Dune: Parte Dos',
  synopsis: 'Paul Atreides se une a los Fremen y comienza un viaje espiritual y marcial para convertirse en Muad\'Dib, mientras intenta evitar el horrible pero inevitable futuro que ha presenciado: una Guerra Santa en su nombre, que se extiende por todo el universo conocido.',
  genre: 'Sci-Fi, Aventura',
  duration: '166', // en minutos
  classification: 'PG-13',
  director: 'Denis Villeneuve',
  cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
  releaseDate: '2024-03-01',
  status: 'Activa',
  posterUrl: 'https://image.tmdb.org/t/p/w500/5aUVLiqcW0kFTBfGsCWjvLas91w.jpg'
};

const AdminMovieFormScreen = () => {
  const { movieId } = useParams(); // Obtener el ID de la película de la URL si es para editar
  const navigate = useNavigate();
  const isEditing = Boolean(movieId);

  const [movieData, setMovieData] = useState({
    title: '',
    synopsis: '',
    genre: '',
    duration: '', // en minutos
    classification: '',
    director: '',
    cast: '',
    releaseDate: '',
    status: 'Activa', // 'Activa' o 'Inhabilitada'
    posterFile: null, // Para el archivo de imagen
    posterPreview: null, // Para la vista previa de la imagen
  });
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      // Simular carga de datos de la película para editar
      // Aquí iría la llamada a tu API: fetchMovieById(movieId)
      console.log("Editando película con ID:", movieId);
      // Usamos datos de ejemplo si el ID es '1' para simular
      if (movieId === '1') {
        setMovieData({
          ...sampleMovieForEdit,
          duration: String(sampleMovieForEdit.duration), // Asegurar que sea string para el input
          posterFile: null,
          posterPreview: sampleMovieForEdit.posterUrl
        });
      } else {
        // Película no encontrada o para crear una nueva si el ID no coincide con el ejemplo
        console.warn("ID de película para editar no encontrado en datos de ejemplo, mostrando formulario vacío.");
      }
      setLoading(false);
    } else {
      // Reiniciar formulario para "nuevo"
      setMovieData({
        title: '', synopsis: '', genre: '', duration: '',
        classification: '', director: '', cast: '', releaseDate: '',
        status: 'Activa', posterFile: null, posterPreview: null,
      });
    }
  }, [movieId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Activa' : 'Inhabilitada') : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovieData(prev => ({
        ...prev,
        posterFile: file,
        posterPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    // Aquí iría la lógica para enviar los datos a la API
    // Si es `isEditing`, sería una llamada PUT/PATCH
    // Si no, sería una llamada POST
    // Incluiría la subida de `movieData.posterFile` si existe

    console.log('Datos de película a enviar:', movieData);

    // Simulación de guardado
    setTimeout(() => {
      setLoading(false);
      alert(`Película ${isEditing ? 'actualizada' : 'creada'} exitosamente. (Simulado)`);
      navigate('/admin/movies'); // Redirigir a la lista de películas
    }, 1500);
  };

  if (loading && isEditing && !movieData.title) return <p>Cargando datos de la película...</p>;

  return (
    <div className="admin-movie-form-screen">
      <div className="admin-screen-header" style={{marginBottom: '2rem'}}>
        <h1>{isEditing ? 'Editar Película' : 'Añadir Nueva Película'}</h1>
         <Link to="/admin/movies" className="admin-button admin-button-secondary">
          Volver a la Lista
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
            {/* Columna Izquierda */}
            <div className="form-column">
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="admin-input"
                    value={movieData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="synopsis">Sinopsis</label>
                <textarea
                    id="synopsis"
                    name="synopsis"
                    className="admin-textarea"
                    rows="5"
                    value={movieData.synopsis}
                    onChange={handleChange}
                />

                <label htmlFor="genre">Género(s) <small>(separados por coma)</small></label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    className="admin-input"
                    value={movieData.genre}
                    onChange={handleChange}
                />

                <label htmlFor="duration">Duración (minutos)</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    className="admin-input"
                    value={movieData.duration}
                    onChange={handleChange}
                />

                <label htmlFor="classification">Clasificación</label>
                <input
                    type="text"
                    id="classification"
                    name="classification"
                    className="admin-input"
                    value={movieData.classification}
                    onChange={handleChange}
                />
            </div>

            {/* Columna Derecha */}
            <div className="form-column">
                <label htmlFor="director">Director(es)</label>
                <input
                    type="text"
                    id="director"
                    name="director"
                    className="admin-input"
                    value={movieData.director}
                    onChange={handleChange}
                />

                <label htmlFor="cast">Reparto Principal <small>(separados por coma)</small></label>
                <input
                    type="text"
                    id="cast"
                    name="cast"
                    className="admin-input"
                    value={movieData.cast}
                    onChange={handleChange}
                />

                <label htmlFor="releaseDate">Fecha de Estreno</label>
                <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    className="admin-input"
                    value={movieData.releaseDate}
                    onChange={handleChange}
                />

                <label htmlFor="posterFile">Póster de la Película</label>
                <input
                    type="file"
                    id="posterFile"
                    name="posterFile"
                    className="admin-input"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {movieData.posterPreview && (
                    <div className="poster-preview-container">
                        <img src={movieData.posterPreview} alt="Vista previa del póster" className="poster-preview" />
                    </div>
                )}

                <div className="form-field-inline">
                    <label htmlFor="status" style={{marginRight: '1rem', marginBottom:0}}>Estado:</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="status"
                            name="status"
                            checked={movieData.status === 'Activa'}
                            onChange={handleChange}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span style={{marginLeft: '0.5rem'}}>{movieData.status}</span>
                </div>
            </div>
        </div>


        <div className="form-actions">
          <button type="submit" className="admin-button admin-button-primary" disabled={loading}>
            {loading ? (isEditing ? 'Actualizando...' : 'Creando...') : (isEditing ? 'Actualizar Película' : 'Crear Película')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminMovieFormScreen;