import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SearchBar from '@/Components/SearchBar';
import { Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import OrdersTable from './Partials/Tables/OrdersTable';

export default function Orders({ auth, orders, queryParams = null }) {
  queryParams = queryParams || {};
  const { t } = useTrans();

  return (
    <AppLayout user={auth.user}>
      <Head title={t('orders_management')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-4 text-neutral-900 dark:text-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <i className="fa-solid fa-shopping-cart text-blue-500"></i> {t('orders')}
              </h2>
            </div>

            <div className="mb-4">
              <SearchBar
                placeholder={t('search_orders')}
                defaultValue={queryParams.name || ''}
                queryKey="name"
                routeName="admin.orders.index"
                icon="fa-magnifying-glass"
              />
            </div>

            <OrdersTable orders={orders} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
