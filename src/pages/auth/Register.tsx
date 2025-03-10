import or from 'assets/images/or.png';
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

export const Register = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [remainingTime, setRemainingTime] = useState(900); // 15 minutes in seconds

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const [registerUser, { isLoading }] = useRegisterMutation();
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
      <div className="max-w-[458px] mx-auto px-3 flex justify-center bg-white ">
        <div>
          <h3 className="my-3 text-black font-medium text-2xl md:text-[32px]">
            Welcome to SeekersDream
          </h3>
          <p className="font-medium text-base pt-2">Create new account</p>

          <form action="" onSubmit={handleSubmit} className="space-y-5 mt-16">
            <div>
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                getFieldProps={getFieldProps}
                touched={touched.firstName as boolean}
                errors={errors.firstName}
              />
            </div>
            <div>
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                getFieldProps={getFieldProps}
                touched={touched.lastName as boolean}
                errors={errors.lastName}
              />
            </div>

            <div>
              <InputField
                label="Email "
                name="email"
                type="email"
                getFieldProps={getFieldProps}
                touched={touched.email as boolean}
                errors={errors.email}
              />
            </div>
            <div>
              <InputField
                label="Phone Number "
                name="phoneNumber"
                type="number"
                getFieldProps={getFieldProps}
                touched={touched.phoneNumber as boolean}
                errors={errors.phoneNumber}
              />
            </div>

            <div>
              <PasswordInput
                label="Password"
                name="password"
                getFieldProps={getFieldProps}
                touched={touched}
                errors={errors}
              />
            </div>

            <Button
              type="submit"
              label="Register"
              className="w-full "
              loading={isLoading}
              disabled={isLoading}
            />
          </form>
          <div className="flex gap-2 my-5 items-center">
            <input type="checkbox" required />
            <p className="text-[13px]">
              By signing-up, I agree to SeekersDream's{' '}
              <span
                className="text-[#4285F4] cursor-pointer"
                onClick={() => navigate('/term-of-use')}
              >
                Term of use
              </span>
            </p>
          </div>
          <div className="relative my-2">
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
            <div className="flex justify-center">
              <img src={or} alt="or" className="absolute top-[-5px]" />
            </div>
          </div>
          <div className="flex justify-center gap-1 md:gap-2 mt-10">
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
              Already have an account?
              <span
                className="text-[#0F3DDE] pl-2 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
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
                  // placeholder=""
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
