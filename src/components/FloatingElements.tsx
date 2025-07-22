import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <>
      {/* Плавающие геометрические фигуры */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Медленно вращающиеся элементы */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-red-500/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-8 bg-purple-500/25 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-pink-500/30 rotate-12 animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: '4s', animationDuration: '3s' }}></div>
        
        {/* Большие медленные элементы */}
        <div className="absolute top-40 right-1/4 w-12 h-1 bg-gradient-to-r from-primary/20 to-transparent animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-16 bg-gradient-to-t from-red-500/15 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Мобильные скрытые элементы (меньше и реже) */}
        <div className="hidden md:block absolute top-1/4 left-3/4 w-8 h-2 bg-primary/10 animate-pulse" style={{ animationDelay: '5s' }}></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/6 w-6 h-6 border border-purple-500/20 rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Дополнительные световые эффекты */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
      </div>
    </>
  );
};

export default FloatingElements;