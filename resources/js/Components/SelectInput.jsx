import React from 'react';
import { usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function SelectInput({
  name,
  value,
  onChange,
  options = [],
  label = '',
  error,
  required = false,
  icon = null,
  className = '',
  disabled = false,
  ...props
}) {
  const { url } = usePage();
  const isDashboard = url.startsWith('/dashboard');

  const baseClasses = isDashboard
    ? 'block w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:border-orange-400 dark:focus:ring-orange-900 transition-all'
    : 'block w-full rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all';

  const disabledClasses = isDashboard
    ? 'opacity-60 cursor-not-allowed bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
    : 'opacity-60 cursor-not-allowed bg-neutral-200 text-neutral-500';

  return (
    <div>
      {label && <InputLabel htmlFor={name} value={label} required={required} />}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
            <i className={`fa-solid ${icon}`}></i>
          </span>
        )}
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          className={`
            ${baseClasses}
            ${icon ? 'pl-10' : ''}
            ${disabled ? disabledClasses : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <InputError message={error} className="mt-2" />}
    </div>
  );
}
