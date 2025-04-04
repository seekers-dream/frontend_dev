import HeadingTag from '@/components/headingTag/HeadingTag';
import TabSwitch from '@/components/tabSwitch/TabSwitch';
import { useState } from 'react';

const Properties = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { name: 'all', label: 'All Properties' },
    { name: 'logistics', label: 'Logistics' },
    { name: 'family-house', label: 'Family House' },
    { name: 'villa', label: 'Villa' },
    { name: 'apartment', label: 'Apartment' },
  ];
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="w-[90%] mx-auto py-16">
        <div className="md:flex items-center justify-between">
          <div className="w-full md:w-1/2">
            <HeadingTag title="Fetured Properties" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
              Discover SeekersDream Properties
            </h1>
          </div>

          <div className="w-full md:w-1/2 text-[#8C8C8C] text-sm md:text-lg mt-5 md:mt-0">
            <p>
              Explore an exclusive selection of premium properties, meticulously
              curated to provide you with the best in luxury living and prime
              real estate investment options, tailored to your needs
            </p>
          </div>
        </div>
        <div className="md:flex justify-center mt-10">
          <TabSwitch
            tabs={tabs}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;
