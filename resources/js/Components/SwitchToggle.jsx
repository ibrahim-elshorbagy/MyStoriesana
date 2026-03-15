import React from 'react';

export default function SwitchToggle({
  name,
  value,
  onChange,
  label = '',
  disabled = false,
  className = '',
  ...props
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: e.target.checked,
          type: 'checkbox'
        }
      });
    }
  };

  return (
    <label
      htmlFor={name}
      className={`cursor-pointer inline-flex items-center gap-3 ${className}`}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        className="peer sr-only"
        role="switch"
        checked={value || false}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {label && (
        <span className="tracking-wide text-sm font-medium text-neutral-600 peer-checked:text-neutral-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-300 dark:peer-checked:text-white">
          {label}
        </span>
      )}
      <div className="relative h-6 w-11 after:h-5 after:w-5 peer-checked:after:translate-x-5 rounded-full border border-neutral-300 bg-neutral-50 after:absolute after:bottom-0 after:left-[0.0625rem] after:top-0 after:my-auto after:rounded-full after:bg-neutral-600 after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:bg-white peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-neutral-800 peer-focus:peer-checked:outline-green-500 peer-active:outline-offset-0 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:border-neutral-700 dark:bg-neutral-900 dark:after:bg-neutral-300 dark:peer-checked:bg-green-500 dark:peer-checked:after:bg-white dark:peer-focus:outline-neutral-300 dark:peer-focus:peer-checked:outline-green-500" aria-hidden="true"></div>
    </label>
  );
}
