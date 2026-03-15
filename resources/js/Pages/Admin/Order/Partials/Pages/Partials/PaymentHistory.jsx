import React from 'react'

export default function PaymentHistory({ order, t, paymentMethodOptions }) {
  const paidPayments = order.payments.filter(payment => payment.status === 'paid');
  if (!paidPayments || paidPayments.length === 0) return null;

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 lg:col-span-2">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('payment_details')}</h3>

      <div className="space-y-4">
        {paidPayments.map((payment, index) => (
          <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('amount')}:</span>
                <span className="text-neutral-900 dark:text-neutral-100">{payment.amount} {t('currency')}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('payment_method')}:</span>
                <span className="text-neutral-900 dark:text-neutral-100">{paymentMethodOptions[payment.payment_method]}</span>
              </div>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('status')}:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  payment.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {t(`payment_status_${payment.status}`)}
                </span>
              </div>
              <div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('created_at')}:</span>
                <span className="text-neutral-900 dark:text-neutral-100 text-sm">{new Date(payment.created_at).toLocaleString()}</span>
              </div>
            </div>
            {payment.transaction_id && (
              <div className="mt-2">
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('transaction_id')}:</span>
                <span className="text-neutral-900 dark:text-neutral-100 text-sm font-mono">{payment.transaction_id}</span>
              </div>
            )}
            {payment.notes && (
              <div className="mt-2">
                <span className="font-medium text-neutral-700 dark:text-neutral-300 block">{t('notes')}:</span>
                <p className="text-neutral-900 dark:text-neutral-100 text-sm">{payment.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
