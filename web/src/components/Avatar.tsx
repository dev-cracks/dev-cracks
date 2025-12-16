import { useState } from 'react';

interface AvatarProps {
  picture?: string | null;
  name?: string | null;
  email: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: '32px',
  medium: '48px',
  large: '80px'
};

const fontSizeMap = {
  small: '0.9rem',
  medium: '1.2rem',
  large: '2rem'
};

export const Avatar = ({ picture, name, email, size = 'medium', className = '' }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const displayName = name || email;
  const initial = displayName[0]?.toUpperCase() || '?';
  const sizeValue = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Si no hay imagen o hubo un error, mostrar inicial
  if (!picture || imageError) {
    return (
      <div
        className={`avatar avatar--fallback ${className}`}
        style={{
          width: sizeValue,
          height: sizeValue,
          fontSize: fontSize
        }}
      >
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: sizeValue,
        height: sizeValue
      }}
    >
      {isLoading && (
        <div className="avatar__loading">
          <span>{initial}</span>
        </div>
      )}
      <img
        src={picture}
        alt={displayName}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
        loading="lazy"
        crossOrigin="anonymous"
      />
    </div>
  );
};

