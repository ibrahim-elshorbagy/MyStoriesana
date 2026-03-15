import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import Header from '@/Layouts/SiteLayout/Header';
import CookieModal from '@/Components/CookieModal';

export default function GuestLayout({ children, title = 'Authentication' }) {
  const { locale } = usePage().props;
  const { t } = useTrans();

  return (
    <div className="min-h-screen relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head title={title} />

      {/* Enhanced Background with Multiple Gradient Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-neutral-50 to-orange-100"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/80 via-orange-50/60 to-neutral-50/40"></div>

      {/* Floating Decorative Elements - Matching Home Page Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400/8 to-orange-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-500/6 to-orange-300/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/6 to-orange-400/3 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-20 w-32 h-32 bg-orange-300/6 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-400/8 rounded-full blur-lg"></div>
      </div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center pt-20 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-neutral-200/50 shadow-2xl shadow-orange-100/30 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Side - Logo/Image */}
              <div className="flex-1 bg-gradient-to-br from-orange-50 to-neutral-100 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-100 rounded-full blur-3xl"></div>
                </div>

                {/* Logo Container */}
                <div className="relative z-10 text-center">
                  <div className="mb-8">
                    <img
                      src="/assets/auth/logo.png"
                      alt="MyStories AI Logo"
                      className="w-32 h-32 lg:w-48 lg:h-48 mx-auto object-contain drop-shadow-2xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) {
                          fallback.classList.remove('hidden');
                          fallback.classList.add('flex');
                        }
                      }}
                    />
                    {/* Fallback if image fails to load */}
                    <div className="hidden w-32 h-32 lg:w-48 lg:h-48 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-full items-center justify-center shadow-2xl">
                      <i className="fa-solid fa-book-open text-white text-4xl lg:text-6xl"></i>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      {t('welcome')}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 p-8 lg:p-12 flex items-center justify-center bg-white/50">
                <div className="w-full max-w-md space-y-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CookieModal />
    </div>
  );
}
