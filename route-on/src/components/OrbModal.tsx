import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TextType from './TextType';
import Orb from './Orb';
import { useAuth } from '../hooks/useAuth';
import './OrbModal.css';

namespace OrbModal {
  export interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }
}

const OrbModal: React.FC<OrbModal.Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('route-on');
  const [messages, setMessages] = useState<OrbModal.Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [orbHoverIntensity, setOrbHoverIntensity] = useState(0.3);
  const [orbForceHover, setOrbForceHover] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const thinkingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Enviar mensaje inicial cuando se abre el modal
  useEffect(() => {
    if (isOpen && !hasSentInitialMessage && messages.length === 0) {
      const userName = user?.nickname || user?.name || 'usuario';
      const welcomeMessage: OrbModal.Message = {
        id: Date.now().toString(),
        text: `Hola ${userName}, soy Jarvis, tu agente de IA, ¿cómo te puedo ayudar el día de hoy?`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      // Pequeño delay para que el modal se renderice primero
      setTimeout(() => {
        setMessages([welcomeMessage]);
        setHasSentInitialMessage(true);
      }, 500);
    }
  }, [isOpen, hasSentInitialMessage, messages.length, user?.nickname, user?.name]);

  // Efecto para animar el Orb cuando está pensando
  useEffect(() => {
    if (isTyping) {
      // Limpiar intervalo anterior si existe
      if (thinkingIntervalRef.current) {
        clearTimeout(thinkingIntervalRef.current);
      }

      // Activar forceHoverState cuando empieza a pensar
      setOrbForceHover(true);

      // Función para generar intervalo irregular
      const updateOrbState = () => {
        // Alternar hoverIntensity con picos altos hasta 3.24
        // Crear una secuencia que incluya valores bajos, medios y picos altos
        const baseIntensities = [0.5, 0.8, 1.2, 1.8, 2.5];
        const peakIntensities = [3.0, 3.24, 3.2, 3.1];
        // Combinar ambos arrays con más probabilidad de picos altos
        const allIntensities = [...baseIntensities, ...peakIntensities, ...peakIntensities, ...peakIntensities];
        const randomIntensity = allIntensities[Math.floor(Math.random() * allIntensities.length)];
        setOrbHoverIntensity(randomIntensity);

        // Intervalo irregular entre 200ms y 400ms
        const nextInterval = Math.random() * 200 + 200;
        
        thinkingIntervalRef.current = setTimeout(updateOrbState, nextInterval);
      };

      // Iniciar la animación
      updateOrbState();
    } else {
      // Volver a la normalidad cuando no está pensando
      if (thinkingIntervalRef.current) {
        clearTimeout(thinkingIntervalRef.current);
        thinkingIntervalRef.current = null;
      }
      setOrbHoverIntensity(0.3);
      setOrbForceHover(false);
    }

    // Cleanup
    return () => {
      if (thinkingIntervalRef.current) {
        clearTimeout(thinkingIntervalRef.current);
        thinkingIntervalRef.current = null;
      }
    };
  }, [isTyping]);

  // Resetear cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setHasSentInitialMessage(false);
      setMessages([]);
      setInputValue('');
      setIsTyping(false);
      setOrbHoverIntensity(0.3);
      setOrbForceHover(false);
      if (thinkingIntervalRef.current) {
        clearTimeout(thinkingIntervalRef.current);
        thinkingIntervalRef.current = null;
      }
    }
  }, [isOpen]);

  // Focus en el input cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        // Forzar resize del Orb después de que el modal esté completamente renderizado
        window.dispatchEvent(new Event('resize'));
      }, 800);
    }
  }, [isOpen]);

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

  // Simular respuesta del agente de IA
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return t('orbModal.greeting');
    }
    if (lowerMessage.includes('adios') || lowerMessage.includes('bye') || lowerMessage.includes('chao')) {
      return t('orbModal.farewell');
    }
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
      return t('orbModal.thanks');
    }
    if (lowerMessage.includes('que puedes hacer') || lowerMessage.includes('what can you do')) {
      return t('orbModal.capabilities');
    }
    
    return t('orbModal.defaultResponse', { message: userMessage });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: OrbModal.Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simular delay de respuesta del agente
    setTimeout(() => {
      const aiResponse: OrbModal.Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageToSend),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

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
        {/* Orb de fondo */}
        <div className="orb-modal-orb-background">
          <Orb
            hoverIntensity={orbHoverIntensity}
            rotateOnHover={true}
            hue={0}
            forceHoverState={orbForceHover}
            backgroundColor="#060010"
          />
        </div>
        
        {/* Overlay para legibilidad */}
        <div className="orb-modal-overlay"></div>

        <button className="orb-modal-close" onClick={onClose} aria-label={t('orbModal.close')}>
          ×
        </button>
        
        {/* Header con título */}
        <div className="orb-modal-header">
          <TextType 
            text={t('orbModal.title')}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
          />
        </div>

        {/* Área de mensajes */}
        <div className="orb-modal-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`orb-message orb-message-${message.sender}`}
            >
              <div className="orb-message-content">
                {message.text}
              </div>
              <div className="orb-message-time">
                {message.timestamp.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="orb-message orb-message-ai">
              <div className="orb-message-content orb-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input para enviar mensajes */}
        <div className="orb-modal-input-container">
          <input
            ref={inputRef}
            type="text"
            className="orb-modal-input"
            placeholder={t('orbModal.placeholder')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleInputKeyPress}
            disabled={isTyping}
          />
          <button
            className="orb-modal-send-button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            aria-label={t('orbModal.send')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrbModal;

