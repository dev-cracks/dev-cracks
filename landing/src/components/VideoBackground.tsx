import React from 'react';
import '../styles/video-background.css';

export const VideoBackground = () => {
  return (
    <div className="video-background">
      <video
        className="video-background__video"
        autoPlay
        loop
        muted
        playsInline
        onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
          // Si el video no se puede cargar, ocultarlo silenciosamente
          const target = e.target as HTMLVideoElement;
          if (target) {
            target.style.display = 'none';
          }
        }}
      >
        <source src="/videos/workflow-processes.mp4" type="video/mp4" />
        <source src="/videos/workflow-processes.webm" type="video/webm" />
      </video>
      <div className="video-background__overlay" />
      {/* Animated background pattern as fallback */}
      <div className="video-background__pattern" />
    </div>
  );
};

