import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

namespace FallingText {
  export interface Props {
    text?: string;
    highlightWords?: string[];
    highlightClass?: string;
    trigger?: 'auto' | 'scroll' | 'click' | 'hover';
    backgroundColor?: string;
    wireframes?: boolean;
    gravity?: number;
    mouseConstraintStiffness?: number;
    fontSize?: string;
  }
}

const FallingText: React.FC<FallingText.Props> = ({
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ').filter(w => w.length > 0);
    const newHTML = words
      .map((word, index) => {
        const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        return `<span class="word ${isHighlighted ? highlightClass : ''}" data-index="${index}">${word}</span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
    textRef.current.style.whiteSpace = 'normal';
    textRef.current.style.wordSpacing = '0.3em';
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      return;
    }

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };

    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Esperar a que el DOM se renderice completamente antes de iniciar la física
    setTimeout(() => {
      if (!textRef.current || !containerRef.current) return;

      const wordSpans = textRef.current.querySelectorAll<HTMLSpanElement>('.word');
      const wordBodies: Array<{ elem: HTMLSpanElement; body: Matter.Body }> = [];

      Array.from(wordSpans).forEach((elem) => {
        // Obtener posición inicial antes de hacerla absoluta
        const rect = elem.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        if (rect.width === 0 || rect.height === 0) return;

        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        // Hacer la palabra absoluta en su posición inicial
        elem.style.position = 'absolute';
        elem.style.display = 'inline-block';
        elem.style.whiteSpace = 'nowrap';
        elem.style.zIndex = '10';
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = 'translate(-50%, -50%)';

        const body = Bodies.rectangle(x, y, Math.max(rect.width, 10), Math.max(rect.height, 10), {
          render: { fillStyle: 'transparent' },
          restitution: 0.6,
          frictionAir: 0.02,
          friction: 0.3,
          density: 0.001
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2
        });

        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

        wordBodies.push({ elem, body });
      });

      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });

      render.mouse = mouse;

      World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

      const updateLoop = () => {
        if (!textRef.current) return;

        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });

        Matter.Engine.update(engine);
        requestAnimationFrame(updateLoop);
      };

      updateLoop();
    }, 100);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="falling-text-container"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{
          fontSize: fontSize,
          lineHeight: 1.4
        }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;

