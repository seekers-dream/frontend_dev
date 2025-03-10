import { ReactNode } from 'react';
import register from 'assets/images/signup_image.png';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-full md:w-1/2">{children}</div>
      <div className="hidden md:block md:w-1/2">
        <img
          src={register}
          alt="image"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
};
export default AuthLayout;
