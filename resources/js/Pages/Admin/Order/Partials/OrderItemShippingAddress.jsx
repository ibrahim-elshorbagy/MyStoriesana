export default function OrderItemShippingAddress({ address, t }) {
  if (!address) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <h4 className="font-semibold mb-3 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <i className="fa-solid fa-location-dot text-red-500"></i>
        {t('shipping_address')}
      </h4>
      <div className="space-y-1 text-sm text-neutral-900 dark:text-neutral-100">
        <div><strong className="text-neutral-700 dark:text-neutral-300">{t('area')}:</strong> {address.area}</div>
        <div><strong className="text-neutral-700 dark:text-neutral-300">{t('street')}:</strong> {address.street}</div>
        <div><strong className="text-neutral-700 dark:text-neutral-300">{t('house_number')}:</strong> {address.house_number}</div>
        {address.additional_info && (
          <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
            <strong className="text-neutral-700 dark:text-neutral-300">{t('additional_info')}:</strong> {address.additional_info}
          </div>
        )}
        {address.delivery_option && (
          <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
            <strong className="text-neutral-700 dark:text-neutral-300">{t('delivery_option')}:</strong> {address.delivery_option.city_value} (${address.delivery_option.price})
          </div>
        )}
      </div>
    </div>
  );
}
