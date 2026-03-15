import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function VerifyEmail({ status }) {
    const { t } = useTrans();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth_verify_email')} />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-orange-600 bg-clip-text text-transparent">{t('auth_verify_email')}</h1>
                <p className="mt-3 text-neutral-600 text-lg">
                    {t('auth_one_last_step')}
                </p>
            </div>

            <div className="space-y-6">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <i className="fa-solid fa-envelope text-3xl text-orange-600"></i>
                    </div>

                    <div className="text-neutral-700 text-lg leading-relaxed mb-6">
                        <p className="mb-3 font-medium">
                            {t('auth_verification_email_sent')}
                        </p>
                        <p>
                            {t('auth_click_link_complete')}
                        </p>
                    </div>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="bg-gradient-to-r from-orange-50 to-neutral-50 rounded-xl p-6 border border-orange-200/30">
                        <div className="flex items-center p-4 rounded-lg bg-orange-50 text-sm text-orange-800 border border-orange-200">
                            <i className="fa-solid fa-check-circle mr-3 text-orange-600"></i>
                            <span className="font-medium">{t('auth_new_verification_link_sent')}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all duration-300 disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                        {processing ? (
                            <i className="fa-solid fa-circle-notch animate-spin"></i>
                        ) : (
                            <i className="fa-solid fa-paper-plane"></i>
                        )}
                        {t('auth_resend_verification_email')}
                    </button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] border border-neutral-300"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        {t('auth_logout')}
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}
