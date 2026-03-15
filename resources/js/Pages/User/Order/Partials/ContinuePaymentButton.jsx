import { Link } from '@inertiajs/react';

export default function ContinuePaymentButton({ order, t }) {
  // Check if payment is incomplete
  const hasUnpaidPayment = !order.payments?.some(p => p.status === 'paid');

  if (!hasUnpaidPayment) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-8 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-exclamation-triangle text-white text-xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
            {t('payment_incomplete')}
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4">
            {t('payment_incomplete_message')}
          </p>
          <Link
            href={route('frontend.order.continuePayment', order.id)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-pink-600 shadow-lg"
          >
            <i className="fa-solid fa-credit-card"></i>
            {t('continue_payment')}
          </Link>
        </div>
      </div>
    </div>
  );
}
