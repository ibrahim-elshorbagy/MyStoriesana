import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function EditFAQ({ faq, categories = [] }) {
  const { t } = useTrans();
  const { data, setData, put, errors, processing } = useForm({
    question_ar: faq.question?.ar || '',
    question_en: faq.question?.en || '',
    question_de: faq.question?.de || '',
    answer_ar: faq.answer?.ar || '',
    answer_en: faq.answer?.en || '',
    answer_de: faq.answer?.de || '',
    category_id: faq.category_id || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.faq.update', faq.id), { preserveScroll: true });
  };

  return (
    <AppLayout>
      <Head title={`${t('edit_faq')} - ${faq.question_value}`} />
      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-6 text-neutral-900 dark:text-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link
                  href={route('admin.faq.index')}
                  className="flex items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  <i className="fa-solid fa-arrow-left rtl:rotate-180 mx-2"></i>
                  {t('faq')}
                </Link>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <h1 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                  <i className="fa-solid fa-edit text-green-500 mx-2"></i>
                  {t('edit_faq')} - {faq.question_value}
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Questions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Arabic Question */}
                <div>
                  <InputLabel htmlFor="question_ar" value={t('question_ar')} required />
                  <TextInput
                    id="question_ar"
                    type="text"
                    name="question_ar"
                    value={data.question_ar}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question_ar', e.target.value)}
                    required
                    placeholder={t('enter_question_ar')}
                  />
                  <InputError message={errors.question_ar} className="mt-2" />
                </div>

                {/* English Question */}
                <div>
                  <InputLabel htmlFor="question_en" value={t('question_en')} required />
                  <TextInput
                    id="question_en"
                    type="text"
                    name="question_en"
                    value={data.question_en}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question_en', e.target.value)}
                    required
                    placeholder={t('enter_question_en')}
                  />
                  <InputError message={errors.question_en} className="mt-2" />
                </div>

                {/* German Question */}
                <div>
                  <InputLabel htmlFor="question_de" value={t('question_de')} required />
                  <TextInput
                    id="question_de"
                    type="text"
                    name="question_de"
                    value={data.question_de}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question_de', e.target.value)}
                    required
                    placeholder={t('enter_question_de')}
                  />
                  <InputError message={errors.question_de} className="mt-2" />
                </div>
              </div>

              {/* Answers */}
              <div className="space-y-6">
                {/* Arabic Answer */}
                <div>
                  <InputLabel htmlFor="answer_ar" value={t('answer_ar')} required />
                  <TextArea
                    id="answer_ar"
                    name="answer_ar"
                    value={data.answer_ar}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer_ar', e.target.value)}
                    required
                    rows={6}
                    placeholder={t('enter_answer_ar')}
                  />
                  <InputError message={errors.answer_ar} className="mt-2" />
                </div>

                {/* English Answer */}
                <div>
                  <InputLabel htmlFor="answer_en" value={t('answer_en')} required />
                  <TextArea
                    id="answer_en"
                    name="answer_en"
                    value={data.answer_en}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer_en', e.target.value)}
                    required
                    rows={6}
                    placeholder={t('enter_answer_en')}
                  />
                  <InputError message={errors.answer_en} className="mt-2" />
                </div>

                {/* German Answer */}
                <div>
                  <InputLabel htmlFor="answer_de" value={t('answer_de')} required />
                  <TextArea
                    id="answer_de"
                    name="answer_de"
                    value={data.answer_de}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer_de', e.target.value)}
                    required
                    rows={6}
                    placeholder={t('enter_answer_de')}
                  />
                  <InputError message={errors.answer_de} className="mt-2" />
                </div>
              </div>

              {/* Category */}
              <div>
                <SelectInput
                  name="category_id"
                  value={data.category_id}
                  onChange={(e) => setData('category_id', e.target.value)}
                  options={[
                    { value: '', label: t('select_category') },
                    ...categories.map((category) => ({
                      value: category.id,
                      label: category.name_value,
                    })),
                  ]}
                  label={t('category')}
                  error={errors.category_id}
                  required={true}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <SecondaryButton icon={'fa-times'} as={Link} href={route('admin.faq.index')}>
                  {t('cancel')}
                </SecondaryButton>
                <PrimaryButton icon={"fa-save"} type="submit" disabled={processing}>
                  {processing ? t('updating') : t('save_changes')}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
