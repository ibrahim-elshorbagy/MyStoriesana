import React, { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, usePage } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import ShippingForm from './Partials/ShippingForm';
import axios from 'axios';

export default function PaymentMethod({ cart, order, deliveryOptions = [] }) {
  const { t } = useTrans();
  const { errors, csrf_token } = usePage().props;
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [shippingData, setShippingData] = useState(() => {
    // Pre-populate shipping data from existing order if available
    if (order?.shipping_address) {
      return {
        delivery_option_id: order.shipping_address.delivery_option_id || '',
        first_name: order.shipping_address.first_name || '',
        last_name: order.shipping_address.last_name || '',
        street: order.shipping_address.street || '',
        house_number: order.shipping_address.house_number || '',
        additional_info: order.shipping_address.additional_info || '',
        postal_code: order.shipping_address.postal_code || '',
        city: order.shipping_address.city || '',
        phone: order.shipping_address.phone || '',
      };
    }
    return {
      delivery_option_id: '',
      first_name: '',
      last_name: '',
      street: '',
      house_number: '',
      additional_info: '',
      postal_code: '',
      city: '',
      phone: '',
    };
  });

  // ✅ Discount state
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [discountLoading, setDiscountLoading] = useState(false);

  // ⚠️ CRITICAL: Determine data source
  const data = cart || order;
  const items = cart ? cart.cart_items : order?.order_items;
  const isCart = !!cart;

  // Calculate if order needs shipping
  const needsShipping = true;

  const formatLabels = {
    first_plan: t('format_first_plan') || 'Digital PDF',
    second_plan: t('format_second_plan') || 'Softcover Book',
    third_plan: t('format_third_plan') || 'Hardcover Book',
  };

  const totalItems = items?.length || 0;
  const subtotal = parseFloat(isCart
    ? items?.reduce((sum, item) => sum + parseFloat(item.story_price || 0), 0) ?? 0
    : (order?.subtotal ?? items?.reduce((sum, item) => sum + parseFloat(item.story_price || 0), 0) ?? 0));
  const selectedDeliveryOption = deliveryOptions.find(option => option.id == shippingData.delivery_option_id);
  const deliveryTotal = parseFloat(isCart
    ? (selectedDeliveryOption?.price ?? 0)
    : (order?.delivery_total ?? 0));

  // ✅ Calculate discount value - ONLY from appliedDiscount (user-applied, not from existing order)
  const discountValue = appliedDiscount
    ? Math.round((subtotal * appliedDiscount.percent) / 100 * 100) / 100
    : 0;
  const grandTotal = subtotal + deliveryTotal - discountValue;

  // ⚠️ Form action changes based on source
  const formAction = isCart
    ? route('frontend.order.processPayment')  // From cart
    : route('frontend.order.processPayment.old', order.id);  // From existing order

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

  const handleApplyDiscount = async (e) => {
    e.preventDefault();

    if (!discountCode.trim()) {
      setDiscountError(t('discount_code_required'));
      return;
    }

    setDiscountLoading(true);
    setDiscountError('');

    try {
      console.log('Attempting to validate discount code:', discountCode);

      const response = await axios.post(route('cart.validateDiscount'), {
        code: discountCode
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrf_token,
        }
      });

      console.log('Discount validation response:', response.data);

      if (response.data.success) {
        setAppliedDiscount(response.data.discount);
        setDiscountError('');
        console.log('Discount applied successfully:', response.data.discount);
      } else {
        setDiscountError(response.data.message || t('discount_not_found'));
        setAppliedDiscount(null);
        console.log('Discount validation failed:', response.data.message);
      }
    } catch (error) {
      console.error('Discount validation error:', error);

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        console.error('Server error response:', error.response.data);
        setDiscountError(error.response.data.message || t('discount_validation_error'));
      } else if (error.request) {
        // Request made but no response received
        console.error('No response received:', error.request);
        setDiscountError(t('discount_validation_error'));
      } else {
        // Error in request setup
        console.error('Request setup error:', error.message);
        setDiscountError(t('discount_validation_error'));
      }

      setAppliedDiscount(null);
    } finally {
      setDiscountLoading(false);
    }
  };

  // ✅ Handle remove discount - clear all discount state
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  return (
    <SiteLayout>
      <Head title={t('checkout')} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mb-6 shadow-lg">
              <i className="fa-solid fa-credit-card text-3xl text-white"></i>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 py-4">
              {t('checkout')}
            </h1>
            <p className="text-xl text-neutral-600 font-medium">
              {t('review_and_complete_payment')}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-12 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ITEMS DISPLAY - LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-3 max-sm:py-8 sm:p-8 border border-white/40">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                  <i className="fa-solid fa-box-open text-orange-500"></i>
                  {t('your_order')} ({totalItems} {totalItems === 1 ? t('item') : t('items')})
                </h2>

                <div className="space-y-6">
                  {items?.map((item, index) => (
                    <div key={item.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3 sm:p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex max-sm:flex-col items-start gap-6">
                        {/* Item Number & Child Image */}
                        <div className="flex-shrink-0">
                          {item.child_image_path ? (
                            <div className="relative">
                              <img
                                src={`/storage/${item.child_image_path}`}
                                alt={item.child_name}
                                className="w-24 h-24 rounded-2xl object-cover border-4 border-orange-400 shadow-lg"
                              />
                              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {index + 1}
                              </div>
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                              {index + 1}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-4">
                          {/* Header */}
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                                {item.child_name}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-neutral-600">
                                <span className="flex items-center gap-1">
                                  <i className="fa-solid fa-cake-candles text-orange-500"></i>
                                  {item.child_age} {t('years')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <i className={`fa-solid ${item.child_gender === 'boy' ? 'fa-mars text-blue-500' : 'fa-venus text-pink-500'}`}></i>
                                  {t(item.child_gender)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <i className="fa-solid fa-language text-purple-500"></i>
                                  {t(item.language)}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-600">{item.story_price} {t('currency')}</div>
                            </div>
                          </div>

                          {/* Format & Story */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-lg">
                              <i className="fa-solid fa-book text-blue-600"></i>
                              <span className="text-sm font-semibold text-neutral-800">
                                {formatLabels[item.format]}
                              </span>
                            </div>
                            {item.story && (
                              <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
                                <i className="fa-solid fa-bookmark text-purple-600"></i>
                                <span className="text-sm font-semibold text-neutral-800 truncate">
                                  {item.story.title_value}
                                </span>
                              </div>
                            )}
                            {item.story_theme && storyThemeLabels[item.story_theme] && (
                              <div className="flex items-center gap-2 bg-indigo-100 px-3 py-2 rounded-lg">
                                <i className="fa-solid fa-masks-theater text-indigo-600"></i>
                                <span className="text-sm font-semibold text-neutral-800 truncate">
                                  {storyThemeLabels[item.story_theme]}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Learning Values */}
                          {item.value && item.value.length > 0 && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                              <div className="flex items-center gap-2 mb-2">
                                <i className="fa-solid fa-heart text-green-600"></i>
                                <h4 className="font-semibold text-neutral-900 text-sm">
                                  {t('learning_values')}:
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.value.map((val, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-300"
                                  >
                                    <i className="fa-solid fa-check-circle"></i>
                                    {learningValues[val] ? `${learningValues[val]}` : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Custom Value */}
                          {item.custom_value && (
                            <div className="bg-yellow-50 p-3 rounded-lg border-2 border-yellow-200">
                              <div className="flex items-start gap-2">
                                <i className="fa-solid fa-lightbulb text-yellow-600 mt-0.5"></i>
                                <div className="flex-1">
                                  <span className="text-xs font-semibold text-neutral-600">
                                    {t('learning_value')}:
                                  </span>
                                  <p className="text-sm text-neutral-800 font-medium">
                                    {item.custom_value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Character Appearance */}
                          {(item.hair_color || item.hair_style || item.eye_color || item.skin_tone) && (
                            <div className="grid grid-cols-2  gap-2">
                              {item.hair_color && (
                                <div className="bg-white p-2 rounded-lg border-2 border-neutral-200 shadow-sm">
                                  <div className="text-xs text-neutral-500 font-semibold">{t('hair_color')}</div>
                                  <div className="text-sm font-bold text-neutral-800 truncate">
                                    {item.hair_color}
                                  </div>
                                </div>
                              )}
                              {item.hair_style && (
                                <div className="bg-white p-2 rounded-lg border-2 border-neutral-200 shadow-sm">
                                  <div className="text-xs text-neutral-500 font-semibold">{t('hair_style')}</div>
                                  <div className="text-sm font-bold text-neutral-800 truncate">
                                    {item.hair_style}
                                  </div>
                                </div>
                              )}
                              {item.eye_color && (
                                <div className="bg-white p-2 rounded-lg border-2 border-neutral-200 shadow-sm">
                                  <div className="text-xs text-neutral-500 font-semibold">{t('eye_color')}</div>
                                  <div className="text-sm font-bold text-neutral-800 truncate">
                                    {item.eye_color}
                                  </div>
                                </div>
                              )}
                              {item.skin_tone && (
                                <div className="bg-white p-2 rounded-lg border-2 border-neutral-200 shadow-sm">
                                  <div className="text-xs text-neutral-500 font-semibold">{t('skin_tone')}</div>
                                  <div className="text-sm font-bold text-neutral-800 truncate">
                                    {item.skin_tone}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Clothing Description */}
                          {item.clothing_description && (
                            <div className="bg-indigo-50 p-3 rounded-lg border-2 border-indigo-200">
                              <div className="flex items-start gap-2">
                                <i className="fa-solid fa-shirt text-indigo-600 mt-0.5"></i>
                                <div className="flex-1">
                                  <span className="text-xs font-semibold text-neutral-600">
                                    {t('clothing_description')}:
                                  </span>
                                  <p className="text-sm text-neutral-800">
                                    {item.clothing_description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Customer Note */}
                          {item.customer_note && (
                            <div className="bg-pink-50 p-3 rounded-lg border-2 border-pink-200">
                              <div className="flex items-start gap-2">
                                <i className="fa-solid fa-comment-dots text-pink-600 mt-0.5"></i>
                                <div className="flex-1">
                                  <span className="text-xs font-semibold text-neutral-600">
                                    {t('customer_note')}:
                                  </span>
                                  <p className="text-sm text-neutral-800">
                                    {item.customer_note}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}


                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PAYMENT SIDEBAR - RIGHT SIDE */}
            <div className="lg:col-span-1">
              <form method="post" action={formAction} className="sticky top-6" noValidate>
                <input type="hidden" name="_token" value={usePage().props.csrf_token} />

                {/* ✅ Hidden discount field - sends discount code OR empty string */}
                <input
                  type="hidden"
                  name="discount_code"
                  value={appliedDiscount ? discountCode : ''}
                />

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-8 border border-white/40 space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-receipt text-orange-500"></i>
                      {t('order_summary')}
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between text-neutral-700">
                        <span>{t('subtotal')}:</span>
                        <span className="font-semibold">{subtotal.toFixed(2)} {t('currency')}</span>
                      </div>

                      {deliveryTotal > 0 && (
                        <div className="flex justify-between text-neutral-700">
                          <span>{t('delivery_total')}:</span>
                          <span className="font-semibold">{deliveryTotal.toFixed(2)} {t('currency')}</span>
                        </div>
                      )}

                      {/* ✅ Discount Display - ONLY show if discount is applied */}
                      {appliedDiscount && discountValue > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="flex items-center gap-2">
                            <i className="fa-solid fa-tag"></i>
                            {t('discount')} ({appliedDiscount.percent}%)
                          </span>
                          <span className="font-semibold">-{discountValue.toFixed(2)} {t('currency')}</span>
                        </div>
                      )}

                      <div className="border-t-2 border-orange-200 pt-3 flex justify-between items-center">
                        <span className="text-lg font-bold text-neutral-900">{t('total_price')}:</span>
                        <span className="text-2xl font-bold text-orange-600">{grandTotal.toFixed(2)} {t('currency')}</span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Discount Code Section */}
                  <div className="border-t-2 border-neutral-200 pt-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-tag text-orange-500"></i>
                      {t('discount_code')}
                    </h3>

                    {!appliedDiscount ? (
                      // Show discount input when no discount applied
                      <div className="space-y-3">
                        <div className="flex max-sm:flex-col gap-2">
                          <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                            placeholder={t('enter_discount_code')}
                            className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            disabled={discountLoading}
                          />
                          <button
                            type="button"
                            onClick={handleApplyDiscount}
                            disabled={discountLoading || !discountCode.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            {discountLoading ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              t('apply')
                            )}
                          </button>
                        </div>

                        {discountError && (
                          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600 flex items-center gap-2">
                              <i className="fa-solid fa-exclamation-circle"></i>
                              {discountError}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Show discount applied card with remove button
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <i className="fa-solid fa-check text-white"></i>
                            </div>
                            <div>
                              <p className="font-semibold text-neutral-900">{discountCode}</p>
                              <p className="text-sm text-green-700">
                                {appliedDiscount.percent}% {t('discount_applied')}
                              </p>
                            </div>
                          </div>
                          {/* ✅ Remove discount button */}
                          <button
                            type="button"
                            onClick={handleRemoveDiscount}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                            title={t('remove_discount')}
                          >
                            <i className="fa-solid fa-times text-xl"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shipping Address Section (if needed) */}
                  {needsShipping && (
                    <ShippingForm
                      shippingData={shippingData}
                      setShippingData={setShippingData}
                      deliveryOptions={deliveryOptions}
                      needsShipping={needsShipping}
                      errors={errors}
                    />
                  )}

                  {/* Payment Method */}
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('payment_method')}</h3>

                  <div className="border-2 border-orange-500 bg-orange-50 rounded-xl p-4 shadow-lg">
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="payment_method"
                        value="stripe"
                        checked={paymentMethod === 'stripe'}
                        onChange={() => setPaymentMethod('stripe')}
                        className="mt-1 ltr:mr-3 rtl:ml-3 w-5 h-5 text-orange-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <i className="fa-solid fa-credit-card text-xl text-blue-600"></i>
                          <h4 className="font-bold text-neutral-900">{t('payment_stripe')}</h4>
                        </div>
                        <p className="text-sm text-neutral-600">{t('payment_stripe_desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full my-4 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="flex rtl:flex-row-reverse items-center justify-center gap-3">
                    <i className="fa-solid fa-lock"></i>
                    <span>{t('complete_payment')}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </button>

                <div className="text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-shield-halved text-green-600"></i>
                  <span>{t('secure_payment')}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout >
  );
}
