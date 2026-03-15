import React from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTrans } from '@/Hooks/useTrans';
import HeroVideo from './HeroVideo';

export default function HeroSection() {
  const { t } = useTrans();

  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('assets/home/banner.png')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark Orange Gradient Overlay - Low Opacity to Show Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-800/20 via-orange-700/30 to-orange-600/25 z-0"></div>

      {/* Secondary Gradient for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-700/60 via-orange-500/70 to-orange-600/65 z-5"></div>

      {/* Modern Background Elements - Reduced Opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Primary Gradient Orbs */}
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-orange-300/8 to-orange-500/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/6 to-orange-200/4 rounded-full blur-3xl"></div>

        {/* Secondary Accent Orbs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-100/6 to-orange-300/3 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-20 w-32 h-32 bg-orange-200/6 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-300/8 rounded-full blur-lg"></div>
      </div>

      {/* Floating Decorative Icons - Updated Colors for Better Visibility */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Left Side Icons (Around video area) - Brighter Colors */}
        <div className="absolute top-8 sm:top-16 lg:top-32 left-8 lg:left-4 animate-float opacity-90">
          <i className="fa-solid fa-rocket text-yellow-300 text-4xl "></i>
        </div>
        <div className="absolute top-16 sm:top-24 lg:top-48 left-20 lg:left-12 animate-float-delay-1 opacity-85">
          <i className="fa-solid fa-lightbulb text-yellow-200 text-2xl "></i>
        </div>
        <div className="absolute bottom-8 sm:bottom-16 lg:bottom-32 left-12 lg:left-6 animate-float-delay-2 opacity-90">
          <i className="fa-solid fa-star text-yellow-300 text-3xl "></i>
        </div>

        {/* Right Side Icons (Around content area) - White and Light Colors */}
        <div className="absolute top-8 sm:top-12 lg:top-28 right-12 lg:right-20 animate-float-delay-1 opacity-95">
          <i className="fa-solid fa-crown text-white text-3xl "></i>
        </div>
        <div className="absolute top-16 sm:top-20 lg:top-44 right-24 lg:right-32 animate-float opacity-85">
          <i className="fa-solid fa-gem text-blue-200 text-2xl "></i>
        </div>
        <div className="absolute top-20 sm:top-32 lg:top-60 right-8 lg:right-16 animate-float-delay-2 opacity-90">
          <i className="fa-solid fa-magic-wand-sparkles text-pink-200 text-2xl "></i>
        </div>

        {/* Bottom Floating Elements - Bright Contrasting Colors */}
        <div className="absolute bottom-16 sm:bottom-24 lg:bottom-40 left-1/4 animate-float-delay-1 opacity-85">
          <i className="fa-solid fa-fire text-red-300 text-3xl "></i>
        </div>
        <div className="absolute bottom-8 sm:bottom-16 lg:bottom-32 right-1/4 animate-float opacity-90">
          <i className="fa-solid fa-bolt text-yellow-200 text-2xl "></i>
        </div>
        <div className="absolute bottom-24 sm:bottom-32 lg:bottom-48 right-1/3 animate-float-delay-2 opacity-85">
          <i className="fa-solid fa-heart text-pink-300 text-2xl "></i>
        </div>

        {/* Scattered Center Elements - Enhanced Visibility */}
        <div className="absolute top-1/3 left-1/3 animate-float-delay-1 opacity-80 hidden sm:block">
          <i className="fa-solid fa-sparkles text-white text-xl "></i>
        </div>
        <div className="absolute bottom-1/3 right-2/5 animate-float opacity-85 hidden sm:block">
          <i className="fa-solid fa-certificate text-yellow-200 text-xl "></i>
        </div>

        {/* Additional mobile-only icons in safe areas - Updated Colors */}
        <div className="absolute top-2 left-2 animate-float opacity-80 sm:hidden">
          <i className="fa-solid fa-sparkles text-white text-lg drop-shadow-xl"></i>
        </div>
        <div className="absolute top-6 right-2 animate-float-delay-1 opacity-75 sm:hidden">
          <i className="fa-solid fa-star text-yellow-300 text-sm drop-shadow-xl"></i>
        </div>
        <div className="absolute bottom-2 left-4 animate-float-delay-2 opacity-80 sm:hidden">
          <i className="fa-solid fa-certificate text-blue-200 text-lg drop-shadow-xl"></i>
        </div>
        <div className="absolute bottom-6 right-4 animate-float opacity-75 sm:hidden">
          <i className="fa-solid fa-gem text-pink-200 text-sm drop-shadow-xl"></i>
        </div>
      </div>

      {/* Main Content Container - Full Width Layout */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 h-fit lg:h-[600px] xl:h-[700px] 2xl:h-[800px] py-6 lg:py-0 relative z-30">

        {/* Video Section - Full Width on Desktop with Separator */}
        <div className="flex-[3] order-2 lg:order-1 relative h-full px-4 lg:px-0 flex items-center w-full">
          <HeroVideo />

          {/* Vertical Gradient Separator - Positioned on Video Edge */}
          <div
            className="hidden lg:block absolute top-0 h-full w-32 z-40 pointer-events-none ltr:right-0 rtl:left-0 transform ltr:translate-x-1/2 rtl:-translate-x-1/2"
            style={{
              backgroundImage: "url('assets/orange-gradient.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain"
            }}
          ></div>
        </div>

        {/* Content Section - Normal Position with Inner Content Adjustment */}
        <div className="flex-[2] lg:py-10 text-center lg:text-start order-1 lg:order-2 gap-4 lg:gap-6 flex flex-col items-center lg:items-start justify-center z-10 px-6 lg:px-12 relative">

          {/* Content Wrapper - Moved to compensate for separator overlap */}
          <div className="ltr:lg:ml-8 rtl:lg:mr-16 w-full max-lg:py-16">
            {/* Main Heading - Enhanced for Better Visibility */}
            <div className="flex flex-col gap-5 max-lg:pt-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold relative w-fit mx-auto lg:mx-0 leading-tight">
                <span className="block bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent font-black mb-3 drop-shadow-2xl">
                  <span className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl '>{t('your_child')}</span>
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent font-black drop-shadow-2xl ">
                  {t('is_the_hero')}
                </span>
              </h1>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-orange-100 via-white to-orange-200 bg-clip-text text-transparent drop-shadow-lg mb-4 leading-tight">
                  {t('hero_subtitle')} <span className="block lg:inline">{t('hero_title')}</span>
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-white/95 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg font-medium">
                  {t('hero_description')}
                </p>
              </div>
            </div>

            {/* CTA Buttons - Enhanced Styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
              <Link
                href={route('frontend.order.create')}
                className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-white shadow-2xl shadow-orange-900/50 hover:shadow-orange-800/60 transform hover:scale-105 transition-all duration-300 rounded-md border-2 border-orange-300/30 backdrop-blur-sm"
              >
                {t('new_story_now')}
              </Link>
              <Link
                href={route('stories')}
                className="px-12 py-4 text-lg font-bold bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm shadow-2xl shadow-black/20 hover:shadow-black/30 transform hover:scale-105 transition-all duration-300 rounded-md"
              >
                {t('try_now')}
              </Link>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
