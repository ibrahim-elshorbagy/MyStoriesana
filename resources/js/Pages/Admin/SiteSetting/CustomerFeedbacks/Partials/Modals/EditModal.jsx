import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';
import DragFileInput from '@/Components/DragFileInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTrans } from '@/Hooks/useTrans';
import AppModal from '@/Components/AppModal';

export default function EditModal({ isOpen, onClose, feedback }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    customer_feedback: '',
    image: null,
    video: null,
    remove_image: false,
    remove_video: false,
    _method: 'PUT',
  });

  useEffect(() => {
    if (feedback && isOpen) {
      setData({
        customer_feedback: feedback.customer_feedback || '',
        image: null,
        video: null,
        remove_image: false,
        remove_video: false,
        _method: 'PUT',
      });
    } else if (!isOpen) {
      reset();
    }
  }, [feedback, isOpen]);

  if (!feedback) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.customer-feedbacks.update', feedback.id), {
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
      title={t('edit_customer_feedback')}
      icon="fa-pen-to-square"
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
          {/* Current Image */}
          {feedback?.image && !data.image && !data.remove_image && (
            <div className="mb-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{t('current_image')}:</p>
              <div className="relative inline-block">
                <img src={`/storage/${feedback.image}`} alt="Current" className="h-32 w-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600" />
                <button
                  type="button"
                  onClick={() => setData('remove_image', true)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  title={t('delete')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
          <DragFileInput
            id="image"
            accept="image/*"
            onChange={(file) => setData('image', file || null)}
            value={data.image}
            maxFiles={1}
            helperText={t('image_optional')}
          />
          {/* New Image Preview */}
          {data.image && (
            <div className="mt-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{t('new_image_preview')}:</p>
              <img
                src={URL.createObjectURL(data.image)}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-orange-400 dark:border-orange-600"
              />
            </div>
          )}
          <InputError message={errors.image} className="mt-2" />
        </div>

        {/* Video Upload */}
        <div className="mb-4">
          <InputLabel value={t('video')} />
          {/* Current Video */}
          {feedback?.video && !data.video && !data.remove_video && (
            <div className="mb-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{t('current_video')}:</p>
              <div className="relative inline-block">
                <video src={`/storage/${feedback.video}`} controls className="h-32 w-auto rounded-lg border border-neutral-300 dark:border-neutral-600" />
                <button
                  type="button"
                  onClick={() => setData('remove_video', true)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  title={t('delete')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          )}
          <DragFileInput
            id="video"
            accept="video/*"
            onChange={(file) => setData('video', file || null)}
            value={data.video}
            maxFiles={1}
            helperText={t('video_optional')}
          />
          {/* New Video Preview */}
          {data.video && (
            <div className="mt-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{t('new_video_preview')}:</p>
              <video
                src={URL.createObjectURL(data.video)}
                controls
                className="h-32 w-auto rounded-lg border border-orange-400 dark:border-orange-600"
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
            {processing ? t('updating') : t('save_changes')}
          </PrimaryButton>
        </div>
      </form>
    </AppModal>
  );
}
