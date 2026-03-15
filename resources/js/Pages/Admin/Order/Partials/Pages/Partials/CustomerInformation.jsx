import React from 'react'

export default function CustomerInformation({ order, t }) {
  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('customer_information')}</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('name')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{order.user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('email')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{order.user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{t('phone')}:</span>
          <span className="text-neutral-900 dark:text-neutral-100">{order.user.phone}</span>
        </div>
        {/* WhatsApp Button */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-600">
          <a
            href={`https://wa.me/${order.user.phone?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <i className="fab fa-whatsapp mx-2"></i>
            {t('chat_on_whatsapp')}
          </a>
        </div>
      </div>
    </div>
  )
}
