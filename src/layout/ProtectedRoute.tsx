// import { useState, useEffect } from 'react';
// import axiosInstance from '../axios middleware/axiosInstance';
// import { Outlet, Navigate } from 'react-router-dom';

// function Protected() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   useEffect(() => {
//     axiosInstance
//       .get('/check-session')
//       .then(() => setIsAuthenticated(true))
//       .catch(() => setIsAuthenticated(false));
//   }, []);
//   if (isAuthenticated === null) return <div>loading</div>;
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// }
// export default Protected;

import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const storedData = localStorage.getItem('@seeker_user');
  const isAuthenticated = storedData && JSON.parse(storedData).isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
