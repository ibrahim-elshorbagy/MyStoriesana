import { usePage } from '@inertiajs/react';

export default function InputError({ message, className = '', ...props }) {
    const { url } = usePage();
    const isDashboard = url.startsWith('/dashboard');

    return message ? (
        <p
            {...props}
            className={`text-sm ${isDashboard ? 'text-red-600 dark:text-red-400' : 'text-red-600'} ` + className}
        >
            {message}
        </p>
    ) : null;
}
