import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function StripeSettings({ settings }) {
  const { t } = useTrans();

  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    settings: {
      stripe_publishable_key: settings.stripe_publishable_key || '',
      stripe_secret_key: settings.stripe_secret_key || '',
    },
    env_settings: ['stripe_publishable_key', 'stripe_secret_key']
  });

  const [showPublishableKey, setShowPublishableKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.site-settings.update'), {
      preserveScroll: true
    });
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-fadeIn">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/30">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <i className="fa-solid fa-credit-card text-blue-500"></i>
          {t('stripe_settings')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('stripe_settings_description')}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Publishable Key */}
            <div className="md:col-span-2">
              <InputLabel value={t('stripe_publishable_key')} />
              <div className="flex gap-2">
                <div className='flex-1'>
                  <TextInput
                    type={showPublishableKey ? 'text' : 'password'}
                    value={data.settings.stripe_publishable_key}
                    onChange={(e) => setData('settings', {
                      ...data.settings,
                      stripe_publishable_key: e.target.value
                    })}
                    className=" resize-none"
                    placeholder="Enter Stripe Publishable Key"
                  />
                </div>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowPublishableKey(!showPublishableKey)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className={`fa-solid ${showPublishableKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </SecondaryButton>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-neutral-500">
                  {t('stripe_publishable_key_help')}
                </p>
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="View API Keys"
                >
                  <i className="fa-solid fa-external-link-alt text-xs"></i>
                </a>
              </div>
              <InputError message={errors['settings.stripe_publishable_key']} className="mt-2" />
            </div>

            {/* Secret Key */}
            <div className="md:col-span-2">
              <InputLabel value={t('stripe_secret_key')} />
              <div className="flex gap-2">
                <div className='flex-1'>
                  <TextInput
                    type={showSecretKey ? 'text' : 'password'}
                    value={data.settings.stripe_secret_key}
                    onChange={(e) => setData('settings', {
                      ...data.settings,
                      stripe_secret_key: e.target.value
                    })}
                    className=" resize-none"
                    placeholder="Enter Stripe Secret Key"
                  />
                </div>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className={`fa-solid ${showSecretKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </SecondaryButton>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-neutral-500">
                  {t('stripe_secret_key_help')}
                </p>
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="View API Keys"
                >
                  <i className="fa-solid fa-external-link-alt text-xs"></i>
                </a>
              </div>
              <InputError message={errors['settings.stripe_secret_key']} className="mt-2" />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
            <PrimaryButton
              type="submit"
              disabled={processing}
              icon="fa-floppy-disk"
              rounded="rounded-lg"
              withShadow={false}
            >
              {t('save_changes')}
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1">
                <i className="fa-solid fa-check"></i> {t('saved_successfully')}
              </p>
            </Transition>
          </div>
        </form>
      </div>
    </div>
  );
}
