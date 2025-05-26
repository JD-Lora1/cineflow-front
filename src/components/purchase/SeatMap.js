import React from 'react';
import './SeatMap.css';

const SeatMap = ({ seatLayout, selectedSeats, onSeatClick, getSeatTypeInfo }) => {
  return (
    <div className="seat-map-container">
      <div className="screen-indicator">PANTALLA</div>
      <div className="seats-grid">
        {seatLayout.map((row, rowIndex) => (
          <div key={row.id} className="seat-row">
            <span className="row-label">{row.id}</span>
            <div className="seats-in-row">
              {row.seats.map((seatChar, seatIndex) => {
                const seatId = `${row.id}${seatIndex}`;
                const isSelected = selectedSeats.some(s => s.id === seatId);
                const seatTypeInfo = getSeatTypeInfo(seatChar);
                const seatColor = isSelected ? getSeatTypeInfo('S')?.color : seatTypeInfo?.color;
                const isActuallySelectable = seatTypeInfo?.isSelectable;

                return (
                  <button
                    key={seatId}
                    className={`seat ${seatTypeInfo?.type || 'unknown'} ${isSelected ? 'selected' : ''} ${!isActuallySelectable ? 'disabled-interaction' : ''}`}
                    style={{ backgroundColor: seatColor }}
                    onClick={() => isActuallySelectable && onSeatClick(rowIndex, seatIndex, seatChar)}
                    disabled={!isActuallySelectable && !isSelected} // Deshabilitar si no es seleccionable, a menos que ya esté seleccionado (para poder deseleccionar)
                    aria-label={`Asiento ${row.id}${seatIndex + 1} - ${seatTypeInfo?.label || 'Estado desconocido'}${isSelected ? ' (Seleccionado)' : ''}`}
                  >
                    {/* Podrías poner el número del asiento si quieres: seatIndex + 1 */}
                  </button>
                );
              })}
            </div>
            <span className="row-label">{row.id}</span> {/* Repetir label para simetría */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;