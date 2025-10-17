import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function StoryModal({
  open,
  news,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open || !news || !news[currentIndex]) return null;
  const item = news[currentIndex];

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md w-screen h-screen left-0 top-0">
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Три карточки: prev, active, next */}
        {[currentIndex - 1, currentIndex, currentIndex + 1].map((idx, i) => {
          if (idx < 0 || idx >= news.length) return null;
          const n = news[idx];
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={`transition-all duration-500 ease-in-out flex flex-col items-center justify-center rounded-2xl shadow-xl mx-2 ${
                isActive
                  ? 'scale-100 z-30 bg-white'
                  : 'scale-90 z-20 bg-gray-900 bg-opacity-70'
              } ${
                isActive
                  ? 'w-[340px] h-[520px]'
                  : 'w-[220px] h-[340px] opacity-60 blur-[2px]'
              } animate-story-card`}
              style={{
                cursor: isActive ? 'default' : 'pointer',
                boxShadow: isActive
                  ? '0 8px 32px rgba(0,0,0,0.25)'
                  : '0 2px 8px rgba(0,0,0,0.15)',
                transitionProperty: 'all, transform, opacity',
              }}
              onClick={() =>
                !isActive && (idx < currentIndex ? onPrev() : onNext())
              }
            >
              <div className="w-full h-[60%] flex items-center justify-center overflow-hidden rounded-t-2xl">
                {n.image && (
                  <img
                    src={n.image}
                    alt={n.title}
                    className={`object-cover w-full h-full ${
                      isActive ? '' : 'scale-105'
                    } transition-all duration-500 ease-in-out`}
                  />
                )}
              </div>
              <div className="w-full px-4 py-3 flex-1 flex flex-col justify-center items-center">
                <h2
                  className={`font-bold text-center mb-2 ${
                    isActive ? 'text-2xl text-blue-700' : 'text-lg text-white'
                  } transition-all duration-500 ease-in-out`}
                >
                  {n.title}
                </h2>
                {isActive && (
                  <p className="text-base text-gray-700 text-center transition-all duration-500 ease-in-out">
                    {n.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {/* Кнопка закрытия */}
        <button
          className="absolute top-8 right-8 text-white bg-black bg-opacity-60 rounded-full p-3 z-40 text-2xl"
          onClick={onClose}
        >
          &#10005;
        </button>
        {/* Прогресс-бар */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 z-50">
          <div
            className="bg-blue-500 h-2 transition-all"
            style={{ width: `${((currentIndex + 1) / news.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    typeof window !== 'undefined'
      ? document.body
      : document.createElement('div')
  );
}
