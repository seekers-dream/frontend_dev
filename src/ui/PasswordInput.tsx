/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface PasswordInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  getFieldProps: (name: string) => any;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string | undefined };
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  placeholder,
  getFieldProps,
  touched,
  errors,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#344054]"
      >
        {label} {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          id={name}
          {...getFieldProps(name)}
          className={`outline-none border border-[#D0D5DD] py-2 px-3  shadow-xs w-full  rounded-lg mt-1
                ${touched[name] && errors[name] ? 'border-red-500' : ''}
              `}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 top-2 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export default PasswordInput;
