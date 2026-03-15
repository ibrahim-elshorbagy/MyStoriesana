import React from 'react';
import { Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function StoryCard({ story }) {
  const { t } = useTrans();

  return (
    <div className="flex flex-col border-2 border-orange-300 bg-white overflow-hidden shadow-sm hover:shadow-xl duration-300 rounded-xl max-w-[350px] w-full h-full group">
      {/* Cover Image */}
      <Link href={route('story.show', story.id)} >
        <div className="flex !min-w-full min-h-fit overflow-hidden relative aspect-[193/260]">
          <img
            src={story.cover_image_value || 'https://placehold.co/595x420.png'}
            alt={story.title_value}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />

          {/* Gender Badge */}
          {story.gender !== null && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {story.gender_text}
            </div>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col gap-2 p-4 !h-full">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-800 line-clamp-2">
          {story.title_value}
        </h3>

        <p className="text-sm sm:text-base text-neutral-600 line-clamp-3 flex-grow break-all">
          {story.excerpt_value}...
        </p>

        {/* Category Badge */}
        {story.category && (
          <div className="flex items-center gap-2 text-xs text-orange-600">
            <i className="fa-solid fa-tag"></i>
            <span>{story.category.name_value}</span>
          </div>
        )}

        {/* Read More Button */}
        <Link
          href={route('story.show', story.id)}
          className="self-end w-fit mt-auto px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm"
        >
          {t('customize_now')}
        </Link>
      </div>
    </div>
  );
}
