import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, steps }) => {
  return (
    <div className="progress-bar-container">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`progress-step ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
          {index < steps.length - 1 && <div className="progress-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};
export default ProgressBar;