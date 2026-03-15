import ActionButton from '@/Components/ActionButton';
import SelectableTable from '@/Components/SelectableTable';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import { router } from '@inertiajs/react';

export default function DeliveryOptionsTable({ deliveryOptions, onEdit }) {
  const { t } = useTrans();

  // Individual category actions
  const deleteOption = (option) => {
    if (confirm(t('confirm_delete_delivery_option'))) {
      router.delete(route('admin.delivery-options.destroy', option.id), {
        preserveScroll: true,
      });
    }
  };

  // Bulk action handlers
  const handleBulkDelete = async (ids) => {
    router.delete(route('admin.delivery-options.bulk.delete'), {
      data: { ids },
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Define bulk actions for delivery options
  const bulkActions = [
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_delivery_options'
    }
  ];

  // Table configuration
  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'city', label: t('delivery_option_city'), icon: 'fa-city' },
    { field: 'price', label: t('delivery_option_price'), icon: 'fa-coins' },
    { field: 'created_at', label: t('created_at'), icon: 'fa-calendar' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'city', label: t('delivery_option_city') },
    { field: 'price', label: t('delivery_option_price') },
    { field: 'created_at', label: t('created_at') },
    { field: 'updated_at', label: t('updated_at') }
  ];

  const renderRow = (option) => (
    <>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {option.row_number}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-city text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {option.city_value || option.city}
          </span>
        </div>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {option.price} EUR
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(option.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(option.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(option);
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
              deleteOption(option);
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
  const getRowClassName = (option, index, isSelected) => {
    if (isSelected) return '';

    // Alternate between neutral backgrounds
    return index % 2 === 0
      ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800';
  };

  return (
    <SelectableTable
      columns={columns}
      data={deliveryOptions ? deliveryOptions.data : []}
      pagination={deliveryOptions}
      routeName="admin.delivery-options.index"
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
