import ActionButton from '@/Components/ActionButton';
import SelectableTable from '@/Components/SelectableTable';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import { router } from '@inertiajs/react';

export default function CustomerFeedbacksTable({ feedbacks, onEdit }) {
  const { t } = useTrans();

  // Individual feedback actions
  const deleteFeedback = (feedback) => {
    if (confirm(t('confirm_delete_customer_feedback'))) {
      router.delete(route('admin.customer-feedbacks.destroy', feedback.id), {
        preserveScroll: true,
      });
    }
  };

  // Bulk action handlers
  const handleBulkDelete = async (ids) => {
    router.delete(route('admin.customer-feedbacks.bulk.delete'), {
      data: { ids },
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Define bulk actions for feedbacks
  const bulkActions = [
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash-can',
      handler: handleBulkDelete,
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_customer_feedbacks'
    }
  ];

  // Table configuration
  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'customer_feedback', label: t('customer_feedback'), icon: 'fa-comment' },
    { field: 'media', label: t('media'), icon: 'fa-image' },
    { field: 'created_at', label: t('created_at'), icon: 'fa-calendar' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'created_at', label: t('created_at') },
    { field: 'updated_at', label: t('updated_at') }
  ];

  const renderRow = (feedback) => (
    <>
      <td className="px-3 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {feedback.row_number}
      </td>
      <td className="px-3 py-4 max-w-96">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-comment text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {feedback.customer_feedback || t('no_feedback_text')}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {feedback.image ? (
          <div className="flex flex-col items-center gap-1">
            <img
              src={`/storage/${feedback.image}`}
              alt="Feedback"
              className="w-16 h-16 object-cover rounded"
            />
            <span className="text-xs text-gray-500">{t('image')}</span>
          </div>
        ) : feedback.video ? (
          <div className="flex flex-col items-center gap-1">
            <video
              src={`/storage/${feedback.video}`}
              className="w-16 h-16 object-cover rounded"
              muted
            />
            <span className="text-xs text-gray-500">{t('video')}</span>
          </div>
        ) : (
          <span>{t('no_media')}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(feedback.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(feedback.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit(feedback);
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
              deleteFeedback(feedback);
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
  const getRowClassName = (feedback, index, isSelected) => {
    if (isSelected) return ''; // Let SelectableTable handle selected state

    // Alternate between neutral backgrounds
    return index % 2 === 0
      ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800';
  };

  return (
    <SelectableTable
      columns={columns}
      data={feedbacks ? feedbacks.data : []}
      pagination={feedbacks}
      routeName="admin.customer-feedbacks.index"
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
