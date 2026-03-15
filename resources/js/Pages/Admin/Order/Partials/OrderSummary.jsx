export default function OrderSummary({ order, t }) {
  return (
    <div className="bg-white dark:bg-neutral-900/80 border rounded-lg p-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <i className="fa-solid fa-receipt text-orange-500"></i>
        {t('order_summary')}
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-neutral-700 dark:text-neutral-300">{t('total_items')}:</span>
          <span className="font-semibold dark:text-white">{order.order_items.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-700 dark:text-neutral-300">{t('subtotal')}:</span>
          <span className="font-semibold dark:text-white">{order.subtotal} {t('currency')}</span>
        </div>
        {order.delivery_total > 0 && (
          <div className="flex justify-between">
            <span className="text-neutral-700 dark:text-neutral-300">{t('delivery_total')}:</span>
            <span className="font-semibold dark:text-white">{order.delivery_total} {t('currency')}</span>
          </div>
        )}
        {order.payments?.some(p => p.status === 'paid') && order.discount_code && (
          <>
            <div className="flex justify-between">
              <span className="text-neutral-700 dark:text-neutral-300">{t('discount_code')}:</span>
              <span className="font-semibold dark:text-white">{order.discount_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700 dark:text-neutral-300">{t('discount_value')}:</span>
              <span className="font-semibold dark:text-white">{order.discount_value} {t('currency')}</span>
            </div>
          </>
        )}
        <div className="border-t-2 border-orange-200 pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{t('total_price')}:</span>
          <span className="text-2xl font-bold text-orange-600">{order.total_price} {t('currency')}</span>
        </div>
      </div>
    </div>
  );
}
