import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useTrans } from '@/Hooks/useTrans';
import AppModal from '@/Components/AppModal';

export default function EditModal({ isOpen, onClose, discount }) {
  const { t } = useTrans();
  const { data, setData, put, errors, reset, processing } = useForm({
    code: '',
    percent: '',
    number_of_books: '',
    usage_limit: '',
  });

  useEffect(() => {
    if (discount && isOpen) {
      setData({
        code: discount.code || '',
        percent: discount.percent || '',
        number_of_books: discount.number_of_books || '',
        usage_limit: discount.usage_limit || '',
      });
    } else if (!isOpen) {
      reset();
    }
  }, [discount, isOpen]);

  if (!discount) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('admin.discounts.update', discount.id), {
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
      title={t('edit_discount')}
      icon="fa-pen-to-square"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* Discount Code */}
        <div className="mb-4">
          <InputLabel htmlFor="code" value={t('discount_code')} required />
          <TextInput
            id="code"
            name="code"
            value={data.code}
            className="mt-1 block w-full"
            onChange={(e) => setData('code', e.target.value)}
            required
            icon="fa-ticket"
            placeholder={t('enter_discount_code')}
          />
          <InputError message={errors.code} className="mt-2" />
        </div>

        {/* Discount Percent */}
        <div className="mb-4">
          <InputLabel htmlFor="percent" value={t('discount_percent')} required />
          <TextInput
            id="percent"
            name="percent"
            type="number"
            value={data.percent}
            className="mt-1 block w-full"
            onChange={(e) => setData('percent', e.target.value)}
            required
            icon="fa-percent"
            placeholder={t('enter_discount_percent')}
            min="0"
            max="100"
            step="0.01"
          />
          <InputError message={errors.percent} className="mt-2" />
        </div>

        {/* Number of Books */}
        <div className="mb-4">
          <InputLabel htmlFor="number_of_books" value={t('number_of_books')} />
          <TextInput
            id="number_of_books"
            name="number_of_books"
            type="number"
            value={data.number_of_books}
            className="mt-1 block w-full"
            onChange={(e) => setData('number_of_books', e.target.value)}
            icon="fa-book"
            placeholder={t('enter_number_of_books')}
            min="1"
          />
          <InputError message={errors.number_of_books} className="mt-2" />
        </div>

        {/* Usage Limit */}
        <div className="mb-4">
          <InputLabel htmlFor="usage_limit" value={t('usage_limit')} required />
          <TextInput
            id="usage_limit"
            name="usage_limit"
            type="number"
            value={data.usage_limit}
            className="mt-1 block w-full"
            onChange={(e) => setData('usage_limit', e.target.value)}
            required
            icon="fa-hashtag"
            placeholder={t('enter_usage_limit')}
            min="1"
          />
          <InputError message={errors.usage_limit} className="mt-2" />
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
