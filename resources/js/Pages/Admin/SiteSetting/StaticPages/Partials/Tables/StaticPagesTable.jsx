import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';

export default function StaticPagesTable({ pages }) {
  const { t } = useTrans();

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'title', label: t('title'), icon: 'fa-heading' },
    { field: 'status', label: t('status'), icon: 'fa-circle-check' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'status', label: t('status') },
    { field: 'updated_at', label: t('updated_at') }
  ];

  const bulkActions = [
    {
      label: t('publish'),
      icon: 'fa-solid fa-check-circle',
      variant: 'green',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_publish_pages',
      handler: async (ids) => {
        router.patch(route('admin.static-pages.bulk.publish'), { ids }, {
          preserveState: true,
          preserveScroll: true,
        });
      }
    },
    {
      label: t('archive'),
      icon: 'fa-solid fa-archive',
      variant: 'yellow',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_archive_pages',
      handler: async (ids) => {
        router.patch(route('admin.static-pages.bulk.archive'), { ids }, {
          preserveState: true,
          preserveScroll: true,
        });
      }
    },
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash',
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_pages',
      handler: async (ids) => {
        router.delete(route('admin.static-pages.bulk.delete'), {
          data: { ids },
          preserveState: true,
          preserveScroll: true,
        });
      }
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', icon: 'fa-pen' },
      published: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: 'fa-check-circle' },
      archived: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: 'fa-archive' }
    };

    const config = statusConfig[status] || statusConfig.draft;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <i className={`fa-solid ${config.icon} mx-1`}></i>
        {t(status)}
      </span>
    );
  };

  const renderRow = (page) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {page.row_number}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-file-lines text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {page.title_value}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(page.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(page.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            href={route('admin.static-pages.edit', page.id)}
            variant="edit"
            icon="fa-edit"
            size="xs"
            as="a"
          >
            {t('edit')}
          </ActionButton>
          <ActionButton
            variant="delete"
            icon="fa-trash"
            size="xs"
            onClick={() => {
              if (confirm(t('confirm_delete_page'))) {
                router.delete(route('admin.static-pages.destroy', page.id));
              }
            }}
          >
            {t('delete')}
          </ActionButton>
        </div>
      </td>
    </>
  );

  return (
    <SelectableTable
      columns={columns}
      data={pages.data}
      renderRow={renderRow}
      pagination={pages}
      routeName="admin.static-pages.index"
      sortOptions={sortOptions}
      bulkActions={bulkActions}
      defaultSortField="updated_at"
      defaultSortDirection="desc"
      showSelection={true}
    />
  );
}
