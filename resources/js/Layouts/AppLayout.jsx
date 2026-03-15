import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { usePage, Link } from '@inertiajs/react';
import Toastify from './Partials/Toastify';
import { useTrans } from '@/Hooks/useTrans';
import ProfileMenu from './Sidebar/ProfileMenu';
import CookieModal from '@/Components/CookieModal';
import Navbar from './Header/Navbar';

export default function AppLayout({ children, title }) {
  const { locale } = usePage().props;

  const { t } = useTrans();
  const { auth } = usePage().props;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const handleSidebarToggleForMobile = () => {
    setSidebarIsOpen(v => !v);
  };
  const { cart_count } = usePage().props;

  return (
    <div className="font-sans antialiased" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className=" bg-gray-100 dark:bg-neutral-800 min-h-[100vh]" >

        {/* Mobile Navbar */}
        <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
          <button
            type="button"
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={t('open_sidebar')}
            onClick={handleSidebarToggleForMobile}
          >
            <i className="fa-solid fa-bars size-6"></i>
          </button>

          {/* Cart Icon for Mobile */}
          <Link
            href={route('cart.index')}
            className="relative inline-flex items-center justify-center w-12 h-12 text-neutral-700 dark:text-neutral-300"
          >
            <i className="fa-solid fa-shopping-cart text-2xl"></i>
            {cart_count > 0 && (
              <span className="absolute top-1 right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                {cart_count > 99 ? '99+' : cart_count}
              </span>
            )}
          </Link>

          {/* Profile menu at the bottom */}
          <ProfileMenu />
        </nav>

        {/* Dark overlay for mobile sidebar */}
        {sidebarIsOpen && (
          <div
            className="fixed inset-0 z-20 bg-neutral-800/10 backdrop-blur-xs md:hidden"
            aria-hidden="true"
            onClick={() => setSidebarIsOpen(false)}
            style={{ transition: 'opacity 0.2s' }}
          />
        )}

        <div className="relative flex w-full flex-col md:flex-row min-h-screen">
          {/* Sidebar Navigation */}
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />

          {/* Main Content with Footer */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Top header */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 w-full">
              {children}
            </main>

          </div>

        </div>
      </div>

      <Toastify />
      <CookieModal />
    </div>
  );
}
