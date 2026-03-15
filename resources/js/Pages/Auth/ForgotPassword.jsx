import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ForgotPassword({ status }) {
    const { t } = useTrans();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth_forgot_password_title')} />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-orange-600 bg-clip-text text-transparent">{t('auth_forgot_password_title')}</h1>
                <p className="mt-3 text-neutral-600 text-lg">
                    {t('auth_enter_email_reset')}
                </p>
            </div>

            <div className="space-y-6">
                {status && (
                    <div className="bg-gradient-to-r from-orange-50 to-neutral-50 rounded-xl p-6 border border-orange-200/30">
                        <div className="flex items-center p-4 rounded-lg bg-orange-50 text-sm text-orange-800 border border-orange-200">
                            <i className="fa-solid fa-check-circle mr-3 text-orange-600"></i>
                            <span className="font-medium">{status}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value={t('auth_email_address')} className="text-neutral-700 font-semibold" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            icon="fa-envelope"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="space-y-4">
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
                            {t('auth_send_reset_link')}
                        </button>

                        <div className="text-center text-sm text-neutral-600">
                            {t('auth_remember_password')}{" "}
                            <Link href={route('login')} className="text-orange-600 hover:text-orange-800 font-medium transition-colors">
                                {t('auth_back_to_login')}
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
