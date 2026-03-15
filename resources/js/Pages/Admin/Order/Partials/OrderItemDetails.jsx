import { Link } from "@inertiajs/react";

export default function OrderItemDetails({ item, t }) {
  const formatLabels = {
    first_plan: t('format_first_plan') || 'Digital PDF',
    second_plan: t('format_second_plan') || 'Softcover Book',
    third_plan: t('format_third_plan') || 'Hardcover Book',
  };

  const storyThemeLabels = {
    1: t('story_theme_1'),
    2: t('story_theme_2'),
    3: t('story_theme_3'),
    4: t('story_theme_4'),
    5: t('story_theme_5'),
    6: t('story_theme_6'),
    7: t('story_theme_7'),
    8: t('story_theme_8'),
    9: t('story_theme_9'),
    10: t('story_theme_10'),
  };

  const handleDownloadImage = async (imagePath, fileName) => {
    try {
      const response = await fetch(`/storage/${imagePath}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-lg flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <i className="fa-solid fa-child text-blue-500"></i>
        {t('child_information')}
      </h4>

      {/* Child Images Section */}
      {(item.child_image_path || item.face_swap_image_path) && (
        <div className="flex gap-4 justify-center items-center flex-wrap">
          {/* Original Child Image */}
          {item.child_image_path && (
            <div className="text-center">
              <img
                src={`/storage/${item.child_image_path}`}
                alt={item.child_name}
                className="w-128 h-128 rounded-xl object-cover border-4 border-blue-200 dark:border-blue-800 shadow-lg"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                {t('original_photo')}
              </span>
              <button
                onClick={() => handleDownloadImage(item.child_image_path, `${item.child_name}_original.jpg`)}
                className="mt-2 inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                <i className="fa fa-download mx-1"></i>
                {t('download_image')}
              </button>
            </div>
          )}

          {/* Face Swap Result */}
          {item.face_swap_image_path && (
            <div className="text-center">
              <img
                src={`/storage/${item.face_swap_image_path}`}
                alt={`${item.child_name} face swap`}
                className="w-128 h-128 rounded-xl object-cover border-4 border-purple-200 dark:border-purple-800 shadow-lg"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 block">
                {t('face_swap_result')}
              </span>
              <button
                onClick={() => handleDownloadImage(item.face_swap_image_path, `${item.child_name}_faceswap.jpg`)}
                className="mt-2 inline-flex items-center px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-md transition-colors duration-200 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                <i className="fa fa-download mx-1"></i>
                {t('download_image')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('child_name')}:</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.child_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('age')}:</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.child_age} {t('years')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('gender')}:</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{t(item.child_gender)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('language')}:</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{t(item.language)}</span>
        </div>
      </div>

      {/* Format & Pricing */}
      <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('format')}:</span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatLabels[item.format]}</span>
        </div>
        {item.story_theme && storyThemeLabels[item.story_theme] && (
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">{t('story_theme')}:</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">{storyThemeLabels[item.story_theme]}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-neutral-600 dark:text-neutral-400">{t('story_price')}:</span>
          <span className="font-semibold text-blue-600">${item.story_price}</span>
        </div>
      </div>

      {/* Learning Values */}
      {item.value && Array.isArray(item.value) && item.value.length > 0 && (
        <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3">
          <span className="font-semibold block mb-2 text-neutral-900 dark:text-neutral-100">{t('learning_values')}:</span>
          <div className="flex flex-wrap gap-2">
            {item.value.map((val, idx) => (
              <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded-full text-xs font-medium">
                {t('learning_value_' + val)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Story Info */}
      {item.story && (
        <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3">
          <span className="font-semibold block mb-2 text-neutral-900 dark:text-neutral-100">{t('story')}:</span>
          <div className="flex items-center gap-3">
            {item.story.cover_image_ar && (
              <img src={`/storage/${item.story.cover_image_ar}`} alt="" className="w-64 h-64 rounded-lg object-cover" />
            )}
            <span className="font-medium underline text-blue-900 dark:text-blue-600"><Link href={route('story.show', item.story.id)} target="_blank" rel="noopener noreferrer">{item.story.title_value}</Link></span>
          </div>
        </div>
      )}

      {/* Customization */}
      {(item.hair_color || item.eye_color || item.skin_tone || item.custom_value) && (
        <div className="border-t border-neutral-200 dark:border-neutral-600 pt-3">
          <span className="font-semibold block mb-2 text-neutral-900 dark:text-neutral-100">{t('customization')}:</span>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {item.hair_color && <div><span className="text-neutral-600 dark:text-neutral-400">{t('hair_color')}:</span> <span className="text-neutral-900 dark:text-neutral-100">{item.hair_color}</span></div>}
            {item.eye_color && <div><span className="text-neutral-600 dark:text-neutral-400">{t('eye_color')}:</span> <span className="text-neutral-900 dark:text-neutral-100">{item.eye_color}</span></div>}
            {item.skin_tone && <div><span className="text-neutral-600 dark:text-neutral-400">{t('skin_tone')}:</span> <span className="text-neutral-900 dark:text-neutral-100">{item.skin_tone}</span></div>}
            {item.custom_value && <div className="col-span-2"><span className="text-neutral-600 dark:text-neutral-400">{t('custom_value')}:</span> <span className="text-neutral-900 dark:text-neutral-100">{item.custom_value}</span></div>}
          </div>
        </div>
      )}
    </div>
  );
}
