import { useEffect, useRef, useState } from 'react';
import Button from '@/ui/Button';
import { ILogo } from '@/utils/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { LiaTimesSolid } from 'react-icons/lia';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import Modal from '@/ui/Modal';
import { Login, Register } from '@/pages';

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
    url: '#',
  },
  {
    label: 'Contact us',
    url: '/contact',
  },
];

interface NavbarProps {
  background: string;
}

const Navbar = ({ background }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState({
    login: false,
    register: false,
    forgotPassword: false,
  });

  type OpenKeys = 'login' | 'register' | 'forgotPassword';

  const handleIsOpen = (type: OpenKeys) => {
    setIsOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const handleClose = (type: string) => {
    setIsOpen((prev) => ({ ...prev, [type]: false }));
  };
  const isLoggedin = false;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenu, setIsUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleProductsClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
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

  return (
    <nav className={`sticky top-0 z-50 ${background} `}>
      <div className="flex items-center justify-between  max-w-[90%] mx-auto py-2 md:py-3">
        <ILogo className="w-1/2 md:w-[202px]" />
        <div className="hidden lg:block">
          <ul className="flex gap-9">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative text-white font-semibold"
                ref={link.label === 'Properties' ? dropdownRef : null}
              >
                {link.label === 'Properties' ? (
                  <Link
                    to={link.url}
                    onClick={handleProductsClick}
                    className="flex gap-2  items-center"
                  >
                    {link.label}

                    <MdOutlineKeyboardArrowDown
                      size={20}
                      className={`${
                        isDropdownOpen ? 'rotate-180' : ''
                      } transition-transform duration-300`}
                    />
                  </Link>
                ) : (
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive ? 'text-white' : 'hover:underline'
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
                {link.label === 'Properties' && isDropdownOpen && (
                  <ul className="absolute p-2  left-0 mt-2 w-72 bg-white shadow-lg border border-[#EAECF0] rounded">
                    <li className="px-2 py-2  text-sm hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="/products/articles"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Articles, videos, and guides by experts on sex.
                      </Link>
                    </li>
                    <li className="px-2 py-2  text-sm border-[#D3D8DE] border-y cursor-pointer hover:bg-gray-100">
                      <Link
                        to="/products/courses"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Courses or workshops for registered users.
                      </Link>
                    </li>
                    <li className="px-2 py-2  text-sm border-[#D3D8DE] cursor-pointer border-b hover:bg-gray-100">
                      <Link
                        to="/products/courses"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Free and premium content based on user subscriptions.
                      </Link>
                    </li>
                    <li className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                      <Link
                        to="/products/interactive"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Interactive Q&A with specialists.
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block relative" ref={userMenuRef}>
          {isLoggedin ? (
            <div className="h-[44px] w-[121px] rounded-lg border-2 border-primary flex justify-center items-center gap-6">
              <CiMenuBurger
                size={25}
                className="text-primary"
                onClick={handleUserMenu}
              />
              <RxAvatar className="size-9" />
            </div>
          ) : (
            <div className="lg:flex items-center gap-5">
              <Button
                onClick={() => handleIsOpen('login')}
                type="button"
                label="Log In"
                className="bg-transparent rounded-2xl text-primary! hover:text-white! border border-primary text-sm"
              />
              <Button
                onClick={() => handleIsOpen('register')}
                type="button"
                label="Sign up"
                className="text-sm rounded-2xl"
              />
            </div>
          )}

          <div>
            {isUserMenu && (
              <ul className="absolute p-2  right-0 mt-2 w-72 bg-white shadow-lg border border-[#EAECF0] rounded">
                <li className="px-2 py-2  text-sm hover:bg-gray-100 cursor-pointer">
                  <Link
                    to="/profile/courses"
                    onClick={() => setIsUserMenu(false)}
                  >
                    My courses/ workshop{' '}
                  </Link>
                </li>
                <li className="px-2 py-2  text-sm border-[#D3D8DE] border-y cursor-pointer hover:bg-gray-100">
                  <Link
                    to="/profile/notifications"
                    onClick={() => setIsUserMenu(false)}
                  >
                    Notifications{' '}
                  </Link>
                </li>
                <li className="px-2 py-2  text-sm border-[#D3D8DE] cursor-pointer  hover:bg-gray-100">
                  <Link
                    to="/profile/interactions"
                    onClick={() => setIsUserMenu(false)}
                  >
                    My interactions{' '}
                  </Link>
                </li>
                <li className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer border-[#D3D8DE]  border-y">
                  <Link
                    to="/profile/articles"
                    onClick={() => setIsUserMenu(false)}
                  >
                    My articles/videos{' '}
                  </Link>
                </li>
                <li className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer border-[#D3D8DE]  border-b">
                  <Link to="/profile/info" onClick={() => setIsUserMenu(false)}>
                    Account{' '}
                  </Link>
                </li>
                <li className="px-2 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  <p onClick={() => setIsUserMenu(false)}>Log out</p>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div ref={mobileMenuRef} className="relative lg:hidden">
          <div>
            {!isMobile ? (
              <CiMenuBurger
                size={30}
                className="text-primary"
                onClick={handleMobileMenu}
              />
            ) : (
              <LiaTimesSolid
                size={30}
                className="text-primary"
                onClick={handleMobileMenu}
              />
            )}
          </div>

          <div>
            {isMobile && (
              <div className="absolute top-10 right-0 w-58 bg-white shadow-lg border border-[#EAECF0] rounded p-4">
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

                <div>
                  {isLoggedin ? (
                    <div className="mt-5 flex gap-3 items-center">
                      <RxAvatar className="size-9" />
                      <div className="text-xs">
                        <h1 className="font-semibold">Presh Doe</h1>
                        <h1 className="font-medium text-primary">
                          Pre@gmail.com
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className="flex mt-4 items-center gap-5">
                      <Button
                        type="button"
                        label="Log In"
                        onClick={() => navigate('/login')}
                        className="bg-transparent text-primary! hover:text-white! border border-primary text-sm"
                      />
                      <Button
                        onClick={() => navigate('/register')}
                        type="button"
                        label="Sign up"
                        className="text-sm"
                      />
                    </div>
                  )}
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
    </nav>
  );
};

export default Navbar;
