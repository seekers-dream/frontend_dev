import { object, string, ref, number } from 'yup';

export const loginValidationSchema = () => {
  return object({
    email: string().email().required('Email is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });
};

export const registerValidationSchema = () => {
  return object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    email: string().email().required('Email is required'),
    phoneNumber: string().required('Phone Number is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });
};

export const forgotPasswordValidationSchema = () => {
  return object({
    email: string().email().required('Email is required'),
  });
};

export const passwordValidationSchema = () => {
  return object({
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain a special character',
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .oneOf([ref('password')], 'Passwords must match'),
  });
};
export const changePasswordValidationSchema = () => {
  return object({
    oldPassword: string().required('Old Password is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain a special character',
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .oneOf([ref('password')], 'Passwords must match'),
  });
};

export const resetPasswordValidationSchema = () => {
  return object({
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: string()
      .required('Confirm Password is required')
      .oneOf([ref('password')], 'Passwords must match'),
  });
};
