import { PropsWithChildren, useEffect, useRef, useState, MouseEventHandler } from 'react';

interface FadeInSectionProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const FadeInSection = ({ children, className, onClick }: PropsWithChildren<FadeInSectionProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const classes = ['fade-in', className, isVisible ? 'appear' : ''].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

