import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { useTrans } from '@/Hooks/useTrans';

export default function Index({ cart }) {
  const { t } = useTrans();
  const [showCustomizations, setShowCustomizations] = useState({});

  const toggleCustomizations = (itemId) => {
    setShowCustomizations(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleRemoveItem = (cartItemId, childName) => {
    if (confirm(`${t('are_you_sure_remove')} "${childName}"?`)) {
      router.delete(route('cart.remove', cartItemId), {
        preserveScroll: true,
      });
    }
  };

  const handleClearCart = () => {
    if (confirm(t('are_you_sure_clear_cart'))) {
      router.delete(route('cart.clear'), {
        preserveScroll: true,
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

  const totalItems = cart?.cart_items?.length ?? 0;
  const subtotal = cart?.cart_items?.reduce((sum, item) => sum + parseFloat(item.story_price || 0), 0) ?? 0;
  const deliveryTotal = 0; // Delivery is calculated at order level during checkout
  const grandTotal = subtotal; // For carts, grand total equals subtotal until checkout

  console.log('Cart Data:', cart);
  return (
    <SiteLayout title={t('my_cart')}>
      <Head>
        <title>{t('seo_cart_title')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Header Section */}
      <section className="relative min-h-[400px] bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"

        />

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
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
            {t('my_cart')}
          </h1>

          {totalItems > 0 && (
            <div className="text-xl md:text-2xl mb-6">
              <p>{totalItems} {t('items')} • {t('total_price')}: {grandTotal.toFixed(2)} {t('currency')}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {totalItems > 0 && (
              <button
                onClick={handleClearCart}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <i className="fa-solid fa-trash ltr:mr-2 rtl:ml-2"></i>
                {t('clear_cart')}
              </button>
            )}

            <Link
              href={route('stories')}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-2 border-white/30"
            >
              <i className="fa-solid fa-arrow-left rtl:rotate-180 ltr:mr-2 rtl:ml-2"></i>
              {t('explore_our_stories')}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {(!cart || !cart.cart_items || cart.cart_items.length === 0) ? (
          /* Empty Cart State */
          <div className="text-center py-20">
            <div className="text-8xl text-orange-300 mb-8">
              <i className="fa-solid fa-shopping-cart"></i>
            </div>
            <h2 className="text-3xl font-bold text-neutral-700 mb-4">{t('empty_cart_message')}</h2>
            <Link
              href={route('frontend.order.create')}
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <i className="fa-solid fa-plus ltr:mr-2 rtl:ml-2"></i>
              {t('start_creating_stories')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Cart Items Grid */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                {cart.cart_items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border-2 border-orange-200 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="relative">
                      <img
                        src={`/storage/${item.face_swap_image_path || item.child_image_path}`}
                        alt={item.child_name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/placeholder-child.png';
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {item.story ? item.story.title_value : t('custom_story')}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{item.child_name}</h3>

                      <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                        <span><i className="fa-solid fa-cake-candles text-orange-500 ltr:mr-1 rtl:ml-1"></i>{item.child_age} {t('years_old')}</span>
                        <span><i className="fa-solid fa-venus-mars text-orange-500 ltr:mr-1 rtl:ml-1"></i>{genderOptions[item.child_gender]}</span>
                        <span><i className="fa-solid fa-language text-orange-500 ltr:mr-1 rtl:ml-1"></i>{languageOptions[item.language]}</span>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {formatOptions[item.format]}
                        </span>
                        {item.story_theme && storyThemeLabels[item.story_theme] && (
                          <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium ltr:ml-2 rtl:mr-2">
                            <i className="fa-solid fa-masks-theater ltr:mr-1 rtl:ml-1"></i>
                            {storyThemeLabels[item.story_theme]}
                          </span>
                        )}
                      </div>

                      {/* Learning Values */}
                      {item.value && item.value.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-neutral-700 mb-2">{t('learning_values')}:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.value.map((value) => (
                              <span key={value} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {learningValues[value]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Custom Value */}
                      {item.custom_value && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-neutral-700">{t('custom_value')}:</p>
                          <p className="text-sm text-neutral-600 italic">{item.custom_value}</p>
                        </div>
                      )}

                      {/* Customization Details Toggle */}
                      <button
                        onClick={() => toggleCustomizations(item.id)}
                        className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-3 flex items-center"
                      >
                        <i className="fa-solid fa-eye ltr:mr-1 rtl:ml-1"></i>
                        {t('view_customizations')}
                        <i className={`fa-solid fa-chevron-${showCustomizations[item.id] ? 'up' : 'down'} ml-1`}></i>
                      </button>

                      {showCustomizations[item.id] && (
                        <div className="mb-3 p-3 bg-orange-50 rounded-lg text-sm">
                          {item.hair_color && <p><i className="fa-solid fa-user text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('hair_color')}: {item.hair_color}</p>}
                          {item.hair_style && <p><i className="fa-solid fa-scissors text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('hair_style')}: {item.hair_style}</p>}
                          {item.eye_color && <p><i className="fa-solid fa-eye text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('eye_color')}: {item.eye_color}</p>}
                          {item.skin_tone && <p><i className="fa-solid fa-palette text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('skin_tone')}: {item.skin_tone}</p>}
                          {item.clothing_description && <p><i className="fa-solid fa-shirt text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('clothing')}: {item.clothing_description}</p>}
                          {item.customer_note && <p><i className="fa-solid fa-sticky-note text-orange-500 ltr:mr-1 rtl:ml-1"></i>{t('note')}: {item.customer_note}</p>}
                        </div>
                      )}

                      {/* Price Section */}
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-neutral-600">{t('story_price')}:</span>
                          <span className="font-medium">{item.story_price} {t('currency')}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Link
                          href={route('cart.show', { cartItem: item.id })}
                          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center font-medium transition-colors"
                        >
                          <i className="fa-solid fa-eye ltr:mr-1 rtl:ml-1"></i>
                          {t('view_details')}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.child_name)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="xl:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border-2 border-orange-200 shadow-xl p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{t('order_summary')}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>{t('items')} ({totalItems}):</span>
                    <span className="font-medium">{subtotal.toFixed(2)} {t('currency')}</span>
                  </div>
                  {deliveryTotal > 0 && (
                    <div className="flex justify-between">
                      <span>{t('delivery_total')}:</span>
                      <span className="font-medium">{deliveryTotal.toFixed(2)} {t('currency')}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-orange-600">
                      <span>{t('grand_total')}:</span>
                      <span>{grandTotal.toFixed(2)} {t('currency')}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={route('cart.proceedToPayment')}
                  className="w-full block text-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <i className="fa-solid fa-credit-card ltr:mr-2 rtl:ml-2"></i>
                  {t('proceed_to_checkout')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
