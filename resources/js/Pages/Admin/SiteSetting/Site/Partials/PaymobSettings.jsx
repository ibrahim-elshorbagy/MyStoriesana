import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextArea from '@/Components/TextArea';

// Small component for external links
const ExternalLink = ({ href, title = "View Settings" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-700 transition-colors"
    title={title}
  >
    <i className="fa-solid fa-external-link-alt text-xs"></i>
  </a>
);

export default function PaymobSettings({ settings, paymobUrls = {} }) {
  const { t } = useTrans();

  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    settings: {
      paymob_api_key: settings.paymob_api_key || '',
      paymob_mobile_wallet_id: settings.paymob_mobile_wallet_id || '',
      paymob_online_card_id: settings.paymob_online_card_id || '',
    },
    env_settings: ['paymob_api_key', 'paymob_mobile_wallet_id', 'paymob_online_card_id']
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showMobileWalletId, setShowMobileWalletId] = useState(false);
  const [showOnlineCardId, setShowOnlineCardId] = useState(false);

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
          {t('paymob_settings')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('paymob_settings_description')}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* API Key */}
            <div className="md:col-span-2">
              <InputLabel value={t('paymob_api_key')} />
              <div className="flex gap-2">
                <div className='flex-1'>
                  <TextInput
                    type={showApiKey ? 'text' : 'password'}
                    value={data.settings.paymob_api_key}
                    onChange={(e) => setData('settings', {
                      ...data.settings,
                      paymob_api_key: e.target.value
                    })}
                    className=" resize-none"
                    placeholder="Enter API Key"
                  />
                </div>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className={`fa-solid ${showApiKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </SecondaryButton>

              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-neutral-500">
                  {t('paymob_api_key_help')}
                </p>
                <ExternalLink href="https://accept.paymob.com/portal2/en/settings" />
              </div>
              <InputError message={errors['settings.paymob_api_key']} className="mt-2" />
            </div>


            {/* Mobile Wallet ID */}
            <div className="md:col-span-2">
              <InputLabel value={t('paymob_mobile_wallet_id')} />
              <div className="flex gap-2">
                <div className="flex-1">
                  <TextInput
                    type={showMobileWalletId ? 'text' : 'password'}
                    value={data.settings.paymob_mobile_wallet_id}
                    onChange={(e) => setData('settings', {
                      ...data.settings,
                      paymob_mobile_wallet_id: e.target.value
                    })}
                    className=" resize-none"
                    placeholder="Enter Mobile Wallet ID"
                  />
                </div>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowMobileWalletId(!showMobileWalletId)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className={`fa-solid ${showMobileWalletId ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </SecondaryButton>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-neutral-500">
                  {t('paymob_mobile_wallet_id_help')}
                </p>
                <ExternalLink href="https://accept.paymob.com/portal2/en/PaymentIntegrations" title="View Payment Integrations" />
              </div>
              <InputError message={errors['settings.paymob_mobile_wallet_id']} className="mt-2" />
            </div>

            {/* Online Card ID */}
            <div className="md:col-span-2">
              <InputLabel value={t('paymob_online_card_id')} />
              <div className="flex gap-2">
                <div className="flex-1">
                  <TextInput
                    type={showOnlineCardId ? 'text' : 'password'}
                    value={data.settings.paymob_online_card_id}
                    onChange={(e) => setData('settings', {
                      ...data.settings,
                      paymob_online_card_id: e.target.value
                    })}
                    className=" resize-none"
                    placeholder="Enter Online Card ID"
                  />
                </div>
                <SecondaryButton
                  type="button"
                  onClick={() => setShowOnlineCardId(!showOnlineCardId)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className={`fa-solid ${showOnlineCardId ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </SecondaryButton>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-neutral-500">
                  {t('paymob_online_card_id_help')}
                </p>
                <ExternalLink href="https://accept.paymob.com/portal2/en/PaymentIntegrations" title="View Payment Integrations" />
              </div>
              <InputError message={errors['settings.paymob_online_card_id']} className="mt-2" />
            </div>
          </div>

          {/* Paymob Callback URLs */}
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-link text-blue-500"></i>
              {t('paymob_callback_urls')}
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('success_url')}:
                </label>
                <div className="mt-1 p-2 bg-neutral-100 dark:bg-neutral-900 rounded border font-mono text-sm text-neutral-900 dark:text-neutral-100 break-all">
                  {paymobUrls.success_url || 'Not configured'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('failure_url')}:
                </label>
                <div className="mt-1 p-2 bg-neutral-100 dark:bg-neutral-900 rounded border font-mono text-sm text-neutral-900 dark:text-neutral-100 break-all">
                  {paymobUrls.failure_url || 'Not configured'}
                </div>
              </div>
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
