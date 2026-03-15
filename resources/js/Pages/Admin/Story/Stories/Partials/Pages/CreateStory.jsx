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
import DragFileInput from '@/Components/DragFileInput';
import TextArea from '@/Components/TextArea';

export default function CreateStory({ categories = [] }) {
  const { t } = useTrans();
  const { data, setData, post, errors, processing } = useForm({
    title_ar: '',
    title_en: '',
    title_de: '',
    excerpt_ar: '',
    excerpt_en: '',
    excerpt_de: '',
    content_ar: '',
    content_en: '',
    content_de: '',
    category_id: '',
    gender: '',
    status: 'draft',
    cover_image_ar: null,
    cover_image_en: null,
    cover_image_de: null,
    gallery_images_ar: [],
    gallery_images_en: [],
    gallery_images_de: [],
    gallery_videos_ar: [],
    gallery_videos_en: [],
    gallery_videos_de: [],
    pdf_ar: null,
    pdf_en: null,
    pdf_de: null,
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
      images_dataimg_filter: function (img) {
        return img.hasAttribute('internal-blob');
      },
      images_upload_handler: function (blobInfo, success, failure) {
        // Convert blob to base64
        const reader = new FileReader();
        reader.onload = function () {
          success(reader.result);
        };
        reader.onerror = function () {
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

    post(route('admin.stories.store'));
  };

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name_value
  }));

  const genderOptions = [
    { value: '', label: t('select_gender') },
    { value: '0', label: t('boy') },
    { value: '1', label: t('girl') }
  ];

  const statusOptions = [
    { value: 'draft', label: t('draft') },
    { value: 'published', label: t('published') },
    { value: 'archived', label: t('archived') }
  ];

  return (
    <AppLayout>
      <Head title={t('create_story')} />
      <div className="m-3 xl:m-5">
        <div className="overflow-hidden rounded-2xl shadow-lg dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <div className="p-6 text-neutral-900 dark:text-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link
                  href={route('admin.stories.index')}
                  className="flex items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  <i className="fa-solid fa-arrow-left rtl:rotate-180 mx-2"></i>
                  {t('stories')}
                </Link>
                <span className="text-neutral-400 dark:text-neutral-600">/</span>
                <h1 className="text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100">
                  <i className="fa-solid fa-plus text-green-500 mx-2"></i>
                  {t('create_story')}
                </h1>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Arabic Title */}
                <div>
                  <InputLabel htmlFor="title_ar" value={t('story_title_ar')} required />
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
                  <InputLabel htmlFor="title_en" value={t('story_title_en')} required />
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
                  <InputLabel htmlFor="title_de" value={t('story_title_de')} required />
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
                      ...categoryOptions
                    ]}
                    icon="fa-layer-group"
                    required
                  />
                  <InputError message={errors.category_id} className="mt-2" />
                </div>

                {/* Gender */}
                <div>
                  <SelectInput
                    name="gender"
                    label={t('gender')}
                    value={data.gender}
                    onChange={(e) => setData('gender', e.target.value)}
                    options={genderOptions}
                    icon="fa-venus-mars"
                  />
                  <InputError message={errors.gender} className="mt-2" />
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
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

              {/* Excerpt Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Arabic Excerpt */}
                <div>
                  <InputLabel htmlFor="excerpt_ar" value={t('story_excerpt_ar')} required />
                  <TextArea
                    name="excerpt_ar"
                    label={t('story_excerpt_ar')}
                    value={data.excerpt_ar}
                    onChange={(e) => setData('excerpt_ar', e.target.value)}
                    rows={3}
                  />
                  <InputError message={errors.excerpt_ar} className="mt-2" />
                </div>

                {/* English Excerpt */}
                <div>
                  <InputLabel htmlFor="excerpt_en" value={t('story_excerpt_en')} required />
                  <TextArea
                    name="excerpt_en"
                    label={t('story_excerpt_en')}
                    value={data.excerpt_en}
                    onChange={(e) => setData('excerpt_en', e.target.value)}
                    rows={3}
                  />
                  <InputError message={errors.excerpt_en} className="mt-2" />
                </div>
                {/* German Excerpt */}
                <div>
                  <InputLabel htmlFor="excerpt_de" value={t('story_excerpt_de')} required />
                  <TextArea
                    name="excerpt_de"
                    label={t('story_excerpt_de')}
                    value={data.excerpt_de}
                    onChange={(e) => setData('excerpt_de', e.target.value)}
                    rows={3}
                  />
                  <InputError message={errors.excerpt_de} className="mt-2" />
                </div>
              </div>

              {/* Content Editors */}
              <div className="space-y-6">
                {/* Arabic Content */}
                <div>
                  <InputLabel htmlFor="content_ar" value={t('story_content_ar')} required />
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
                  <InputLabel htmlFor="content_en" value={t('story_content_en')} required />
                  <div className='no-tailwindcss-support-display'>
                    <textarea
                      id="content_en"
                      name="content_en"
                      className="mt-1 block w-full "
                    ></textarea>
                  </div>
                  <InputError message={errors.content_en} className="mt-2" />
                </div>

                {/* German Content */}
                <div>
                  <InputLabel htmlFor="content_de" value={t('story_content_de')} required />
                  <div className='no-tailwindcss-support-display'>
                    <textarea
                      id="content_de"
                      name="content_de"
                      className="mt-1 block w-full "
                    ></textarea>
                  </div>
                  <InputError message={errors.content_de} className="mt-2" />
                </div>
              </div>

              {/* File Uploads Section */}
              <div className="space-y-6 p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                  <i className="fa-solid fa-file-arrow-up text-blue-500 me-2"></i>
                  {t('files')}
                </h3>

                {/* Cover Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Arabic Cover Image */}
                  <div>
                    <DragFileInput
                      id="cover_image_ar"
                      label={t('cover_image_ar')}
                      accept="image/*"
                      onChange={(file) => setData('cover_image_ar', file)}
                      error={errors.cover_image_ar}
                      value={data.cover_image_ar}
                    />
                  </div>

                  {/* English Cover Image */}
                  <div>
                    <DragFileInput
                      id="cover_image_en"
                      label={t('cover_image_en')}
                      accept="image/*"
                      onChange={(file) => setData('cover_image_en', file)}
                      error={errors.cover_image_en}
                      value={data.cover_image_en}
                    />
                  </div>

                  {/* German Cover Image */}
                  <div>
                    <DragFileInput
                      id="cover_image_de"
                      label={t('cover_image_de')}
                      accept="image/*"
                      onChange={(file) => setData('cover_image_de', file)}
                      error={errors.cover_image_de}
                      value={data.cover_image_de}
                    />
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Arabic Gallery Images */}
                  <div>
                    <DragFileInput
                      id="gallery_images_ar"
                      label={t('gallery_images_ar')}
                      accept="image/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_images_ar', files)}
                      error={errors.gallery_images_ar}
                      value={data.gallery_images_ar}
                    />
                  </div>

                  {/* English Gallery Images */}
                  <div>
                    <DragFileInput
                      id="gallery_images_en"
                      label={t('gallery_images_en')}
                      accept="image/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_images_en', files)}
                      error={errors.gallery_images_en}
                      value={data.gallery_images_en}
                    />
                  </div>
                  {/* German Gallery Images */}
                  <div>
                    <DragFileInput
                      id="gallery_images_de"
                      label={t('gallery_images_de')}
                      accept="image/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_images_de', files)}
                      error={errors.gallery_images_de}
                      value={data.gallery_images_de}
                    />
                  </div>
                </div>

                {/* Gallery Videos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Arabic Gallery Videos */}
                  <div>
                    <DragFileInput
                      id="gallery_videos_ar"
                      label={t('gallery_videos_ar')}
                      accept="video/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_videos_ar', files)}
                      error={errors.gallery_videos_ar}
                      value={data.gallery_videos_ar}
                    />
                  </div>

                  {/* English Gallery Videos */}
                  <div>
                    <DragFileInput
                      id="gallery_videos_en"
                      label={t('gallery_videos_en')}
                      accept="video/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_videos_en', files)}
                      error={errors.gallery_videos_en}
                      value={data.gallery_videos_en}
                    />
                  </div>

                  {/* German Gallery Videos */}
                  <div>
                    <DragFileInput
                      id="gallery_videos_de"
                      label={t('gallery_videos_de')}
                      accept="video/*"
                      multiple={true}
                      showMaxFiles={false}
                      onChange={(files) => setData('gallery_videos_de', files)}
                      error={errors.gallery_videos_de}
                      value={data.gallery_videos_de}
                    />
                  </div>
                </div>

                {/* PDF Files */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Arabic PDF */}
                  <div>
                    <DragFileInput
                      id="pdf_ar"
                      label={t('pdf_ar')}
                      accept=".pdf"
                      onChange={(file) => setData('pdf_ar', file)}
                      error={errors.pdf_ar}
                      value={data.pdf_ar}
                    />
                  </div>

                  {/* English PDF */}
                  <div>
                    <DragFileInput
                      id="pdf_en"
                      label={t('pdf_en')}
                      accept=".pdf"
                      onChange={(file) => setData('pdf_en', file)}
                      error={errors.pdf_en}
                      value={data.pdf_en}
                    />
                  </div>
                  {/* German PDF */}
                  <div>
                    <DragFileInput
                      id="pdf_de"
                      label={t('pdf_de')}
                      accept=".pdf"
                      onChange={(file) => setData('pdf_de', file)}
                      error={errors.pdf_de}
                      value={data.pdf_de}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <SecondaryButton icon={'fa-times'} as={Link} href={route('admin.stories.index')}>
                  {t('cancel')}
                </SecondaryButton>
                <PrimaryButton icon={"fa-save"} type="submit" disabled={processing}>
                  {processing ? t('creating') : t('create_story')}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
