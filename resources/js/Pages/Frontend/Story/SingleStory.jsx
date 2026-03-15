import React from 'react';
import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { useTrans } from '@/Hooks/useTrans';
import StoryGallerySwiper from '@/Components/StoryGallerySwiper';

export default function SingleStory({ story }) {
  const { t } = useTrans();

  return (
    <SiteLayout>
      <Head>
        <title>{`${story.title_value} | ${t('seo_site_name')}`}</title>
        <meta name="description" content={story.excerpt_value || t('seo_story_description')} />
        <meta name="keywords" content={t('seo_story_keywords')} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={story.title_value} />
        <meta property="og:description" content={story.excerpt_value || t('seo_story_description')} />
        <meta property="og:site_name" content={t('seo_site_name')} />
        {story.cover_image_value && <meta property="og:image" content={story.cover_image_value} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={story.title_value} />
        <meta name="twitter:description" content={story.excerpt_value || t('seo_story_description')} />
        {story.cover_image_value && <meta name="twitter:image" content={story.cover_image_value} />}
      </Head>

      <div
        className="min-h-screen py-8 md:py-12 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url('assets/home/banner.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Colorful Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-green-200/30 to-yellow-200/30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-300/40 via-transparent to-green-300/40 z-5"></div>

        {/* Floating Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-green-200/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-300/15 to-orange-300/10 rounded-full blur-2xl"></div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-32 left-8 animate-float opacity-40">
            <i className="fa-solid fa-book text-orange-500 text-4xl drop-shadow-lg"></i>
          </div>
          <div className="absolute top-48 right-12 animate-float-delay-1 opacity-40">
            <i className="fa-solid fa-star text-yellow-500 text-3xl drop-shadow-lg"></i>
          </div>
          <div className="absolute bottom-32 left-16 animate-float-delay-2 opacity-40">
            <i className="fa-solid fa-heart text-pink-500 text-3xl drop-shadow-lg"></i>
          </div>
          <div className="absolute bottom-48 right-20 animate-float opacity-40">
            <i className="fa-solid fa-sparkles text-green-500 text-2xl drop-shadow-lg"></i>
          </div>
          <div className="absolute top-1/3 left-1/4 animate-float-delay-1 opacity-30 hidden lg:block">
            <i className="fa-solid fa-magic-wand-sparkles text-purple-500 text-2xl drop-shadow-lg"></i>
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float-delay-2 opacity-30 hidden lg:block">
            <i className="fa-solid fa-crown text-yellow-600 text-2xl drop-shadow-lg"></i>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-30">
          {/* Back Button with Enhanced Style */}
          <Link
            href={route('stories')}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6 md:mb-8"
          >
            <i className="fa-solid fa-arrow-left rtl:rotate-180"></i>
            {t('back_to_stories')}
          </Link>

          {/* Main Story Card with Colorful Border */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 md:border-4 border-orange-200">

            {/* Hero Section with Vibrant Gradient */}
            <div className="relative bg-gradient-to-br from-orange-400 via-orange-300 to-green-400 min-h-[200px] md:min-h-[250px] flex items-end">
              {/* Decorative Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>

              {/* Title Overlay with Enhanced Styling */}
              <div className="relative w-full p-4 md:p-8 text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black  pb-10 mb-3 md:mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-orange-50 to-white bg-clip-text text-transparent">
                  {story.title_value}
                </h1>

                {/* Metadata with Colorful Badges */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
                  {story.category && (
                    <span className="flex items-center gap-1.5 md:gap-2 bg-white/90 text-orange-600 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold shadow-lg">
                      <i className="fa-solid fa-tag"></i>
                      {story.category.name_value}
                    </span>
                  )}
                  {story.gender !== null && (
                    <span className="flex items-center gap-1.5 md:gap-2 bg-white/90 text-green-600 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold shadow-lg">
                      <i className="fa-solid fa-venus-mars"></i>
                      {story.gender_text}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Two-Column Layout: Gallery + Content */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">

              {/* Gallery Section - Left/Right based on RTL */}
              {story.gallery_images_value && story.gallery_images_value.length > 0 && (
                <div className="order-1 xl:ltr:order-1 xl:rtl:order-2">
                  <div className="xl:sticky xl:top-8">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-images text-white text-lg md:text-xl"></i>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text">
                        {t('gallery')}
                      </h3>
                    </div>

                    {/* Gallery Swiper with Responsive Height */}
                    <div className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px]">
                      <StoryGallerySwiper
                        images={story.gallery_images_value}
                        videos={story.gallery_videos_value}
                        title={story.title_value}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Story Content - Right/Left based on RTL */}
              <div className="order-2 xl:ltr:order-2 xl:rtl:order-1">
                {/* Content Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-book-open text-white text-lg md:text-xl"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-green-600 to-green-400 bg-clip-text">
                    {t('story')}
                  </h3>
                </div>

                {/* Story Content with Beautiful Styling */}
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <div
                    className="text-neutral-700 leading-relaxed bg-gradient-to-br from-orange-50 to-green-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-orange-200 md:border-2 shadow-inner"
                    dangerouslySetInnerHTML={{ __html: story.content_value }}
                  >
                  </div>
                </div>

                {/* Download PDF Buttons */}
                {(story.pdf_ar || story.pdf_en) && (
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl md:rounded-2xl border border-orange-300 md:border-2">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                        <i className="fa-solid fa-download text-white text-sm md:text-base"></i>
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-orange-700">
                        {t('download_pdf')}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {story.pdf_ar && (
                        <a
                          href={`/storage/${story.pdf_ar}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-sm md:text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <i className="fa-solid fa-file-pdf text-base md:text-lg"></i>
                          PDF (العربية)
                        </a>
                      )}
                      {story.pdf_en && (
                        <a
                          href={`/storage/${story.pdf_en}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-500 text-white text-sm md:text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <i className="fa-solid fa-file-pdf text-base md:text-lg"></i>
                          PDF (English)
                        </a>
                      )}
                    </div>
                  </div>
                )}


                <div className="mt-6">
                  <Link
                    href={route('frontend.order.create', { story_id: story.id })}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    {t('customize_this_story') || 'تخصيص هذه القصة'}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
