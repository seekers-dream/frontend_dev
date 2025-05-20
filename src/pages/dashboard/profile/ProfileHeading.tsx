import { useUpdateProfilePictureMutation } from '@/features/profile/api';
import { alert } from '@/utils/alert';
import { getInitials } from '@/utils/helpers';
import { useRef } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
interface ProfileData {
  id: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  email?: string;
  address?: string;
}

const ProfileHeading = ({ data }: { data: ProfileData }) => {
  const { id, firstName, lastName, avatarUrl, email, address } = data || {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateAvatar, { isLoading }] = useUpdateProfilePictureMutation();

  // Function to handle file input click
  const handleEditIconClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!file.type.includes('image')) {
      alert({
        type: 'error',
        message: 'Please upload an image file',
        timer: 3000,
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert({
        type: 'error',
        message: 'Image size should be less than 2MB',
        timer: 3000,
      });
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('avatar', file);

    await updateAvatar({
      id,
      avatar: formData,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res) {
          alert({
            type: 'success',
            message: 'Profile picture updated successfully',
            timer: 2000,
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

  return (
    <div className="bg-white rounded-t-lg py-6 px-9 relative">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-semibold text-[#090C1B]">
          {avatarUrl ? (
            <div className="relative">
              <img
                src={avatarUrl}
                alt="profile"
                className="size-20 md:size-32 rounded-full object-cover"
              />
              <div>
                <FaRegEdit
                  onClick={handleEditIconClick}
                  className="absolute right-0 bottom-0 cursor-pointer size-5 "
                />
              </div>
            </div>
          ) : (
            <div className="relative rounded-full bg-gray-200 text-gray-600 size-20 md:size-32 text-4xl md:text-5xl flex items-center justify-center">
              {getInitials(firstName, lastName ?? '--')}

              <div>
                <FaRegEdit
                  onClick={handleEditIconClick}
                  className="absolute right-0 bottom-2 cursor-pointer size-6 "
                />
              </div>
            </div>
          )}
        </h1>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="text-black">
          <h1 className="text-xl md:text-2xl font-semibold">
            {firstName} {lastName}
          </h1>
          <p className="text-sm text-gray-400 font-normal">{email ?? '--'}</p>
          <p className="text-xl pb-3 font-normal">{address ?? '--'}</p>

          <div className="w-[73px] h-[23px] rounded-full flex justify-center gap-3 text-[8px] items-center border border-[#999999] text-black">
            <div className="bg-[#03DD26] rounded-full size-[6px]"></div>
            <p>Available</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-8 right-8 rounded-lg bg-[#090C1B1A] h-[44px] w-[159px]  border border-[#090C1B1A] ">
        <button className="flex items-center gap-3 text-black font-semibold rounded-full px-4 py-2">
          <MdOutlineEdit />
          {isLoading ? 'Uploading...' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeading;
