import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ResetPassword({ token, email }) {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_reset_password')} />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-orange-600 bg-clip-text text-transparent">{t('auth_reset_your_password')}</h1>
                <p className="mt-3 text-neutral-600 text-lg">
                    {t('auth_enter_new_password')}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value={t('auth_email_address')} className="text-neutral-700 font-semibold" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        icon="fa-envelope"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('auth_new_password')} className="text-neutral-700 font-semibold" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        icon="fa-lock"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={t('auth_confirm_new_password')}
                        className="text-neutral-700 font-semibold"
                    />
                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        icon="fa-lock"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
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
                            <i className="fa-solid fa-key"></i>
                        )}
                        {t('auth_reset_password')}
                    </button>

                    <div className="text-center text-sm text-neutral-600">
                        {t('auth_remember_password')}{" "}
                        <Link href={route('login')} className="text-orange-600 hover:text-orange-800 font-medium transition-colors">
                            {t('auth_back_to_login')}
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
