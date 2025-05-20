import InputField from '@/ui/InputField';
import ProfileHeading from '../ProfileHeading';
import { useFormik } from 'formik';
import { alert } from '@/utils/alert';
import { UpdatePayload } from '@/features/profile/interfaces';
import { useUpdateProfileMutation } from '@/features/profile/api';
import { getMaxDate } from '@/utils/helpers';
import InputTextArea from '@/ui/InputTextArea';
import Button from '@/ui/Button';
import SelectField from '@/ui/SelectInput';
import useGetProfileData from '@/hooks/useGetProfileData';

const ProfileInfo = () => {
  const {
    profileInfo,
    // isLoading: isFetchingProfile,
    // refetch,
  } = useGetProfileData();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleProfileSubmit = (values: UpdatePayload) => {
    updateProfile(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Message Sent Successfully',
            timer: 2000,
          });
        }
        updateProfileFormik.resetForm();
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

  const updateProfileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profileInfo?.firstName || '',
      lastName: profileInfo?.lastName || '',
      phoneNumber: profileInfo?.phoneNumber || '',
      gender: profileInfo?.gender || '',
      address: profileInfo?.address || '',
      date_of_birth: profileInfo?.date_of_birth || '',
      state: profileInfo?.state || '',
      country: profileInfo?.country || '',
      username: profileInfo?.username || '',
      bio: profileInfo?.bio || '',
    },
    // validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleProfileSubmit(values);
    },
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <div className="">
      <ProfileHeading data={profileInfo} />
      <div className="bg-white rounded-b-lg py-6 px-9 relative mt-5">
        <div className="text-black">
          <h1 className="font-medium text-xl">Basic Profile</h1>
          <p className="text-base mt-1">
            This information can be edited, don’t forget to save changes after
            editing
          </p>
        </div>

        <form
          onSubmit={updateProfileFormik.handleSubmit}
          className="lg:grid  space-y-5 lg:space-y-0 grid-cols-2 mt-5 gap-10"
        >
          <div>
            <InputField
              label="First Name"
              placeholder="First Name"
              name="firstName"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.firstName as boolean}
              errors={updateProfileFormik.errors.firstName as string}
            />
          </div>
          <div>
            <InputField
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.firstName as boolean}
              errors={updateProfileFormik.errors.firstName as string}
            />
          </div>
          <div>
            <InputField
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.username as boolean}
              errors={updateProfileFormik.errors.username as string}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              type="number"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.phoneNumber as boolean}
              errors={updateProfileFormik.errors.phoneNumber as string}
            />
            <SelectField
              label="Gender"
              placeholder="Select Gender"
              name="gender"
              options={genderOptions}
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.gender as boolean}
              errors={updateProfileFormik.errors.gender as string}
            />
          </div>
          <div>
            <InputField
              label="Date of Birth"
              placeholder="Date of birth"
              name="date_of_birth"
              type="date"
              max={getMaxDate()}
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.date_of_birth as boolean}
              errors={updateProfileFormik.errors.date_of_birth as string}
            />
          </div>
          <div>
            <InputField
              label="Country"
              placeholder="Country"
              name="country"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.country as boolean}
              errors={updateProfileFormik.errors.country as string}
            />
          </div>
          <div>
            <InputField
              label="State"
              placeholder="State"
              name="state"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.state as boolean}
              errors={updateProfileFormik.errors.state as string}
            />
          </div>
          <div>
            <InputField
              label="Address"
              placeholder="House Address"
              name="address"
              type="text"
              className="py-4"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.address as boolean}
              errors={updateProfileFormik.errors.address as string}
            />
          </div>
          <div className="col-span-2">
            <InputTextArea
              label="Bio"
              placeholder="Write a short bio about yourself"
              rows={5}
              name="bio"
              getFieldProps={updateProfileFormik.getFieldProps}
              touched={updateProfileFormik.touched.bio as boolean}
              errors={updateProfileFormik.errors.bio as string}
            />
          </div>

          <div>
            <Button
              label="Save Changes"
              type="submit"
              className="w-full lg:w-[178px] bg-primary text-white gap-5 items-center"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
