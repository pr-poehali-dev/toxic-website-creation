import React, { useEffect, useRef } from 'react';

interface Cross {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

const FlyingCrosses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const crossesRef = useRef<Cross[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Создаем кресты
    const createCrosses = () => {
      crossesRef.current = [];
      for (let i = 0; i < 20; i++) {
        crossesRef.current.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 15 + 10,
          opacity: Math.random() * 0.4 + 0.1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Обновляем позиции крестов
    const updateCrosses = () => {
      crossesRef.current = crossesRef.current.map(cross => {
        let newX = cross.x + cross.vx;
        let newY = cross.y + cross.vy;
        let newVx = cross.vx;
        let newVy = cross.vy;

        // Отскок от границ
        if (newX <= 0 || newX >= window.innerWidth) {
          newVx *= -1;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          newVy *= -1;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }

        return {
          ...cross,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          pulsePhase: cross.pulsePhase + 0.02,
        };
      });
    };

    // Рендер крестов
    const renderCrosses = () => {
      const container = containerRef.current;
      if (!container) return;

      // Очищаем контейнер
      container.innerHTML = '';

      // Создаем элементы крестов
      crossesRef.current.forEach(cross => {
        const crossElement = document.createElement('div');
        const pulse = Math.sin(cross.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = cross.opacity * pulse;

        crossElement.style.cssText = `
          position: absolute;
          left: ${cross.x}px;
          top: ${cross.y}px;
          width: ${cross.size}px;
          height: ${cross.size}px;
          opacity: ${currentOpacity};
          pointer-events: none;
          transform: translate(-50%, -50%);
        `;

        crossElement.innerHTML = `
          <svg width="100%" height="100%" viewBox="0 0 100 120" style="filter: drop-shadow(0 0 ${cross.size / 3}px rgba(255, 255, 255, 0.6));">
            <path d="
              M45 5 
              L40 0 L50 0 L60 0 L55 5
              L55 35
              L85 35
              L90 30 L90 40 L90 50 L85 45
              L55 45
              L55 115
              L60 120 L50 120 L40 120 L45 115
              L45 45
              L15 45
              L10 50 L10 40 L10 30 L15 35
              L45 35
              Z
            " 
            fill="white"/>
          </svg>
        `;

        container.appendChild(crossElement);
      });
    };

    // Анимационный цикл
    const animate = () => {
      updateCrosses();
      renderCrosses();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Обработчик изменения размера окна
    const handleResize = () => {
      createCrosses();
    };

    createCrosses();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default FlyingCrosses;