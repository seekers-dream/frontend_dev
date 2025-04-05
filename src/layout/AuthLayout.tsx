import { ReactNode } from 'react';
import authImg from 'assets/images/authImg.jpg';
import ILogoWhite from 'assets/svg/logoWhite.svg?react';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 top-5 flex items-start justify-center z-10 text-white italic">
          <ILogoWhite />
        </div>
        <div className="absolute inset-0 bottom-5 flex items-end justify-center z-10 text-white italic">
          <p>Find your dream home...</p>
        </div>
        <img
          src={authImg}
          alt="image"
          className="h-[600px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      </div>
      <div className="w-full md:w-1/2 bg-[#F7F7F7]">{children}</div>
    </div>
  );
};
export default AuthLayout;
