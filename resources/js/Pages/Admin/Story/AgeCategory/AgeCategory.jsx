import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SearchBar from '@/Components/SearchBar';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateModal from './Partials/Modals/CreateModal';
import EditModal from './Partials/Modals/EditModal';
import AgeCategoryTable from './Partials/Tables/AgeCategoryTable';
import { useTrans } from '@/Hooks/useTrans';

export default function AgeCategory({ auth, categories, queryParams = null }) {
  queryParams = queryParams || {};
  const { t } = useTrans();

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Toggle Create Modal
  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  // Toggle Edit Modal
  const toggleEditModal = (category = null) => {
    setEditingCategory(category);
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <AppLayout user={auth.user}>
      <Head title={t('age_categories_management')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-4 text-neutral-900 dark:text-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <i className="fa-solid fa-folder text-blue-500"></i> {t('age_categories')}
              </h2>
              <PrimaryButton
                type="button"
                onClick={toggleCreateModal}
                icon="fa-plus"
                size="large"
              >
                <span className="max-xs:hidden">{t('create_category')}</span>
              </PrimaryButton>
            </div>

            <div className="mb-4">
              <SearchBar
                placeholder={t('search_age_categories')}
                defaultValue={queryParams.name || ''}
                queryKey="name"
                routeName="admin.age-categories.index"
                icon="fa-magnifying-glass"
              />
            </div>

            <AgeCategoryTable categories={categories} onEdit={toggleEditModal} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => toggleEditModal()}
        category={editingCategory}
      />
    </AppLayout>
  );
}
