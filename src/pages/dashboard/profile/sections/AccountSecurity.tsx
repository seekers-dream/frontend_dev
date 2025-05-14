import { useFormik } from 'formik';
import { alert } from '@/utils/alert';
import { ChangePasswordPayload } from '@/features/profile/interfaces';
import { useChangePasswordMutation } from '@/features/profile/api';
import Button from '@/ui/Button';
import PasswordInput from '@/ui/PasswordInput';
import { logout } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const AccountSecurity = () => {
  const dispatch = useDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleUpdatePassword = (values: ChangePasswordPayload) => {
    changePassword(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Password Changed Successfully',
            timer: 2000,
            cb: () => {
              dispatch(logout());
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

  const updatePasswordFormik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    // validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleUpdatePassword(values);
    },
  });

  return (
    <div className="">
      <div className="bg-white rounded-b-lg py-6 px-9 relative mt-16">
        <div className="text-black">
          <h1 className="font-medium text-xl">Account Security</h1>
          <p className="text-base mt-1">
            Here, you can edit and change your password
          </p>
        </div>

        <form
          onSubmit={updatePasswordFormik.handleSubmit}
          className="grid grid-cols-2 mt-5 gap-10"
        >
          <div>
            <PasswordInput
              label="New Password"
              placeholder="Password"
              name="password"
              className="py-4"
              getFieldProps={updatePasswordFormik.getFieldProps}
              touched={updatePasswordFormik.touched}
              errors={updatePasswordFormik.errors}
            />
          </div>
          <div>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="py-4"
              getFieldProps={updatePasswordFormik.getFieldProps}
              touched={updatePasswordFormik.touched}
              errors={updatePasswordFormik.errors}
            />
          </div>

          <div>
            <Button
              label="Save Changes"
              type="submit"
              className="w-[178px] bg-primary text-white gap-5 items-center"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSecurity;
