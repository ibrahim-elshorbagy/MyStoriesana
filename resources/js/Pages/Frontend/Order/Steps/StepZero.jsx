import React, { useState } from 'react';
import InputError from '@/Components/InputError';

export default function StepZero({
  story,
  data,
  setData,
  errors,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  onNext,
  t
}) {
  const [imageError, setImageError] = useState(null);

  const getCoverImage = () => {
    if (!story) return null;
    return data.language === 'arabic' ? story.cover_image_ar : story.cover_image_en;
  };

  const coverImagePath = getCoverImage();
  const coverImageUrl = coverImagePath ? `/storage/${coverImagePath}` : null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type)) {
        setImageError(t('invalid_image_format') || 'Invalid format. Only JPG, PNG, GIF and WEBP allowed.');
        return;
      }

      if (file.size > 5120 * 1024) {
        setImageError(t('validation_max_file') || 'Image too large. Maximum 5MB.');
        return;
      }

      setImageFile(file);
      setData('child_image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError(null);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 py-4">
        {t('customize_story_cover')}
      </h2>

      <div className='flex justify-center items-center mb-6'>
        <div className='w-96'>
          <img className="object-contain w-full h-full" src="/assets/createOrder/conditions.png" alt="" />
        </div>
      </div>

      {/* Notice about story name change */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-center">
          <i className="fa-solid fa-info-circle text-blue-500 text-xl mt-0.5 mx-2"></i>
          <p className="text-sm text-blue-800 font-medium">
            {t('story_name_will_change')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upload Child Image (optional) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('child_image')}
          </label>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Child preview"
                  className="max-w-full h-48 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                    setData('child_image', null);
                    setImageError(null);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {t('remove')}
                </button>
              </div>
            ) : (
              <div>
                <div className="text-neutral-500 mb-4">
                  <i className="fa-solid fa-cloud-arrow-up text-4xl"></i>
                </div>
                <p className="text-neutral-600 mb-2">{t('upload_child_image')}</p>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  id="child_image_step_zero"
                />
                <label
                  htmlFor="child_image_step_zero"
                  className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors"
                >
                  <i className="fa-solid fa-plus mx-2"></i>
                  {t('choose_file')}
                </label>
              </div>
            )}
          </div>
          <InputError message={errors.child_image} className="mt-2" />
          <InputError message={imageError} className="mt-2" />
        </div>

        {/* Original Story Cover */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {t('story_cover')}
          </label>
          <div className="border-2 border-neutral-300 rounded-lg p-4">
            {coverImageUrl ? (
              <img
                src={coverImageUrl}
                alt={story?.title_value || 'Story cover'}
                className="max-w-full h-64 object-cover rounded-lg mx-auto"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-neutral-400">
                <div className="text-center">
                  <i className="fa-solid fa-image text-6xl mb-2"></i>
                  <p>{t('no_cover_available')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-10 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="flex items-center gap-3 rtl:flex-row-reverse">
            {t('confirm_and_continue')}
            <i className="fa-solid fa-arrow-right rtl:fa-arrow-left"></i>
          </span>
        </button>
      </div>
    </div>
  );
}

