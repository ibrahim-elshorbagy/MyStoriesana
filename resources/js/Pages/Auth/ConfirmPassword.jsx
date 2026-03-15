import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ConfirmPassword() {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_confirm_password_title')} />

                        <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-orange-600 bg-clip-text text-transparent">{t('auth_confirm_password_title')}</h1>
                <p className="mt-3 text-neutral-600 text-lg">
                    {t('auth_confirm_password_subtitle')}
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-neutral-50 rounded-xl p-6 border border-orange-200/30">
                    <div className="flex items-center p-4 rounded-lg bg-amber-50 text-sm text-amber-800 border border-amber-200">
                        <i className="fa-solid fa-shield-halved mr-3 text-amber-600"></i>
                        <span className="font-medium">{t('auth_secure_area_message')}</span>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="password" value={t('auth_password')} className="text-neutral-700 font-semibold" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            icon="fa-lock"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all duration-300 disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                        {processing ? (
                            <i className="fa-solid fa-circle-notch animate-spin"></i>
                        ) : (
                            <i className="fa-solid fa-check-circle"></i>
                        )}
                        {t('auth_confirm_password_button')}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
