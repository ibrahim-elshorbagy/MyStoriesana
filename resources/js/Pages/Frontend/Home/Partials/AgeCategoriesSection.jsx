import React from 'react';
import { Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function AgeCategoriesSection({ categories }) {
  const { t } = useTrans();

  return (
    <section className="py-16 bg-neutral-50 pb-32">
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-custom mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl xl:text-6xl pb-2 leading-normal font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent w-fit mx-auto">
            {t('browse_stories_by_age')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={route('stories', { category_id: category.id })}
              className="relative w-full h-auto cursor-pointer transform transition-transform duration-300 hover:scale-105 block"
            >
              <img
                src={category.image_value || 'https://placehold.co/300x400.png'}
                alt={category.name_value}
                className="w-full h-auto object-cover rounded-md shadow-md"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-3 md:top-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center">
                <span className="text-lg md:text-[22px] font-marcellus">{t('age')}</span>
                <span className="text-[26px] md:text-[30px] font-normal">{category.name_value}</span>
              </div>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded cursor-pointer transition-colors">
                  {t('discover')}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
