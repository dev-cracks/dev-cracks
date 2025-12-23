import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import '../styles/services-page.css';

interface Step {
  id: number;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  visual: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Estado Inicial de la Empresa',
    description: 'Una empresa tradicional con procesos manuales, altos costos operativos y tiempos de respuesta lentos.',
    metrics: [
      { label: 'Tiempo de Procesamiento', value: '100%', improvement: 'Baseline' },
      { label: 'Costos Operativos', value: '100%', improvement: 'Baseline' },
      { label: 'Errores Humanos', value: '15%', improvement: 'Alto' }
    ],
    visual: '📊'
  },
  {
    id: 2,
    title: 'Implementación de Machine Learning',
    description: 'El ML analiza patrones históricos y predice resultados, optimizando decisiones y reduciendo errores.',
    metrics: [
      { label: 'Tiempo de Procesamiento', value: '60%', improvement: '-40%' },
      { label: 'Costos Operativos', value: '75%', improvement: '-25%' },
      { label: 'Errores Humanos', value: '8%', improvement: '-47%' }
    ],
    visual: '🤖'
  },
  {
    id: 3,
    title: 'Automatización de Procesos',
    description: 'Los procesos repetitivos se automatizan, liberando tiempo del equipo para tareas estratégicas.',
    metrics: [
      { label: 'Tiempo de Procesamiento', value: '30%', improvement: '-70%' },
      { label: 'Costos Operativos', value: '50%', improvement: '-50%' },
      { label: 'Errores Humanos', value: '3%', improvement: '-80%' }
    ],
    visual: '⚡'
  },
  {
    id: 4,
    title: 'Agentes Orquestados de IA',
    description: 'Múltiples agentes de IA trabajan coordinados, resolviendo tareas complejas de forma autónoma.',
    metrics: [
      { label: 'Tiempo de Procesamiento', value: '15%', improvement: '-85%' },
      { label: 'Costos Operativos', value: '35%', improvement: '-65%' },
      { label: 'Errores Humanos', value: '1%', improvement: '-93%' }
    ],
    visual: '🎯'
  },
  {
    id: 5,
    title: 'Resultado Final: Empresa Optimizada',
    description: 'La empresa ha transformado sus operaciones, logrando máxima eficiencia y rentabilidad.',
    metrics: [
      { label: 'ROI Anual', value: '300%', improvement: '+300%' },
      { label: 'Productividad', value: '+250%', improvement: '+250%' },
      { label: 'Satisfacción Cliente', value: '95%', improvement: '+40%' }
    ],
    visual: '🚀'
  }
];

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setIsAnimating(false);
        }, 500);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const goToStep = (stepIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(stepIndex);
      setIsAnimating(false);
    }, 300);
  };

  const currentStepData = steps[currentStep];

  return (
    <>
      <Header />
      <div className="services-page">
        <div className="services-page__header">
          <button className="services-page__back" onClick={() => navigate('/')}>
            ← Volver
          </button>
          <h1>Transformación Empresarial con IA</h1>
          <p>Descubre paso a paso cómo la tecnología transforma tu empresa</p>
        </div>

      <div className="services-page__progress">
        <div className="services-page__progress-bar">
          <div
            className="services-page__progress-fill"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="services-page__progress-steps">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`services-page__progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => goToStep(index)}
              aria-label={`Ir a paso ${step.id}`}
            >
              {step.visual}
            </button>
          ))}
        </div>
      </div>

      <div className={`services-page__content ${isAnimating ? 'animating' : ''}`}>
        <div className="services-page__step">
          <div className="services-page__step-visual">
            <div className="services-page__icon">{currentStepData.visual}</div>
          </div>

          <div className="services-page__step-content">
            <h2 className="services-page__step-title">{currentStepData.title}</h2>
            <p className="services-page__step-description">{currentStepData.description}</p>

            <div className="services-page__metrics">
              {currentStepData.metrics.map((metric, index) => (
                <div key={index} className="services-page__metric">
                  <div className="services-page__metric-label">{metric.label}</div>
                  <div className="services-page__metric-value">{metric.value}</div>
                  <div className={`services-page__metric-improvement ${metric.improvement.startsWith('+') || metric.improvement.startsWith('-') ? 'positive' : ''}`}>
                    {metric.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="services-page__controls">
        <button
          className="services-page__btn services-page__btn--prev"
          onClick={() => goToStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Anterior
        </button>
        <div className="services-page__step-indicator">
          Paso {currentStep + 1} de {steps.length}
        </div>
        <button
          className="services-page__btn services-page__btn--next"
          onClick={() => goToStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Siguiente
        </button>
      </div>

      {currentStep === steps.length - 1 && (
        <div className="services-page__cta">
          <h3>¿Listo para transformar tu empresa?</h3>
          <button className="services-page__btn services-page__btn--primary" onClick={() => navigate('/#contacto')}>
            ¡Hablemos de tu Proyecto!
          </button>
        </div>
      )}
      </div>
    </>
  );
};

