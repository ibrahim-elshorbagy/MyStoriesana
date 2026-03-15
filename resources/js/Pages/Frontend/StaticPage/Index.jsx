import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';

export default function Index({ page }) {
  const { t } = useTrans();

  return (
    <SiteLayout>
      <Head>
        <title>{`${page.title_value} | ${t('seo_site_name')}`}</title>
        <meta name="description" content={page.title_value} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={page.title_value} />
        <meta property="og:site_name" content={t('seo_site_name')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.title_value} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                {page.title_value}
              </h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Page Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none text-neutral-700 leading-relaxed no-tailwindcss-support-displa"
                dangerouslySetInnerHTML={{ __html: page.content_value }}
              />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
