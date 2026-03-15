import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

export default function EmailSettings({ settings }) {
  const { t } = useTrans();
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    settings: {
      admin_notification_email: settings.admin_notification_email || '',
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
          {t('email_settings')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('email_settings_description')}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            {t('admin_notification_email')}
          </label>
          <TextInput
            type="email"
            value={data.settings.admin_notification_email}
            onChange={(e) => setData('settings', { ...data.settings, admin_notification_email: e.target.value })}
            className="px-3 py-2"
            placeholder={t('enter_admin_email')}
          />
          {errors['settings.admin_notification_email'] && <p className="text-red-500 text-sm mt-1">{errors['settings.admin_notification_email']}</p>}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {t('admin_email_help')}
          </p>
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
