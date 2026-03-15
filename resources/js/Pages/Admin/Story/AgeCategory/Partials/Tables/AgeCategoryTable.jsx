import ActionButton from '@/Components/ActionButton';
import SelectableTable from '@/Components/SelectableTable';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import { router } from '@inertiajs/react';

export default function AgeCategoryTable({ categories, onEdit }) {
  const { t } = useTrans();

  // Individual category actions
  const deleteCategory = (category) => {
    if (confirm(t('confirm_delete_age_category'))) {
      router.delete(route('admin.age-categories.destroy', category.id), {
        preserveScroll: true,
      });
    }
  };

  // Bulk action handlers
  const handleBulkDelete = async (ids) => {
    router.delete(route('admin.age-categories.bulk.delete'), {
      data: { ids },
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Define bulk actions for categories
  const bulkActions = [
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_age_categories'
    }
  ];

  // Table configuration
  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'image', label: t('image'), icon: 'fa-image' },
    { field: 'name', label: t('category_name'), icon: 'fa-folder' },
    { field: 'created_at', label: t('created_at'), icon: 'fa-calendar' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'name', label: t('category_name') },
    { field: 'created_at', label: t('created_at') },
    { field: 'updated_at', label: t('updated_at') }
  ];

  const renderRow = (category) => (
    <>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {category.row_number}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        {category.image ? (
          <img src={`/storage/${category.image}`} alt={category.name_value} className="h-12 w-12 object-cover rounded-lg border border-neutral-300 dark:border-neutral-600" />
        ) : (
          <div className="h-12 w-12 bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
            <i className="fa fa-image text-gray-500 text-lg"></i>
          </div>
        )}
      </td>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-folder text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {category.name_value || category.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(category.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(category.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(category);
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
              deleteCategory(category);
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
  const getRowClassName = (category, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    // Alternate between neutral backgrounds
    return index % 2 === 0
      ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800';
  };

  return (
    <SelectableTable
      columns={columns}
      data={categories ? categories.data : []}
      pagination={categories}
      routeName="admin.age-categories.index"
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
