import { useState, useEffect, useRef } from 'react';
import { getCachedUserImage, cacheUserImage } from '../services/imageCache';
import { getGravatarAvatarUrl, getGravatarAvatarUrlSync, cacheGravatarHash, getGravatarHash } from '../utils/gravatarUtils';

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

// Mapear tamaños a píxeles para Gravatar
const gravatarSizeMap = {
  small: 32,
  medium: 48,
  large: 80
};

export const Avatar = ({ picture, name, email, userId, size = 'medium', className = '' }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [gravatarError, setGravatarError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const currentPictureRef = useRef<string | null>(null);
  const gravatarUrlRef = useRef<string | null>(null);

  const displayName = name || email;
  const initial = displayName[0]?.toUpperCase() || '?';
  const sizeValue = sizeMap[size];
  const fontSize = fontSizeMap[size];

  useEffect(() => {
    setImageError(false);
    setGravatarError(false);
    setIsLoading(true);
    
    // Prioridad 1: Usar picture de Auth0 si está disponible
    if (userId && picture) {
      const cachedUrl = getCachedUserImage(userId);
      
      if (cachedUrl) {
        setImageUrl(cachedUrl);
        currentPictureRef.current = picture;
        setIsLoading(false);
      } else {
        setImageUrl(picture);
        currentPictureRef.current = picture;
        
        cacheUserImage(userId, picture)
          .then((cachedImage) => {
            if (cachedImage && currentPictureRef.current === picture) {
              setImageUrl(cachedImage);
            }
          })
          .catch(() => {
            // Silenciar errores de caché
          });
      }
    } else if (picture) {
      setImageUrl(picture);
      currentPictureRef.current = picture;
      setIsLoading(false);
    } else {
      // Prioridad 2: No hay picture de Auth0, intentar Gravatar
      const cachedGravatarUrl = getGravatarAvatarUrlSync(email, gravatarSizeMap[size]);
      
      if (cachedGravatarUrl) {
        gravatarUrlRef.current = cachedGravatarUrl;
        setImageUrl(cachedGravatarUrl);
        setIsLoading(false);
      } else if (email) {
        getGravatarAvatarUrl(email, gravatarSizeMap[size])
          .then((gravatarUrl) => {
            gravatarUrlRef.current = gravatarUrl;
            setImageUrl(gravatarUrl);
            setIsLoading(false);
            
            // Cachear el hash
            getGravatarHash(email).then((hash) => {
              cacheGravatarHash(email, hash);
            }).catch(() => {});
          })
          .catch(() => {
            setGravatarError(true);
            setImageUrl(null);
            setIsLoading(false);
          });
      } else {
        setImageUrl(null);
        setIsLoading(false);
        currentPictureRef.current = null;
      }
    }
  }, [userId, picture, email, size]);

  const handleImageError = () => {
    // Si la imagen actual es de Auth0 (picture) y falla, intentar Gravatar como fallback
    if (currentPictureRef.current && !gravatarUrlRef.current && email && !gravatarError) {
      setImageError(true);
      // Intentar Gravatar
      getGravatarAvatarUrl(email, gravatarSizeMap[size])
        .then((gravatarUrl) => {
          gravatarUrlRef.current = gravatarUrl;
          setImageUrl(gravatarUrl);
          setIsLoading(false);
          
          // Cachear el hash
          getGravatarHash(email).then((hash) => {
            cacheGravatarHash(email, hash);
          }).catch(() => {});
        })
        .catch(() => {
          // Si Gravatar también falla, mostrar iniciales
          setGravatarError(true);
          setImageUrl(null);
          setIsLoading(false);
        });
    } else {
      // Si ya intentamos Gravatar o no hay email, mostrar iniciales
      setGravatarError(true);
      setImageUrl(null);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Si no hay imagen o hubo un error (y ya intentamos Gravatar si aplica), mostrar inicial
  if (!imageUrl || (imageError && gravatarError)) {
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

