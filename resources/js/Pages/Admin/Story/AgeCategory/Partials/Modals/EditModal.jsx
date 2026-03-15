import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DragFileInput from '@/Components/DragFileInput';
import { useTrans } from '@/Hooks/useTrans';
import AppModal from '@/Components/AppModal';

export default function EditModal({ isOpen, onClose, category }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    name_ar: '',
    name_en: '',
    name_de: '',
    image: null,
    _method: 'PUT',
  });

  useEffect(() => {
    if (category && isOpen) {
      setData({
        name_ar: category.name?.ar || '',
        name_en: category.name?.en || '',
        name_de: category.name?.de || '',
        image: null, // Don't set existing image, as it's for new upload
        _method: 'PUT',
      });
    } else if (!isOpen) {
      reset();
    }

  }, [category, isOpen]);

  if (!category) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.age-categories.update', category.id), {
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
      title={t('edit_category')}
      icon="fa-pen-to-square"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputLabel htmlFor="name_ar" value={t('category_name_ar')} required />
          <TextInput
            id="name_ar"
            name="name_ar"
            value={data.name_ar}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_ar', e.target.value)}
            required
            icon="fa-folder"
            placeholder={t('enter_arabic_name')}
          />
          <InputError message={errors.name_ar} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="name_en" value={t('category_name_en')} required />
          <TextInput
            id="name_en"
            name="name_en"
            value={data.name_en}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_en', e.target.value)}
            required
            icon="fa-folder"
            placeholder={t('enter_english_name')}
          />
          <InputError message={errors.name_en} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="name_de" value={t('category_name_de')} required />
          <TextInput
            id="name_de"
            name="name_de"
            value={data.name_de}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_de', e.target.value)}
            required
            icon="fa-folder"
            placeholder={t('enter_german_name')}
          />
          <InputError message={errors.name_de} className="mt-2" />
        </div>

        {/* Image */}
        <div className="mb-4">
          <InputLabel value={t('image')} />
          {/* Current Image */}
          {category?.image && !data.image && (
            <div className="mb-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{t('current_image')}:</p>
              <img src={`/storage/${category.image}`} alt="Current" className="h-32 w-32 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600" />
            </div>
          )}
          <DragFileInput
            id="image"
            accept="image/*"
            onChange={(file) => setData('image', file || null)}
            value={data.image}
            maxFiles={1}
            helperText={t('upload_image_helper_edit')}
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
