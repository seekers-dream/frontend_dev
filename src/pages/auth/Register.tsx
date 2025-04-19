import Facebook from 'assets/images/Facebook.png';
import Google from 'assets/images/google.png';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/layout/AuthLayout';
import {
  useRegisterMutation,
  useResendCodeMutation,
  useVerifyEmailMutation,
} from '@/features/auth/api';
import { alert } from '@/utils/alert';
import { RegisterPayload } from '@/features/auth/interfaces';
import InputField from '@/ui/InputField';
import PasswordInput from '@/ui/PasswordInput';
import Button from '@/ui/Button';
import { useFormik } from 'formik';
import { registerValidationSchema } from '@/utils/validations';
import Modal from '@/ui/Modal';
import { useEffect, useRef, useState } from 'react';
import { formatTime } from '@/utils/helpers';

interface RegisterProps {
  onClose: () => void;
  openLogin: () => void;
}

export const Register = ({ onClose, openLogin }: RegisterProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [remainingTime, setRemainingTime] = useState(900);
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [verifyEmail, { isLoading: isConfirming }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, remainingTime]);

  const initRegister = (values: RegisterPayload) => {
    console.log(values);

    registerUser(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res);
          return;
        }
        setEmail(values.email);

        alert({
          type: 'success',
          message: 'Registration successfully',
          timer: 2000,
          cb: () => handleOpen(),
        });
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
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      initRegister(values);
    },
  });

  const handleVerify = async () => {
    const otp = verificationCode.join('');
    if (otp.length !== 6) {
      alert({
        type: 'warning',
        message: 'Please enter a 6-digit code.',
        timer: 2000,
      });
      return;
    }
    const payload = {
      otp,
      email,
    };
    await verifyEmail(payload)
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(response);
          alert({
            type: 'success',
            message: 'Email verified successfully.',
            timer: 2000,
            cb: () => navigate(`/login`),
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert({
          type: 'error',
          message: 'Invalid code',
          timer: 2000,
        });
      });
  };

  const handleResend = async () => {
    if (!email) {
      alert({
        type: 'warning',
        message: 'Email is required',
        timer: 2000,
      });
      return;
    }
    console.log(email);
    const payload = {
      email,
    };
    await resendCode(payload)
      .unwrap()
      .then((response) => {
        if (response.data) {
          console.log(response.data);

          alert({
            type: 'success',
            message: 'Code has been resent to your email',
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert({
          type: 'error',
          message: error.data.message || 'An error occurred',
          timer: 2000,
        });
      });
  };

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !verificationCode[index] &&
      index > 0
    ) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-[458px] mx-auto py-10  md:py-0 px-3 flex justify-center ">
        <div>
          <h3 className="my-3 text-black font-medium text-center text-2xl md:text-[32px]">
            Create an account
          </h3>
          <div className="my-2 text-center text-sm">
            <p>
              Already have an account?
              <span
                className="text-[#090C1B] pl-2 underline cursor-pointer"
                onClick={() => {
                  onClose();
                  openLogin();
                }}
              >
                Login
              </span>
            </p>
          </div>
          <form action="" onSubmit={handleSubmit} className="space-y-5 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <InputField
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  getFieldProps={getFieldProps}
                  touched={touched.firstName as boolean}
                  errors={errors.firstName}
                />
              </div>
              <div>
                <InputField
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  getFieldProps={getFieldProps}
                  touched={touched.lastName as boolean}
                  errors={errors.lastName}
                />
              </div>
            </div>

            <div>
              <InputField
                placeholder="Email "
                name="email"
                type="email"
                getFieldProps={getFieldProps}
                touched={touched.email as boolean}
                errors={errors.email}
              />
            </div>
            <div>
              <InputField
                placeholder="Phone Number "
                name="phoneNumber"
                type="number"
                getFieldProps={getFieldProps}
                touched={touched.phoneNumber as boolean}
                errors={errors.phoneNumber}
              />
            </div>

            <div>
              <PasswordInput
                placeholder="Password"
                name="password"
                getFieldProps={getFieldProps}
                touched={touched}
                errors={errors}
              />
            </div>

            <Button
              type="submit"
              label="Register"
              className="w-full bg-primary text-white "
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
          <div className="flex gap-2 my-5 items-center">
            <input type="checkbox" required />
            <p className="text-[13px]">
              I agree to SeekersDream's{' '}
              <span
                className="text-[#000000] underline cursor-pointer"
                onClick={() => navigate('/term-of-use')}
              >
                Terms & Conditions
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center my-4">
            <hr className="w-full border-t border-[#999999]" />
            <span className="px-2 text-[10px] w-[230px] mx-auto block text-gray-500">
              or Register with
            </span>
            <hr className="w-full border-t border-[#999999]" />
          </div>
          <div className="flex justify-center gap-1 md:gap-2 ">
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
        <div className="rounded-[16px] lg:w-[500px] w-[345px] px-5 pt-10 pb-3">
          <div>
            <h1 className="text-primary text-center text-2xl md:text-4xl font-semibold">
              OTP VERIFICATION
            </h1>
            <p className="py-5 text-center max-w-[596px] mx-auto">
              Enter the 6 digits code we sent to your E-mail
            </p>

            <div className="flex justify-center gap-5 mt-15 mb-5">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  onChange={(e) => handleChangeText(e.target.value, index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  className={`border bg-[#D9D9D9] rounded-lg outline-primary shadow-2xs  p-3 text-center w-12 h-16 ${
                    activeIndex === index
                      ? 'border-primary'
                      : verificationCode.join('').length === 6
                        ? 'border-primary'
                        : 'border-gray-300'
                  }`}
                  ref={(el) => (inputRefs.current[index] = el!)}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-5">
              <div>Code Expires in {formatTime(remainingTime)}</div>

              <Button
                onClick={handleVerify}
                label="Confrim"
                className="w-[200px] "
                type="button"
                loading={isConfirming}
              />
              <div onClick={handleResend}>
                <p className="text-[#7B7B7B] font-bold pt-3 text-sm cursor-pointer">
                  {isResending ? 'Resending code...' : 'Resend OTP'}
                </p>
              </div>
              <p onClick={handleClose} className="text-[#7B7B7B]">
                Back
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </AuthLayout>
  );
};
