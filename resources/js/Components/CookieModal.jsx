import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppModal from '@/Components/AppModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTrans } from '@/Hooks/useTrans';

export default function CookieModal() {
  const { t } = useTrans();
  const { locale, cookie_data } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const [cookieMessage, setCookieMessage] = useState('');

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookie_consent');
    if (!cookieChoice) {
      // Get the appropriate message based on language
      const message = locale === 'ar'
        ? (cookie_data?.cookie_message_ar || t('default_cookie_message'))
        : locale === 'de'
        ? (cookie_data?.cookie_message_de || t('default_cookie_message'))
        : (cookie_data?.cookie_message_en || t('default_cookie_message'));

      setCookieMessage(message);
      setIsOpen(true);
    }
  }, [locale, t, cookie_data]);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AppModal
      isOpen={isOpen}
      onClose={() => {}}
      title={t('cookie_consent_title')}
      icon="fa-cookie-bite"
      size="md"
      showCloseButton={false}
    >
      <div className="space-y-4">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {cookieMessage}
        </p>

        <div className="flex gap-3 justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <SecondaryButton
            onClick={handleDecline}
            icon="fa-xmark"
            rounded="rounded-lg"
          >
            {t('decline')}
          </SecondaryButton>
          <PrimaryButton
            onClick={handleAccept}
            icon="fa-check"
            rounded="rounded-lg"
            withShadow={false}
          >
            {t('accept')}
          </PrimaryButton>
        </div>
      </div>
    </AppModal>
  );
}
