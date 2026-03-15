import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { useTrans } from '@/Hooks/useTrans';
import SearchBar from '@/Components/SearchBar';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
import StoryCard from '@/Components/StoryCard';

export default function Stories({ stories, categories, queryParams }) {
  const { t } = useTrans();

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    let queryString = { ...queryParams };

    if (value) {
      queryString[key] = value;
    } else {
      delete queryString[key];
    }

    // Reset to page 1 when filtering
    queryString.page = 1;

    router.get(route('stories'), queryString, {
      preserveState: true,
      replace: true
    });
  };

  // Prepare category options
  const categoryOptions = [
    { value: '', label: t('all_categories') },
    ...categories.map(cat => ({
      value: cat.id,
      label: cat.name_value
    }))
  ];

  // Gender options
  const genderOptions = [
    { value: '', label: t('all_genders') },
    { value: '0', label: t('boy') },
    { value: '1', label: t('girl') }
  ];

  // Sort options
  const sortOptions = [
    { value: '', label: t('sort_by') },
    { value: 'name_asc', label: t('name_asc') },
    { value: 'name_desc', label: t('name_desc') }
  ];

  return (
    <SiteLayout>
      <Head>
        <title>{t('seo_stories_title')}</title>
        <meta name="description" content={t('seo_stories_description')} />
        <meta name="keywords" content={t('seo_stories_keywords')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('seo_stories_title')} />
        <meta property="og:description" content={t('seo_stories_description')} />
        <meta property="og:site_name" content={t('seo_site_name')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('seo_stories_title')} />
        <meta name="twitter:description" content={t('seo_stories_description')} />
      </Head>

      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl xl:text-6xl font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent mb-4 pb-4">
              {t('stories_title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('stories_description')}
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <SearchBar
                  placeholder={t('search') + '...'}
                  defaultValue={queryParams.search || ''}
                  queryKey="search"
                  routeName="stories"
                  icon="fa-magnifying-glass"
                />
              </div>

              {/* Gender Filter */}
              <SelectInput
                name="gender"
                value={queryParams.gender || ''}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                options={genderOptions}
                icon="fa-venus-mars"
              />

              {/* Category Filter */}
              <SelectInput
                name="category_id"
                value={queryParams.category_id || ''}
                onChange={(e) => handleFilterChange('category_id', e.target.value)}
                options={categoryOptions}
                icon="fa-tag"
              />
            </div>

            {/* Sort Row */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-neutral-600">
                {stories.total} {t('items')}
              </div>

              <div className="w-48">
                <SelectInput
                  name="sort"
                  value={queryParams.sort || ''}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  options={sortOptions}
                  icon="fa-sort"
                />
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          {stories.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-8">
                {stories.data.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination links={stories.links} />
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <i className="fa-regular fa-face-frown text-6xl text-neutral-400 mb-4"></i>
              <p className="text-xl text-neutral-600">{t('no_items_found')}</p>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
