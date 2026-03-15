import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { usePage } from '@inertiajs/react';

export default forwardRef(function Checkbox(
  { className = '', isFocused = false, ...props },
  ref
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
    ? 'rounded border-neutral-300 dark:border-neutral-700 text-orange-600 shadow-sm focus:ring-orange-500 dark:bg-neutral-900 dark:focus:ring-orange-600 dark:focus:ring-offset-neutral-800 transition-all'
    : 'rounded border-neutral-300 text-orange-600 shadow-sm focus:ring-orange-500 bg-white transition-all';

  const disabledClasses = isDashboard
    ? 'opacity-60 cursor-not-allowed bg-neutral-200 dark:bg-neutral-700'
    : 'opacity-60 cursor-not-allowed bg-neutral-200';

  return (
    <input
      {...props}
      ref={localRef}
      type="checkbox"
      className={
        baseClasses +
        (props.disabled ? ` ${disabledClasses}` : '') +
        ` ${className}`
      }
    />
  );
});
