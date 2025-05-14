import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';
import { useGetProfileQuery } from '@/features/profile/api';

const useGetProfileData = () => {
  const dispatch = useDispatch();

  const {
    data: getProfile,
    isLoading,
    isError,
    refetch,
  } = useGetProfileQuery();

  const profileInfo = getProfile?.data?.profileData || {};

  useEffect(() => {
    if (profileInfo) {
      // Get the existing data from local storage
      const storedData = JSON.parse(
        localStorage.getItem('@seeker_user') || '{}',
      );

      const updatedData = {
        ...storedData,
        user: {
          ...storedData.user,
          ...profileInfo,
        },
      };

      localStorage.setItem('@seeker_user', JSON.stringify(updatedData));
      dispatch(setCredentials(updatedData));
    }
  }, [profileInfo, dispatch]);

  return {
    profileInfo,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetProfileData;
