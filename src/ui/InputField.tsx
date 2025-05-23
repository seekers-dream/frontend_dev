/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  max?: string;
  min?: string;
  getFieldProps: (name: string) => any;
  touched: boolean;
  errors: string | undefined;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  className,
  placeholder,
  type = 'text',
  getFieldProps,
  max,
  min,
  touched,
  errors,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm  font-medium text-black">
        {label} {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        max={max}
        min={min}
        {...getFieldProps(name)}
        placeholder={placeholder}
        className={`${className} outline-none text-sm border border-[#D9D9D9] shadow-xs w-full py-2 px-3 rounded-lg mt-1
                ${touched && errors ? 'border-red-500' : ''}
              `}
      />
      {touched && errors && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default InputField;
