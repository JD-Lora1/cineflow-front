import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseSummary from '../components/purchase/PurchaseSummary';
import ProgressBar from '../components/purchase/ProgressBar';
import SeatMap from '../components/purchase/SeatMap';
import SeatLegend from '../components/purchase/SeatLegend';
import './SeatSelectionScreen.css';
import { IoTimerOutline } from 'react-icons/io5';

// ... (sampleSeatLayout y SELECTION_TIMEOUT_MINUTES sin cambios) ...
const sampleSeatLayout = {
  rows: [
    { id: 'A', seats: ['A', 'A', 'A', 'O', 'O', 'A', 'A', 'A', 'A', 'A', 'O', 'O', 'A', 'A', 'A'] },
    { id: 'B', seats: ['A', 'A', 'A', 'A', 'A', 'A', 'O', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'] },
    { id: 'C', seats: ['A', 'A', 'O', 'O', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'O', 'O', 'A', 'A'] },
    { id: 'D', seats: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'] },
    { id: 'E', seats: ['A', 'A', 'A', 'A', 'D', 'D', 'A', 'A', 'A', 'D', 'D', 'A', 'A', 'A', 'A'] },
    { id: 'F', seats: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] },
    { id: 'G', seats: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'] },
    { id: 'H', seats: ['W', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'W'] },
  ],
  screenSide: 'top',
  seatTypesInfo: [
    { type: 'A', label: 'Disponible', color: 'var(--seat-available-color, #5F95E7)', isSelectable: true },
    { type: 'S', label: 'Tu Selección', color: 'var(--seat-selected-color, #FFBF00)', isSelectable: false },
    { type: 'O', label: 'Ocupado', color: 'var(--seat-occupied-color, #5F738B)', isSelectable: false },
    { type: 'D', label: 'Deshabilitado', color: 'var(--seat-disabled-color, #3C4A5C)', isSelectable: false },
    { type: 'P', label: 'Preferente', color: 'var(--seat-preferential-color, #8A3FFC)', isSelectable: true },
    { type: 'W', label: 'Silla de ruedas', color: 'var(--seat-wheelchair-color, #BDBDBD)', isSelectable: true },
  ]
};
const SELECTION_TIMEOUT_MINUTES = 5;


const SeatSelectionScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- OBTENER DATOS DEL ESTADO DE NAVEGACIÓN PRIMERO ---
  const movie = location.state?.movie;
  const cinema = location.state?.cinema;
  const date = location.state?.date;
  const time = location.state?.time;
  const screeningType = location.state?.screeningType;
  const ticketQuantities = location.state?.ticketQuantities;
  const ticketTypes = location.state?.ticketTypes;
  const initialTotalAmount = location.state?.initialTotalAmount;
  const totalTickets = location.state?.totalTickets; // Este es el importante para el límite de selección
  const serviceCharge = location.state?.serviceCharge;

  const [seatLayout, setSeatLayout] = useState(sampleSeatLayout);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(SELECTION_TIMEOUT_MINUTES * 60);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(initialTotalAmount || 0); // Usar el total inicial
  const [error, setError] = useState(null); // Para mensajes de error, aunque la redirección es más fuerte

  // --- useEffect PARA VERIFICAR DATOS Y REDIRIGIR (MOVIDO AQUÍ ARRIBA) ---
  useEffect(() => {
    if (!movie || !cinema || !date || !time || !ticketQuantities || !ticketTypes || typeof totalTickets === 'undefined') {
      console.warn("Faltan datos esenciales para SeatSelectionScreen, redirigiendo...");
      setError("Información de la función no disponible. No se pueden seleccionar asientos."); // Opcional
      navigate('/'); // Redirigir a la home o a la pantalla anterior
    }
  }, [movie, cinema, date, time, ticketQuantities, ticketTypes, totalTickets, navigate]);


  // useEffect para el temporizador y carga de layout (si fuera asíncrono)
  useEffect(() => {
    // Si ya se redirigió por falta de datos, no continuar con el timer
    if (!movie) return;

    // Aquí harías el fetch del layout de asientos real si no usaras sampleSeatLayout
    // setSeatLayout(fetchedLayout);

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert("¡Tu tiempo para seleccionar asientos ha expirado!");
          navigate(`/pelicula/${movie.id}`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [movie, navigate]); // Depende de movie para saber a dónde redirigir

  // --- Resto de los Hooks y funciones (getSeatTypeInfo, handleSeatClick, etc.) ---
  // ... (Asegúrate que todas las demás funciones y hooks estén definidos aquí arriba) ...
  const getSeatTypeInfo = (seatChar) => {
    return seatLayout.seatTypesInfo.find(st => st.type === seatChar);
  };

  const handleSeatClick = (rowIndex, seatIndex, seatChar) => {
    // ... (lógica de handleSeatClick sin cambios) ...
    const seatId = `${seatLayout.rows[rowIndex].id}${seatIndex}`;
    const seatTypeInfo = getSeatTypeInfo(seatChar);

    if (!seatTypeInfo || !seatTypeInfo.isSelectable) {
      alert('Este asiento no está disponible para selección.');
      return;
    }

    const isSelected = selectedSeats.some(s => s.id === seatId);

    if (isSelected) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= totalTickets) {
        alert(`Ya has seleccionado el máximo de ${totalTickets} asientos.`);
        return;
      }
      // Aquí iría tu lógica de validación de asiento huérfano más robusta
      setSelectedSeats(prev => [...prev, { id: seatId, rowIndex, seatIndex, type: seatChar }]);
    }
  };

  const handleContinueToPayment = () => {
    // ... (lógica de handleContinueToPayment sin cambios) ...
    if (selectedSeats.length !== totalTickets) {
      alert(`Debes seleccionar exactamente ${totalTickets} asientos.`);
      return;
    }
    console.log('Asientos seleccionados para pago:', selectedSeats);
    navigate('/pago', {
      state: {
        movie, cinema, date, time, screeningType,
        ticketQuantities, ticketTypes, initialTotalAmount, totalTickets, serviceCharge,
        selectedSeats,
        finalAmount: currentTotalAmount
      }
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  // --- RETORNOS CONDICIONALES DESPUÉS DE TODOS LOS HOOKS ---
  // Si faltan datos, el useEffect ya habrá intentado redirigir.
  // Mostramos un mensaje o null mientras tanto.
  if (!movie || !cinema || !date || !time || !ticketQuantities || !ticketTypes || typeof totalTickets === 'undefined') {
    return (
        <div className="loading-container" style={{ textAlign: 'center', padding: '5rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <Header/> {/* Opcional mostrar Header/Footer durante la redirección */}
            <p>{error || "Cargando información de la función o redirigiendo..."}</p>
            <Footer/>
        </div>
    );
  }

  // Si todo está bien, renderiza la pantalla
  const purchaseSummaryData = {
    // ... (lógica de purchaseSummaryData sin cambios) ...
    movieTitle: movie.title,
    moviePosterUrl: movie.posterUrl,
    screeningType: screeningType?.type + (screeningType?.language ? ` ${screeningType.language}` : ''),
    cinemaName: cinema.cinemaName,
    date: new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
    time: time,
    selectedTicketsSummary: ticketQuantities && ticketTypes ? Object.entries(ticketQuantities) // Añadida verificación
        .filter(([_, quantity]) => quantity > 0)
        .map(([typeId, quantity]) => {
            const typeInfo = ticketTypes.find(t => t.id === typeId);
            return typeInfo ? `${typeInfo.name} (${quantity}) x $${typeInfo.price.toLocaleString('es-CO')}` : '';
        }).filter(Boolean).join(' / ') : '',
    totalAmount: initialTotalAmount,
    serviceCharge: serviceCharge,
    seatsInfo: selectedSeats.length > 0 ? `Asientos: ${selectedSeats.map(s => s.id).join(', ')}` : 'Selecciona tus asientos'
  };

  return (
    <div className="ticket-flow-page seat-selection-page">
      {/* ... (resto del JSX sin cambios significativos) ... */}
      <Header />
      <main className="ticket-flow-main-content">
        <ProgressBar currentStep={2} steps={['Boletos', 'Asientos', 'Pago']} />
        <div className="ticket-flow-layout">
          <div className="seat-selection-area">
            <div className="page-navigation">
              <RouterLink to="/seleccionar-boletos" state={location.state} className="back-link">
                ← Regresar a Boletos
              </RouterLink>
            </div>
            <h2>Selecciona tus asientos</h2>
            <p className="info-text">
              Has seleccionado {totalTickets} boleto(s). Elige tus asientos en el mapa.
              Para cambiar tu lugar asignado da clic en el asiento deseado.
            </p>

            <SeatLegend seatTypesInfo={seatLayout.seatTypesInfo} />
            <SeatMap
              seatLayout={seatLayout.rows}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
              getSeatTypeInfo={getSeatTypeInfo}
            />

            <div className="continue-button-container">
              <button
                className="cta-button-flow"
                onClick={handleContinueToPayment}
                disabled={selectedSeats.length !== totalTickets || timeLeft === 0}
              >
                Continuar a Pago
              </button>
            </div>
          </div>

          <aside className="purchase-summary-area">
            <PurchaseSummary {...purchaseSummaryData} />
            <div className="timer-container">
              <IoTimerOutline />
              <span>Tiempo restante: </span>
              <span className="time-left">{formatTime(timeLeft)}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeatSelectionScreen;