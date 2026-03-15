import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useTrans } from '@/Hooks/useTrans';
import { useSmoothScroll } from '@/Hooks/useSmoothScroll';

export default function Footer() {
  const { footer } = usePage().props;

  const { t } = useTrans();
  const year = new Date().getFullYear();
  const { scrollToSection } = useSmoothScroll();

  const settings = footer?.settings || {};
  const staticPages = footer?.static_pages || [];
  const categories = footer?.categories || [];

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

  // Social media links with their icons and colors
  const socialLinks = [
    {
      key: 'facebook_link',
      href: settings.facebook_link,
      icon: 'fab fa-facebook',
      color: 'hover:text-blue-500',
      label: 'Facebook'
    },
    {
      key: 'twitter_link',
      href: settings.twitter_link,
      icon: 'fab fa-twitter',
      color: 'hover:text-blue-400',
      label: 'Twitter'
    },
    {
      key: 'instagram_link',
      href: settings.instagram_link,
      icon: 'fab fa-instagram',
      color: 'hover:text-pink-400',
      label: 'Instagram'
    },
    {
      key: 'linkedin_link',
      href: settings.linkedin_link,
      icon: 'fab fa-linkedin',
      color: 'hover:text-blue-600',
      label: 'LinkedIn'
    },
    {
      key: 'youtube_link',
      href: settings.youtube_link,
      icon: 'fab fa-youtube',
      color: 'hover:text-red-500',
      label: 'YouTube'
    },
    {
      key: 'tiktok_link',
      href: settings.tiktok_link,
      icon: 'fab fa-tiktok',
      color: 'hover:text-black',
      label: 'TikTok'
    },
    {
      key: 'snapchat_link',
      href: settings.snapchat_link,
      icon: 'fab fa-snapchat',
      color: 'hover:text-yellow-400',
      label: 'Snapchat'
    },
    {
      key: 'pinterest_link',
      href: settings.pinterest_link,
      icon: 'fab fa-pinterest',
      color: 'hover:text-red-600',
      label: 'Pinterest'
    },
  ].filter(link => link.href); // Only show links that have values

  return (
    <footer className="relative bg-orange-50 text-neutral-800 overflow-hidden select-none">
      {/* Main footer */}
      <div className="relative container mx-auto pt-12 pb-10 px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-6 items-center md:flex-[3] mx-auto">
            <Link
              href={route("home")}
              className="group flex items-center gap-3 transition-all duration-300 hover:scale-105 w-fit mx-auto"
            >
              <div className="relative">
                <div className='w-24'>
                  <ApplicationLogo />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 to-orange-300/20 rounded-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-lg" />
              </div>
            </Link>

            <div className="space-y-3 text-center">
              <p className="max-w-md leading-relaxed text-sm">
                {t('footer_tagline_line1')} <br />
                <span className="font-semibold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {t('footer_tagline_line2')}
                </span>
              </p>

              {/* Social links with enhanced styling */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-6 justify-center">
                  {socialLinks.map(({ href, icon, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`group relative p-2 rounded-full bg-white text-neutral-600 backdrop-blur-sm border border-neutral-200 transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} hover:border-current/30`}
                    >
                      <i className={`${icon} w-5 h-5 transition-transform duration-300 group-hover:rotate-6`} />
                      <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Links sections - Categories Grid */}
          <div className="flex flex-col gap-4 md:flex-[4]">
            <h4 className="font-semibold text-lg flex items-center gap-2 text-neutral-900">
              <i className="fa-solid fa-list text-orange-500"></i>
              {t('footer_sections_title')}
            </h4>

            {/* Main navigation links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Default sections */}
              <div className="flex flex-col gap-3">
                <h5 className="font-medium text-neutral-800 text-sm uppercase tracking-wide">
                  {t('footer_nav_features')}
                </h5>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="#features"
                      onClick={(e) => handleNavClick(e, 'features')}
                      className="group flex items-center gap-2 text-sm hover:text-orange-600 transition-all duration-300 hover:translate-x-1"
                    >
                      <span>{t('features_title')}</span>
                      <i className="fa-solid fa-arrow-up-right w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#stories"
                      onClick={(e) => handleNavClick(e, 'stories')}
                      className="group flex items-center gap-2 text-sm hover:text-orange-600 transition-all duration-300 hover:translate-x-1"
                    >
                      <span>{t('stories_title')}</span>
                      <i className="fa-solid fa-arrow-up-right w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faqs"
                      onClick={(e) => handleNavClick(e, 'faqs')}
                      className="group flex items-center gap-2 text-sm hover:text-orange-600 transition-all duration-300 hover:translate-x-1"
                    >
                      <span>{t('footer_nav_faqs')}</span>
                      <i className="fa-solid fa-arrow-up-right w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Static Page Categories */}
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col gap-3">
                  <h5 className="font-medium text-neutral-800 text-sm uppercase tracking-wide">
                    {category.name}
                  </h5>
                  <ul className="flex flex-col gap-2">
                    {category.pages.map((page) => (
                      <li key={page.id}>
                        <Link
                          href={page.url}
                          className="group flex items-center gap-2 text-sm hover:text-orange-600 transition-all duration-300 hover:translate-x-1"
                        >
                          <span>{page.title}</span>
                          <i className="fa-solid fa-arrow-up-right w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact section */}
          {(settings.support_email || settings.support_mobile || settings.support_whatsapp) && (
            <div className="flex flex-col gap-4 md:flex-[2]">
              <h4 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
                <i className="fa-solid fa-phone text-orange-500"></i>
                {t('footer_contact_title')}
              </h4>
              <ul className="space-y-5">
                {settings.support_email && (
                  <li className="group flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white text-neutral-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <i className="fa-solid fa-envelope p-2"></i>
                    </div>
                    <div className={`flex-1 space-y-1 rtl:text-right`}>
                      <div className="font-medium text-neutral-900">{t('footer_contact_email_title')}</div>
                      <a
                        href={`mailto:${settings.support_email}`}
                        className="block text-neutral-600 underline decoration-orange-600 underline-offset-4 hover:text-orange-600 transition-colors duration-300 hover:underline"
                        dir="ltr"
                      >
                        {settings.support_email}
                      </a>
                    </div>
                  </li>
                )}
                {settings.support_mobile && (
                  <li className="group flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white text-neutral-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <i className="fa-solid fa-phone p-2"></i>
                    </div>
                    <div className={`flex-1 space-y-1 rtl:text-right`}>
                      <div className="font-medium text-neutral-900">{t('footer_contact_phone_title')}</div>
                      <a
                        href={`tel:${settings.support_mobile}`}
                        className="block text-neutral-600 underline decoration-orange-600 underline-offset-4 hover:text-orange-600 transition-colors duration-300 hover:underline"
                        dir="ltr"
                      >
                        {settings.support_mobile}
                      </a>
                    </div>
                  </li>
                )}
                {settings.support_whatsapp && (
                  <li className="group flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-green-100 underline decoration-green-600 underline-offset-4 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <i className="fab fa-whatsapp p-2"></i>
                    </div>
                    <div className={`flex-1 space-y-1 rtl:text-right`}>
                      <div className="font-medium text-neutral-900">WhatsApp</div>
                      <a
                        href={`https://wa.me/${settings.support_whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-neutral-600 hover:text-green-600 transition-colors duration-300 hover:underline"
                        dir="ltr"
                      >
                        {settings.support_whatsapp}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Enhanced footer bottom */}
      <div className="relative border-t border-neutral-200 bg-white backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4">
          <p className="text-xs text-neutral-600">{t('footer_rights_reserved')}</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // CookieYes creates a revisit consent button with specific class
                const checkAndOpen = () => {
                  // Try to find and click the CookieYes settings button
                  const cookieSettingsBtn = document.querySelector('.cky-banner-element, [data-cky-tag="revisit-consent"], .cky-revisit-bottom-left');

                  if (cookieSettingsBtn) {
                    cookieSettingsBtn.click();
                  } else {
                    // If the script hasn't loaded yet, wait and retry
                    if (window.CookieYes) {
                      console.warn('CookieYes loaded but settings button not found');
                    } else {
                      setTimeout(checkAndOpen, 100);
                    }
                  }
                };
                checkAndOpen();
              }}
              className="text-sm text-neutral-600 hover:text-orange-600 transition-colors duration-300 underline decoration-orange-600 underline-offset-4"
            >
              {t('cookie_settings')}
            </a>


            <p className="text-neutral-600 flex items-center gap-2 text-sm">
              <span>{t('footer_copyright_text', { year })}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
