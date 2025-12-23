import React from 'react';
import Orb from './Orb';
import './OrbModal.css';

interface OrbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrbModal: React.FC<OrbModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="orb-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="orb-modal-title"
    >
      <div className="orb-modal-content">
        <button className="orb-modal-close" onClick={onClose} aria-label="Cerrar modal">
          ×
        </button>
        <div className="orb-modal-orb-container">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
            backgroundColor="#060010"
          />
        </div>
      </div>
    </div>
  );
};

export default OrbModal;

