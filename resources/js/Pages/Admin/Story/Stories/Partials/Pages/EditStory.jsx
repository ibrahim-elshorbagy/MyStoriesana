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

export default function EditStory({ story, categories = [] }) {
  const { t } = useTrans();

  // State for existing gallery images
  const [existingGalleryAr, setExistingGalleryAr] = useState(story.gallery_images_ar || []);
  const [existingGalleryEn, setExistingGalleryEn] = useState(story.gallery_images_en || []);
  const [existingGalleryDe, setExistingGalleryDe] = useState(story.gallery_images_de || []);

  // State for existing gallery videos
  const [existingVideosAr, setExistingVideosAr] = useState(story.gallery_videos_ar || []);
  const [existingVideosEn, setExistingVideosEn] = useState(story.gallery_videos_en || []);
  const [existingVideosDe, setExistingVideosDe] = useState(story.gallery_videos_de || []);

  const { data, setData, post, errors, processing } = useForm({
    title_ar: story.title?.ar || '',
    title_en: story.title?.en || '',
    title_de: story.title?.de || '',
    excerpt_ar: story.excerpt?.ar || '',
    excerpt_en: story.excerpt?.en || '',
    excerpt_de: story.excerpt?.de || '',
    content_ar: story.content?.ar || '',
    content_en: story.content?.en || '',
    content_de: story.content?.de || '',
    category_id: story.category_id || '',
    gender: story.gender?.toString() || '',
    status: story.status || 'draft',
    cover_image_ar: null,
    cover_image_en: null,
    cover_image_de: null,
    gallery_images_ar: [],
    gallery_images_en: [],
    gallery_images_de: [],
    existing_gallery_images_ar: story.gallery_images_ar || [],
    existing_gallery_images_en: story.gallery_images_en || [],
    existing_gallery_images_de: story.gallery_images_de || [],
    gallery_videos_ar: [],
    gallery_videos_en: [],
    gallery_videos_de: [],
    existing_gallery_videos_ar: story.gallery_videos_ar || [],
    existing_gallery_videos_en: story.gallery_videos_en || [],
    existing_gallery_videos_de: story.gallery_videos_de || [],
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
      automatic_uploads: false,
      images_dataimg_filter: function (img) {
        return img.hasAttribute('internal-blob');
      },
      images_upload_handler: function (blobInfo, success, failure) {
        const reader = new FileReader();
        reader.onload = function () {
          success(reader.result);
        };
        reader.onerror = function () {
          failure('Failed to convert image to base64');
        };
        reader.readAsDataURL(blobInfo.blob());
      },
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

  // Delete existing gallery image
  const deleteExistingGalleryImage = (imagePath, locale) => {
    if (locale === 'ar') {
      const updatedGallery = existingGalleryAr.filter(img => img !== imagePath);
      setExistingGalleryAr(updatedGallery);
      setData('existing_gallery_images_ar', updatedGallery);
    } else if (locale === 'en') {
      const updatedGallery = existingGalleryEn.filter(img => img !== imagePath);
      setExistingGalleryEn(updatedGallery);
      setData('existing_gallery_images_en', updatedGallery);
    } else if (locale === 'de') {
      const updatedGallery = existingGalleryDe.filter(img => img !== imagePath);
      setExistingGalleryDe(updatedGallery);
      setData('existing_gallery_images_de', updatedGallery);
    }
  };

  // Delete existing gallery video
  const deleteExistingGalleryVideo = (videoPath, locale) => {
    if (locale === 'ar') {
      const updatedVideos = existingVideosAr.filter(vid => vid !== videoPath);
      setExistingVideosAr(updatedVideos);
      setData('existing_gallery_videos_ar', updatedVideos);
    } else if (locale === 'en') {
      const updatedVideos = existingVideosEn.filter(vid => vid !== videoPath);
      setExistingVideosEn(updatedVideos);
      setData('existing_gallery_videos_en', updatedVideos);
    } else if (locale === 'de') {
      const updatedVideos = existingVideosDe.filter(vid => vid !== videoPath);
      setExistingVideosDe(updatedVideos);
      setData('existing_gallery_videos_de', updatedVideos);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract current content from editors
    const contentAr = editorArRef.current?.getContent() || data.content_ar || '';
    const contentEn = editorEnRef.current?.getContent() || data.content_en || '';

    // Build complete form data
    const contentDe = editorDeRef.current?.getContent() || data.content_de || '';

    const formData = {
      title_ar: data.title_ar,
      title_en: data.title_en,
      title_de: data.title_de,
      excerpt_ar: data.excerpt_ar,
      excerpt_en: data.excerpt_en,
      excerpt_de: data.excerpt_de,
      content_ar: contentAr,
      content_en: contentEn,
      content_de: contentDe,
      category_id: data.category_id,
      gender: data.gender,
      status: data.status,
      existing_gallery_images_ar: existingGalleryAr,
      existing_gallery_images_en: existingGalleryEn,
      existing_gallery_images_de: existingGalleryDe,
      existing_gallery_videos_ar: existingVideosAr,
      existing_gallery_videos_en: existingVideosEn,
      existing_gallery_videos_de: existingVideosDe,
      _method: 'PUT',
    };

    // Only include files if they were changed
    if (data.cover_image_ar) formData.cover_image_ar = data.cover_image_ar;
    if (data.cover_image_en) formData.cover_image_en = data.cover_image_en;
    if (data.cover_image_de) formData.cover_image_de = data.cover_image_de;
    if (data.gallery_images_ar?.length > 0) formData.gallery_images_ar = data.gallery_images_ar;
    if (data.gallery_images_en?.length > 0) formData.gallery_images_en = data.gallery_images_en;
    if (data.gallery_images_de?.length > 0) formData.gallery_images_de = data.gallery_images_de;
    if (data.gallery_videos_ar?.length > 0) formData.gallery_videos_ar = data.gallery_videos_ar;
    if (data.gallery_videos_en?.length > 0) formData.gallery_videos_en = data.gallery_videos_en;
    if (data.gallery_videos_de?.length > 0) formData.gallery_videos_de = data.gallery_videos_de;
    if (data.pdf_ar) formData.pdf_ar = data.pdf_ar;
    if (data.pdf_en) formData.pdf_en = data.pdf_en;
    if (data.pdf_de) formData.pdf_de = data.pdf_de;

    post(route('admin.stories.update', story.id), {
      data: formData,
      preserveScroll: true,
    });
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
      <Head title={`${t('edit_story')} - ${story.title_value}`} />
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
                  <i className="fa-solid fa-edit text-green-500 mx-2"></i>
                  {t('edit_story')} - {story.title_value}
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
                      className="mt-1 block w-full"
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
                      className="mt-1 block w-full"
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
                      keyValue={story.cover_image_ar ? { name: t('current_cover_image'), path: story.cover_image_ar } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.cover_image_ar && (
                            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <img
                                src={`/storage/${story.cover_image_ar}`}
                                alt={t('current_cover_image')}
                                className="w-20 h-20 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                              />
                            </div>
                          )}
                        </div>
                      }
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
                      keyValue={story.cover_image_en ? { name: t('current_cover_image'), path: story.cover_image_en } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.cover_image_en && (
                            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <img
                                src={`/storage/${story.cover_image_en}`}
                                alt={t('current_cover_image')}
                                className="w-20 h-20 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                              />
                            </div>
                          )}
                        </div>
                      }
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
                      keyValue={story.cover_image_de ? { name: t('current_cover_image'), path: story.cover_image_de } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.cover_image_de && (
                            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <img
                                src={`/storage/${story.cover_image_de}`}
                                alt={t('current_cover_image')}
                                className="w-20 h-20 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                              />
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingGalleryAr && existingGalleryAr.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-images me-1"></i>
                                {t('current_gallery_images')} ({existingGalleryAr.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingGalleryAr.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={`/storage/${image}`}
                                      alt={`Gallery ${index + 1}`}
                                      className="object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryImage(image, 'ar')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingGalleryEn && existingGalleryEn.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-images me-1"></i>
                                {t('current_gallery_images')} ({existingGalleryEn.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingGalleryEn.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={`/storage/${image}`}
                                      alt={`Gallery ${index + 1}`}
                                      className=" object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryImage(image, 'en')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingGalleryDe && existingGalleryDe.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-images me-1"></i>
                                {t('current_gallery_images')} ({existingGalleryDe.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingGalleryDe.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <img
                                      src={`/storage/${image}`}
                                      alt={`Gallery ${index + 1}`}
                                      className=" object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryImage(image, 'de')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingVideosAr && existingVideosAr.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-video me-1"></i>
                                {t('current_gallery_videos')} ({existingVideosAr.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingVideosAr.map((video, index) => (
                                  <div key={index} className="relative group">
                                    <video
                                      src={`/storage/${video}`}
                                      className="w-full h-24 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                      controls
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryVideo(video, 'ar')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingVideosEn && existingVideosEn.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-video me-1"></i>
                                {t('current_gallery_videos')} ({existingVideosEn.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingVideosEn.map((video, index) => (
                                  <div key={index} className="relative group">
                                    <video
                                      src={`/storage/${video}`}
                                      className="w-full h-24 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                      controls
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryVideo(video, 'en')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      helperText={
                        <div className="space-y-2">
                          {existingVideosDe && existingVideosDe.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                <i className="fa-solid fa-video me-1"></i>
                                {t('current_gallery_videos')} ({existingVideosDe.length})
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {existingVideosDe.map((video, index) => (
                                  <div key={index} className="relative group">
                                    <video
                                      src={`/storage/${video}`}
                                      className="w-full h-24 object-cover rounded-md border border-neutral-300 dark:border-neutral-600"
                                      controls
                                    />
                                    <button
                                      type="button"
                                      onClick={() => deleteExistingGalleryVideo(video, 'de')}
                                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      title={t('delete')}
                                    >
                                      <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
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
                      keyValue={story.pdf_ar ? { name: t('current_pdf'), path: story.pdf_ar } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.pdf_ar && (
                            <div className="flex items-center gap-2 space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <i className="fa-solid fa-file-pdf"></i>
                              <span>{t('current_pdf')}</span>
                              <a
                                href={`/storage/${story.pdf_ar}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                              >
                                {t('view_pdf')}
                              </a>
                            </div>
                          )}
                        </div>
                      }
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
                      keyValue={story.pdf_en ? { name: t('current_pdf'), path: story.pdf_en } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.pdf_en && (
                            <div className="flex items-center gap-2 space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <i className="fa-solid fa-file-pdf"></i>
                              <span>{t('current_pdf')}</span>
                              <a
                                href={`/storage/${story.pdf_en}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                              >
                                {t('view_pdf')}
                              </a>
                            </div>
                          )}
                        </div>
                      }
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
                      keyValue={story.pdf_de ? { name: t('current_pdf'), path: story.pdf_de } : null}
                      helperText={
                        <div className="space-y-1">
                          {story.pdf_de && (
                            <div className="flex items-center gap-2 space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <i className="fa-solid fa-file-pdf"></i>
                              <span>{t('current_pdf')}</span>
                              <a
                                href={`/storage/${story.pdf_de}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                              >
                                {t('view_pdf')}
                              </a>
                            </div>
                          )}
                        </div>
                      }
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
