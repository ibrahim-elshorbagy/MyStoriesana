import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function LanguageToggle({ className = '' }) {
  const { t } = useTrans();
  const { locale, available_locales } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const page = usePage();

  const languages = {
    en: { name: t('english'), flag: '🇺🇸' },
    ar: { name: t('arabic'), flag: '🇸🇦' },
    de: { name: t('german'), flag: '🇩🇪' }
  };

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
    <div className={`relative`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center gap-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 ${className}`}
        aria-label="Select language"
        title="Select language"
      >
        <i className="fa-solid fa-language shrink-0"></i>
        <span>{languages[locale]?.flag} {languages[locale]?.name}</span>
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs ltr:ml-auto rtl:mr-auto shrink-0`}></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg ${
                locale === code ? 'bg-neutral-50 dark:bg-neutral-700' : ''
              }`}
            >
              <span>{flag}</span>
              <span className="text-neutral-700 dark:text-neutral-300">{name}</span>
              {locale === code && (
                <i className="fa-solid fa-check ml-auto text-green-600 dark:text-green-400"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
