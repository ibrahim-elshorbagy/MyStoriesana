import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import SelectInput from '@/Components/SelectInput'

export default function UpdateOrderStatus({ order, t }) {
  const [newStatus, setNewStatus] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [loadingNotify, setLoadingNotify] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const orderStatusOptions = [
    { value: '', label: t('select') },
    { value: 'pending', label: t('order_status_pending') },
    { value: 'processing', label: t('order_status_processing') },
    { value: 'printing', label: t('order_status_printing') },
    { value: 'completed', label: t('order_status_completed') },
    { value: 'cancelled', label: t('order_status_cancelled') },
  ]

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'de', label: 'Deutsch' },

  ]

  const handleUpdate = () => {
    if (!newStatus) return

    setLoadingUpdate(true)
    router.put(route('admin.orders.update-status', order.id), {
      status: newStatus,
    }, {
      onFinish: () => setLoadingUpdate(false),
      onSuccess: () => {
        setNewStatus('')
      }
    })
  }

  const handleNotify = () => {
    setLoadingNotify(true)
    router.post(route('admin.orders.notify-status', order.id), {
      locale: selectedLanguage,
    }, {
      onFinish: () => setLoadingNotify(false),
    })
  }

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('update_order_status')}</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('current_status')}:</span>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              order.status === 'processing' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400' :
                order.status === 'printing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                order.status === 'pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
            {t(`order_status_${order.status}`)}
          </span>
        </div>

        <SelectInput
          name="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          options={orderStatusOptions}
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
            disabled={loadingUpdate || !newStatus}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {loadingUpdate ? t('updating') : t('update_status')}
          </button>

          <button
            onClick={handleNotify}
            disabled={loadingNotify}
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
          >
            {loadingNotify ? t('sending') : t('notify_user')}
          </button>
        </div>
      </div>
    </div>
  )
}
