import or from 'assets/images/or.png';
import Facebook from 'assets/images/Facebook.png';
import Google from 'assets/images/google.png';
import { useNavigate } from 'react-router-dom';
// import Spinner from 'assets/images/spinner.svg';
import { useFormik } from 'formik';
import AuthLayout from '@/layout/AuthLayout';
import InputField from '@/ui/InputField';
import { setCredentials } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from '@/features/auth/api';
import { LoginPayload, ResendCodePayload } from '@/features/auth/interfaces';
import { alert } from '@/utils/alert';
import PasswordInput from '@/ui/PasswordInput';
import Button from '@/ui/Button';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import {
  forgotPasswordValidationSchema,
  loginValidationSchema,
} from '@/utils/validations';

export const Login = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const [forgetPassword, { isLoading: isForgetPassword }] =
    useForgotPasswordMutation();
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const initLogin = (values: LoginPayload) => {
    console.log(values);

    loginUser(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.data) {
          dispatch(
            setCredentials({
              user: res.data,
              isAuthenticated: true,
              accessToken: res.data.token,
              refreshToken: res.data.refreshToken,
            }),
          );
          alert({
            type: 'success',
            message: 'Login successfully',
            timer: 2000,
            cb: () => navigate(`/`),
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: 'error',
          message: err?.data?.message || 'An error occurred',
          timer: 3000,
        });
      });
  };

  const handleForgetPassword = (values: ResendCodePayload) => {
    forgetPassword(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Password Reset Link Sent. Check your email',
            timer: 2000,
            cb: () => {
              handleClose();
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

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      initLogin(values);
    },
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      handleForgetPassword(values);
    },
  });

  return (
    <AuthLayout>
      <div className="max-w-[458px] px-3 mx-auto flex justify-center bg-white ">
        <div>
          <h3 className="my-3 text-black font-medium  text-2xl md:text-[32px]">
            Welcome Back!
          </h3>
          <p className="mt-2 text-base font-medium text-black">
            Enter your creditials to access your account
          </p>
          <form onSubmit={loginFormik.handleSubmit} className="mt-16 space-y-5">
            <div>
              <InputField
                label="Email"
                name="email"
                type="email"
                getFieldProps={loginFormik.getFieldProps}
                touched={loginFormik.touched.email as boolean}
                errors={loginFormik.errors.email}
              />
            </div>
            <div>
              <div>
                <PasswordInput
                  label="Password"
                  name="password"
                  getFieldProps={loginFormik.getFieldProps}
                  touched={loginFormik.touched}
                  errors={loginFormik.errors}
                />
                <div className="flex justify-end items-center">
                  <span
                    className="text-[#0C2A92] text-[10px] cursor-pointer"
                    onClick={handleOpen}
                  >
                    Forgot password
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <p className="text-[#000000] my-4">Remember for 30 days</p>
            </div>
            <Button
              type="submit"
              label="Login"
              className="w-full "
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
          <div className="relative my-2">
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex justify-center">
              <img src={or} alt="or" className="absolute top-[-5px]" />
            </div>
          </div>
          {/* oauth authentication */}
          <div className="flex justify-between gap-1 md:gap-4 mt-16">
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center cursor-pointer">
              <img src={Google} alt="Google" />
              <span className="text-xs">Sign in with Google</span>
            </div>
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center cursor-pointer">
              <img src={Facebook} alt="Facebook" />
              <span className="text-xs">Sign in with Facebook</span>
            </div>
          </div>
          <div className="my-2 text-center text-sm">
            <p>
              Don't have an account?
              <span
                className="text-[#0F3DDE] pl-2 cursor-pointer"
                onClick={() => navigate('/register')}
              >
                sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} closeOnOutsideClick={false}>
        <div className="rounded-[16px] lg:w-[700px] w-[345px] px-5 pt-10 pb-3">
          <div>
            <h1 className="text-primary text-center text-2xl md:text-4xl font-semibold">
              Forgot your password?
            </h1>
            <p className="py-5 text-center max-w-[596px] mx-auto">
              Enter your email and we’ll send you instructions on how to reset
              your password.{' '}
            </p>

            <form
              className="items-center gap-5"
              onSubmit={forgotPasswordFormik.handleSubmit}
            >
              <div className="max-w-[400px] mx-auto">
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  getFieldProps={forgotPasswordFormik.getFieldProps}
                  touched={forgotPasswordFormik.touched.email as boolean}
                  errors={forgotPasswordFormik.errors.email}
                />
                <Button
                  label="Send"
                  className="w-full mt-5 "
                  type="submit"
                  loading={isForgetPassword}
                />

                <p
                  onClick={handleClose}
                  className="text-[#7B7B7B] text-center mt-5"
                >
                  Back to Sign In
                </p>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </AuthLayout>
  );
};
