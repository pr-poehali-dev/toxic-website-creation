import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const InteractiveCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Проверяем, является ли устройство сенсорным
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Обработчики для мыши
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      createParticles(e.clientX, e.clientY);
    };

    // Обработчики для тач-устройств
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        createParticles(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        createParticles(touch.clientX, touch.clientY);
      }
    };

    // Создание частиц
    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          maxLife: 60
        });
      }

      // Ограничиваем количество частиц
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Обновляем и рисуем частицы
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        const alpha = particle.life / particle.maxLife;
        const size = (particle.life / particle.maxLife) * 4;

        // Рисуем частицу
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.8})`;
        ctx.fill();

        // Добавляем свечение
        ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return particle.life > 0;
      });

      // Рисуем основной курсор (только для десктопа)
      if (!isTouchDevice) {
        const { x, y } = mouseRef.current;
        
        // Внешнее кольцо
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Внутренняя точка
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fill();

        // Свечение
        ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    };

    // Добавляем обработчики событий
    if (isTouchDevice) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: false });
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (isTouchDevice) {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchstart', handleTouchStart);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isTouchDevice]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default InteractiveCursor;