import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const LightboxModal = ({ isOpen, image, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
        title="Close (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
          title="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
          title="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image container */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img
          src={image.image}
          alt={image.title || 'School Gallery Photo'}
          className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
        />
        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-semibold">{image.title}</h3>
          {image.album && (
            <p className="text-sm text-amber-300 font-medium">Album: {image.album}</p>
          )}
        </div>
      </div>
    </div>
  );
};
