import React from 'react';
import { Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function PaymentSuccess({ order, payment }) {
  const { t } = useTrans();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t('payment_success')}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t('order_paid_successfully')}
            </p>
          </div>

          {order && (
            <div className="mt-8">
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('order_details')}
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">{t('order_number')}:</dt>
                    <dd className="text-sm text-gray-900">#{order.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">{t('total_amount')}:</dt>
                    <dd className="text-sm text-gray-900">{order.total_price} {t('currency')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">{t('payment_method')}:</dt>
                    <dd className="text-sm text-gray-900">Stripe</dd>
                  </div>
                  {payment && (
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">{t('transaction_id')}:</dt>
                      <dd className="text-sm text-gray-900">{payment.transaction_id}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link
              href={route('dashboard')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('back_to_dashboard')}
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link
              href={route('user.orders.index')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {t('view_all_orders')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
