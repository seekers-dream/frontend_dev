import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { IoMenuOutline } from 'react-icons/io5';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { links } from '@/utils/sidebarLinks';
import { logout } from '@/features/auth/authSlice';
import { useAuth } from '@/hooks/useAuth';
import ILogoWhite from '@/assets/svg/logoWhite.svg?react';
// import ILogout from '@/assets/svg/sidebar/logout.svg?react';
import INotifications from '@/assets/svg/sidebar/notification.svg?react';
import SidebarItems from './SidebarItems';
import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import { getInitials } from '@/utils/helpers';

const drawerWidth = 250;

interface DashboardSidebarProps {
  children: React.ReactNode;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
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
          justifyContent: 'center',
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
              <div className="relative">
                <button className="flex items-center gap-2 ">
                  {user?.avatarUrl ? (
                    <img
                      src={user?.avatarUrl}
                      alt="profile"
                      className="rounded-full size-10"
                    />
                  ) : (
                    <div className="relative font-medium rounded-full bg-gray-200 text-gray-600 size-10 text-base flex items-center justify-center">
                      {getInitials(user.firstName, user.lastName ?? '--')}
                    </div>
                  )}

                  <div className="capitalize text-sm font-normal text-left">
                    <p className=" text-primary ">{user?.role}</p>
                    <p className="text-[#929292] ">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>

                  <div className="border-l pl-2">
                    <INotifications />
                  </div>
                </button>
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
        {/* mobile view */}
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

        {/* desktop view */}
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
