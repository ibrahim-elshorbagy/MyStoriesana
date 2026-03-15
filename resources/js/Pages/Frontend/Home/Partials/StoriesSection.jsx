import React from 'react';
import { Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';
import StoryCard from '@/Components/StoryCard';

export default function StoriesSection({ stories }) {
  const { t } = useTrans();

  return (
    <section
      className="relative overflow-hidden py-16 min-h-[calc(100dvh-4rem)] bg-neutral-50"
      id="stories"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto flex flex-col gap-10 relative z-10">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl xl:text-6xl pb-2 leading-normal font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent w-fit mx-auto">
            {t('stories_title')}
          </h2>
          <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto">
            {t('stories_description')}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 justify-items-center">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {/* View All Button */}
          <div className='flex items-center justify-center'>
            <Link
              href={route('stories')}
              className="flex items-center gap-2 px-6 w-fit py-4 mt-4 text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-2xl shadow-orange-900/50 hover:shadow-orange-800/60 transform hover:scale-105 transition-all duration-300 rounded-md border-2 border-orange-300/30 backdrop-blur-sm"
            >
              <span>{t('stories_more_stories')}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
