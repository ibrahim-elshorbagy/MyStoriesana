import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import OrangeSelectInput from '@/Components/OrangeSelectInput';

export default function ShippingForm({
  shippingData,
  setShippingData,
  deliveryOptions = [],
  needsShipping = false,
  errors = {}
}) {
  const { t } = useTrans();

  const deliveryOptionChoices = deliveryOptions.map(option => ({
    value: option.id,
    label: `${option.city_value} - €${option.price}`
  }));

  return (
    <div className="border-t-2 border-neutral-200 pt-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-truck text-orange-500"></i>
        {t('shipping_address')}
      </h3>

      <div className="space-y-6">
        <OrangeSelectInput
          name="delivery_option_id"
          value={shippingData.delivery_option_id}
          onChange={(e) => setShippingData({ ...shippingData, delivery_option_id: e.target.value })}
          options={deliveryOptionChoices}
          label={t('country')}
          placeholder={t('select_country')}
          required={needsShipping}
          error={errors.delivery_option_id}
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('first_name')} *
          </label>
          <input
            type="text"
            name="first_name"
            value={shippingData.first_name}
            onChange={(e) => setShippingData({ ...shippingData, first_name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('first_name_placeholder') || t('first_name')}
            required={needsShipping}
          />
          {errors.first_name && <span className="text-red-500 text-sm mt-1 block">{errors.first_name}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('last_name')} *
          </label>
          <input
            type="text"
            name="last_name"
            value={shippingData.last_name}
            onChange={(e) => setShippingData({ ...shippingData, last_name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('last_name_placeholder') || t('last_name')}
            required={needsShipping}
          />
          {errors.last_name && <span className="text-red-500 text-sm mt-1 block">{errors.last_name}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('street')} *
          </label>
          <input
            type="text"
            name="street"
            value={shippingData.street}
            onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('street_placeholder') || t('street')}
            required={needsShipping}
          />
          {errors.street && <span className="text-red-500 text-sm mt-1 block">{errors.street}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('house_number')}
          </label>
          <input
            type="text"
            name="house_number"
            value={shippingData.house_number}
            onChange={(e) => setShippingData({ ...shippingData, house_number: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('house_number_placeholder') || t('house_number')}
          />
          {errors.house_number && <span className="text-red-500 text-sm mt-1 block">{errors.house_number}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('postal_code')} *
          </label>
          <input
            type="text"
            name="postal_code"
            value={shippingData.postal_code}
            onChange={(e) => setShippingData({ ...shippingData, postal_code: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('postal_code_placeholder') || t('postal_code')}
            required={needsShipping}
          />
          {errors.postal_code && <span className="text-red-500 text-sm mt-1 block">{errors.postal_code}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('city')} *
          </label>
          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('city_placeholder') || t('city')}
            required={needsShipping}
          />
          {errors.city && <span className="text-red-500 text-sm mt-1 block">{errors.city}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('phone')} *
          </label>
          <input
            type="text"
            name="phone"
            value={shippingData.phone}
            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            placeholder={t('phone_placeholder') || t('phone')}
            required={needsShipping}
          />
          {errors.phone && <span className="text-red-500 text-sm mt-1 block">{errors.phone}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('additional_info')}
          </label>
          <textarea
            name="additional_info"
            value={shippingData.additional_info}
            onChange={(e) => setShippingData({ ...shippingData, additional_info: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 resize-none"
            placeholder={t('additional_info_placeholder') || t('additional_info')}
          />
          {errors.additional_info && <span className="text-red-500 text-sm mt-1 block">{errors.additional_info}</span>}
        </div>
      </div>
    </div>
  );
}
