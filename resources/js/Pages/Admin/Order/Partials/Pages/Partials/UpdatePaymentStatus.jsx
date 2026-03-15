import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import SelectInput from '@/Components/SelectInput'

export default function UpdatePaymentStatus({ order, t }) {
  const [newStatus, setNewStatus] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [loadingNotify, setLoadingNotify] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const paymentStatusOptions = [
    { value: '', label: t('select') },
    { value: 'pending', label: t('payment_status_pending') },
    { value: 'paid', label: t('payment_status_paid') },
    { value: 'failed', label: t('payment_status_failed') },
    { value: 'refunded', label: t('payment_status_refunded') },
  ]

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'de', label: 'Deutsch' },
  ]

  const handleUpdate = () => {
    if (!newStatus || !order.payments || order.payments.length === 0) return

    setLoadingUpdate(true)
    router.put(route('admin.orders.update-payment-status', order.id), {
      status: newStatus,
    }, {
      onFinish: () => setLoadingUpdate(false),
      onSuccess: () => {
        setNewStatus('')
      }
    })
  }

  const handleNotify = () => {
    if (!order.payments || order.payments.length === 0) return

    setLoadingNotify(true)
    router.post(route('admin.orders.notify-payment-status', order.id), {
      locale: selectedLanguage,
    }, {
      onFinish: () => setLoadingNotify(false),
    })
  }

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('update_payment_status')}</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('current_status')}:</span>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            order.payments && order.payments.length > 0 && order.payments[0].status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            order.payments && order.payments.length > 0 && order.payments[0].status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
            order.payments && order.payments.length > 0 && order.payments[0].status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
            'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
          }`}>
            {order.payments && order.payments.length > 0 ? t(`payment_status_${order.payments[0].status}`) : t('no_payment')}
          </span>
        </div>

        <SelectInput
          name="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          options={paymentStatusOptions}
          label={t('new_status')}
        />

        <SelectInput
          name="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          options={languageOptions}
          label={t('language')}
        />

        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={loadingUpdate || !newStatus || !order.payments || order.payments.length === 0}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {loadingUpdate ? t('updating') : t('update_status')}
          </button>

          <button
            onClick={handleNotify}
            disabled={loadingNotify || !order.payments || order.payments.length === 0}
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {loadingNotify ? t('sending') : t('notify_user')}
          </button>
        </div>
      </div>
    </div>
  )
}
