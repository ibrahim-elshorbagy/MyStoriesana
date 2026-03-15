import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { useTrans } from '@/Hooks/useTrans';

export default function Show({ cartItem }) {
  const { t } = useTrans();

  const handleRemoveItem = () => {
    if (confirm(`${t('are_you_sure_remove')} "${cartItem.child_name}"?`)) {
      router.delete(route('cart.remove', cartItem.id), {
        onSuccess: () => router.visit(route('cart.index'))
      });
    }
  };

  const formatOptions = {
    first_plan: t('format_first_plan'),
    second_plan: t('format_second_plan'),
    third_plan: t('format_third_plan'),
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
    1: t('story_theme_1'),
    2: t('story_theme_2'),
    3: t('story_theme_3'),
    4: t('story_theme_4'),
    5: t('story_theme_5'),
    6: t('story_theme_6'),
    7: t('story_theme_7'),
    8: t('story_theme_8'),
    9: t('story_theme_9'),
    10: t('story_theme_10'),
  };

  const learningValues = {
    honesty: t('learning_value_honesty'),
    kindness: t('learning_value_kindness'),
    courage: t('learning_value_courage'),
    respect: t('learning_value_respect'),
    responsibility: t('learning_value_responsibility'),
    friendship: t('learning_value_friendship'),
    perseverance: t('learning_value_perseverance'),
    creativity: t('learning_value_creativity'),
  };

  console.log('Cart Item Data:', cartItem);
  return (
    <SiteLayout title={`${cartItem.child_name} - ${t('cart_details')}`}>
      <Head>
        <title>{t('seo_cart_details_title')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>


      {/* Header Section */}
      <section className="relative min-h-[300px] bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
        {/* Floating Decorative Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-white/20 text-6xl ">
            <i className="fa-solid fa-shopping-cart"></i>
          </div>
          <div className="absolute top-32 right-20 text-white/20 text-5xl ">
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="absolute bottom-20 left-20 text-white/20 text-4xl ">
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="absolute bottom-32 right-10 text-white/20 text-5xl ">
            <i className="fa-solid fa-sparkles"></i>
          </div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{cartItem.child_name}</h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              {formatOptions[cartItem.format]}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={route('cart.index')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold border-2 border-white/30"
            >
              <i className="fa-solid fa-arrow-left rtl:rotate-180 ltr:mr-2 rtl:ml-2"></i>
              {t('back_to_cart')}
            </Link>
            <button
              onClick={handleRemoveItem}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold"
            >
              <i className="fa-solid fa-trash ltr:mr-2 rtl:ml-2"></i>
              {t('remove_from_cart')}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images and Story */}
          <div className="space-y-6">
            {/* Story Information */}
            {cartItem.story && (
              <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <i className="fa-solid fa-book text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                  {t('story_information')}
                </h3>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">{cartItem.story.title_value}</h4>
                  <Link
                    href={route('story.show', cartItem.story.id)}
                    className="text-orange-600 hover:text-orange-800 text-sm"
                  >
                    {t('view_story_details')} <i className="fa-solid fa-external-link-alt ml-1"></i>
                  </Link>
                </div>
                {cartItem.story.cover_image_ar && (
                  <img
                    src={`/storage/${cartItem.story.cover_image_ar}`}
                    alt={cartItem.story.title_value}
                    className="w-full h-98 object-cover rounded-lg"
                  />
                )}
              </div>
            )}

            {/* Images */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <i className="fa-solid fa-images text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                {t('images')}
              </h3>

              {/* Face Swap Image */}
              {cartItem.face_swap_image_path && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">{t('face_swap_result')}</h4>
                  <div className="relative">
                    <img
                      src={`/storage/${cartItem.face_swap_image_path}`}
                      alt="Face swap result"
                      className="w-full h-98 object-contain rounded-lg border-2 border-orange-200"
                    />
                    <a
                      href={`/storage/${cartItem.face_swap_image_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                    >
                      <i className="fa-solid fa-expand mx-1"></i>
                      {t('view_full_image')}
                    </a>
                  </div>
                </div>
              )}

              {/* Child Image */}
              {cartItem.child_image_path && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">{t('child_image')}</h4>
                  <div className="relative">
                    <img
                      src={`/storage/${cartItem.child_image_path}`}
                      alt="Child image"
                      className="w-full h-98 object-cover rounded-lg border-2 border-orange-200"
                    />
                    <a
                      href={`/storage/${cartItem.child_image_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                    >
                      <i className="fa-solid fa-expand mx-1"></i>
                      {t('view_full_image')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Child Information */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <i className="fa-solid fa-child text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                {t('child_information')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t('child_name')}</p>
                  <p className="text-lg font-semibold text-neutral-900">{cartItem.child_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t('age')}</p>
                  <p className="text-lg font-semibold text-neutral-900">{cartItem.child_age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t('gender')}</p>
                  <p className="text-lg font-semibold text-neutral-900">{genderOptions[cartItem.child_gender]}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-600">{t('language')}</p>
                  <p className="text-lg font-semibold text-neutral-900">{languageOptions[cartItem.language]}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-neutral-600">{t('format')}</p>
                <p className="text-lg font-semibold text-orange-600">{formatOptions[cartItem.format]}</p>
              </div>
              {cartItem.story_theme && storyThemeLabels[cartItem.story_theme] && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-neutral-600">{t('story_theme')}</p>
                  <p className="text-lg font-semibold text-purple-600">{storyThemeLabels[cartItem.story_theme]}</p>
                </div>
              )}
            </div>

            {/* Learning Values */}
            {cartItem.value && cartItem.value.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <i className="fa-solid fa-graduation-cap text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                  {t('learning_values')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cartItem.value.map((value) => (
                    <span key={value} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                      {learningValues[value]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Value */}
            {cartItem.custom_value && (
              <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <i className="fa-solid fa-pen text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                  {t('custom_value')}
                </h3>
                <p className="text-neutral-700 italic">{cartItem.custom_value}</p>
              </div>
            )}

            {/* Customization Details */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <i className="fa-solid fa-palette text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                {t('customization_details')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {cartItem.hair_color && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('hair_color')}:</span>
                    <span className="font-medium">{cartItem.hair_color}</span>
                  </div>
                )}
                {cartItem.hair_style && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('hair_style')}:</span>
                    <span className="font-medium">{cartItem.hair_style}</span>
                  </div>
                )}
                {cartItem.eye_color && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('eye_color')}:</span>
                    <span className="font-medium">{cartItem.eye_color}</span>
                  </div>
                )}
                {cartItem.skin_tone && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('skin_tone')}:</span>
                    <span className="font-medium">{cartItem.skin_tone}</span>
                  </div>
                )}
                {cartItem.clothing_description && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('clothing')}:</span>
                    <span className="font-medium">{cartItem.clothing_description}</span>
                  </div>
                )}
                {cartItem.customer_note && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">{t('note')}:</span>
                    <span className="font-medium italic">{cartItem.customer_note}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <i className="fa-solid fa-calculator text-orange-500 ltr:mr-2 rtl:ml-2"></i>
                {t('price_breakdown')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">{t('story_price')}:</span>
                  <span className="font-medium">${cartItem.story_price}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href={route('cart.index')}
                className="flex-1 text-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
              >
                <i className="fa-solid fa-arrow-left rtl:rotate-180 ltr:mr-2 rtl:ml-2"></i>
                {t('back_to_cart')}
              </Link>

            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

