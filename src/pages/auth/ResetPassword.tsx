import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useResetPasswordMutation } from '@/features/auth/api';
import { alert } from '@/utils/alert';
import PasswordInput from '@/ui/PasswordInput';
import Button from '@/ui/Button';
import { resetPasswordValidationSchema } from '@/utils/validations';
import { ResetPasswordPayload } from '@/features/auth/interfaces';
import ILogo from '@/assets/svg/logo.svg?react';
export const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = (values: ResetPasswordPayload) => {
    const { password, confirmPassword } = values;
    const payload = { password, confirmPassword, token: token || '' };
    resetPassword(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Password Reset Successfully',
            timer: 2000,
            cb: () => {
              navigate('/');
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: 'error',
          message: err?.data?.data || err?.data?.message || 'An error occurred',
          timer: 3000,
        });
      });
  };

  const { getFieldProps, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      handleResetPassword(values);
    },
  });

  return (
    <div className="md:max-w-[458px] h-screen px-3 mx-auto flex flex-col items-center justify-center  ">
      <div>
        <div className="mb-5 flex items-center justify-center">
          <ILogo />
        </div>
        <h3 className="my-3 text-black font-medium text-center text-2xl md:text-[32px]">
          Reset your Password
        </h3>
        <p className="mt-2 text-base font-medium text-black">
          Enter your new password to access your account
        </p>
        <form onSubmit={handleSubmit} className="mt-16 space-y-5">
          <div>
            <PasswordInput
              label="Password"
              name="password"
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            />
          </div>
          <div>
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            />
          </div>

          <Button
            type="submit"
            label="Submit"
            className="w-full bg-primary text-white"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>

        <div className="my-2 text-center text-sm">
          <p onClick={() => navigate('/')} className="cursor-pointer">
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};
