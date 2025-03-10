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

export const bigTaxiValidationSchema = () => {
  return object({
    stationName: string().required('First Name is required'),
    price: string().required('Price is required'),
    from: string().required('From is required'),
    to: string().required('To is required'),
    miles: string().required('Kilometer is required'),
    time: string().required('Time is required'),
  });
};

export const pricingValidationSchema = () => {
  return object({
    earningCommission: number().required('Required'),
    pricePerKm: number().required('Required'),
    cancelationRidePercent: number().required('Required'),
  });
};

export const faqValidationSchema = () => {
  return object({
    answer: string().required('Answer is required'),
    question: string().required('Question is required'),
  });
};

export const aboutValidationSchema = () => {
  return object({
    about: string().required('About is required'),
  });
};

export const addStaffValidationSchema = () => {
  return object({
    email: string().required('Email is required'),
    firstName: string().required('First Name is required'),
    lastName: string().required('LastName is required'),
    role: string().required('Role is required'),
    roleDescription: string().required('Role Description is required'),
  });
};
