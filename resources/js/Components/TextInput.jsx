import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        icon = null,
        iconClassName = 'text-neutral-400',
        ...props
    },
    ref,
) {
    const localRef = useRef(null);
    const { url } = usePage();
    const isDashboard = url.startsWith('/dashboard');

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const baseClasses = isDashboard
        ? 'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2 py-1 text-neutral-900 dark:text-neutral-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:border-orange-400 dark:focus:ring-orange-900 transition-all '
        : 'w-full rounded-lg border border-neutral-300 bg-neutral-50 px-2 py-1 text-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all ';

    const disabledClasses = isDashboard
        ? 'opacity-60 cursor-not-allowed bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
        : 'opacity-60 cursor-not-allowed bg-neutral-200 text-neutral-500';

    return (
        <div className="relative">
            <input
                {...props}
                type={type}
                className={
                    baseClasses +
                    (icon ? 'pr-8 ' : '') +
                    (props.disabled ? disabledClasses : '') +
                    className
                }
                ref={localRef}
            />
            {icon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i className={`fa-solid ${icon} ${iconClassName}`} aria-hidden="true"></i>
                </div>
            )}
        </div>
    );
});
