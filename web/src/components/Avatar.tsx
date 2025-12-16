import { useState, useEffect, useRef } from 'react';
import { getCachedUserImage, cacheUserImage } from '../services/imageCache';

interface AvatarProps {
  picture?: string | null;
  name?: string | null;
  email: string;
  userId?: string;
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

export const Avatar = ({ picture, name, email, userId, size = 'medium', className = '' }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const currentPictureRef = useRef<string | null>(null);

  const displayName = name || email;
  const initial = displayName[0]?.toUpperCase() || '?';
  const sizeValue = sizeMap[size];
  const fontSize = fontSizeMap[size];

  // Obtener la imagen cacheada o la original
  useEffect(() => {
    // Resetear estados cuando cambian las props
    setImageError(false);
    setIsLoading(true);
    
    if (userId && picture) {
      // Intentar obtener del caché primero
      const cachedUrl = getCachedUserImage(userId);
      
      if (cachedUrl) {
        // Si hay caché, usarlo
        setImageUrl(cachedUrl);
        currentPictureRef.current = picture;
      } else {
        // Si no hay caché, mostrar la imagen original inmediatamente
        setImageUrl(picture);
        currentPictureRef.current = picture;
        
        // Intentar cachear en segundo plano (sin bloquear la UI)
        cacheUserImage(userId, picture)
          .then((cachedImage) => {
            // Si se cacheó exitosamente y la imagen actual sigue siendo la original, actualizar
            if (cachedImage && currentPictureRef.current === picture) {
              setImageUrl(cachedImage);
            }
          })
          .catch(() => {
            // Silenciar errores de caché, la imagen original ya se está mostrando
          });
      }
    } else if (picture) {
      // Si hay imagen pero no userId, mostrar directamente
      setImageUrl(picture);
      currentPictureRef.current = picture;
    } else {
      // No hay imagen
      setImageUrl(null);
      setIsLoading(false);
      currentPictureRef.current = null;
    }
  }, [userId, picture]);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Si no hay imagen o hubo un error, mostrar inicial
  if (!imageUrl || imageError) {
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
        src={imageUrl}
        alt={displayName}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
        loading="lazy"
        crossOrigin={imageUrl?.startsWith('data:') ? undefined : imageUrl?.includes('googleusercontent.com') ? undefined : 'anonymous'}
      />
    </div>
  );
};

