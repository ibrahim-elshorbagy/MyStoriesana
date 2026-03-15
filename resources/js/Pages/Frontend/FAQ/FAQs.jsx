import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import AccordionGroup from '@/Components/AccordionGroup';
import Accordion from '@/Components/Accordion';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head } from '@inertiajs/react';

export default function FAQs({ categories }) {
  const { t } = useTrans();

  return (
    <SiteLayout>
      <Head title={t('faqs')} />

      <section
        className="relative py-16 min-h-[calc(100dvh-4rem)] bg-neutral-50"
        id="faqs"
      >
        <div className="container mx-auto flex flex-col gap-14 md:gap-16">
          {/* Section Header */}
          <div className="text-center mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-center flex-col gap-1">
              <h2 className="text-4xl pb-2 xl:text-6xl leading-normal font-bold bg-gradient-to-r from-green-500 to-orange-600 bg-clip-text text-transparent">
                {t('faqs_title')}
              </h2>
              <h3 className="text-2xl xl:text-3xl font-semibold text-orange-700 mt-4">
                {t('faqs_subtitle')}
              </h3>
            </div>
            {/* <p className="text-lg text-neutral-600 leading-relaxed">
              {t('faqs_description')}
            </p> */}
          </div>

          {/* FAQs by Category */}
          <div className="flex flex-col gap-12">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="flex flex-col gap-6">
                  {/* Category Header */}
                  <div className="text-center">
                    <h3 className="text-2xl xl:text-3xl font-bold text-neutral-800 ">
                      {category.name_value}
                    </h3>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
                  </div>

                  {/* Category FAQs */}
                  {category.faqs && category.faqs.length > 0 ? (
                    <div className='flex justify-center'>
                      <div className="max-w-4xl flex-1">
                        <AccordionGroup>
                          {category.faqs.map((faq, index) => (
                            <Accordion key={faq.id} title={faq.question_value} className="w-full">
                              <div className="text-neutral-600 leading-relaxed ">
                                {faq.answer_value}
                              </div>
                            </Accordion>
                          ))}
                        </AccordionGroup>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-neutral-500 ">
                      {t('no_faqs_in_category', { category: category.name_value })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-neutral-500 ">
                {t('no_faq_categories')}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
