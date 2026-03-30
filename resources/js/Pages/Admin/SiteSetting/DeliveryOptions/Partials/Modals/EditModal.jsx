import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTrans } from '@/Hooks/useTrans';
import AppModal from '@/Components/AppModal';

export default function EditModal({ isOpen, onClose, deliveryOption }) {
  const { t } = useTrans();
  const { data, setData, post, errors, reset, processing } = useForm({
    city_ar: '',
    city_en: '',
    city_de: '',
    price: '',
    _method: 'PUT',
  });

  useEffect(() => {
    if (deliveryOption && isOpen) {
      setData({
        city_ar: deliveryOption.city?.ar || '',
        city_en: deliveryOption.city?.en || '',
        city_de: deliveryOption.city?.de || '',
        price: deliveryOption.price || '',
        _method: 'PUT',
      });
    } else if (!isOpen) {
      reset();
    }

  }, [deliveryOption, isOpen]);

  if (!deliveryOption) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.delivery-options.update', deliveryOption.id), {
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
      title={t('edit_delivery_option')}
      icon="fa-pen-to-square"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputLabel htmlFor="city_ar" value={t('city_name_ar')} required />
          <TextInput
            id="city_ar"
            name="city_ar"
            value={data.city_ar}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_ar', e.target.value)}
            required
            icon="fa-city"
            placeholder={t('enter_arabic_city')}
          />
          <InputError message={errors.city_ar} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="city_en" value={t('city_name_en')} required />
          <TextInput
            id="city_en"
            name="city_en"
            value={data.city_en}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_en', e.target.value)}
            required
            icon="fa-city"
            placeholder={t('enter_english_city')}
          />
          <InputError message={errors.city_en} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="city_de" value={t('city_name_de')} required />
          <TextInput
            id="city_de"
            name="city_de"
            value={data.city_de}
            className="mt-1 block w-full"
            onChange={(e) => setData('city_de', e.target.value)}
            required
            icon="fa-city"
            placeholder={t('enter_german_city')}
          />
          <InputError message={errors.city_de} className="mt-2" />
        </div>

        <div className="mb-4">
          <InputLabel htmlFor="price" value={t('delivery_option_price')} required />
          <TextInput
            id="price"
            type="number"
            name="price"
            value={data.price}
            className="mt-1 block w-full"
            onChange={(e) => setData('price', e.target.value)}
            required
            icon="fa-coins"
            placeholder="0.00 EGP"
            step="0.01"
            min="0"
          />
          <InputError message={errors.price} className="mt-2" />
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
