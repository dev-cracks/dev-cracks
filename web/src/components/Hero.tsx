import { useEffect, useState } from 'react';

const HERO_TEXT = 'Construimos el Futuro del Software.';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayText(HERO_TEXT.slice(0, index));

      if (index >= HERO_TEXT.length) {
        window.clearInterval(interval);
        setIsTyping(false);
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <h2 className={`typing-effect${isTyping ? '' : ' typing-effect--done'}`}>
          <span>{displayText}</span>
        </h2>
        <p>
          Somos Dev Cracks, un equipo de desarrolladores top, innovando en cada línea de código para transformar ideas
          en soluciones excepcionales y de alto impacto.
        </p>
        <a className="btn-primary" href="#contacto">
          ¡Hablemos de tu proyecto!
        </a>
      </div>
    </section>
  );
};

