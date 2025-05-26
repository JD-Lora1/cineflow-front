import React from 'react';
import './SeatLegend.css';

const SeatLegend = ({ seatTypesInfo }) => {
  // Filtrar para no mostrar 'S' (Seleccionado) en la leyenda principal, ya que es un estado
  const legendItems = seatTypesInfo.filter(item => item.type !== 'S');

  return (
    <div className="seat-legend-container">
      {legendItems.map(item => (
        <div key={item.type} className="legend-item">
          <span className="legend-color-box" style={{ backgroundColor: item.color }}></span>
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;