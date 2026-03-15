import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';
import DragFileInput from '@/Components/DragFileInput';
import AppModal from '@/Components/AppModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function CreateModal({ isOpen, onClose }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    customer_feedback: '',
    image: null,
    video: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.customer-feedbacks.store'), {
      onSuccess: () => {
        reset();
        onClose();
      },
      forceFormData: true,
    });
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('create_customer_feedback')}
      icon="fa-comments"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* Customer Feedback Text */}
        <div className="mb-4">
          <InputLabel htmlFor="customer_feedback" value={t('customer_feedback_text')} />
          <TextArea
            id="customer_feedback"
            name="customer_feedback"
            value={data.customer_feedback}
            className="mt-1 block w-full"
            onChange={(e) => setData('customer_feedback', e.target.value)}
            placeholder={t('enter_customer_feedback')}
            rows={4}
          />
          <InputError message={errors.customer_feedback} className="mt-2" />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <InputLabel value={t('image')} />
          <DragFileInput
            id="image"
            accept="image/*"
            onChange={(file) => setData('image', file || null)}
            value={data.image}
            maxFiles={1}
            helperText={t('image_optional')}
          />
          {/* Image Preview */}
          {data.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(data.image)}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
              />
            </div>
          )}
          <InputError message={errors.image} className="mt-2" />
        </div>

        {/* Video Upload */}
        <div className="mb-4">
          <InputLabel value={t('video')} />
          <DragFileInput
            id="video"
            accept="video/*"
            onChange={(file) => setData('video', file || null)}
            value={data.video}
            maxFiles={1}
            helperText={t('video_optional')}
          />
          {/* Video Preview */}
          {data.video && (
            <div className="mt-2">
              <video
                src={URL.createObjectURL(data.video)}
                controls
                className="h-32 w-auto rounded-lg border border-neutral-300 dark:border-neutral-600"
              />
            </div>
          )}
          <InputError message={errors.video} className="mt-2" />
        </div>

        {/* General Error */}
        <InputError message={errors.general} className="mt-2" />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <SecondaryButton
            type="button"
            onClick={onClose}
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
            {processing ? t('saving') : t('save')}
          </PrimaryButton>
        </div>
      </form>
    </AppModal>
  );
}
