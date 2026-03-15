import MenuNavLink from '@/Components/MenuNavLink'
import NavigationToggles from '@/Components/NavigationToggles'
import { usePage, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTrans } from '@/Hooks/useTrans';
import { useSmoothScroll } from '@/Hooks/useSmoothScroll';

export default function TabletNavigation() {

  const {
    auth: { user },
    cart_count
  } = usePage().props; // Add cart_count
  const { t } = useTrans();
  const { activeSection, scrollToSection } = useSmoothScroll();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Check if we're on the home page
  const isHomePage = route().current("home");

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu

    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate to home with hash
      window.location.href = route('home') + '#' + sectionId;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route("logout"));
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="flex justify-between items-center p-4 border-b border-b-neutral-300 bg-orange-50 md:hidden">
        <div className='w-16'>
          <Link href={route("home")} >
            <ApplicationLogo />
          </Link>
        </div>

        {/* Header Icons: Toggles, Cart, Menu Button */}
        <div className="flex items-center gap-3">
          {/* Language/Theme Toggles (hidden on very small screens) */}
          <NavigationToggles
            variant="compact"
            showLabels={false}
            className="hidden sm:flex"
          />

          {/* Cart Icon with Badge (only for logged in users) */}
          {user && (
            <Link
              href={route('cart.index')}
              className="relative inline-flex items-center justify-center w-10 h-10 text-neutral-700"
            >
              <i className="fa-solid fa-shopping-cart text-xl"></i>
              {cart_count > 0 && (
                <span className="absolute -top-1 ltr:-right-1 rtl:-left-1
                bg-gradient-to-r from-orange-500 to-orange-600 text-white
                text-[10px] font-bold rounded-full h-5 w-5 flex items-center
                justify-center shadow-lg animate-pulse">
                {cart_count > 99 ? '99+' : cart_count}
              </span>
              )}
            </Link>
          )}

          {/* Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="px-3 py-2 rounded-full bg-orange-500 text-white shadow-md"
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-orange-50 text-neutral-800 transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <nav className="flex flex-col h-full ">
          {/* Header with Logo + Close */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-400 bg-orange-50">
            <div className="w-16">
              <Link href={route("home")} >
                <ApplicationLogo />
              </Link>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-neutral-200"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark text-2xl text-neutral-700"></i>
            </button>
          </div>

          {/* Menu Links */}
          <ul className="flex flex-col divide-y divide-neutral-200 bg-orange-50">
            <li>
              <MenuNavLink
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                active={isHomePage && activeSection === 'home'}
                icon="fa-house"
              >
                {t('home')}
              </MenuNavLink>
            </li>
            <li>
              <MenuNavLink
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                active={isHomePage && activeSection === 'features'}
                icon="fa-star"
              >
                {t('features')}
              </MenuNavLink>
            </li>
            <li>
              <MenuNavLink
                href="#stories"
                onClick={(e) => handleNavClick(e, 'stories')}
                active={isHomePage && activeSection === 'stories'}
                icon="fa-book"
              >
                {t('stories_title')}
              </MenuNavLink>
            </li>
            <li>
              <MenuNavLink
                href="#pricing"
                onClick={(e) => handleNavClick(e, 'pricing')}
                active={isHomePage && activeSection === 'pricing'}
                icon="fa-star"
              >
                {t('pricing')}
              </MenuNavLink>
            </li>
            <li>
              <MenuNavLink
                href="#faqs"
                onClick={(e) => handleNavClick(e, 'faqs')}
                active={isHomePage && activeSection === 'faqs'}
                icon="fa-question-circle"
              >
                {t('faqs')}
              </MenuNavLink>
            </li>

            {/* <li>
              <MenuNavLink
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                active={isHomePage && activeSection === 'contact'}
                icon="fa-building"
              >
                {t('contact_us')}
              </MenuNavLink>
            </li> */}

            {user ? (
              <>
                <li>
                  <MenuNavLink
                    href={route("cart.index")}
                    active={route().current("cart.index")}
                    icon="fa-shopping-cart"
                    className="relative"
                  >
                    {t('cart')}
                    {cart_count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {cart_count > 99 ? '99+' : cart_count}
                      </span>
                    )}
                  </MenuNavLink>
                </li>
                <li>
                  <MenuNavLink
                    href="#"
                    icon="fa-right-from-bracket"
                    className="text-red-600 hover:text-red-700"
                  >
                    <button onClick={handleLogout}>{t('logout')}</button>
                  </MenuNavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <MenuNavLink
                    href={route("register")}
                    active={route().current("register")}
                    icon="fa-user-plus"
                  >
                    {t('register')}
                  </MenuNavLink>
                </li>
                <li>
                  <MenuNavLink
                    href={route("login")}
                    active={route().current("login")}
                    icon="fa-right-to-bracket"
                  >
                    {t('login')}
                  </MenuNavLink>
                </li>
              </>
            )}
          </ul>

          {/* Settings Section */}
          <div className="border-t border-neutral-400 bg-orange-50">

            <NavigationToggles
              variant="mobile"
              showLabels={true}
            />
          </div>

          {/* Get Started Button */}
          <div className="p-4 mt-auto border-t border-neutral-400 bg-orange-50">
            <PrimaryButton
              as="a"
              variant="edit"
              icon="fa-play"
              className='ltr:flex-row-reverse gap-3 w-full justify-center'
              href={route('dashboard')}
            >
              {t('get_started')}
            </PrimaryButton>
          </div>

        </nav>
      </div>
    </>
  );
}
