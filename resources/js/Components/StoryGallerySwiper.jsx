import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function StoryGallerySwiper({ images, videos, title }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Combine images and videos into a single media array
  const mediaItems = [
    ...(images || []).map(src => ({ type: 'image', src })),
    ...(videos || []).map(src => ({ type: 'video', src }))
  ];

  if (!mediaItems || mediaItems.length === 0) return null;

  const handleCloseModal = () => {
    setShowZoomModal(false);
  };

  // Zoom Modal Component
  const ZoomModal = () => {
    if (!showZoomModal) return null;

    const currentMedia = mediaItems[currentMediaIndex];

    return createPortal(
      <div
        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-2 sm:p-4"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0
        }}
        onClick={handleCloseModal}
        onTouchEnd={handleCloseModal}
      >
        {/* Top Bar with Counter and Close Button */}
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 z-[10001]">
          {/* Media Counter - Left Side */}
          <div className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-6 py-1.5 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg">
            {currentMediaIndex + 1} / {mediaItems.length}
          </div>

          {/* Close Button - Right Side */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            title="Close"
            aria-label="Close"
          >
            <i className="fa-solid fa-times text-xl sm:text-2xl"></i>
          </button>
        </div>

        {/* Previous Button */}
        {currentMediaIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentMediaIndex(prev => prev - 1);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setCurrentMediaIndex(prev => prev - 1);
            }}
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-[10001] shadow-lg"
            title="Previous"
            aria-label="Previous"
          >
            <i className="fa-solid fa-chevron-left text-lg sm:text-2xl"></i>
          </button>
        )}

        {/* Next Button */}
        {currentMediaIndex < mediaItems.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentMediaIndex(prev => prev + 1);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setCurrentMediaIndex(prev => prev + 1);
            }}
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-[10001] shadow-lg"
            title="Next"
            aria-label="Next"
          >
            <i className="fa-solid fa-chevron-right text-lg sm:text-2xl"></i>
          </button>
        )}

        {/* Zoomed Media Container */}
        <div
          className="max-w-7xl max-h-full w-full h-full flex items-center justify-center px-2 sm:px-4 pt-16 pb-16"
          onClick={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.src}
              alt={`${title} - ${currentMediaIndex + 1}`}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={currentMedia.src}
              controls
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {/* Download Button - Bottom Center */}
        <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-[10001]">
          <a
            href={currentMedia.src}
            download
            onClick={(e) => {
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            title="Download"
            aria-label="Download"
          >
            <i className="fa-solid fa-download text-sm sm:text-lg"></i>
            <span className="text-sm sm:text-base font-bold hidden sm:inline">Download</span>
          </a>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="flex gap-1.5 sm:gap-2 md:gap-4 h-full ltr:flex-row rtl:flex-row-reverse">
        {/* Vertical Thumbnail Swiper - Outside on Left (LTR) or Right (RTL) */}
        <div className="w-12 sm:w-16 md:w-20 lg:w-24 flex-shrink-0">
          <div className="relative h-full py-6 sm:py-8 md:py-10 lg:py-12">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSlideChange={(swiper) => setCurrentMediaIndex(swiper.activeIndex)}
              direction="vertical"
              spaceBetween={6}
              className="h-full"
              breakpoints={{
                0: { slidesPerView: 5, spaceBetween: 6 },
                640: { slidesPerView: 5, spaceBetween: 8 },
                768: { slidesPerView: 5, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 12 },
              }}
            >
              {mediaItems.map((media, index) => (
                <SwiperSlide key={index} style={{ height: 'auto' }}>
                  <div
                    className={`rounded-md sm:rounded-lg cursor-pointer overflow-hidden border transition-all duration-300 shadow-md hover:shadow-xl ${
                      index === currentMediaIndex
                        ? 'border-2 sm:border-3 border-orange-500 ring-1 sm:ring-2 ring-orange-200 scale-105'
                        : 'border border-white hover:border-orange-300'
                    }`}
                    onClick={() => setCurrentMediaIndex(index)}
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-10 sm:h-12 md:h-16 lg:h-20 object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-10 sm:h-12 md:h-16 lg:h-20">
                        <video
                          src={media.src}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <i className="fa-solid fa-play text-white text-xs sm:text-sm"></i>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Vertical Navigation Buttons */}
            <button
              ref={prevRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-40 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-up text-xs sm:text-sm"></i>
            </button>
            <button
              ref={nextRef}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full z-40 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-down text-xs sm:text-sm"></i>
            </button>
          </div>
        </div>

        {/* Main Media Display */}
        <div className="relative flex-1 min-w-0">
          <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-green-100 p-1 sm:p-2 h-full flex items-center justify-center">
            <div className="aspect-[193/260] w-full h-full">
              {mediaItems[currentMediaIndex].type === 'image' ? (
                <img
                  src={mediaItems[currentMediaIndex].src}
                  alt={`${title} - ${currentMediaIndex + 1}`}
                  className="w-full h-full object-cover rounded-md sm:rounded-lg"
                />
              ) : (
                <video
                  src={mediaItems[currentMediaIndex].src}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-md sm:rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Media Counter & Zoom - Bottom Right */}
          <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-4 ltr:right-1.5 ltr:sm:right-2 ltr:md:right-4 rtl:left-1.5 rtl:sm:left-2 rtl:md:left-4 flex items-center gap-1 sm:gap-2 z-20">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              {currentMediaIndex + 1} / {mediaItems.length}
            </span>
            <button
              onClick={() => setShowZoomModal(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              title="Zoom"
              aria-label="Zoom"
            >
              <i className="fa-solid fa-magnifying-glass-plus text-xs sm:text-sm md:text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Render Zoom Modal via Portal */}
      <ZoomModal />
    </>
  );
}
