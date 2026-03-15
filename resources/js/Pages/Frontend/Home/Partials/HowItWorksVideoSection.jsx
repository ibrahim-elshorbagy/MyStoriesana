// HowItWorksVideoSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useTrans } from '@/Hooks/useTrans';


export default function HowItWorksVideoSection({ videoUrl }) {
  const { t } = useTrans();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused
  const [isVisible, setIsVisible] = useState(false);


  // Detect RTL from document
  const isRtl = document.documentElement.dir === 'rtl';

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <section
      ref={sectionRef}
      className="relative w-screen -mx-[50vw] left-[50%] right-[50%] cursor-pointer bg-black"
      onClick={togglePlayPause}
    >
      {isVisible && (
        <video
          ref={videoRef}
          src={`/storage/${videoUrl}`}
          autoPlay={true}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-auto object-contain"
        />
      )}

      {/* Loading placeholder */}
      {!isVisible && (
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
          <div className="text-white text-lg">Loading video...</div>
        </div>
      )}


      {/* Custom Play/Pause Control */}
      <button
        onClick={togglePlayPause}
        className={`absolute bottom-8 z-20 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md border border-orange-400/50 hover:border-orange-400/80 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-200 hover:scale-110 ${
          isRtl ? 'left-8' : 'right-8'
        }`}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <i className="fa-solid fa-pause text-xl md:text-2xl"></i>
        ) : (
          <i className="fa-solid fa-play text-xl md:text-2xl ms-1"></i>
        )}
      </button>
    </section>
  );
}
