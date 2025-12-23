import './LogoLoop.css';

namespace LogoLoop {
  // Lista de logos/tecnologías a mostrar (puedes personalizar esto)
  const logos = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' },
    { name: 'GraphQL', icon: '🔷' },
    { name: 'TensorFlow', icon: '🧠' },
  ];

  // Duplicar los logos para crear un bucle infinito suave
  const duplicatedLogos = [...logos, ...logos, ...logos];

  export const Component = () => {
    return (
      <section className="logo-loop">
        <div className="logo-loop__container">
          <div className="logo-loop__content">
            <div className="logo-loop__track">
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="logo-loop__item">
                  <span className="logo-loop__icon">{logo.icon}</span>
                  <span className="logo-loop__name">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
}

export const LogoLoop = LogoLoop.Component;

