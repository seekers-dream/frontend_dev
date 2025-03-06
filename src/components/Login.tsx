import or from './../images/or.png';
import Facebook from './../images/Facebook.png';
import Google from './../images/google.png';
import { useState } from 'react';
import SignupReuse from '../reuseable_components/SignupReuse';
import { useNavigate } from 'react-router-dom';
import Spinner from './../images/spinner.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosInstance from '../axios middleware/axiosInstance';
import ForgotPassword from './ForgotPassword';
import VerifyToken from './VerifyToken';
import ResetPassword from './ResetPassword';
import { isAxiosError } from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState<
    false | 'forgotPassword' | 'verifyToken' | 'resetPassword'
  >(false);
  const [isUser, setIsUser] = useState<boolean | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (emailRegex.test(inputEmail)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (passwordRegex.test(inputPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clicked) {
      alert('Please tick the button');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/login', {
        email,
        password,
      });
      console.log('resultData:', data);
      if (data.data.token) {
        localStorage.setItem('token', JSON.stringify(data.data.token));
      }
      if (data.data.refreshToken) {
        localStorage.setItem(
          'refreshToken',
          JSON.stringify(data.data.refreshToken),
        );
      }
      navigate('/');
      setTimeout(() => {
        setEmail('');
        setPassword('');
        // setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log(error);
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data.message
      ) {
        setIsUser(true);
        setLoading(false);
      }

      console.log(error.message, error?.response?.data?.messgage);
    }
  };

  return (
    <div className="flex justify-center mx-auto min-w-screen bg-white bg-opacity-50 backdrop-blur-lg relative">
      {/* Blur effect when popup is shown */}
      <div className={`${activePopup ? 'opacity-50 blur-sm' : ''}`}>
        {/* small screen */}
        <div className="bg-white mx-[20px] py-5 md:hidden">
          <h3 className="text-center font-bold my-2">
            Welcome to SeekersDream <br /> Sign in or create new account
          </h3>
          <div className="flex flex-col gap-2">
            <div className="border py-2 px-2 gap-3 w-full flex">
              <img src={Facebook} alt="facebook" />
              <p>Continue with Facebook</p>
            </div>
            <div className="border py-2 px-2 gap-3 w-full flex">
              <img src={Google} alt="google" />
              <p>Continue with Google</p>
            </div>
          </div>
          <div className="flex justify-center my-3">
            <p>OR</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={email}
              className={`py-2 px-3 w-full my-2 border outline-none ${isValid ? 'border-gray-300' : 'border-red-500'}`}
              placeholder="Email"
              onChange={handleChange}
              required
              onFocus={() => setIsUser(false)}
            />
            {!isValid && (
              <p className="text-red-500 text-sm">Please input a valid email</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                className={`py-2 px-3 w-full my-2 border outline-none ${isPasswordValid ? 'border-gray-300' : 'border-red-500'}`}
                placeholder="Password"
                onChange={handlePassword}
                required
                onFocus={() => setIsUser(false)}
              />
              {isUser ? (
                <p className="text-red-500 my-2">
                  Email or password is incorrect
                </p>
              ) : null}
              {showPassword ? (
                <FaEye
                  className="absolute top-[21px] right-[13px]"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-[21px] right-[13px]"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {!isPasswordValid && (
              <p className="text-red-500 text-sm">
                Your password should contain a capital <br /> letter, a number,
                and a special character.{' '}
              </p>
            )}
            <h2
              className="my-2 cursor-pointer text-center font-bold text-[#001F3F] text-[20px]"
              onClick={() => setActivePopup('forgotPassword')}
            >
              Forgot your Password?
            </h2>

            <button
              type="submit"
              className={`${loading ? 'bg-white border border-[#001F3F]' : 'bg-[#001F3F]'} text-[white] py-1 text-[20px] px-2 w-full rounded-lg flex justify-center items-center`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center border rounded-md">
                  <img src={Spinner} alt="Spinner" className="w-5 h-5" />
                </div>
              ) : (
                'Sign in'
              )}
            </button>
            <p className="text-[12px] my-2">
              New to SeekersDream?{' '}
              <span
                className="text-[#001F3F] font-bold cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </span>
            </p>
          </form>
          <div className="flex gap-2 my-3 items-center">
            <input
              type="checkbox"
              required
              checked={clicked}
              onChange={(e) => setClicked(e.target.checked)}
            />
            <p className="text-[13px]">
              By signing-in, i agree to SeekersDream's{' '}
              <span
                className="text-[#4285F4] cursor-pointer"
                onClick={() => navigate('/term-of-use')}
              >
                Term of use
              </span>
            </p>
          </div>
        </div>
        {/* large screen */}
        <div className="md:flex justify-between items-center gap-[60px] my-[30px] bg-white pl-5 shadow-2xl hidden relative">
          <div>
            <h3 className="my-3 text-[#171717] font-bold text-[32px]">
              Welcome Back!
            </h3>
            <p className="my-2">Enter your creditials to access your account</p>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={`w-full  border rounded-md my-1 outline-none py-1 px-3 ${isValid ? 'border-gray-300' : 'border-red-500'}}`}
                  placeholder="Enter your Email"
                />
                {!isValid && (
                  <p className="text-red-500 text-sm">
                    Please Enter a valid email
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="">Password</label>
                  <span
                    className="text-[#0C2A92] text-[10px] cursor-pointer"
                    onClick={() => setActivePopup('forgotPassword')}
                  >
                    forgot password
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className={`w-full  border rounded-md my-1 outline-none py-1 px-3 ${isPasswordValid ? 'border-gray-300' : 'border-red-500'}`}
                    placeholder="Enter your Password"
                  />
                  {showPassword ? (
                    <FaEye
                      className="absolute top-[15px] right-[13px]"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute top-[15px] right-[13px]"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {!isPasswordValid && (
                  <p className="text-red-500 text-sm">
                    Your password should contain a capital <br /> letter, a
                    number, and a special character.
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <input type="checkbox" />
                <p className="text-[#000000] my-4">Remember for 30 days</p>
              </div>
              <button
                type="submit"
                className="bg-[#001F3F] hover:bg-white text-[white] hover:text-[#001F3F] py-1 text-[20px] px-2 w-full rounded-lg flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center border rounded-md">
                    <img src={Spinner} alt="Spinner" className="w-5 h-5" />
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
            <div className="relative my-2">
              <div className="w-full h-[1px] bg-[#000000] my-4"></div>
              <div className="flex justify-center">
                <img src={or} alt="or" className="absolute top-[-5px]" />
              </div>
            </div>
            {/* oauth authentication */}
            <div className="flex justify-between  gap-4">
              <div className="flex border rounded-md py-1 px-2 items-center cursor-pointer">
                <img src={Google} alt="Google" />
                <span className="text-[12px]">Sign in with Google</span>
              </div>
              <div className="flex gap-2 border rounded-md py-1 px-2 items-center cursor-pointer">
                <img src={Facebook} alt="Facebook" />
                <span className="text-[12px]">Sign in with Facebook</span>
              </div>
            </div>
            <div className="my-2">
              <p>
                Have an account?
                <span
                  className="text-[#0F3DDE] cursor-pointer"
                  onClick={() => navigate('/register')}
                >
                  sign up
                </span>
              </p>
            </div>
          </div>
          <SignupReuse />
        </div>
      </div>
      {/* Forgot Password Popup */}
      {activePopup === 'forgotPassword' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ForgotPassword
            onClose={() => setActivePopup(false)}
            onVerify={() => setActivePopup('verifyToken')}
          />
        </div>
      )}
      {/* Verify Token Popup */}
      {activePopup === 'verifyToken' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <VerifyToken
            onClose={() => setActivePopup('forgotPassword')}
            onResetPassword={() => setActivePopup('resetPassword')}
          />
        </div>
      )}
      {/* Reset Password Popup */}
      {activePopup === 'resetPassword' && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ResetPassword onClose={() => setActivePopup(false)} />
        </div>
      )}
    </div>
  );
}
export default Login;
