import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { LightboxModal } from '../components/LightboxModal';
import {
  Image as ImageIcon,
  Filter,
  Maximize2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const GalleryPage = () => {
  const { lang, t } = useLanguage();
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.getGallery();
        if (res.success) setGalleryItems(res.data);
      } catch (err) {
        console.warn('Error loading gallery:', err.message);
      }
    };
    fetchGallery();
  }, []);

  const albums = [
    'All',
    'School Campus',
    'Classroom Activities',
    'Sports',
    'Cultural Activities',
    'Annual Function'
  ];

  const filteredItems = selectedAlbum === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.album === selectedAlbum);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(-1);
  };

  const handleNext = () => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'चित्र वीथिका' : 'Visual Highlights'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'विद्यालय की जीवंत झलकियां एवं स्मृतियां'
                : 'School Photo & Video Gallery'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Explore Life at VSS Saraswati Vidya Mandir Inter College, Arkha • Campus, Sports, Culture & Science
            </p>
          </div>
        </div>

        {/* Album Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedAlbum === album
                  ? 'bg-saffron-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer relative card-hover-effect"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transform group-hover:scale-110 transition">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.album}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-saffron-700 transition">
                  {item.title}
                </h4>
                {item.date && (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">No photos found in this album</h3>
            <p className="text-xs text-slate-500 mt-1">Check back soon for new gallery uploads.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={lightboxIndex >= 0}
          image={filteredItems[lightboxIndex]}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};
