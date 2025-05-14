/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  options: Option[];
  getFieldProps: (name: string) => any;
  touched: boolean;
  errors: string | undefined;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  className,
  placeholder,
  options,
  getFieldProps,
  touched,
  errors,
  required = false,
  disabled = false,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-black">
          {label} {required && <span className="pl-1 text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        {...getFieldProps(name)}
        disabled={disabled}
        className={`${className} outline-none text-sm border border-[#D9D9D9] shadow-xs w-full py-2 px-3 rounded-lg mt-1
          ${touched && errors ? 'border-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && errors && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default SelectField;
