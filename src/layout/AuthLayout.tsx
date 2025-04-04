import { ReactNode } from 'react';
import authImg from 'assets/images/authImg.png';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden md:block md:w-1/2">
        <img
          src={authImg}
          alt="image"
          className="min-h-screen w-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 bg-[#F7F7F7]">{children}</div>
    </div>
  );
};
export default AuthLayout;
