import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import SelectableTable from '@/Components/SelectableTable';
import ActionButton from '@/Components/ActionButton';

export default function StoriesTable({ stories, categories }) {
  const { t } = useTrans();

  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'title', label: t('title'), icon: 'fa-heading' },
    { field: 'category', label: t('category'), icon: 'fa-layer-group' },
    { field: 'gender', label: t('gender'), icon: 'fa-venus-mars' },
    { field: 'status', label: t('status'), icon: 'fa-circle-check' },
    { field: 'updated_at', label: t('updated_at'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'status', label: t('status') },
    { field: 'updated_at', label: t('updated_at') },
    { field: 'title_value', label: t('title') }
  ];

  const bulkActions = [
    {
      label: t('publish'),
      icon: 'fa-solid fa-check-circle',
      variant: 'green',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_publish_stories',
      handler: async (ids) => {
        try {
          await router.post(route('admin.stories.bulk.publish'), { ids });
        } catch (error) {
          console.error('Error publishing stories:', error);
        }
      }
    },
    {
      label: t('archive'),
      icon: 'fa-solid fa-archive',
      variant: 'yellow',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_archive_stories',
      handler: async (ids) => {
        try {
          await router.post(route('admin.stories.bulk.archive'), { ids });
        } catch (error) {
          console.error('Error archiving stories:', error);
        }
      }
    },
    {
      label: t('delete'),
      icon: 'fa-solid fa-trash',
      variant: 'delete',
      requiresConfirmation: true,
      confirmMessageKey: 'confirm_delete_stories',
      handler: async (ids) => {
        try {
          await router.delete(route('admin.stories.bulk.delete'), { data: { ids } });
        } catch (error) {
          console.error('Error deleting stories:', error);
        }
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

  const getGenderBadge = (gender) => {
    if (gender === null) return '-';

    const genderConfig = {
      0: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: 'fa-mars', label: t('boy') },
      1: { color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300', icon: 'fa-venus', label: t('girl') }
    };

    const config = genderConfig[gender];

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <i className={`fa-solid ${config.icon} mx-1`}></i>
        {config.label}
      </span>
    );
  };

  const renderRow = (story) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
        {story.row_number}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-book-open text-blue-500"></i>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {story.title_value}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {story.category?.name_value || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getGenderBadge(story.gender)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(story.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(story.updated_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            href={route('admin.stories.edit', story.id)}
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
              if (confirm(t('confirm_delete_story'))) {
                router.delete(route('admin.stories.destroy', story.id));
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
      data={stories.data}
      renderRow={renderRow}
      pagination={stories}
      routeName="admin.stories.index"
      sortOptions={sortOptions}
      bulkActions={bulkActions}
      defaultSortField="updated_at"
      defaultSortDirection="desc"
      showSelection={true}
    />
  );
}
