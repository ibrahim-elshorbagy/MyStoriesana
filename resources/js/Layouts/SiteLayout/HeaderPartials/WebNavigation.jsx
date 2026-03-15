import ApplicationLogo from '@/Components/ApplicationLogo'
import NavLink from '@/Components/NavLink'
import PrimaryButton from '@/Components/PrimaryButton'
import NavigationToggles from '@/Components/NavigationToggles'
import { useTrans } from '@/Hooks/useTrans'
import { useSmoothScroll } from '@/Hooks/useSmoothScroll'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function WebNavigation() {
  const { locale, auth, cart_count } = usePage().props; // Add cart_count
  const { t } = useTrans();
  const { activeSection, scrollToSection } = useSmoothScroll();

  // Check if we're on the home page
  const isHomePage = route().current("home");

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate to home with hash
      window.location.href = route('home') + '#' + sectionId;
    }
  };

  return (
    <div className='py-2 border-b border-b-neutral-300 bg-orange-50 max-md:hidden'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mx-4'>
          {/* Logo */}
          <Link
            href={route('home')}
            className="w-16"
          >
            <ApplicationLogo />
          </Link>

          {/* Center Navigation */}
          <ul className="flex gap-10 items-center justify-center">
            <li>
              <NavLink
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                active={isHomePage && activeSection === 'home'}
              >
                {t('home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                active={isHomePage && activeSection === 'features'}
              >
                {t('features')}
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#stories"
                onClick={(e) => handleNavClick(e, 'stories')}
                active={isHomePage && activeSection === 'stories'}
              >
                {t('stories_title')}
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#pricing"
                onClick={(e) => handleNavClick(e, 'pricing')}
                active={isHomePage && activeSection === 'pricing'}
              >
                {t('pricing')}
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#faqs"
                onClick={(e) => handleNavClick(e, 'faqs')}
                active={isHomePage && activeSection === 'faqs'}
              >
                {t('faqs')}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                active={isHomePage && activeSection === 'contact'}
              >
                {t('contact_us')}
              </NavLink>
            </li> */}
          </ul>

          {/* Right Side - Toggles, Cart, and CTA */}
          <div className="flex items-center gap-4">
            {/* Language/Theme Toggles */}
            <NavigationToggles
              variant="compact"
              showLabels={false}
              className="hidden lg:flex"
            />

            {/* Cart Icon with Badge */}
            {auth?.user && (
              <Link
                href={route('cart.index')}
                className="relative inline-flex items-center px-3 py-2 text-neutral-700 hover:text-orange-600 transition-colors"
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

            {/* Get Started Button */}
            <PrimaryButton
              as="a"
              variant="edit"
              icon="fa-play"
              className='ltr:flex-row-reverse gap-3'
              href={auth?.user ? route('dashboard') : route('login')}
            >
              {auth?.user ? t('dashboard') : t('get_started')}
            </PrimaryButton>
          </div>
        </div>

        {/* Secondary row for toggles on smaller screens */}
        <div className="lg:hidden border-t border-neutral-200 mt-2 pt-2 mx-4">
          <NavigationToggles
            variant="compact"
            showLabels={true}
            className="justify-center"
          />
        </div>
      </div>
    </div>
  )
}
