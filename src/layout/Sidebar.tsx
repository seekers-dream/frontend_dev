import { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { IoMenuOutline } from 'react-icons/io5';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import { links } from '@/utils/sidebarLinks';
import { logout } from '@/features/auth/authSlice';
import { useAuth } from '@/hooks/useAuth';
import ILogoWhite from '@/assets/svg/logoWhite.svg?react';
// import ILogout from '@/assets/svg/sidebar/logout.svg?react';
import INotifications from '@/assets/svg/sidebar/notification.svg?react';
import SidebarItems from './SidebarItems';
import Modal from '@/ui/Modal';
import Button from '@/ui/Button';

const drawerWidth = 250;

interface DashboardSidebarProps {
  children: React.ReactNode;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  const location = useLocation();

  // Function to get the page title based on current route
  const getPageTitle = (pathname: string): string => {
    // Remove leading slash and split by slashes
    const path = pathname.substring(1).split('/');

    // Check if we're in the dashboard
    if (path[0] === 'dashboard') {
      // Map routes to their display titles
      switch (path[1]) {
        case 'profile':
          return 'Profile';
        case 'listings':
          return 'Listings';
        case 'performance':
          return 'Performance';
        case 'subscriptions':
          return 'Subscriptions';
        case 'notifications':
          return 'Notifications';
        case 'messages':
          return 'Messages';
        case 'overview':
          return 'Dashboard';
        case 'help':
          return 'Help & Support';
        default:
          return 'Dashboard';
      }
    }

    // For other routes
    return 'Seekers Dream';
  };

  const pageTitle = getPageTitle(location.pathname);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="z-30">
      <Toolbar
        sx={{
          padding: '32px 0',
        }}
      >
        <ILogoWhite />
      </Toolbar>

      <List>
        {links.map((link, index) => {
          return (
            <SidebarItems
              {...{ link }}
              key={index}
              isLastItem={index === links.length - 2}
              onClose={handleDrawerToggle}
              onLogoutClick={link.isLogout ? handleClick : undefined}
            />
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#007BFF' }}>
      {/* header */}
      <AppBar
        className="shadow-sm "
        position="fixed"
        sx={{
          background: '#FFFFFF',
          color: '#0B3140',
          boxShadow: 'none',
          py: '0.2em',
          zIndex: 50,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <IoMenuOutline />
          </IconButton>

          <div className="w-full">
            <h1 className="text-2xl font-semibold">{pageTitle}</h1>
          </div>

          <div className=" w-full">
            <div className=" flex items-center gap-5 justify-end">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {user?.profileImg ? (
                    <img
                      src={user?.profileImg}
                      alt="Profile"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : (
                    <FaRegUserCircle className="size-8" />
                  )}

                  <div className="capitalize text-sm font-normal text-left">
                    <p className=" text-primary ">{user?.role}</p>
                    <p className="text-[#929292] ">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>

                  <IoMdArrowDropdown
                    className={`cursor-pointer
                      ${dropdownOpen ? 'transform rotate-180' : ''}`}
                  />

                  <div className="border-l pl-2">
                    <INotifications />
                  </div>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/dashboard/settings"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>

                      {/* Logout Link */}
                      <li>
                        <button
                          onClick={handleClick}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {/* side navbar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          display: { xs: 'none', md: 'block' },
          flexShrink: { sm: 0 },
          '& .MuiDrawer-paper': {
            width: { sm: drawerWidth },
            boxSizing: 'border-box',
            backgroundColor: '#090C1B',
            borderRight: '0px',
            borderColor: '#D7D7D7',
          },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#090C1B',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* main content */}
      <Box
        className="text-start "
        component="main"
        sx={{
          flexGrow: 1,
          // pt: 15,
          // px: 3,
          // pb: 3,

          minHeight: '100vh',
          backgroundColor: '#EBEBEB',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
        <Outlet />
      </Box>

      <Modal isOpen={open} onClose={handleClose}>
        <div className="rounded-[16px] lg:w-[400px] w-[345px] px-5">
          <div className="flex flex-col items-center justify-center pt-5 max-w-[352px] mx-auto">
            {/* <IWarning /> */}
            <p className="text-center text-[#475467] font-medium text-base pt-2">
              Are you sure you want to logout?
            </p>
          </div>
          <div className="flex mt-8 mb-6 justify-center gap-3 ">
            <Button
              type="button"
              label="Cancel"
              className="w-[170px] h-[44px] font-medium bg-transparent hover:bg-transparent flex items-center justify-center text-[#344054]! border border-[#E0E0E0] rounded-lg"
              onClick={handleClose}
            />
            <Button
              type="button"
              onClick={logoutUser}
              label="Yes"
              className="w-[170px] bg-red-500 text-white hover:bg-red-600 h-[44px] flex font-medium items-center justify-center rounded-lg"
            />
          </div>
        </div>
      </Modal>
    </Box>
  );
}
