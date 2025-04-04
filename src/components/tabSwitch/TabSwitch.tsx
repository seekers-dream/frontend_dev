import React from 'react';

interface Tab {
  name: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  handleTabClick: (tabName: string) => void;
}

const TabSwitch: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="flex text-sm gap-5">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={` px-3 py-2 cursor-pointer  border border-gray-200 rounded-full font-medium  transition-colors ${
            activeTab === tab.name
              ? 'text-white  bg-[#090C1B]'
              : 'text-[#667085] bg-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
