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
      for (let i = 0; i < 12; i++) {
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
          <div style="
            position: relative;
            width: 100%;
            height: 100%;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 2px;
              background: white;
              transform: translateY(-50%);
              box-shadow: 0 0 ${cross.size / 2}px rgba(255, 255, 255, 0.3);
            "></div>
            <div style="
              position: absolute;
              left: 50%;
              top: 0;
              width: 2px;
              height: 100%;
              background: white;
              transform: translateX(-50%);
              box-shadow: 0 0 ${cross.size / 2}px rgba(255, 255, 255, 0.3);
            "></div>
          </div>
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