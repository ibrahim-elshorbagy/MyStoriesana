import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';
import SwitchToggle from '@/Components/SwitchToggle';

export default function FaqsTable({ faqs }) {
  const { t } = useTrans();

  const handleBulkDelete = async (ids) => {
    router.delete(route('admin.faq.bulk.delete'), {
      data: { ids },
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleBulkShowInHome = async (ids) => {
    router.post(route('admin.faq.bulk.toggle.show-in-home'), {
      ids, show_in_home: true
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleBulkHideFromHome = async (ids) => {
    router.post(route('admin.faq.bulk.toggle.show-in-home'), {
      ids, show_in_home: false
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'question', label: t('question'), icon: 'fa-question-circle' },
    { field: 'answer', label: t('answer'), icon: 'fa-comment' },
    { field: 'category', label: t('category'), icon: 'fa-folder' },
    { field: 'show_in_home', label: t('show_in_home'), icon: 'fa-home' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'updated_at', label: t('updated_at') }
  ];

  const bulkActions = [
    {
      label: t('show_in_home'),
      icon: 'fa-solid fa-eye',
      handler: handleBulkShowInHome,
      variant: 'success',
      requiresConfirmation: false,
    },
    {
      label: t('hide_from_home'),
      icon: 'fa-solid fa-eye-slash',
      handler: handleBulkHideFromHome,
      variant: 'warning',
      requiresConfirmation: false,
    },
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_faqs'
    }
  ];

  const renderRow = (faq) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {faq.row_number}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-question-circle text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {faq.question_value}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-comment text-green-500"></i>
          <span className="text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {faq.answer_value}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-folder text-purple-500"></i>
          <span className="text-sm text-neutral-900 dark:text-neutral-100">
            {faq.category ? faq.category.name_value : '-'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <SwitchToggle
            name={`show_in_home_${faq.id}`}
            value={faq.show_in_home}
            onChange={(e) => {
              router.patch(route('admin.faq.toggle.show-in-home', faq.id), {}, {
                preserveScroll: true,
                preserveState: true,
              });
            }}
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(faq.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              router.visit(route('admin.faq.edit', faq.id));
            }}
            variant="info"
            icon="fa-edit"
            size="xs"
            as="button"
          >
            {t('edit')}
          </ActionButton>

          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(t('confirm_delete_faq'))) {
                router.delete(route('admin.faq.destroy', faq.id), {
                  preserveScroll: true,
                });
              }
            }}
            variant="delete"
            icon="fa-trash-can"
            size="xs"
            as="button"
          >
            {t('delete')}
          </ActionButton>
        </div>
      </td>
    </>
  );

  // Row styling function
  const getRowClassName = (faq, index, isSelected) => {
    if (isSelected) return '';

    return index % 2 === 0
      ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800';
  };

  return (
    <SelectableTable
      columns={columns}
      data={faqs ? faqs.data : []}
      pagination={faqs}
      routeName="admin.faq.index"
      queryParams={{}}
      sortOptions={sortOptions}
      defaultSortField={'updated_at'}
      defaultSortDirection={'desc'}
      renderRow={renderRow}
      getRowClassName={getRowClassName}
      bulkActions={bulkActions}
    />
  );
}
