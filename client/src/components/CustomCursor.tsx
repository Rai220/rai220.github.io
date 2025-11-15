import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  element?: HTMLDivElement;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);

      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5 && containerRef.current) {
        const particle = document.createElement('div');
        particle.className = 'pointer-events-none absolute w-2 h-2 rounded-full bg-primary';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.boxShadow = '0 0 8px 4px rgba(0, 255, 157, 0.6)';
        particle.setAttribute('data-testid', `cursor-particle-${particleIdRef.current}`);
        
        containerRef.current.appendChild(particle);

        particlesRef.current.push({
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          scale: 1,
          element: particle,
        });

        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (particlesRef.current.length > 0) {
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.opacity -= 0.02;
          particle.scale -= 0.01;

          if (particle.opacity <= 0 || !particle.element) {
            particle.element?.remove();
            return false;
          }

          particle.element.style.opacity = particle.opacity.toString();
          particle.element.style.transform = `translate(-50%, -50%) scale(${particle.scale})`;
          particle.element.style.boxShadow = `0 0 ${8 * particle.scale}px ${4 * particle.scale}px rgba(0, 255, 157, ${particle.opacity * 0.6})`;

          return true;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      particlesRef.current.forEach(p => p.element?.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <>
      <style>{`
        body, a, button, div, span, p, h1, h2, h3, h4, h5, h6 {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: text !important;
        }
        input[type="button"], input[type="submit"], input[type="reset"] {
          cursor: none !important;
        }
      `}</style>
      
      <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999]" />

      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isPointer ? 'scale(1.5)' : 'scale(1)'}`,
        }}
        data-testid="custom-cursor"
      >
        <div className={`w-4 h-4 rounded-full border-2 ${isPointer ? 'border-secondary' : 'border-primary'} transition-colors duration-200`} 
          style={{
            boxShadow: `0 0 10px 2px ${isPointer ? 'rgba(0, 255, 255, 0.5)' : 'rgba(0, 255, 157, 0.5)'}`,
          }}
        />
        <div className={`absolute inset-0 rounded-full ${isPointer ? 'bg-secondary' : 'bg-primary'} opacity-20 animate-ping`} />
      </div>
    </>
  );
}
