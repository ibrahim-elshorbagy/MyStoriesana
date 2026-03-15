import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateModal from './Partials/Modals/CreateModal';
import EditModal from './Partials/Modals/EditModal';
import CustomerFeedbacksTable from './Partials/Tables/CustomerFeedbacksTable';
import { useTrans } from '@/Hooks/useTrans';

export default function CustomerFeedbacks({ auth, feedbacks, queryParams = null }) {
  queryParams = queryParams || {};
  const { t } = useTrans();

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);

  // Toggle Create Modal
  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  // Toggle Edit Modal
  const toggleEditModal = (feedback = null) => {
    setEditingFeedback(feedback);
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <AppLayout user={auth.user}>
      <Head title={t('customer_feedbacks_management')} />

      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-4 text-neutral-900 dark:text-neutral-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <i className="fa-solid fa-comments text-blue-500"></i> {t('customer_feedbacks')}
              </h2>
              <PrimaryButton
                type="button"
                onClick={toggleCreateModal}
                icon="fa-plus"
                size="large"
              >
                <span className="max-xs:hidden">{t('create_customer_feedback')}</span>
              </PrimaryButton>
            </div>

            <CustomerFeedbacksTable feedbacks={feedbacks} onEdit={toggleEditModal} />
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
        feedback={editingFeedback}
      />
    </AppLayout>
  );
}
