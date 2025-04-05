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

interface LoginProps {
  onClose: () => void;
  openRegister: () => void;
}

export const Login = ({ onClose, openRegister }: LoginProps) => {
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
      <div className="max-w-[458px] py-10  md:py-0 px-3 mx-auto flex justify-center  ">
        <div>
          <h3 className=" text-center text-black font-medium  text-2xl md:text-[32px]">
            Log In
          </h3>
          <div className="my-2 text-center text-sm">
            <p>
              Don't have an account?
              <span
                className="text-[#090C1B] pl-2 underline cursor-pointer"
                onClick={() => {
                  onClose();
                  openRegister();
                }}
              >
                Sign up
              </span>
            </p>
          </div>
          <form onSubmit={loginFormik.handleSubmit} className="mt-10 space-y-5">
            <div>
              <InputField
                placeholder="Email"
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
                  placeholder="Password"
                  name="password"
                  getFieldProps={loginFormik.getFieldProps}
                  touched={loginFormik.touched}
                  errors={loginFormik.errors}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <p className="text-[#000000] text-sm my-4">
                  Remember for 30 days
                </p>
              </div>
              <div className="flex justify-end items-center">
                <span
                  className="text-[#090C1B] text-sm cursor-pointer"
                  onClick={handleOpen}
                >
                  Forgot password
                </span>
              </div>
            </div>
            <Button
              type="submit"
              label="Login"
              className="w-full "
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
          <div className="flex items-center justify-center my-4">
            <hr className="w-full border-t border-[#999999]" />
            <span className="px-2 text-[10px] w-[200px] mx-auto block text-gray-500">
              or Login with
            </span>
            <hr className="w-full border-t border-[#999999]" />
          </div>
          {/* oauth authentication */}
          <div className="flex justify-between gap-1 md:gap-4">
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center cursor-pointer">
              <img src={Google} alt="Google" />
              <span className="text-xs">Sign in with Google</span>
            </div>
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center cursor-pointer">
              <img src={Facebook} alt="Facebook" />
              <span className="text-xs">Sign in with Facebook</span>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} closeOnOutsideClick={false}>
        <div className="rounded-[16px] lg:w-[700px] w-[345px] px-5 pt-10 pb-3">
          <div>
            <h1 className="text-primary text-center text-2xl md:text-4xl font-semibold">
              Forgot your password?
            </h1>
            <p className="py-5 text-[#999999] text-center max-w-[500px] mx-auto">
              Enter your email and we’ll send you instructions on how to reset
              your password.{' '}
            </p>

            <form
              className="items-center gap-5"
              onSubmit={forgotPasswordFormik.handleSubmit}
            >
              <div className="max-w-[400px] mx-auto">
                <InputField
                  placeholder="Email"
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
                  className="text-[#7B7B7B] cursor-pointer text-center mt-5"
                >
                  Back to Log In
                </p>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </AuthLayout>
  );
};
