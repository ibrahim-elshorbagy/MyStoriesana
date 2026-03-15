import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function EditStaticPage({ page, categories = [] }) {
  const { t } = useTrans();
  const { data, setData, put, errors, processing } = useForm({
    title_ar: page.title?.ar || '',
    title_en: page.title?.en || '',
    title_de: page.title?.de || '',
    content_ar: page.content?.ar || '',
    content_en: page.content?.en || '',
    content_de: page.content?.de || '',
    category_id: page.category_id || '',
    status: page.status || 'draft',
  });

  const editorArRef = useRef(null);
  const editorEnRef = useRef(null);
  const editorDeRef = useRef(null);

  useEffect(() => {
    // Load TinyMCE
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js';
    script.async = true;
    script.onload = () => initializeTinyMCE();
    document.body.appendChild(script);

    return () => {
      if (window.tinymce) {
        window.tinymce.remove();
      }
    };
  }, []);

  const initializeTinyMCE = () => {
    if (!window.tinymce) return;

    const commonConfig = {
      height: 600,
      menubar: true,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'directionality'
      ],
      toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image media table | removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      // Image handling - convert to base64 blobs
      automatic_uploads: false,
      images_dataimg_filter: function(img) {
        return img.hasAttribute('internal-blob');
      },
      images_upload_handler: function(blobInfo, success, failure) {
        // Convert blob to base64
        const reader = new FileReader();
        reader.onload = function() {
          success(reader.result);
        };
        reader.onerror = function() {
          failure('Failed to convert image to base64');
        };
        reader.readAsDataURL(blobInfo.blob());
      },
      // Allow paste of images
      paste_data_images: true,
    };

    // Arabic editor
    window.tinymce.init({
      ...commonConfig,
      selector: '#content_ar',
      directionality: 'rtl',
      setup: (editor) => {
        editorArRef.current = editor;
        editor.on('init', () => {
          editor.setContent(data.content_ar);
        });
        editor.on('change', () => {
          setData('content_ar', editor.getContent());
        });
      }
    });

    // English editor
    window.tinymce.init({
      ...commonConfig,
      selector: '#content_en',
      directionality: 'ltr',
      setup: (editor) => {
        editorEnRef.current = editor;
        editor.on('init', () => {
          editor.setContent(data.content_en);
        });
        editor.on('change', () => {
          setData('content_en', editor.getContent());
        });
      }
    });

    // German editor
    window.tinymce.init({
      ...commonConfig,
      selector: '#content_de',
      directionality: 'ltr',
      setup: (editor) => {
        editorDeRef.current = editor;
        editor.on('init', () => {
          editor.setContent(data.content_de);
        });
        editor.on('change', () => {
          setData('content_de', editor.getContent());
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update content from editors before submit
    if (editorArRef.current) {
      setData('content_ar', editorArRef.current.getContent());
    }
    if (editorEnRef.current) {
      setData('content_en', editorEnRef.current.getContent());
    }
    if (editorDeRef.current) {
      setData('content_de', editorDeRef.current.getContent());
    }

    put(route('admin.static-pages.update', page.id), { preserveScroll: true });
  };

  const statusOptions = [
    { value: 'draft', label: t('draft') },
    { value: 'published', label: t('published') },
    { value: 'archived', label: t('archived') }
  ];

  return (
    <AppLayout>
      <Head title={`${t('edit_page')} - ${page.title_value}`} />
      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-6 text-neutral-900 dark:text-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link
                  href={route('admin.static-pages.index')}
                  className="flex items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  <i className="fa-solid fa-arrow-left rtl:rotate-180 mx-2"></i>
                  {t('static_pages')}
                </Link>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <h1 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                  <i className="fa-solid fa-edit text-green-500 mx-2"></i>
                  {t('edit_page')} - {page.title_value}
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Arabic Title */}
                <div>
                  <InputLabel htmlFor="title_ar" value={t('title_ar')} required />
                  <TextInput
                    id="title_ar"
                    type="text"
                    name="title_ar"
                    value={data.title_ar}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title_ar', e.target.value)}
                    required
                  />
                  <InputError message={errors.title_ar} className="mt-2" />
                </div>

                {/* English Title */}
                <div>
                  <InputLabel htmlFor="title_en" value={t('title_en')} required />
                  <TextInput
                    id="title_en"
                    type="text"
                    name="title_en"
                    value={data.title_en}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title_en', e.target.value)}
                    required
                  />
                  <InputError message={errors.title_en} className="mt-2" />
                </div>

                {/* German Title */}
                <div>
                  <InputLabel htmlFor="title_de" value={t('title_de')} required />
                  <TextInput
                    id="title_de"
                    type="text"
                    name="title_de"
                    value={data.title_de}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title_de', e.target.value)}
                    required
                  />
                  <InputError message={errors.title_de} className="mt-2" />
                </div>

                {/* Category */}
                <div>
                  <SelectInput
                    name="category_id"
                    label={t('category')}
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    options={[
                      { value: '', label: t('select_category') },
                      ...categories.map(category => ({
                        value: category.id,
                        label: category.name_value || category.name,
                      })),
                    ]}
                    icon="fa-folder"
                    required
                  />
                  <InputError message={errors.category_id} className="mt-2" />
                </div>

                {/* Status */}
                <div>
                  <SelectInput
                    name="status"
                    label={t('status')}
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    options={statusOptions}
                    icon="fa-circle-check"
                    required
                  />
                  <InputError message={errors.status} className="mt-2" />
                </div>
              </div>

              {/* Content Editors */}
              <div className="space-y-6">
                {/* Arabic Content */}
                <div>
                  <InputLabel htmlFor="content_ar" value={t('content_ar')} required />
                  <div className='no-tailwindcss-support-display'>
                    <textarea
                      id="content_ar"
                      name="content_ar"
                      className="mt-1 block w-full"
                    ></textarea>
                  </div>
                  <InputError message={errors.content_ar} className="mt-2" />
                </div>

                {/* English Content */}
                <div>
                  <InputLabel htmlFor="content_en" value={t('content_en')} required />
                  <div className='no-tailwindcss-support-display'>
                    <textarea
                      id="content_en"
                      name="content_en"
                      className="mt-1 block w-full"
                    ></textarea>
                  </div>
                  <InputError message={errors.content_en} className="mt-2" />
                </div>

                {/* German Content */}
                <div>
                  <InputLabel htmlFor="content_de" value={t('content_de')} required />
                  <div className='no-tailwindcss-support-display'>
                    <textarea
                      id="content_de"
                      name="content_de"
                      className="mt-1 block w-full"
                    ></textarea>
                  </div>
                  <InputError message={errors.content_de} className="mt-2" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <SecondaryButton icon={'fa-times'} as={Link} href={route('admin.static-pages.index')}>
                  {t('cancel')}
                </SecondaryButton>
                <PrimaryButton icon={"fa-save"} type="submit" disabled={processing}>
                  {processing ? t('updating') : t('save_changes')}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
