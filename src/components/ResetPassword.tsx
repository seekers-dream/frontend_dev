import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from './Button';
import Swal from 'sweetalert2';
import axiosInstance from '../axios middleware/axiosInstance';
import { isAxiosError } from 'axios';

function ResetPassword({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState<boolean | null>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<
    boolean | null
  >(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkPassword = e.target.value;

    setNewPassword(checkPassword);
    if (password.test(checkPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkConfirmPassword = e.target.value;
    setConfirmPassword(checkConfirmPassword);
    if (password.test(checkConfirmPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/reset', {
        password: newPassword,
        confirmPassword: confirmPassword,
      });
      setTimeout(() => {
        Swal.fire({
          title: 'successful',
          icon: 'success',
          draggable: true,
        });
        onClose();
      }, 1000);
    } catch (error) {
      console.log(error);
      console.log(isAxiosError(error));
    } finally {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="w-[500px] h-[400px] md:h-[350px] px-[10px] flex flex-col z-50 bg-white justify-center  opacity-100">
      <h3 className="text-center font-bold my-3 text-[24px]">
        Enter New Password
      </h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col md:items-center">
          <div className="relative">
            <input
              type={`${showPassword ? 'password' : 'text'}`}
              className={`${!isPasswordValid ? 'border border-red-500' : 'border'} w-full md:w-[400px] px-2 py-3 outline-none`}
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={handlePassword}
              onFocus={() => setIsPasswordValid(false)}
            />
            {!showPassword ? (
              <FaEye
                className="absolute top-[20px] right-[12px]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-[20px] right-[12px]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          <div className="relative my-3">
            <input
              type={`${showConfirmPassword ? 'password' : 'text'}`}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={handleConfirmPassword}
              className={`${!isPasswordValid ? 'border border-red-500' : 'border'} w-full md:w-[400px] px-2 py-3 outline-none`}
            />
            {newPassword !== confirmPassword ? (
              <p className="text-red-500 w-full md:w-[400px]">
                Passwords do not match
              </p>
            ) : !isPasswordValid ? (
              <p className="text-red-500 w-full">
                Password must be at least 8 characters and must contain a
                special character and a number
              </p>
            ) : null}
            {!showConfirmPassword ? (
              <FaEye
                className="absolute top-[20px] right-[12px]"
                onClick={() => setShowConfirmPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-[20px] right-[12px]"
                onClick={() => setShowConfirmPassword(false)}
              />
            )}
          </div>
          <div className="mt-8 mb-3">
            <Button text="Submit" type="submit" />
          </div>
        </div>
      </form>
      <p className="text-center ">
        Know your password?{' '}
        <span className="text-[#7B7B7B]" onClick={() => onClose()}>
          Sign in
        </span>
      </p>
    </div>
  );
}

export default ResetPassword;
