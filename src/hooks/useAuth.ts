import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const storedData = localStorage.getItem('@seeker_user');
  const userData = authState.user
    ? authState
    : storedData
      ? JSON.parse(storedData)
      : null;

  return {
    user: userData?.user || null,
    isAuthenticated: userData?.isAuthenticated || false,
    userRole: userData?.user?.role || null,
  };
};
