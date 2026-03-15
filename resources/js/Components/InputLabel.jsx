import { usePage } from '@inertiajs/react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    const { url } = usePage();
    const isDashboard = url.startsWith('/dashboard');

    return (
        <label
            {...props}
            className={
                `block text-sm font-medium ${isDashboard ? 'text-gray-700 dark:text-gray-300' : 'text-gray-700'} ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
