// client/src/components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'; // Small, medium, or large spinner
  color?: string; // Custom color for the spinner border top
  className?: string; // Additional CSS classes
  message?: string; // Optional message to display below the spinner
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = '#a872e6', className = '', message }) => {
  let spinnerSize = '24px';
  let borderWidth = '4px';
  let messageClass = '';

  // Adjust spinner size and border based on 'size' prop
  switch (size) {
    case 'sm':
      spinnerSize = '18px';
      borderWidth = '3px';
      messageClass = 'fs-6';
      break;
    case 'md':
      spinnerSize = '24px';
      borderWidth = '4px';
      messageClass = 'fs-5';
      break;
    case 'lg':
      spinnerSize = '50px';
      borderWidth = '6px';
      messageClass = 'fs-4';
      break;
  }

  const spinnerStyle: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    border: `${borderWidth} solid rgba(255, 255, 255, 0.3)`, // Light border
    borderTop: `${borderWidth} solid ${color}`, // Colored top border for animation
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div className="spinner" style={spinnerStyle}></div>
      {message && <p className={`mt-2 text-center ${messageClass}`}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;