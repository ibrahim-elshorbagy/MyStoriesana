import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTrans } from '@/Hooks/useTrans';
import ContinuePaymentButton from '../ContinuePaymentButton';
import OrderSummary from '@/Pages/Admin/Order/Partials/OrderSummary';
import OrderItemsList from '../OrderItemsList';
import ShippingAddress from '../ShippingAddress';

export default function ViewOrder({ auth, order }) {
  const { t } = useTrans();

  return (
    <AppLayout user={auth.user}>
      <Head title={`${t('order')} #${order.id}`} />

      <div className="m-3 xl:m-5 space-y-8 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Link
            href={route('user.orders.index')}
            className=" dark:text-neutral-100"
          >
            <i className="fa fa-arrow-left mr-2"></i>
            {t('back_to_orders')}
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {t('order')} #{order.id}
          </h1>
        </div>

        {/* Continue Payment CTA */}
        <ContinuePaymentButton order={order} t={t} />

        {/* Order Summary */}
        <OrderSummary order={order} t={t} />

        {/* Shipping Address */}
        <ShippingAddress order={order} t={t} />

        {/* Order Items */}
        <OrderItemsList order={order} t={t} />
      </div>
    </AppLayout>
  );
}
