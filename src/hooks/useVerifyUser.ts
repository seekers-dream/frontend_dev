// import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import { useVerifyTokenQuery } from "@/features/auth/api";

// interface DecodedToken {
//   exp: number;
//   [key: string]: any;
// }

// const useVerifyUser = () => {
//   const { data: getVerifiedUser, isLoading, error } = useVerifyTokenQuery();

//   const updateLocalStorage = (token: string, userInfo: any) => {
//     const decodedToken: DecodedToken = jwtDecode(token);

//     localStorage.setItem(
//       "@ridefuze_admin",
//       JSON.stringify({
//         token,
//         userInfo,
//         exp: decodedToken.exp,
//       })
//     );
//   };

//   const isTokenExpired = (exp: number) => {
//     const currentTime = Math.floor(Date.now() / 1000);
//     return exp < currentTime;
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       const storedData = localStorage.getItem("@ridefuze_admin");

//       if (storedData) {
//         const { token, userInfo, exp } = JSON.parse(storedData);

//         if (isTokenExpired(exp)) {
//           if (getVerifiedUser?.token) {
//             updateLocalStorage(getVerifiedUser.token, getVerifiedUser.userInfo);
//           }
//         }
//       } else {
//         if (getVerifiedUser?.token) {
//           updateLocalStorage(getVerifiedUser.token, getVerifiedUser.userInfo);
//         }
//       }
//     };

//     if (!isLoading && getVerifiedUser) {
//       checkAuth();
//     }
//   }, [isLoading, getVerifiedUser]);

//   return { isLoading, error };
// };

// export default useVerifyUser;
