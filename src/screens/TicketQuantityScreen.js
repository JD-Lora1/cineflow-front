// src/screens/TicketQuantityScreen.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PurchaseSummary from '../components/purchase/PurchaseSummary';
import TicketTypeSelector from '../components/purchase/TicketTypeSelector';
import ProgressBar from '../components/purchase/ProgressBar';
import './TicketQuantityScreen.css';
import { FaMinus, FaPlus } from 'react-icons/fa';

// ... (sampleTicketTypes sin cambios)
const sampleTicketTypes = [
  { id: 'general', name: 'GENERAL WEB', section: 'TRADICIONAL', price: 12800, maxQuantity: 10 },
  { id: 'magic', name: 'COMFORT WEB', section: 'TRADICIONAL', price: 19000, maxQuantity: 10 },
  { id: 'preferential', name: 'PREFERENCIAL WEB', section: 'PREFERENTE', price: 21500, maxQuantity: 10 },
];


const TicketQuantityScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- OBTENER DATOS DEL ESTADO DE LA NAVEGACIÓN ---
  // Es importante hacer esto ANTES de cualquier retorno temprano condicionado por estos datos
  const movie = location.state?.movie;
  const cinema = location.state?.cinema;
  const date = location.state?.date;
  const time = location.state?.time;
  const screeningType = location.state?.screeningType;

  const [ticketQuantities, setTicketQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  const MAX_TICKETS_PER_TRANSACTION = 10;
  const SERVICE_CHARGE_PER_TICKET = 2900;

  // --- MOVER EL useEffect problemático AQUÍ ARRIBA ---
  // Este useEffect ahora se llama en cada render, pero su lógica interna decide si redirigir.
  useEffect(() => {
    // Si faltan datos esenciales para esta pantalla, redirige.
    if (!movie || !cinema || !date || !time) {
      console.warn("Faltan datos para TicketQuantityScreen, redirigiendo a la home.");
      navigate('/');
    }
  }, [movie, cinema, date, time, navigate]); // Dependencias correctas

  // Inicializar cantidades a 0
  useEffect(() => {
    const initialQuantities = {};
    sampleTicketTypes.forEach(type => {
      initialQuantities[type.id] = 0;
    });
    setTicketQuantities(initialQuantities);
  }, []); // Este efecto solo corre una vez al montar

  // Calcular total cuando cambian las cantidades
  useEffect(() => {
    let currentTotalAmount = 0;
    let currentTotalTickets = 0;
    sampleTicketTypes.forEach(type => {
      const quantity = ticketQuantities[type.id] || 0;
      currentTotalTickets += quantity;
      currentTotalAmount += quantity * type.price;
    });
    currentTotalAmount += currentTotalTickets * SERVICE_CHARGE_PER_TICKET;

    setTotalAmount(currentTotalAmount);
    setTotalTickets(currentTotalTickets);
  }, [ticketQuantities]); // Dependencia correcta

  const handleQuantityChange = (ticketTypeId, change) => {
    // ... (lógica de handleQuantityChange sin cambios) ...
    setTicketQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[ticketTypeId] || 0;
      let newQuantity = currentQuantity + change;

      let otherTicketsCount = 0;
      for (const id in prevQuantities) {
        if (id !== ticketTypeId) {
          otherTicketsCount += prevQuantities[id] || 0;
        }
      }

      const potentialTotalTickets = otherTicketsCount + newQuantity;

      if (newQuantity < 0) newQuantity = 0;
      const ticketTypeInfo = sampleTicketTypes.find(t => t.id === ticketTypeId);
      if (ticketTypeInfo && newQuantity > ticketTypeInfo.maxQuantity) {
        newQuantity = ticketTypeInfo.maxQuantity;
      }
      if (potentialTotalTickets > MAX_TICKETS_PER_TRANSACTION) {
        newQuantity = MAX_TICKETS_PER_TRANSACTION - otherTicketsCount;
        if (newQuantity < 0) newQuantity = 0;
        alert(`Puedes comprar un máximo de ${MAX_TICKETS_PER_TRANSACTION} boletos por transacción.`);
      }

      return { ...prevQuantities, [ticketTypeId]: newQuantity };
    });
  };

  const handleContinue = () => {
    // ... (lógica de handleContinue sin cambios) ...
    if (totalTickets === 0) {
      alert('Debes seleccionar al menos un boleto.');
      return;
    }
    const navigationState = {
      movie,                // Objeto película
      cinema,               // Objeto cine
      date,                 // String (fecha)
      time,                 // String (hora)
      screeningType,        // Objeto con tipo, idioma, etc.
      ticketQuantities,     // Objeto con { general: 1, magic: 0, ... }
      ticketTypes: sampleTicketTypes, // Array de objetos de tipos de boletos
      totalAmount,          // Número
      totalTickets,         // Número
      serviceCharge: SERVICE_CHARGE_PER_TICKET // Número
    };
    console.log("Navegando a /seleccionar-asientos con estado:", navigationState); // Para depurar

    navigate('/seleccionar-asientos', {
      state: navigationState
    });
  };

  // --- RETORNO TEMPRANO DESPUÉS DE TODOS LOS HOOKS ---
  // Si faltan datos, el useEffect anterior ya habrá programado una redirección.
  // Renderizar un placeholder o null mientras se redirige.
  if (!movie || !cinema || !date || !time) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '5rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center'}}>
        {/* Podrías no renderizar Header/Footer aquí si la redirección es muy rápida */}
        {/* <Header /> */}
        <p>Información de la función no disponible. Redirigiendo...</p>
        {/* <Footer /> */}
      </div>
    );
  }

  // Si todos los datos están presentes, renderiza el contenido normal de la página.
  const purchaseSummaryData = {
    // ... (lógica de purchaseSummaryData sin cambios, asegúrate que use `totalAmount` del estado) ...
    movieTitle: movie.title,
    moviePosterUrl: movie.posterUrl,
    screeningType: screeningType?.type + (screeningType?.language ? ` ${screeningType.language}` : ''),
    cinemaName: cinema.cinemaName,
    date: new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
    time: time,
    totalAmount: totalAmount, // Usar el estado totalAmount
    serviceCharge: SERVICE_CHARGE_PER_TICKET,
    selectedTicketsSummary: Object.entries(ticketQuantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([typeId, quantity]) => {
            const typeInfo = sampleTicketTypes.find(t => t.id === typeId);
            return typeInfo ? `${typeInfo.name} (${quantity}) x $${typeInfo.price.toLocaleString('es-CO')}` : '';
        }).filter(Boolean).join(' / ')
  };

  return (
    <div className="ticket-flow-page">
      {/* ... (resto del JSX sin cambios significativos) ... */}
      <Header />
      <main className="ticket-flow-main-content">
        <ProgressBar currentStep={1} steps={['Boletos', 'Asientos', 'Pago']} />
        <div className="ticket-flow-layout">
          <div className="ticket-selection-area">
            <div className="page-navigation">
                {/* <RouterLink to={`/pelicula/${movie.id}`} state={location.state?.movie ? { fromTicketQuantity: true } : undefined } className="back-link">
                    ← Regresar a la película
                </RouterLink> */}
            </div>
            <h2>Selecciona tus boletos</h2>
            <p className="info-text">Puedes comprar {MAX_TICKETS_PER_TRANSACTION} boletos máximo por transacción.</p>

            {['TRADICIONAL', 'PREFERENTE'].map(sectionName => {
              const typesInSection = sampleTicketTypes.filter(type => type.section === sectionName);
              if (typesInSection.length === 0) return null;
              return (
                <div key={sectionName} className="ticket-section-group">
                  <h3>{sectionName}</h3>
                  {typesInSection.map(ticketType => (
                    <TicketTypeSelector
                      key={ticketType.id}
                      name={ticketType.name}
                      price={ticketType.price}
                      quantity={ticketQuantities[ticketType.id] || 0}
                      onDecrease={() => handleQuantityChange(ticketType.id, -1)}
                      onIncrease={() => handleQuantityChange(ticketType.id, 1)}
                      disabledDecrease={(ticketQuantities[ticketType.id] || 0) === 0}
                      disabledIncrease={
                        ((ticketQuantities[ticketType.id] || 0) >= ticketType.maxQuantity) ||
                        (totalTickets >= MAX_TICKETS_PER_TRANSACTION && (ticketQuantities[ticketType.id] || 0) < ticketType.maxQuantity )
                      }
                    />
                  ))}
                </div>
              );
            })}

            <div className="continue-button-container">
              <button
                className="cta-button-flow"
                onClick={handleContinue}
                disabled={totalTickets === 0}
              >
                Continuar
              </button>
            </div>
          </div>

          <aside className="purchase-summary-area">
            <PurchaseSummary {...purchaseSummaryData} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketQuantityScreen;