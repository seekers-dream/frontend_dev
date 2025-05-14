import TabNavigation from '@/components/tabSwitch/TabNavigation';
import { useState } from 'react';
import AccountSecurity from './sections/AccountSecurity';
import Settings from './sections/Settings';
import ProfileInfo from './sections/ProfileInfo';

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
    <div className="py-32 px-10">
      <div className="md:flex ">
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
