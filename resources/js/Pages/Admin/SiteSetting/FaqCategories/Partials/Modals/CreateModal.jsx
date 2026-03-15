import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AppModal from '@/Components/AppModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function CreateModal({ isOpen, onClose }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    name_ar: '',
    name_en: '',
    name_de: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.faq-categories.store'), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('create_category')}
      icon="fa-folder-plus"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* Category Name Arabic */}
        <div className="mb-4">
          <InputLabel htmlFor="name_ar" value={t('category_name_ar')} required />
          <TextInput
            id="name_ar"
            type="text"
            name="name_ar"
            value={data.name_ar}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_ar', e.target.value)}
            icon="fa-folder"
            placeholder={t('enter_arabic_name')}
            required
          />
          <InputError message={errors.name_ar} className="mt-2" />
        </div>

        {/* Category Name English */}
        <div className="mb-4">
          <InputLabel htmlFor="name_en" value={t('category_name_en')} required />
          <TextInput
            id="name_en"
            type="text"
            name="name_en"
            value={data.name_en}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_en', e.target.value)}
            icon="fa-folder"
            placeholder={t('enter_english_name')}
            required
          />
          <InputError message={errors.name_en} className="mt-2" />
        </div>

        {/* Category Name German */}
        <div className="mb-4">
          <InputLabel htmlFor="name_de" value={t('category_name_de')} required />
          <TextInput
            id="name_de"
            type="text"
            name="name_de"
            value={data.name_de}
            className="mt-1 block w-full"
            onChange={(e) => setData('name_de', e.target.value)}
            icon="fa-folder"
            placeholder={t('enter_german_name')}
            required
          />
          <InputError message={errors.name_de} className="mt-2" />
        </div>

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
