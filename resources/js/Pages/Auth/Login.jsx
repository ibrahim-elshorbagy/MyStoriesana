import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function Login({ status, canResetPassword }) {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth_login')} />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-800 to-orange-600 bg-clip-text text-transparent">{t('auth_welcome_back')}</h1>
                <p className="mt-3 text-neutral-600 text-lg">
                    {t('auth_sign_in_to_your_account')}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="username" value={t('auth_username')} className="text-neutral-700 font-semibold" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-2 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => {setData('username', e.target.value)}}
                        icon="fa-user"
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value={t('auth_password')} className="text-neutral-700 font-semibold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors"
                            >
                                {t('auth_forgot_password')}
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        icon="fa-lock"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-3 text-sm text-neutral-700 font-medium">
                            {t('auth_remember_me')}
                        </span>
                    </label>
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
                            <i className="fa-solid fa-right-to-bracket"></i>
                        )}
                        {t('auth_login')}
                    </button>

                    <div className="text-center text-sm text-neutral-600">
                        {t('auth_dont_have_account')}{" "}
                        <Link href={route('register')} className="text-orange-600 hover:text-orange-800 font-medium transition-colors">
                            {t('auth_register')}
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
