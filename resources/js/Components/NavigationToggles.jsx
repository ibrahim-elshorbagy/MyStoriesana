import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function NavigationToggles({
  className = '',
  variant = 'default', // 'default', 'compact', 'mobile'
  showLabels = true
}) {
  const { t } = useTrans();
  const page = usePage();
  const locale = page?.props?.locale ?? 'en';
  const url = page?.url ?? page?.props?.url ?? '';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isDashboard = url.startsWith('/dashboard');

  const languages = {
    en: { name: t('english'), flag: '🇺🇸' },
    ar: { name: t('arabic'), flag: '🇸🇦' },
    de: { name: t('german'), flag: '🇩🇪' }
  };

  // Base button classes - dark mode only for dashboard
  const baseButtonClasses = isDashboard
    ? " flex items-center gap-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 transition-colors duration-200 "
    : " flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-200 ";

  // Variant-specific classes
  const variantClasses = {
    default: " px-3 py-2 rounded-lg ",
    compact: " px-2 py-1 rounded-md ",
    mobile: "  px-5 py-3 text-left  "
  };

  // Container classes based on variant
  const containerClasses = {
    default: "flex items-center gap-3",
    compact: "flex items-center gap-2",
    mobile: "flex justify-around  border-b border-neutral-200 "
  };

  const buttonClass = `${baseButtonClasses} ${variantClasses[variant]}`;
  const containerClass = `${containerClasses[variant]} ${className}`;

  // Dropdown classes - dark mode only for dashboard
  const dropdownClasses = isDashboard
    ? "absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50"
    : "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50";

  const dropdownItemClasses = isDashboard
    ? "w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
    : "w-full text-left px-4 py-2 hover:bg-neutral-100 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg";

  const dropdownItemActiveClasses = isDashboard
    ? "bg-neutral-50 dark:bg-neutral-700"
    : "bg-neutral-50";

  const dropdownTextClasses = isDashboard
    ? "text-neutral-700 dark:text-neutral-300 text-sm"
    : "text-neutral-700 text-sm";

  const checkIconClasses = isDashboard
    ? "fa-solid fa-check ml-auto text-green-600 dark:text-green-400"
    : "fa-solid fa-check ml-auto text-green-600";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale) => {
    if (newLocale !== locale) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = route('locale.change');

      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = '_token';
      csrfInput.value = page.props.csrf_token;
      form.appendChild(csrfInput);

      const localeInput = document.createElement('input');
      localeInput.type = 'hidden';
      localeInput.name = 'locale';
      localeInput.value = newLocale;
      form.appendChild(localeInput);

      document.body.appendChild(form);
      form.submit();
    }
    setIsOpen(false);
  };

  return (
    <div className={containerClass}>
      {/* Language Toggle Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={buttonClass}
          aria-label="Select language"
          title="Select language"
        >
          <i className="fa-solid fa-language"></i>
          {showLabels && (
            <>
              <span className="text-sm">{languages[locale]?.flag} {languages[locale]?.name}</span>
              <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
            </>
          )}
        </button>

        {isOpen && (
          <div className={dropdownClasses}>
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`${dropdownItemClasses} ${
                  locale === code ? dropdownItemActiveClasses : ''
                }`}
              >
                <span>{flag}</span>
                <span className={dropdownTextClasses}>{name}</span>
                {locale === code && (
                  <i className={checkIconClasses}></i>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
