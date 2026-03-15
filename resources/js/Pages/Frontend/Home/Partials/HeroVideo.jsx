import React, { useState, useRef, useEffect } from 'react';

const HeroVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const attemptPlay = async () => {
        try {
          video.load();
          await video.play();
          setIsLoaded(true);
        } catch (error) {
          console.log("Autoplay prevented or video failed:", error);
          setIsLoaded(true);
        }
      };

      const timer = setTimeout(attemptPlay, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoError = () => {
    console.log("Video failed to load");
    setHasError(true);
    setIsLoaded(true);
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Final play attempt failed");
      });
    }
  };

  return (
    <div className="relative group w-full h-full">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/80 to-orange-200/60 animate-pulse flex items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-orange-500/40 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Floating Glow Effects - Only on mobile */}
      <div className="absolute -inset-8 lg:inset-0 bg-gradient-to-r from-orange-400/30 via-orange-500/40 to-orange-600/30 rounded-3xl lg:rounded-none blur-2xl opacity-70 group-hover:opacity-90 transition-all duration-700 animate-pulse lg:hidden" />
      <div className="absolute -inset-4 lg:inset-0 bg-gradient-to-r from-orange-500/40 to-orange-400/40 rounded-2xl lg:rounded-none blur-lg opacity-50 transition-opacity duration-500 lg:hidden" />

      {/* Video Container - Full width on desktop, styled on mobile */}
      <div className="relative bg-white/20 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-3xl lg:rounded-none p-6 lg:p-0 border border-white/30 lg:border-0 shadow-2xl shadow-orange-500/20 lg:shadow-none h-full">
        <div className="relative overflow-hidden rounded-2xl lg:rounded-none bg-gradient-to-br from-orange-50/50 to-orange-100/30 lg:bg-transparent h-full">
          {!hasError ? (
            <video
              ref={videoRef}
              src="assets/home/intro.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              preload="auto"
              className={`w-full h-full object-cover rounded-2xl lg:rounded-none shadow-lg lg:shadow-none
                         transition-all duration-700 ease-out
                         ${isLoaded
                           ? "opacity-100 scale-100 group-hover:scale-105 lg:group-hover:scale-[1.02]"
                           : "opacity-0 scale-95"
                         }`}
              style={{
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
              }}
              onLoadedData={handleVideoLoad}
              onCanPlay={handleCanPlay}
              onCanPlayThrough={handleVideoLoad}
              onError={handleVideoError}
              onContextMenu={(e) => e.preventDefault()}
              onDoubleClick={(e) => e.preventDefault()}
            />
          ) : (
            <div className="w-full h-full rounded-2xl lg:rounded-none bg-gradient-to-br from-orange-500/20 to-orange-600/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-orange-500/30 flex items-center justify-center backdrop-blur-sm">
                  <i className="fa-solid fa-play text-5xl text-orange-600"></i>
                </div>
                <p className="text-orange-800 font-bold text-xl">Hero Content</p>
                <p className="text-orange-600 text-sm mt-2">Video placeholder</p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Corner Elements - Only on mobile */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-400 rounded-full opacity-80 lg:hidden"></div>
        <div className="absolute -top-1 -right-3 w-3 h-3 bg-orange-500 rounded-full opacity-60 lg:hidden"></div>
        <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-orange-600 rounded-full opacity-70 lg:hidden"></div>
        <div className="absolute -bottom-1 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-80 lg:hidden"></div>
      </div>
    </div>
  );
};

export default HeroVideo;
