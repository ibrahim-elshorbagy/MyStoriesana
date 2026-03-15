import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTrans } from '@/Hooks/useTrans';
import SearchBar from '@/Components/SearchBar';
import PrimaryButton from '@/Components/PrimaryButton';
import StaticPagesTable from './Partials/Tables/StaticPagesTable.jsx';

export default function StaticPages({ auth, pages, queryParams = null }) {
  queryParams = queryParams || {};
  const { t } = useTrans();

  return (
    <AppLayout>
      <Head title={t('static_pages_management')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-4 text-neutral-900 dark:text-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <i className="fa-solid fa-file-lines text-blue-500"></i> {t('static_pages')}
              </h2>
              <PrimaryButton
                icon="fa-plus"
                as={Link}
                href={route('admin.static-pages.create')}
              >
                {t('create_page')}
              </PrimaryButton>
            </div>

            <div className="mb-4">
              <SearchBar
                placeholder={t('search_pages')}
                defaultValue={queryParams.title || ''}
                queryKey="title"
                routeName="admin.static-pages.index"
                icon="fa-magnifying-glass"
              />
            </div>

            <StaticPagesTable pages={pages} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
