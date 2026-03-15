import React from 'react';
import InputError from '@/Components/InputError';

export default function StepThree({
  data,
  imagePreview,
  onBack,
  onEdit,
  processing,
  errors,
  t
}) {

  const formatOptions = {
    first_plan: t('format_first_plan'),
    second_plan: t('format_second_plan'),
    // third_plan: t('format_third_plan'),
  };

  const genderOptions = {
    boy: t('gender_boy'),
    girl: t('gender_girl'),
  };

  const languageOptions = {
    arabic: t('language_arabic'),
    english: t('language_english'),
    german: t('language_german'),
    english_german: t('language_english_german'),
    arabic_german: t('language_arabic_german'),
    turkish: t('language_turkish'),
    turkish_german: t('language_turkish_german'),
  };

  const storyThemeLabels = {
    '1': t('story_theme_1'),
    '2': t('story_theme_2'),
    '3': t('story_theme_3'),
    '4': t('story_theme_4'),
    '5': t('story_theme_5'),
    '6': t('story_theme_6'),
    '7': t('story_theme_7'),
    '8': t('story_theme_8'),
    '9': t('story_theme_9'),
    '10': t('story_theme_10'),
  };

  return (
    <div className="space-y-8">
      {/* Order Details */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-4">
            {t('order_summary')}
          </h2>
        </div>

        <div className="">
          {/* Child Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
                <i className="fa-solid fa-child  text-blue-500 mx-2"></i>
                {t('child_information')}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(1)}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2"
              >
                <i className="fa-solid fa-pen"></i>
                {t('edit') || 'Edit'}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium text-neutral-700 w-32">{t('child_name')}:</span>
                <span className="text-neutral-900">{data.child_name}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-neutral-700 w-32">{t('child_age')}:</span>
                <span className="text-neutral-900">{data.child_age} {t('years')}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-neutral-700 w-32">{t('language')}:</span>
                <span className="text-neutral-900">{languageOptions[data.language]}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-neutral-700 w-32">{t('child_gender')}:</span>
                <span className="text-neutral-900">{genderOptions[data.child_gender]}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-neutral-700 w-32">{t('format')}:</span>
                <span className="text-neutral-900">{formatOptions[data.format]}</span>
              </div>
              {data.story_theme && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('story_theme')}:</span>
                  <span className="text-neutral-900">{storyThemeLabels[data.story_theme]}</span>
                </div>
              )}
              {((data.value && data.value.length > 0) || data.custom_value) && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('learning_value')}:</span>
                  <div className="flex-1">
                    {data.value && data.value.map((val, idx) => (
                      <span key={idx} className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mx-1 mb-1">
                        {t(`learning_value_${val}`)}
                      </span>
                    ))}
                    {data.custom_value && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mx-1 mb-1">
                        {data.custom_value}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Child Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <span className="font-medium text-neutral-700 block mb-2">{t('child_image')}:</span>
                <img
                  src={imagePreview}
                  alt="Child"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-orange-200"
                />
              </div>
            )}
          </div>

        </div>

        {/* Customizations */}
        {(data.hair_color || data.hair_style || data.eye_color || data.skin_tone || data.clothing_description) && (
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <i className="fa-solid fa-palette text-purple-500 mx-2"></i>
              {t('additional_customizations')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.hair_color && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('hair_color')}:</span>
                  <span className="text-neutral-900">{data.hair_color}</span>
                </div>
              )}
              {data.hair_style && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('hair_style')}:</span>
                  <span className="text-neutral-900">{data.hair_style}</span>
                </div>
              )}
              {data.eye_color && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('eye_color')}:</span>
                  <span className="text-neutral-900">{data.eye_color}</span>
                </div>
              )}
              {data.skin_tone && (
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">{t('skin_tone')}:</span>
                  <span className="text-neutral-900">{data.skin_tone}</span>
                </div>
              )}
              {data.clothing_description && (
                <div className="md:col-span-2">
                  <span className="font-medium text-neutral-700">{t('clothing_description')}:</span>
                  <p className="text-neutral-900 mt-1">{data.clothing_description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Customer Note */}
        {data.customer_note && (
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <i className="fa-solid fa-note-sticky text-yellow-500 mx-2"></i>
              {t('customer_note')}
            </h3>
            <p className="text-neutral-700 bg-yellow-50 p-4 rounded-lg">
              {data.customer_note}
            </p>
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl shadow-2xl p-8 border border-orange-100">
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">
          {t('pricing_summary')}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-600">{t('story_price')}:</span>
            <span className="font-semibold text-lg">{data.story_price} {t('currency')}</span>
          </div>
          {data.delivery_price > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-600">{t('delivery_price')}:</span>
              <span className="font-semibold text-lg">{data.delivery_price} {t('currency')}</span>
            </div>
          )}
          <div className="border-t-2 border-orange-200 pt-4 flex justify-between">
            <span className="text-xl font-bold">{t('total_price')}:</span>
            <span className="text-2xl font-bold text-orange-600">{data.total_price} {t('currency')}</span>
          </div>
        </div>
      </div>

      {/* Show errors if any */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <i className="fa-solid fa-exclamation-triangle mx-2"></i>
            {t('validation_errors')}
          </h3>
          <div className="space-y-2">
            {Object.keys(errors).map((key) => (
              <div key={key} className="text-sm text-red-600">
                {errors[key]}
              </div>
            ))}
          </div>
        </div>
      )}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <InputError message={errors.submit} />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 rtl:flex-row-reverse">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors flex items-center rtl:flex-row-reverse"
        >
          <i className="fa-solid fa-arrow-left rtl:fa-arrow-right mx-2"></i>
          {t('back')}
        </button>

        <button
          type="submit"
          disabled={processing}
          className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {processing ? (
            <span className="flex items-center gap-3">
              <i className="fa-solid fa-spinner fa-spin"></i>
              {t('processing')}
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <i className="fa-solid fa-check-circle"></i>
              {t('confirm')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
