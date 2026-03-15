import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function Dashboard() {
  const { t } = useTrans();
  const user = usePage().props.auth.user;

  return (
    <AppLayout>
      <Head title={t('dashboard')} />

      <div className="py-8  min-h-screen">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {t('hello_user', { name: user.name })} 👋
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
