import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = localStorage.getItem("@ridefuze_admin");
    const isDashboardPath = location.pathname.startsWith("/dashboard");

    if (userInfo && !isDashboardPath) {
      navigate("/dashboard/overview");
    }
  }, [navigate, location]);
};

export default useAuthRedirect;
