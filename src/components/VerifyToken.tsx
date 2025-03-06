import React, { useEffect, useState, useRef } from 'react';
import Button from './Button';
import axiosInstance from '../axios middleware/axiosInstance';
import { AxiosError, isAxiosError } from 'axios';
import Swal from 'sweetalert2';

function VerifyToken({
  onClose,
  onResetPassword,
}: {
  onClose: () => void;
  onResetPassword: () => void;
}) {
  const [countDown, setCountDown] = useState(60 * 15);
  const [OTPToken, setOTPToken] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // cursor mounts the first box
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countDown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingMinutes = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}: ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
  };

  //   handle submission
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (!token) {
        throw new Error('token not found');
      }
      const { data } = await axiosInstance.post('/verify', {
        email,
        otp: OTPToken,
        token,
      });
      console.log(data);
      onResetPassword();
    } catch (error: any) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error.message === 'Network Error') {
          Swal.fire({
            title: 'The Internet?',
            text: 'Please check your internet',
            icon: 'question',
          });
        } else if (error.response) {
          if (error.response.data.message === 'Token has expired') {
            Swal.fire({
              title: 'OTP has expired, Try resending it again ',
              icon: 'error',
              draggable: true,
            });
          } else if (
            error.response.data.message === 'invalid otp' ||
            error.response.data.message === 'Internal Error'
          ) {
            Swal.fire({
              title:
                error.response.data.message === 'invalid otp'
                  ? 'Invalid OTP, Please check your email again'
                  : 'Something went wrong 😢',
              icon: 'error',
              draggable: true,
            });
          }
        }
      }
    } finally {
      setOTPToken('');
    }
    console.log(OTPToken);
  };

  // handle input change
  const handleInputChange = (index: number, value: string) => {
    setOTPToken(
      OTPToken.substring(0, index) + value + OTPToken.substring(index + 1),
    );

    // let the cursor move to the next box, when one is occupied
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // handle post to clipboard
  const handleClipBoard = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // get only the first 6 characters of the data
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      // check if pasted data is numeric
      setOTPToken(pastedData);
    }
    // move focus to the next input after pasting
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    } else {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  // handle keyboard delete
  const handleBackSpace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // e.preventDefault();
    if (e.key === 'Backspace' && !OTPToken[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // handle resend Token
  const handleResendToken = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      console.log({
        email,
        token,
      });
      const { data } = await axiosInstance.post('/resend-otp', {
        token,
        email,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCountDown(60 * 15);
    }
  };

  return (
    <div className="w-[500px] h-[350px] flex flex-col justify-center items-center z-50 p-6 bg-white opacity-100">
      <h3 className="text-[30px] my-2">OTP Verification</h3>
      <p className="w-[200px] text-center">
        Enter the 6 digits code we sent to your E-mail
      </p>
      {/* input for token */}
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2 my-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={OTPToken[index] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              onKeyDown={(e) => handleBackSpace(index, e)}
              maxLength={1}
              className="w-10 h-10 text-center border border-gray-300 outline-none
            "
              ref={(el) => (inputRefs.current[index] = el)}
              onPaste={index === 0 ? handleClipBoard : undefined}
              required
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-[10px]">
            Code Expires in{' '}
            <span className={countDown < 10 ? 'text-red-500' : 'text-black'}>
              {formatTime(countDown)}
            </span>
          </p>
          <div className="my-3">
            <Button text="Confirm" type="submit" />
          </div>
          <p
            className="text-[#7B7B7B] cursor-pointer"
            onClick={handleResendToken}
          >
            Resend Code
          </p>
          <p onClick={onClose} className="text-[#7B7B7B] cursor-pointer">
            Back
          </p>
        </div>
      </form>
    </div>
  );
}
export default VerifyToken;
