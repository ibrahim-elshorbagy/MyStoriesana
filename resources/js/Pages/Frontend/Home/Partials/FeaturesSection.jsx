import React from 'react';
import { useTrans } from '@/Hooks/useTrans';

export default function FeaturesSection() {
  const { t } = useTrans();

  return (
    <section
      className="relative py-8 min-h-[calc(100dvh-4rem)] bg-neutral-50"
      id="features"
    >
      <div className="container mx-auto flex flex-col gap-14 md:gap-16">
        {/* Section Header */}
        <div className="text-center mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-center flex-col gap-1">
            <h2 className="text-4xl pb-2 xl:text-6xl leading-normal font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent">
              {t('features_title')}
            </h2>
            <h3 className="text-2xl xl:text-3xl font-semibold text-orange-700 mt-4">
              {t('features_subtitle')}
            </h3>
          </div>
          <p className="text-lg text-neutral-600 leading-relaxed">
            {t('features_description')}
          </p>

        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((feat) => {
            const icons = ['fa-book-open', 'fa-brain', 'fa-palette', 'fa-hand-pointer', 'fa-graduation-cap', 'fa-share'];
            return (
              <div
                className="group bg-white backdrop-blur-sm border border-neutral-200/50 rounded-md p-8 hover:bg-neutral-50/90 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-orange-400/30"
                key={feat}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className={`fas ${icons[feat-1]} text-white text-2xl`}></i>
                </div>
                <h4 className="text-xl font-bold text-neutral-700 mb-4 text-center group-hover:text-orange-600 transition-colors">
                  {t(`features_feature${feat}_title`)}
                </h4>
                <p className="text-neutral-500 text-center leading-relaxed">
                  {t(`features_feature${feat}_description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
