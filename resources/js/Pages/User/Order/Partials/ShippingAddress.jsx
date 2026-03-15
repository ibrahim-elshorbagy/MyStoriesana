export default function ShippingAddress({ order, t }) {
  if (!order.shipping_address) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-neutral-900 dark:text-neutral-100 mb-4">
        <i className="fa-solid fa-truck text-blue-500"></i>
        {t('shipping_address')}
      </h3>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('first_name')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.first_name}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('last_name')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.last_name}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('street')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.street}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('house_number')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.house_number}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('postal_code')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.postal_code}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('city')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.city}</p>
          </div>
          <div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('phone')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.phone}</p>
          </div>
          {order.shipping_address.additional_info && (
            <div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('additional_info')}:</span>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{order.shipping_address.additional_info}</p>
            </div>
          )}
        </div>

        {order.shipping_address.delivery_option && (
          <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">{t('delivery_option')}:</span>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {order.shipping_address.delivery_option.city_value} - {order.shipping_address.delivery_option.price} {t('currency')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
