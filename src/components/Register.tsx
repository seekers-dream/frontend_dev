import or from './../images/or.png';
import Facebook from './../images/Facebook.png';
import Google from './../images/google.png';
import { useEffect, useState } from 'react';
import SignupReuse from '../reuseable_components/SignupReuse';
import { useNavigate } from 'react-router-dom';
import Spinner from './../images/spinner.svg';
import axiosInstance, {
  setupInterceptorsInstance,
} from '../axios middleware/axiosInstance';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptorsInstance(navigate);
  }, [navigate]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clicked) {
      alert('Please tick the checkbox');
      return;
    }

    const users = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    };

    try {
      setLoading(true);
      await axiosInstance.post('/register', users);
      setTimeout(() => {
        Swal.fire({
          title: 'successful',
          icon: 'success',
          draggable: true,
        });
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setClicked(false);
    }
  };

  return (
    <div className="flex justify-center mx-auto min-w-screen bg-white-400 bg-opacity-50 backdrop-blur-lg">
      {/* small screen  */}
      <div className="bg-white mx-[20px] py-5 md:hidden">
        <h3 className="text-center font-bold my-2">
          Welcome to SeekersDream <br /> Create new account
        </h3>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={firstName}
            className="py-2 px-3 w-full my-2 border outline-none"
            placeholder="Firstname"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastname"
            value={lastName}
            className="py-2 px-3 w-full my-2 border outline-none"
            placeholder="Lastname"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            name="phonenumber"
            value={phoneNumber}
            className="py-2 px-3 w-full my-2 border outline-none"
            placeholder="Phone number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            name="email"
            value={email}
            className="py-2 px-3 w-full my-2 border outline-none"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              className="py-2 px-3 w-full my-2 border outline-none"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
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
              'Submit'
            )}
          </button>
          <p className="text-[12px] my-2">
            Have an account?{' '}
            <span
              className="text-[#001F3F] font-bold cursor-pointer"
              onClick={() => navigate('/sign-in')}
            >
              Sign-in
            </span>
          </p>
        </form>
        <div className="flex gap-2 my-3 items-center">
          <input
            type="checkbox"
            checked={clicked}
            required
            onChange={(e) => setClicked(e.target.checked)}
          />
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
        <div className="flex justify-center my-3 flex-col items-center">
          <div className="w-full h-[1px] border-b border border-[#000000]"></div>
          <p className="font-bold">Or connect with: </p>
        </div>
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
      </div>
      {/* large screen */}
      <div className="md:flex justify-between items-center gap-[60px] my-[30px] bg-white pl-5 shadow-2xl hidden">
        <div>
          <h3 className="my-3 text-[#171717] font-bold">
            Welcome to SeekersDream <br /> Create new account
          </h3>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Firstname</label>
              <input
                type="text"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full  border rounded-md my-1 outline-none py-1 px-3"
                placeholder="Enter your Firstname"
              />
            </div>
            <div>
              <label htmlFor="">Lastname</label>
              <input
                type="text"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full  border rounded-md my-1 outline-none py-1 px-3"
                placeholder="Enter your Lastname"
              />
            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full  border rounded-md my-1 outline-none py-1 px-3"
                placeholder="Enter your Phone Number"
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  border rounded-md my-1 outline-none py-1 px-3"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  border rounded-md my-1 outline-none py-1 px-3"
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
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                required
                checked={clicked}
                onChange={(e) => setClicked(e.target.checked)}
              />
              <p className="text-[#CFCFCF]">
                By signing-up, I agree to SeekersDream's{' '}
                <span className="text-[#1877F2]">Terms of use</span>
              </p>
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
                'Signup'
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
          <div className="flex justify-between">
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center">
              <img src={Google} alt="Google" />
              <span className="text-[12px]">Sign in with Google</span>
            </div>
            <div className="flex gap-2 border rounded-md py-1 px-2 items-center">
              <img src={Facebook} alt="Facebook" />
              <span className="text-[12px]">Sign in with Facebook</span>
            </div>
          </div>
          <div className="my-2">
            <p>
              Have an account?
              <span
                className="text-[#0F3DDE] cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
        <SignupReuse />
      </div>
    </div>
  );
}

export default Register;
