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

const TabNavigation: React.FC<TabNavigationProps> = ({
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
          className={` mx-3 px-1 py-1 text-xl cursor-pointer font-semibold border-b-2   transition-colors ${
            activeTab === tab.name
              ? 'text-[#090C1B]  border-[#090C1B]'
              : 'border-b-0 text-[#999999] '
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
