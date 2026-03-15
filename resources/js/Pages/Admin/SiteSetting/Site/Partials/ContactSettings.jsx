import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect, useRef } from 'react';
import { useTrans } from '@/Hooks/useTrans';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ContactSettings({ settings }) {
  const { t } = useTrans();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    settings: {
      support_whatsapp: settings.support_whatsapp || '',
      support_mobile: settings.support_mobile || '',
      support_email: settings.support_email || '',
      facebook_link: settings.facebook_link || '',
      twitter_link: settings.twitter_link || '',
      instagram_link: settings.instagram_link || '',
      linkedin_link: settings.linkedin_link || '',
      youtube_link: settings.youtube_link || '',
      tiktok_link: settings.tiktok_link || '',
      snapchat_link: settings.snapchat_link || '',
      pinterest_link: settings.pinterest_link || '',
    }
  });



  const submit = (e) => {
    e.preventDefault();
    post(route('admin.site-settings.update'), {
      preserveScroll: true
    });
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-fadeIn">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/30">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <i className="fa-solid fa-phone text-blue-500"></i>
          {t('contact_info')}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          {t('contact_info_description')}
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WhatsApp Number */}
            <div>
              <InputLabel value={t('support_whatsapp')} />
              <TextInput
                value={data.settings.support_whatsapp}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  support_whatsapp: e.target.value
                })}
                icon="fab fa-whatsapp"
                className="mt-1 block w-full"
                placeholder="+966XXXXXXXXX"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {t('whatsapp_help')}
              </p>
              <InputError message={errors['settings.support_whatsapp']} className="mt-2" />
            </div>

            {/* Mobile Number */}
            <div>
              <InputLabel value={t('support_mobile')} />
              <TextInput
                value={data.settings.support_mobile}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  support_mobile: e.target.value
                })}
                icon="fa-mobile"
                className="mt-1 block w-full"
                placeholder="+966XXXXXXXXX"
              />
              <InputError message={errors['settings.support_mobile']} className="mt-2" />
            </div>

            {/* Email */}
            <div>
              <InputLabel value={t('support_email')} />
              <TextInput
                type="email"
                value={data.settings.support_email}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  support_email: e.target.value
                })}
                icon="fa-envelope"
                className="mt-1 block w-full"
                placeholder="support@example.com"
              />
              <InputError message={errors['settings.support_email']} className="mt-2" />
            </div>
          </div>

          {/* Separator */}
          <div className="py-4">
            <div className="border-t border-neutral-200 dark:border-neutral-800"></div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t('social_media_links')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facebook */}
            <div>
              <InputLabel value={t('facebook_link')} />
              <TextInput
                value={data.settings.facebook_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  facebook_link: e.target.value
                })}
                icon="fab fa-facebook"
                className="mt-1 block w-full"
                placeholder="https://facebook.com/yourpage"
              />
              <InputError message={errors['settings.facebook_link']} className="mt-2" />
            </div>

            {/* Twitter */}
            <div>
              <InputLabel value={t('twitter_link')} />
              <TextInput
                value={data.settings.twitter_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  twitter_link: e.target.value
                })}
                icon="fab fa-twitter"
                className="mt-1 block w-full"
                placeholder="https://twitter.com/yourhandle"
              />
              <InputError message={errors['settings.twitter_link']} className="mt-2" />
            </div>

            {/* Instagram */}
            <div>
              <InputLabel value={t('instagram_link')} />
              <TextInput
                value={data.settings.instagram_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  instagram_link: e.target.value
                })}
                icon="fab fa-instagram"
                className="mt-1 block w-full"
                placeholder="https://instagram.com/yourhandle"
              />
              <InputError message={errors['settings.instagram_link']} className="mt-2" />
            </div>

            {/* LinkedIn */}
            <div>
              <InputLabel value={t('linkedin_link')} />
              <TextInput
                value={data.settings.linkedin_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  linkedin_link: e.target.value
                })}
                icon="fab fa-linkedin"
                className="mt-1 block w-full"
                placeholder="https://linkedin.com/in/yourprofile"
              />
              <InputError message={errors['settings.linkedin_link']} className="mt-2" />
            </div>

            {/* YouTube */}
            <div>
              <InputLabel value={t('youtube_link')} />
              <TextInput
                value={data.settings.youtube_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  youtube_link: e.target.value
                })}
                icon="fab fa-youtube"
                className="mt-1 block w-full"
                placeholder="https://youtube.com/yourchannel"
              />
              <InputError message={errors['settings.youtube_link']} className="mt-2" />
            </div>

            {/* TikTok */}
            <div>
              <InputLabel value={t('tiktok_link')} />
              <TextInput
                value={data.settings.tiktok_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  tiktok_link: e.target.value
                })}
                icon="fab fa-tiktok"
                className="mt-1 block w-full"
                placeholder="https://tiktok.com/@yourhandle"
              />
              <InputError message={errors['settings.tiktok_link']} className="mt-2" />
            </div>

            {/* Snapchat */}
            <div>
              <InputLabel value={t('snapchat_link')} />
              <TextInput
                value={data.settings.snapchat_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  snapchat_link: e.target.value
                })}
                icon="fab fa-snapchat"
                className="mt-1 block w-full"
                placeholder="https://snapchat.com/add/yourhandle"
              />
              <InputError message={errors['settings.snapchat_link']} className="mt-2" />
            </div>

            {/* Pinterest */}
            <div>
              <InputLabel value={t('pinterest_link')} />
              <TextInput
                value={data.settings.pinterest_link}
                onChange={(e) => setData('settings', {
                  ...data.settings,
                  pinterest_link: e.target.value
                })}
                icon="fab fa-pinterest"
                className="mt-1 block w-full"
                placeholder="https://pinterest.com/yourprofile"
              />
              <InputError message={errors['settings.pinterest_link']} className="mt-2" />
            </div>
          </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
            <PrimaryButton
              type="submit"
              disabled={processing}
              icon="fa-floppy-disk"
              rounded="rounded-lg"
              withShadow={false}
            >
              {t('save_changes')}
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1">
                <i className="fa-solid fa-check"></i> {t('saved_successfully')}
              </p>
            </Transition>
          </div>
        </form>
      </div>
    </div>
  );
}
