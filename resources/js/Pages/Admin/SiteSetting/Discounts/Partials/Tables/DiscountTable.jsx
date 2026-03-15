import ActionButton from '@/Components/ActionButton';
import SelectableTable from '@/Components/SelectableTable';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import { router } from '@inertiajs/react';

export default function DiscountTable({ discounts, onEdit }) {
  const { t } = useTrans();

  // Individual discount actions
  const deleteDiscount = (discount) => {
    if (confirm(t('confirm_delete_discount'))) {
      router.delete(route('admin.discounts.destroy', discount.id), {
        preserveScroll: true,
      });
    }
  };

  // Bulk action handlers
  const handleBulkDelete = async (ids) => {
    router.delete(route('admin.discounts.bulk.delete'), {
      data: { ids },
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Define bulk actions for discounts
  const bulkActions = [
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_discounts'
    }
  ];

  // Table configuration
  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'code', label: t('discount_code'), icon: 'fa-ticket' },
    { field: 'percent', label: t('discount_percent'), icon: 'fa-percent' },
    { field: 'usage_limit', label: t('usage_limit'), icon: 'fa-hashtag' },
    { field: 'created_at', label: t('created_at'), icon: 'fa-calendar' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'code', label: t('discount_code') },
    { field: 'percent', label: t('discount_percent') },
    { field: 'usage_limit', label: t('usage_limit') },
    { field: 'created_at', label: t('created_at') },
    { field: 'updated_at', label: t('updated_at') }
  ];

  const renderRow = (discount) => (
    <>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {discount.row_number}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-ticket text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {discount.code}
          </span>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-percent text-orange-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {discount.percent}%
          </span>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-hashtag text-green-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {discount.usage_limit}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(discount.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(discount.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(discount);
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
              deleteDiscount(discount);
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
  const getRowClassName = (discount, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    // Alternate between neutral backgrounds
    return index % 2 === 0
      ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800';
  };

  return (
    <SelectableTable
      columns={columns}
      data={discounts ? discounts.data : []}
      pagination={discounts}
      routeName="admin.discounts.index"
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
