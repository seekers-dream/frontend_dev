import Loader from '@/components/loader/Loader';
import React from 'react';

interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode | null;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  disabled = false,
  loading = false,
  className = '',
  icon = null,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex shadow-xs transition-all duration-500 ease-in-out justify-center px-4 py-2 rounded-lg   font-semibold hover:bg-black  disabled:bg-blue-950 ${
        !disabled ? 'cursor-pointer ' : ''
      } ${className}`}
    >
      {loading ? (
        <span className="flex items-center">
          <Loader />
        </span>
      ) : (
        label
      )}
      {icon && icon}
    </button>
  );
};

export default Button;
