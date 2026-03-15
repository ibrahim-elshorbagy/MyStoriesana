import React from 'react';
import { useTrans } from '@/Hooks/useTrans';

export default function OrangeSelectInput({
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
  placeholder = '',
  ...props
}) {
  const { t } = useTrans();

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
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
            w-full px-4 py-3 pr-10 border-2 border-neutral-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-neutral-200 text-neutral-500' : 'bg-white'}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none">
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
