// CustomerFeedbackSection.jsx
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTrans } from '@/Hooks/useTrans';

export default function CustomerFeedbackSection({ textFeedbacks, imageFeedbacks, videoFeedbacks }) {
  const { t } = useTrans();
  const videoRefs = useRef([]);
  const [playingStates, setPlayingStates] = useState({});

  // Detect RTL from document
  const isRtl = document.documentElement.dir === 'rtl';

  const toggleVideoPlayPause = (index, e) => {
    if (e) e.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      if (playingStates[index]) {
        video.pause();
      } else {
        video.play();
      }
      setPlayingStates(prev => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <>
      {/* Text and Image feedbacks with container */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto space-y-12 py-14 px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Text Feedbacks Swiper */}
          {textFeedbacks && textFeedbacks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">{t('customer_testimonials')}</h3>
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {textFeedbacks.map((feedback, index) => (
                  <SwiperSlide key={`text-feedback-${feedback.id || index}`}>
                    <div className="flex flex-col justify-between h-full bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col flex-grow justify-center p-6 text-center min-h-60">
                        <p className="text-gray-700 leading-relaxed text-base italic">
                          "{feedback.customer_feedback}"
                        </p>
                      </div>
                      <div className="flex justify-center py-3">
                        {[...Array(5)].map((_, starIndex) => (
                          <i key={starIndex} className="fa-solid fa-star text-yellow-400 text-lg"></i>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Image Feedbacks Swiper */}
          {imageFeedbacks && imageFeedbacks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">{t('customer_images')}</h3>
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {imageFeedbacks.map((feedback, index) => (
                  <SwiperSlide key={`image-feedback-${feedback.id || index}`}>
                    <div className="flex flex-col h-full bg-white border border-orange-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <div className="h-60 overflow-hidden">
                        <img
                          src={`/storage/${feedback.image}`}
                          alt="Customer feedback"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      {/* Video Feedbacks - Full Screen Section */}
      {videoFeedbacks && videoFeedbacks.length > 0 && (
        <section
          className="relative w-screen overflow-hidden  md:h-screen"
          style={{
            marginLeft: 'calc(-50vw + 50%)'
          }}
        >
          {/* Title overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent py-6 pointer-events-none">
            <h3 className="text-3xl font-bold text-center text-white">{t('customer_videos')}</h3>
          </div>

          {/* Video Swiper */}
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={false}
            loop
            navigation={{
              nextEl: '.video-swiper-button-next',
              prevEl: '.video-swiper-button-prev',
            }}
            className="!w-full !h-auto md:!h-screen"
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              if (playingStates[currentIndex] === undefined) {
                setPlayingStates(prev => ({ ...prev, [currentIndex]: true }));
              }
            }}
          >
            {videoFeedbacks.map((feedback, index) => (
              <SwiperSlide key={`video-feedback-${feedback.id || index}`} className="!w-full">
                <div
                  className="relative !w-full cursor-pointer"
                  onClick={(e) => toggleVideoPlayPause(index, e)}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={`/storage/${feedback.video}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="!w-full h-auto max-h-[80vh] object-contain md:h-screen md:max-h-screen md:object-cover"
                    onPlay={() => setPlayingStates(prev => ({ ...prev, [index]: true }))}
                  />

                  {/* Custom Play/Pause Control - RTL/LTR aware */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlayPause(index, e);
                    }}
                    className={`absolute bottom-8 z-20 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md border border-orange-400/50 hover:border-orange-400/80 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-200 hover:scale-110 ${
                      isRtl ? 'left-8' : 'right-8'
                    }`}
                    aria-label={playingStates[index] ? 'Pause video' : 'Play video'}
                  >
                    {playingStates[index] ? (
                      <i className="fa-solid fa-pause text-xl md:text-2xl"></i>
                    ) : (
                      <i className="fa-solid fa-play text-xl md:text-2xl ms-1"></i>
                    )}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <button className="video-swiper-button-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md border border-orange-400/50 hover:border-orange-400/80 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-200">
            <i className="fa-solid fa-chevron-left text-lg md:text-xl"></i>
          </button>
          <button className="video-swiper-button-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-orange-500/20 hover:bg-orange-500/40 backdrop-blur-md border border-orange-400/50 hover:border-orange-400/80 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-200">
            <i className="fa-solid fa-chevron-right text-lg md:text-xl"></i>
          </button>
        </section>
      )}
    </>
  );
}
