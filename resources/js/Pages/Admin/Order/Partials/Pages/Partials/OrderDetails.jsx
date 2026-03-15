import { Link } from '@inertiajs/react'
import React from 'react'

export default function OrderDetails({ order, t, statusOptions, paymentMethodOptions }) {
  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('order_details')}</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('order_id')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">#{order.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('created_at')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{new Date(order.created_at).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('updated_at')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{new Date(order.updated_at).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('payment_method')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{paymentMethodOptions[order.payment_method]}</span>
        </div>

        {/* <div className="flex justify-between font-semibold text-lg">
          <span className="text-neutral-700 dark:text-neutral-300">{t('total_price')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{order.total_price} {t('currency')}</span>
        </div>
        {order.payments?.some(p => p.status === 'paid') && order.discount_code && (
          <>
            <div className="flex justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('discount_code')}:</span>
              <span className="text-neutral-900 dark:text-neutral-100">{order.discount_code}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('discount_value')}:</span>
              <span className="text-neutral-900 dark:text-neutral-100">{order.discount_value} {t('currency')}</span>
            </div>
          </>
        )} */}
      </div>
    </div>
  )
}
