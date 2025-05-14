import { useEffect, useRef, useState } from 'react';
import Button from '@/ui/Button';
import ILogo from '@/assets/svg/logo.svg?react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { LiaTimesSolid } from 'react-icons/lia';
import { RxAvatar } from 'react-icons/rx';
import Modal from '@/ui/Modal';
import { Login, Register } from '@/pages';
import { useAuth } from '@/hooks/useAuth';
import ITruck from '@/assets/svg/truck.svg?react';
import { AiOutlineLogout } from 'react-icons/ai';
import { logout } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import ILogoWhite from '@/assets/svg/logoWhite.svg?react';
import { getInitials } from '@/utils/helpers';

const navLinks = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'About us',
    url: '/about',
  },
  {
    label: 'Properties',
    url: '/properties',
  },
  {
    label: 'Logistics',
    url: '/logistics',
  },
  {
    label: 'Contact us',
    url: '/contact',
  },
];

interface NavbarProps {
  background?: string;
  color?: string;
}

const Navbar = ({ background, color }: NavbarProps) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({
    login: false,
    register: false,
    forgotPassword: false,
    logout: false,
  });
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change to black background after scrolling 50px
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  type OpenKeys = 'login' | 'register' | 'forgotPassword' | 'logout';

  const handleIsOpen = (type: OpenKeys) => {
    setIsOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleClose = (type: string) => {
    setIsOpen((prev) => ({ ...prev, [type]: false }));
  };
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenu, setIsUserMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setIsMobile(false);
    }
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node)
    ) {
      setIsUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        hasScrolled ? 'bg-black text-white' : background || 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between  max-w-[90%] mx-auto py-2 md:py-3">
        {hasScrolled ? (
          <ILogoWhite className="w-1/2 md:w-[202px]" />
        ) : (
          <ILogo className="w-1/2 md:w-[202px]" />
        )}
        <div className="hidden lg:block">
          <ul className="flex gap-9">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={`relative ${color}  font-semibold`}
              >
                <NavLink
                  to={link.url}
                  className={({ isActive }) =>
                    isActive ? `${color} font-bold` : 'hover:underline'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block relative" ref={userMenuRef}>
          {isAuthenticated ? (
            <div className="flex justify-center items-center gap-20">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => navigate('/dashboard/listings')}
                  className="flex gap-3 h-[40px] w-[190px] justify-center items-center text-white text-base rounded-full bg-[#090C1B] cursor-pointer"
                >
                  <FiPlus />
                  <p>Add Listing</p>
                </div>
                <ITruck />
              </div>
              <div
                onClick={handleUserMenu}
                className="flex items-center gap-1 cursor-pointer"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user?.avatarUrl}
                    alt="profile"
                    className="rounded-full size-16"
                  />
                ) : (
                  <div className="relative font-medium rounded-full bg-gray-200 text-gray-600 size-10 text-base flex items-center justify-center">
                    {getInitials(user.firstName, user.lastName ?? '--')}
                  </div>
                )}

                <IoMdArrowDropdown
                  size={24}
                  className={`text-white ${isUserMenu ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          ) : (
            <div className="lg:flex items-center gap-5">
              <Button
                onClick={() => handleIsOpen('login')}
                type="button"
                label="Log In"
                className={` rounded-2xl  border border-primary hover:text-white text-sm ${color}`}
              />
              <Button
                onClick={() => handleIsOpen('register')}
                type="button"
                label="Sign up"
                className={`text-sm  bg-primary text-white rounded-2xl`}
              />
            </div>
          )}

          <div>
            {isUserMenu && (
              <ul className="absolute py-2  right-0 mt-2  bg-white shadow-lg border border-[#EAECF0] rounded">
                <Link
                  to="/dashboard/overview"
                  className="hover:bg-gray-50 p-2 flex items-center gap-4 font-semibold text-[#475467]"
                >
                  <LuLayoutDashboard className="size-5" />
                  <p>Dashboard</p>
                </Link>
                <Link
                  to="/dashboard/profile"
                  className=" hover:bg-gray-50 p-2 flex items-center gap-4 font-semibold text-[#475467]"
                >
                  <RxAvatar className="size-5" />
                  <p>Profile</p>
                </Link>

                <div
                  onClick={() => handleIsOpen('logout')}
                  className="flex items-center hover:bg-gray-50 py-2 gap-4 p-2 text-red-500 cursor-pointer"
                >
                  <AiOutlineLogout className="size-5" />
                  <p className="text-sm font-semibold">Log out</p>
                </div>
              </ul>
            )}
          </div>
        </div>

        <div ref={mobileMenuRef} className="relative lg:hidden">
          <div>
            {!isMobile ? (
              <CiMenuBurger
                size={30}
                className="text-white"
                onClick={handleMobileMenu}
              />
            ) : (
              <LiaTimesSolid
                size={30}
                className="text-white"
                onClick={handleMobileMenu}
              />
            )}
          </div>

          <div>
            {isMobile && (
              <div className="absolute top-10 right-0 w-48 bg-white shadow-lg border border-[#EAECF0] rounded p-4">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.url}
                        className="text-[#475467] font-semibold"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="border-y border-[#EAECF0] my-3 py-3  ">
                  {isAuthenticated ? (
                    <div className="flex gap-3 items-center">
                      <div>
                        {user?.avatarUrl ? (
                          <img
                            src={user?.avatarUrl}
                            alt="profile"
                            className="rounded-full size-9"
                          />
                        ) : (
                          <div className="relative font-medium rounded-full bg-gray-200 text-gray-600 size-7 text-[8px] flex items-center justify-center">
                            {getInitials(user.firstName, user.lastName ?? '--')}
                          </div>
                        )}
                      </div>
                      <div className="w-[80%] text-xs">
                        <h1 className="font-semibold">
                          {user.firstName} {user.lastName}
                        </h1>
                        <h1 className="font-medium text-primary">
                          {user?.email}
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row mt-2 items-center gap-3">
                      <Button
                        type="button"
                        label="Log In"
                        onClick={() => handleIsOpen('login')}
                        className="bg-transparent text-primary hover:text-white w-full hover:text-white! border border-primary text-sm"
                      />
                      <Button
                        onClick={() => handleIsOpen('register')}
                        type="button"
                        label="Sign up"
                        className="text-sm bg-primary text-white w-full"
                      />
                    </div>
                  )}
                </div>
                <div
                  onClick={() => handleIsOpen('logout')}
                  className="flex items-center gap-4 mt-3 text-red-500 cursor-pointer"
                >
                  <AiOutlineLogout />
                  <p className="text-sm font-semibold">Log out</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen.login}
        onClose={() => handleClose('login')}
        closeOnOutsideClick={false}
        background="bg-[#F7F7F7]"
      >
        <Login
          onClose={() => handleClose('login')}
          openRegister={() => handleIsOpen('register')}
        />
      </Modal>
      <Modal
        isOpen={isOpen.register}
        onClose={() => handleClose('register')}
        closeOnOutsideClick={false}
        background="bg-[#F7F7F7]"
      >
        <Register
          onClose={() => handleClose('register')}
          openLogin={() => handleIsOpen('login')}
        />
      </Modal>
      <Modal
        isOpen={isOpen.logout}
        onClose={() => handleClose('logout')}
        background="bg-[#F7F7F7]"
      >
        <div className="max-w-[400px] mx-auto px-5 py-10">
          <h1 className="text-gray-500 font-medium text-lg">
            Are you sure you want to logout?
          </h1>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              type="button"
              label="Cancel"
              onClick={() => handleClose('logout')}
              className="bg-transparent text-primary! hover:text-white border border-primary text-sm"
            />
            <Button
              type="button"
              label="Logout"
              onClick={handleLogout}
              className="bg-red-500 text-white text-sm"
            />
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
