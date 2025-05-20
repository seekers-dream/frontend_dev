import TabNavigation from '@/components/tabSwitch/TabNavigation';
import { useState } from 'react';
import AccountSecurity from './sections/AccountSecurity';
import Settings from './sections/Settings';
import ProfileInfo from './sections/ProfileInfo';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { name: 'profile', label: 'Profile' },
    { name: 'account', label: 'Account Security' },
    { name: 'settings', label: 'Settings' },
  ];
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="py-20 px-5 md:px-10">
      <Link
        to={'/'}
        className="mb-5 bg-black text-white rounded-md py-1 px-3 inline-flex items-center gap-1 text-sm font-medium"
      >
        <IoIosArrowBack />
        <p>Home</p>
      </Link>
      <div className="flex justify-center md:justify-start  ">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
      </div>

      <div className="mt-5">
        {activeTab === 'profile' && <ProfileInfo />}
        {activeTab === 'account' && <AccountSecurity />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
};
