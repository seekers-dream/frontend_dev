import axiosInstance from '../axios middleware/axiosInstance';
import Button from './Button';
import { useState } from 'react';
import { isAxiosError } from 'axios';
import Swal from 'sweetalert2';

function ForgotPassword({
  onClose,
  onVerify,
}: {
  onClose: () => void;
  onVerify: () => void;
}) {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(true);
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkEmail = e.target.value;
    setEmail(checkEmail);
    if (emailRegex.test(checkEmail)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/forgot', {
        email,
      });
      const { token } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      // console.log('result:', data);
      onVerify(); // Transition to VerifyToken popup
      setEmail(''); // Clear email only if request is successful
    } catch (error) {
      if (isAxiosError(error)) {
        setIsUser(true);
        console.log(error);
        console.log(error.response?.data);
      } else if (
        isAxiosError(error) &&
        error.response &&
        error.response.data.message === 'Internal Error'
      ) {
        Swal.fire({
          title: 'Something went wrong, Please try again later 😢',
          icon: 'error',
          draggable: true,
        });
      }
    }
  };

  return (
    <div
      className={`w-[500px] ${isUser ? 'h-[450px]' : 'h-[400px]'} bg-white rounded-md opacity-100 z-50 p-6`}
    >
      <h3 className="text-center font-bold text-[30px]">
        Forgot your password?
      </h3>
      <p className="text-center my-4 text-[20px]">
        Enter your email and we'll send you instructions on how to reset your
        password
      </p>
      <form
        className="md:flex md:flex-col md:items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          className="w-full md:w-[400px] py-2 px-3 border rounded-md my-2 outline-none "
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
          onFocus={() => setIsUser(false)}
        />
        {isUser ? (
          <p className="text-red-500 mt-2">
            We could not find a record from this email address
          </p>
        ) : null}
        {!isValid && <p className="text-red-500 text-sm">Invalid Email</p>}
        <div className="mt-8 mb-3">
          <Button text="Send" type="submit" />
        </div>
      </form>
      <p className="text-center  text-[13px]">
        Back to{' '}
        <span
          className="cursor-pointer text-[#7B7B7B]"
          onClick={() => onClose()}
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
export default ForgotPassword;
