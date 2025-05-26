import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MovieDetailScreen.css';
import { FaPlayCircle, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

// --- DATOS DE EJEMPLO MÁS COMPLETOS ---
const ALL_MOVIES_DATA = [
  {
    id: '2',
    title: 'Lilo y Stitch',
    originalTitle: 'Lilo & Stitch',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tZcr1Eda14SkE3zP6RdyKqH2gN0.jpg',
    trailerUrl: 'https://www.youtube.com/embed/kTHrYf5TFEc',
    genres: ['Animación', 'Aventuras', 'Comedia', 'Familiar', 'Ciencia ficción'],
    tags: ['TODOS', 'AVENTURAS'],
    releaseDate: '22 DE MAYO SOLO EN CINES',
    duration: '1h 25min',
    director: 'Chris Sanders, Dean DeBlois',
    cast: 'Daveigh Chase, Chris Sanders, Tia Carrere, David Ogden Stiers, Kevin McDonald, Ving Rhames, Zoe Caldwell, Jason Scott Lee',
    synopsis: 'Una solitaria niña hawaiana llamada Lilo adopta una extraña mascota a la que llama Stitch...',
    classification: 'Todo público',
    showtimesByCinema: [
        {
            cinemaName: 'CineFlow Pacific Mall',
            cinemaAddress: 'Calle 36 N # 6A - 65',
            dates: [
              { date: '2025-05-26', dayName: 'LUN.', dayNumber: '26 MAY.', screenings: [
                  { type: '2D', language: 'DOBLADA', formatDetails: 'Sillas: GENERAL', premier: true, times: ['12:20', '15:00', '17:50'] },
                  { type: '3D', language: 'DOBLADA', formatDetails: 'Sillas: GENERAL', premier: true, times: ['13:00'] },
              ]},
              { date: '2025-05-27', dayName: 'MAR.', dayNumber: '27 MAY.', screenings: [
                  { type: '2D', language: 'DOBLADA', formatDetails: 'Sillas: GENERAL', premier: true, times: ['16:00', '19:30'] },
              ]},
            ]
        }
    ]
  },
  {
    id: '3',
    title: 'Dune: Parte Dos',
    originalTitle: 'Dune: Part Two',
    posterUrl: 'https://image.tmdb.org/t/p/w500/5aUVLiqcW0kFTBfGsCWjvLas91w.jpg',
    trailerUrl: 'https://www.youtube.com/embed/Way9sch9gkI',
    genres: ['Ciencia ficción', 'Aventura', 'Drama'],
    tags: ['SCI-FI', '+12'],
    releaseDate: 'YA EN CINES',
    duration: '2h 46min',
    director: 'Denis Villeneuve',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    synopsis: 'Paul Atreides se une a los Fremen y comienza un viaje espiritual y marcial...',
    classification: 'Mayores de 12 años',
    showtimesByCinema: [
        {
            cinemaName: 'CineFlow Unicentro',
            cinemaAddress: 'Carrera 100 # 5 - 169',
            dates: [
              { date: '2025-05-26', dayName: 'LUN.', dayNumber: '26 MAY.', screenings: [
                  { type: 'IMAX 2D', language: 'SUBTITULADA', formatDetails: 'Sillas: PREFERENCIAL', premier: false, times: ['14:00', '18:30', '21:00'] },
              ]},
              { date: '2025-05-28', dayName: 'MIÉ.', dayNumber: '28 MAY.', screenings: [
                  { type: 'IMAX 2D', language: 'SUBTITULADA', formatDetails: 'Sillas: PREFERENCIAL', premier: false, times: ['17:00', '20:30'] },
              ]},
            ]
        }
    ]
  },
  {
    id: '1',
    title: "Destino Final: Lazos de sangre",
    originalTitle: "Final Destination: Bloodlines",
    posterUrl: "https://static1.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2025/02/01567833_poster_w780.jpg",
    trailerUrl: "https://www.youtube.com/embed/defaultVideoId", // Reemplaza con un ID real
    genres: ["Sci-Fi", "Terror"],
    tags: ["TERROR", "+18"],
    duration: "2h 32min",
    director: "Director Ejemplo",
    cast: "Actor 1, Actriz 2",
    synopsis: "Sinopsis de Destino Final...",
    classification: "Mayores de 18 años",
    showtimesByCinema: [
        {
            cinemaName: 'CineFlow Jardín Plaza',
            cinemaAddress: 'Carrera 98 # 16-200',
            dates: [
              { date: '2025-05-26', dayName: 'LUN.', dayNumber: '26 MAY.', screenings: [
                  { type: '2D', language: 'DOBLADA', formatDetails: 'Sillas: GENERAL', premier: true, times: ['20:00', '22:30'] },
              ]},
            ]
        }
    ]
  },
];

const getNextDays = (count) => {
    const days = [];
    const today = new Date();
    const dayNames = ['DOM.', 'LUN.', 'MAR.', 'MIÉ.', 'JUE.', 'VIE.', 'SÁB.'];
    const monthNames = ['ENE.', 'FEB.', 'MAR.', 'ABR.', 'MAY.', 'JUN.', 'JUL.', 'AGO.', 'SEP.', 'OCT.', 'NOV.', 'DIC.'];

    for (let i = 0; i < count; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        days.push({
            date: currentDate.toISOString().split('T')[0],
            dayName: dayNames[currentDate.getDay()],
            dayNumber: `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`,
            year: currentDate.getFullYear()
        });
    }
    return days;
};

const MovieDetailScreen = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getNextDays(7)[0].date);
  const [expandedCinemas, setExpandedCinemas] = useState({});

  const availableDates = getNextDays(14);

  // Definición de handleTimeSlotClick que recibe el objeto cinema como argumento
  const handleTimeSlotClick = (selectedTime, screeningInfo, currentCinemaObject) => {
    if (!movie || !currentCinemaObject) {
        console.error("Error: Faltan datos de película o cine para la navegación.");
        alert("Ha ocurrido un error al seleccionar el horario. Por favor, intente de nuevo.");
        return;
    }
    // console.log(`Horario seleccionado: ${selectedTime} para ${movie.title} en ${currentCinemaObject.cinemaName}`);
    navigate('/seleccionar-boletos', {
      state: {
        movie: movie,
        cinema: currentCinemaObject, // Usar el objeto del cine que se pasó
        date: selectedDate,
        time: selectedTime,
        screeningType: screeningInfo
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    // console.log("Cargando detalles para película ID:", movieId);
    const foundMovie = ALL_MOVIES_DATA.find(m => String(m.id) === String(movieId));

    if (foundMovie) {
      setMovie(foundMovie);
      if (foundMovie.showtimesByCinema && foundMovie.showtimesByCinema.length > 0) {
        const firstCinemaWithDates = foundMovie.showtimesByCinema.find(
          (c) => c.dates && c.dates.length > 0
        );
        if (firstCinemaWithDates) {
            setExpandedCinemas({ [firstCinemaWithDates.cinemaName]: true });
        } else {
            setExpandedCinemas({});
        }
      } else {
        setExpandedCinemas({});
      }
    } else {
      // console.error(`Película con ID ${movieId} no encontrada.`);
      setError(`Lo sentimos, la película que buscas no fue encontrada (ID: ${movieId}).`);
    }
    setLoading(false);
  }, [movieId, navigate]);

  const toggleCinemaExpansion = (cinemaName) => {
    setExpandedCinemas(prev => ({
      ...prev,
      [cinemaName]: !prev[cinemaName]
    }));
  };

  const getScreeningsForSelectedDate = (cinema) => {
    if (!cinema || !cinema.dates) return [];
    const dateData = cinema.dates.find(d => d.date === selectedDate);
    return dateData ? dateData.screenings : [];
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '5rem', fontFamily: 'var(--font-body)'}}>
        <Header />
        <p>Cargando detalles de la película...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '5rem', fontFamily: 'var(--font-body)'}}>
        <Header />
        <h2>Error</h2>
        <p>{error}</p>
        <RouterLink to="/" className="error-gohome-link" style={{color: 'var(--color-metallic-gold)', marginTop: '1rem', display: 'inline-block'}}>Volver al inicio</RouterLink>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '5rem', fontFamily: 'var(--font-body)'}}>
        <Header />
        <p>No se pudo cargar la información de la película.</p>
        <RouterLink to="/" className="error-gohome-link" style={{color: 'var(--color-metallic-gold)', marginTop: '1rem', display: 'inline-block'}}>Volver al inicio</RouterLink>
        <Footer />
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <Header />
      <main className="movie-detail-main-content">
        <div className="movie-detail-layout">
          <aside className="movie-detail-sidebar">
            <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} className="movie-detail-poster" />
            <div className="movie-info-block">
              <h3>Título Original</h3>
              <p>{movie.originalTitle || movie.title}</p>
            </div>
            {movie.director && (
              <div className="movie-info-block">
                <h3>Director</h3>
                <p>{movie.director}</p>
              </div>
            )}
            {movie.cast && (
              <div className="movie-info-block">
                <h3>Reparto</h3>
                <p>{movie.cast}</p>
              </div>
            )}
            <div className="movie-info-block">
              <h3>Sinopsis</h3>
              <p className="synopsis-text">
                {(movie.synopsis && movie.synopsis.length > 200) ? `${movie.synopsis.substring(0, 200)}...` : movie.synopsis || "Sinopsis no disponible."}
                {(movie.synopsis && movie.synopsis.length > 200) && <RouterLink to="#" className="read-more-link">LEER MÁS</RouterLink>}
              </p>
            </div>
            <div className="movie-info-block">
              <h3>Clasificación</h3>
              <p>{movie.classification || 'N/A'}</p>
            </div>
          </aside>

          <section className="movie-detail-primary">
            <div className="trailer-container">
              {movie.trailerUrl ? (
                <iframe
                  src={movie.trailerUrl}
                  title={`Trailer de ${movie.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="trailer-placeholder">Trailer no disponible</div>
              )}
               <div className="trailer-play-button-overlay"><FaPlayCircle /></div>
            </div>

            <div className="movie-title-header">
              <h1>{movie.title}</h1>
              <div className="movie-meta-info">
                {movie.duration && <span><IoMdTime /> {movie.duration}</span>}
              </div>
              {movie.tags && movie.tags.length > 0 && (
                <div className="movie-tags">
                  {movie.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              )}
            </div>

            <div className="showtime-filters">
              <div className="filter-group location-filter">
                <FaMapMarkerAlt />
                <span>USTED ESTÁ EN</span>
                <select name="city" id="city-select" defaultValue="Cali">
                  <option value="Cali">Cali</option>
                </select>
              </div>
              <div className="date-selector-container">
                 <div className="date-selector">
                    {availableDates.map(d => (
                    <button
                        key={d.date}
                        className={`date-item ${selectedDate === d.date ? 'active' : ''}`}
                        onClick={() => setSelectedDate(d.date)}
                    >
                        <span className="day-name">{d.dayName}</span>
                        <span className="day-number">{d.dayNumber.split(' ')[0]}</span>
                        <span className="month-name">{d.dayNumber.split(' ')[1]}</span>
                        <span className="year-name-mobile">{d.year}</span>
                    </button>
                    ))}
                </div>
              </div>
            </div>

            {movie.showtimesByCinema && movie.showtimesByCinema.length > 0 ? (
              <div className="cinemas-showtimes-list">
                {movie.showtimesByCinema.map((currentCinema) => { // Renombrada la variable del map
                  const screenings = getScreeningsForSelectedDate(currentCinema);
                  const isExpanded = !!expandedCinemas[currentCinema.cinemaName];

                  return (
                    <div key={currentCinema.cinemaName} className="cinema-showtimes-item">
                      <button className="cinema-header" onClick={() => toggleCinemaExpansion(currentCinema.cinemaName)}>
                        <div className="cinema-info">
                          <h3>{currentCinema.cinemaName}</h3>
                          <p>{currentCinema.cinemaAddress}</p>
                        </div>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {isExpanded && (
                        <div className="showtimes-grid">
                          {screenings && screenings.length > 0 ? (
                            <>
                              <p className="showtimes-available-text">Horarios disponibles <span>* Los horarios aquí expuestos representan el inicio de cada función</span></p>
                              {screenings.map((screening, index) => (
                                <div key={index} className="screening-type-block">
                                  <div className="screening-format-header">
                                    <span className="format-type">{screening.type}</span>
                                    <span className="format-language">{screening.language}</span>
                                    <span className="format-details">{screening.formatDetails}</span>
                                    {screening.premier && <span className="format-premier">PREMIER</span>}
                                  </div>
                                  <div className="time-slots">
                                    {screening.times.map(time => (
                                      <button
                                        key={time}
                                        className="time-slot-button"
                                        onClick={() => handleTimeSlotClick(time, screening, currentCinema)} // Pasa currentCinema
                                      >
                                        {time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <p className="no-showtimes-message" style={{padding: '1rem 0'}}>No hay funciones para esta fecha en este cine.</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                {movie.showtimesByCinema.every(c => getScreeningsForSelectedDate(c).length === 0) && (
                    <p className="no-showtimes-message">No hay funciones disponibles para la fecha seleccionada en ningún cine.</p>
                )}
              </div>
            ) : (
              <p className="no-showtimes-message">Actualmente no hay horarios programados para esta película.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetailScreen;