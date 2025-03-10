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
import { useLoginMutation } from '@/features/auth/api';
import { LoginPayload } from '@/features/auth/interfaces';
import { alert } from '@/utils/alert';
import PasswordInput from '@/ui/PasswordInput';
import Button from '@/ui/Button';

export const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const initLogin = (values: LoginPayload) => {
    console.log(values);

    loginUser(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res);
          return;
        } else {
          dispatch(
            setCredentials({
              user: res.data,
              isAuthenticated: true,
              accessToken: res.data.token,
              refreshToken: res.data.refreshToken,
            }),
          );
        }
        alert({
          type: 'success',
          message: 'Login successfully',
          timer: 2000,
          cb: () => navigate(`/`),
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
      email: '',
      password: '',
    },
    // validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      initLogin(values);
    },
  });

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const passwordRegex =
  //   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
          <form onSubmit={handleSubmit} className="mt-16 space-y-5">
            <div>
              <InputField
                label="Email"
                name="email"
                type="email"
                getFieldProps={getFieldProps}
                touched={touched.email as boolean}
                errors={errors.email}
              />
            </div>
            <div>
              <div>
                <PasswordInput
                  label="Password"
                  name="password"
                  getFieldProps={getFieldProps}
                  touched={touched}
                  errors={errors}
                />
                <div className="flex justify-end items-center">
                  <span
                    className="text-[#0C2A92] text-[10px] cursor-pointer"
                    onClick={() => navigate('/forgot-password')}
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
            {/* {loading ? (
                <div className="flex justify-center items-center border rounded-md">
                  <img src={Spinner} alt="Spinner" className="w-5 h-5" />
                </div>
              ) : (
                'Login'
              )}
            </button> */}
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
    </AuthLayout>
  );
};
