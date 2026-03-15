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
    city_ar: '',
    city_en: '',
    city_de: '',
    price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.delivery-options.store'), {
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
      title={t('create_delivery_option')}
      icon="fa-truck"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* City Name Arabic */}
        <div className="mb-4">
          <InputLabel htmlFor="city_ar" value={t('city_name_ar')} required />
          <TextInput
            id="city_ar"
            type="text"
            name="city_ar"
            value={data.city_ar}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_ar', e.target.value)}
            icon="fa-city"
            placeholder={t('enter_arabic_city')}
            required
          />
          <InputError message={errors.city_ar} className="mt-2" />
        </div>

        {/* City Name English */}
        <div className="mb-4">
          <InputLabel htmlFor="city_en" value={t('city_name_en')} required />
          <TextInput
            id="city_en"
            type="text"
            name="city_en"
            value={data.city_en}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_en', e.target.value)}
            icon="fa-city"
            placeholder={t('enter_english_city')}
            required
          />
          <InputError message={errors.city_en} className="mt-2" />
        </div>

        {/* City Name German */}
        <div className="mb-4">
          <InputLabel htmlFor="city_de" value={t('city_name_de')} required />
          <TextInput
            id="city_de"
            type="text"
            name="city_de"
            value={data.city_de}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_de', e.target.value)}
            icon="fa-city"
            placeholder={t('enter_german_city')}
            required
          />
          <InputError message={errors.city_de} className="mt-2" />
        </div>

        {/* Price */}
        <div className="mb-4">
          <InputLabel htmlFor="price" value={t('delivery_option_price')} required />
          <TextInput
            id="price"
            type="number"
            name="price"
            value={data.price}
            className="mt-1 block w-full"
            onChange={(e) => setData('price', e.target.value)}
            icon="fa-coins"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
          <InputError message={errors.price} className="mt-2" />
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
