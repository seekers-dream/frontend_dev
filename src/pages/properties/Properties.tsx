import HeadingTag from '@/components/headingTag/HeadingTag';
import FindProperty from '../home/sections/FindProperty';
import TabSwitch from '@/components/tabSwitch/TabSwitch';
import { useState } from 'react';
import PropertyCard from '@/components/cards/PropertyCard';
import { properties } from '@/utils/constants';

export const Properties = () => {
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
      <div className="w-[90%] mx-auto">
        <FindProperty />
        <div className="w-full md:w-1/2">
          <HeadingTag title="Featured Properties" />
          <h1 className="text-4xl md:text-6xl md:leading-[72px] my-3 font-semibold">
            Explore Our Handpicked Properties
          </h1>
          <p className="text-[#8C8C8C] text-xl">
            Discover premium listings selected for their prime locations,
            unmatched quality, and exceptional value.
          </p>
        </div>

        <div className="md:flex justify-center mt-10">
          <TabSwitch
            tabs={tabs}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 my-10">
          {properties.map((property, idx) => (
            <div key={idx}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
