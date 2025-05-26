import React from 'react';
import './PurchaseSummary.css';
import { IoCloseCircleOutline } from "react-icons/io5";

const PurchaseSummary = ({
  movieTitle,
  moviePosterUrl,
  screeningType,
  cinemaName,
  date,
  time,
  selectedTicketsSummary,
  totalAmount,      // Prop que podría ser undefined
  serviceCharge     // Prop que podría ser undefined
}) => {

  // --- VALORES POR DEFECTO Y VERIFICACIONES ---
  const displayServiceCharge = typeof serviceCharge === 'number' ? serviceCharge : 0;
  const displayTotalAmount = typeof totalAmount === 'number' ? totalAmount : 0;

  return (
    <div className="purchase-summary-card">
      <div className="summary-header">
        <h3>Resumen de compra</h3>
        <button className="close-summary-btn" aria-label="Cerrar resumen">
            <IoCloseCircleOutline size={24}/>
        </button>
      </div>
      <div className="summary-movie-info">
        {moviePosterUrl && <img src={moviePosterUrl} alt={movieTitle} className="summary-poster" />}
        <div className="summary-movie-details">
          <h4>Película: <span className="detail-value">{movieTitle || 'N/A'} {screeningType}</span></h4>
          <p>Complejo: <span className="detail-value">{cinemaName || 'N/A'}</span></p>
          <p>Fecha: <span className="detail-value">{date || 'N/A'}</span></p>
          <p>Función: <span className="detail-value">{time || 'N/A'}</span></p>
          {selectedTicketsSummary && <p>Boletos: <span className="detail-value">{selectedTicketsSummary}</span></p>}
        </div>
      </div>
      <div className="summary-service-charge">
        <p>
          *Se realizará un cargo por servicio de $
          {displayServiceCharge.toLocaleString('es-CO')} {/* Usar la variable verificada */}
           en cada boleto dentro de la orden.
        </p>
      </div>
      <div className="summary-total">
        <h4>Total (IVA incluido):</h4>
        <span className="total-amount">
          $
          {displayTotalAmount.toLocaleString('es-CO')} {/* Usar la variable verificada */}
        </span>
      </div>
    </div>
  );
};

export default PurchaseSummary;