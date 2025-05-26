import React from 'react';
import './TicketTypeSelector.css';
import { FaMinus, FaPlus } from 'react-icons/fa';

const TicketTypeSelector = ({ name, price, quantity, onDecrease, onIncrease, disabledDecrease, disabledIncrease }) => {
  return (
    <div className="ticket-type-item">
      <div className="ticket-info">
        <span className="ticket-name">{name}</span>
        <span className="ticket-price">${price.toLocaleString('es-CO')}</span>
      </div>
      <div className="quantity-selector">
        <button onClick={onDecrease} disabled={disabledDecrease} aria-label={`Disminuir cantidad de ${name}`}>
          <FaMinus />
        </button>
        <span className="quantity-display" aria-live="polite" aria-atomic="true">{quantity}</span>
        <button onClick={onIncrease} disabled={disabledIncrease} aria-label={`Aumentar cantidad de ${name}`}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
export default TicketTypeSelector;