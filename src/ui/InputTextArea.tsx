/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TextAreaProps {
  label?: string;
  name: string;
  placeholder?: string;
  rows?: number;
  touched: boolean;
  errors: string | undefined;
  getFieldProps: (name: string) => any;
  required?: string;
}

const InputTextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  rows = 4,
  getFieldProps,
  touched,
  errors,
  required = true,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm  font-medium text-[#344054]"
      >
        {label}

        {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        {...getFieldProps(name)}
        placeholder={placeholder}
        rows={rows}
        className={`outline-none border border-[#D0D5DD] shadow-xs w-full py-2 px-3  rounded-lg mt-2
                ${touched && errors ? 'border-red-500' : ''}
              `}
      />
      {touched && errors && (
        <p className="text-red-500 text-xs mt-1">{errors}</p>
      )}
    </div>
  );
};

export default InputTextArea;
