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
    code: '',
    percent: '',
    usage_limit: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.discounts.store'), {
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
      title={t('create_discount')}
      icon="fa-ticket"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        {/* Discount Code */}
        <div className="mb-4">
          <InputLabel htmlFor="code" value={t('discount_code')} required />
          <TextInput
            id="code"
            type="text"
            name="code"
            value={data.code}
            className="mt-1 block w-full"
            onChange={(e) => setData('code', e.target.value)}
            icon="fa-ticket"
            placeholder={t('enter_discount_code')}
            required
          />
          <InputError message={errors.code} className="mt-2" />
        </div>

        {/* Discount Percent */}
        <div className="mb-4">
          <InputLabel htmlFor="percent" value={t('discount_percent')} required />
          <TextInput
            id="percent"
            type="number"
            name="percent"
            value={data.percent}
            className="mt-1 block w-full"
            onChange={(e) => setData('percent', e.target.value)}
            icon="fa-percent"
            placeholder={t('enter_discount_percent')}
            min="0"
            max="100"
            step="0.01"
            required
          />
          <InputError message={errors.percent} className="mt-2" />
        </div>

        {/* Usage Limit */}
        <div className="mb-4">
          <InputLabel htmlFor="usage_limit" value={t('usage_limit')} required />
          <TextInput
            id="usage_limit"
            type="number"
            name="usage_limit"
            value={data.usage_limit}
            className="mt-1 block w-full"
            onChange={(e) => setData('usage_limit', e.target.value)}
            icon="fa-hashtag"
            placeholder={t('enter_usage_limit')}
            min="1"
            required
          />
          <InputError message={errors.usage_limit} className="mt-2" />
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
