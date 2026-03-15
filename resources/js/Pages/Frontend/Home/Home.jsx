import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import HeroSection from './Partials/HeroSection';
import FeaturesSection from './Partials/FeaturesSection';
import StoriesSection from './Partials/StoriesSection.jsx';
import AgeCategoriesSection from './Partials/AgeCategoriesSection.jsx';
import PricingSection from './Partials/PricingSection';
import FAQs from './Partials/FAQs';
import CustomerFeedbackSection from './Partials/CustomerFeedbackSection';
import { useTrans } from '@/Hooks/useTrans';
import HowItWorks from './Partials/HowItWorks';
import HowItWorksVideoSection from './Partials/HowItWorksVideoSection';

export default function Home({ stories, faqs, categories, settings, textFeedbacks, imageFeedbacks, videoFeedbacks }) {
  const { t } = useTrans();
  const { locale } = usePage().props;

  return (
    <SiteLayout>
      <Head>
        <title>{t('seo_home_title')}</title>
        <meta name="description" content={t('seo_home_description')} />
        <meta name="keywords" content={t('seo_home_keywords')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('seo_home_title')} />
        <meta property="og:description" content={t('seo_home_description')} />
        <meta property="og:site_name" content={t('seo_site_name')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo_home_title')} />
        <meta name="twitter:description" content={t('seo_home_description')} />
      </Head>

      <HeroSection />
      <HowItWorks />

      {settings.how_it_works_video && (
        <HowItWorksVideoSection videoUrl={settings.how_it_works_video} />
      )}
      <FeaturesSection />
      <StoriesSection stories={stories} />

      <div className="relative w-full">
        <img
          className="w-full h-auto object-cover"
          src={`/assets/home/${locale}.png`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-2 lg:bottom-8 flex items-center justify-center px-4">
          <Link
            href={route('stories')}
            className="px-4 py-2 sm:px-6 sm:py-4  text-base  font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-2xl shadow-orange-900/50 hover:shadow-orange-800/60 transform hover:scale-105 transition-all duration-300 rounded-md border-2 border-orange-300/30 backdrop-blur-sm max-w-sm mx-auto"
          >
            {t("try_now")}
          </Link>
        </div>
      </div>


      <AgeCategoriesSection categories={categories} />
      <PricingSection settings={settings} />
      <CustomerFeedbackSection textFeedbacks={textFeedbacks} imageFeedbacks={imageFeedbacks} videoFeedbacks={videoFeedbacks} />
      <FAQs faqs={faqs} />
    </SiteLayout>
  );
}
