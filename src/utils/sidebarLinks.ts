import IDashboard from '@/assets/svg/sidebar/dashboard.svg?react';
import IListing from '@/assets/svg/sidebar/listing.svg?react';
import IPerformance from '@/assets/svg/sidebar/performance.svg?react';
import ISubscription from '@/assets/svg/sidebar/subscriptions.svg?react';
import IMessage from '@/assets/svg/sidebar/message.svg?react';
import IProfile from '@/assets/svg/sidebar/profile.svg?react';
import IHelp from '@/assets/svg/sidebar/help.svg?react';
import ILogout from '@/assets/svg/sidebar/logout.svg?react';

export const links = [
  {
    name: 'Dashboard',
    url: '/dashboard/overview',
    icon: IDashboard,
  },
  {
    name: 'My Listings',
    url: '/dashboard/listings',
    icon: IListing,
  },
  {
    name: 'Performance',
    url: '/dashboard/performance',
    icon: IPerformance,
  },
  {
    name: 'Subscriptions',
    url: '/dashboard/subscriptions',
    icon: ISubscription,
  },
  {
    name: 'Messages',
    url: '/dashboard/messages',
    icon: IMessage,
  },
  {
    name: 'Profile',
    url: '/dashboard/profile',
    icon: IProfile,
  },
  {
    name: 'Help & Support',
    url: '/dashboard/help',
    icon: IHelp,
  },

  {
    name: 'Logout',
    url: '/dashboard/logout',
    icon: ILogout,
    isLogout: true,
  },
];
