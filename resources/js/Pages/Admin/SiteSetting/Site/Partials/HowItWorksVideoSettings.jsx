import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import DragFileInput from '@/Components/DragFileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';

export default function HowItWorksVideoSettings({ settings }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing, recentlySuccessful } = useForm({
    files: {
      how_it_works_video: null,
    },
    settings: {
      how_it_works_video: settings.how_it_works_video || null,
      remove_how_it_works_video: false,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.site-settings.update'), {
      onSuccess: () => {
        reset();
      },
      forceFormData: true,
    });
  };

  const handleRemoveVideo = () => {
    setData('settings', {
      how_it_works_video: null,
      remove_how_it_works_video: true
    });
    post(route('admin.site-settings.update'), {
      onSuccess: () => {
        reset();
      },
      forceFormData: true,
    });
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {t('how_it_works_video')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('upload_how_it_works_video')}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Current Video Display */}
        {settings.how_it_works_video && !data.settings.remove_how_it_works_video && (
          <div className="mb-6">
            <InputLabel value={t('current_video')} />
            <div className="mt-2">
              <video
                src={`/storage/${settings.how_it_works_video}`}
                controls
                className="w-full max-w-2xl rounded-lg border border-neutral-300 dark:border-neutral-600"
                preload="metadata"
              />
            </div>
            <div className="mt-2">
              <SecondaryButton
                type="button"
                onClick={handleRemoveVideo}
                icon="fa-trash"
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={processing}
              >
                {t('remove_video')}
              </SecondaryButton>
            </div>
          </div>
        )}

        {/* Video Upload */}
        <div className="mb-4">
          <InputLabel value={t('video')} />
          <DragFileInput
            id="how_it_works_video"
            accept="video/*"
            onChange={(file) => setData('files', { ...data.files, how_it_works_video: file || null })}
            value={data.files.how_it_works_video}
            maxFiles={1}
            helperText={t('video_optional')}
          />
          {/* Video Preview */}
          {data.files.how_it_works_video && (
            <div className="mt-2">
              <video
                src={URL.createObjectURL(data.files.how_it_works_video)}
                controls
                className="h-32 w-auto rounded-lg border border-neutral-300 dark:border-neutral-600"
              />
            </div>
          )}
          <InputError message={errors['files.how_it_works_video']} className="mt-2" />
        </div>

        {/* General Error */}
        <InputError message={errors.general} className="mt-2" />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton
            type="button"
            onClick={() => reset()}
            icon="fa-xmark"
            rounded="rounded-lg"
            disabled={processing}
          >
            {t('cancel')}
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            icon="fa-floppy-disk"
            rounded="rounded-lg"
            withShadow={false}
            disabled={processing}
          >
            {processing ? t('saving') : t('save_changes')}
          </PrimaryButton>
        </div>

        <Transition
          show={recentlySuccessful}
          enter="transition ease-in-out"
          enterFrom="opacity-0"
          leave="transition ease-in-out"
          leaveTo="opacity-0"
        >
          <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1 mt-4">
            <i className="fa-solid fa-check"></i> {t('video_updated_successfully')}
          </p>
        </Transition>
      </form>
    </div>
  );
}
