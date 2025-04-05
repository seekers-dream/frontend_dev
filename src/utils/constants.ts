import ITwitter from '@/assets/svg/twitter.svg?react';
import IFacebook from '@/assets/svg/facebook.svg?react';
import IInstagram from '@/assets/svg/instagram.svg?react';
import ILinkedin from '@/assets/svg/linkedin.svg?react';

export const footer = [
  {
    heading: 'Browse',
    links: [
      {
        name: 'Home',
        url: '/',
      },
      {
        name: 'About Us',
        url: '/about',
      },
      {
        name: 'Properties',
        url: '/properties',
      },
      {
        name: 'Contact Us',
        url: '/contact',
      },
    ],
  },
  {
    heading: 'Services',
    links: [
      {
        name: 'Discover Properties',
        url: '/',
      },
      {
        name: 'Virtual Tour',
        url: '/',
      },
      {
        name: 'Add New Listing',
        url: '/',
      },
      {
        name: 'Logistics',
        url: '/logistics',
      },
      {
        name: 'Virtual Tour',
        url: '/',
      },
    ],
  },
  {
    heading: 'Help',
    links: [
      {
        name: 'How it works',
        url: '/',
      },
      {
        name: 'Latest Listings',
        url: '/properties',
      },
      {
        name: 'FAQ',
        url: '/',
      },
    ],
  },
  {
    heading: 'More Info',
    links: [
      {
        name: 'Terms of Use',
        url: '/',
      },
      {
        name: 'Privacy Policy',
        url: '/properties',
      },
    ],
  },
];

export const socialLinks = [
  {
    name: 'Twitter',
    url: '#',
    icon: ITwitter,
  },
  {
    name: 'Facebook',
    url: '#',
    icon: IFacebook,
  },
  {
    name: 'Instagram',
    url: '#',
    icon: IInstagram,
  },
  {
    name: 'Linkedin',
    url: '#',
    icon: ILinkedin,
  },
];
