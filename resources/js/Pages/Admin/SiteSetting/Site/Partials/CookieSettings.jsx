import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import PrimaryButton from '@/Components/PrimaryButton';
import TextArea from '@/Components/TextArea';
import { Transition } from '@headlessui/react';

export default function CookieSettings({ settings }) {
  const { t } = useTrans();
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    settings: {
      cookie_message_ar: settings.cookie_message_ar || '',
      cookie_message_en: settings.cookie_message_en || '',
      cookie_message_de: settings.cookie_message_de || '',
    }
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.site-settings.update'), {
      onSuccess: () => {
        // success
      }
    });
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {t('cookie_settings')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('cookie_settings_description')}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('cookie_message_ar')}
          </label>
          <TextArea
            value={data.settings.cookie_message_ar}
            onChange={(e) => setData('settings', { ...data.settings, cookie_message_ar: e.target.value })}
            rows={6}
            className="px-3 py-2"
            placeholder={t('enter_cookie_message_ar')}
          />
          {errors['settings.cookie_message_ar'] && <p className="text-red-500 text-sm mt-1">{errors['settings.cookie_message_ar']}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('cookie_message_en')}
          </label>
          <TextArea
            value={data.settings.cookie_message_en}
            onChange={(e) => setData('settings', { ...data.settings, cookie_message_en: e.target.value })}
            rows={6}
            className="px-3 py-2"
            placeholder={t('enter_cookie_message_en')}
          />
          {errors['settings.cookie_message_en'] && <p className="text-red-500 text-sm mt-1">{errors['settings.cookie_message_en']}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('cookie_message_de')}
          </label>
          <TextArea
            value={data.settings.cookie_message_de}
            onChange={(e) => setData('settings', { ...data.settings, cookie_message_de: e.target.value })}
            rows={6}
            className="px-3 py-2"
            placeholder={t('enter_cookie_message_de')}
          />
          {errors['settings.cookie_message_de'] && <p className="text-red-500 text-sm mt-1">{errors['settings.cookie_message_de']}</p>}
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
  );
}
