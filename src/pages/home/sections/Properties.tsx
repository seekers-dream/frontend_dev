import HeadingTag from '@/components/headingTag/HeadingTag';
import PropertyCard from '@/components/cards/PropertyCard';
import Button from '@/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useGetAllPropertiesQuery } from '@/features/properties/api';
import { Property } from '@/features/properties/interfaces';
// import TabSwitch from '@/components/tabSwitch/TabSwitch';
// import { useState } from 'react';

const Properties = () => {
  const navigate = useNavigate();
  const { data: getAllProperties, isLoading } = useGetAllPropertiesQuery();
  console.log(getAllProperties);
  const properties = getAllProperties?.data?.houseListing || [];
  console.log(properties);
  //   const [activeTab, setActiveTab] = useState('all');

  //   const tabs = [
  //     { name: 'all', label: 'All Properties' },
  //     { name: 'logistics', label: 'Logistics' },
  //     { name: 'family-house', label: 'Family House' },
  //     { name: 'villa', label: 'Villa' },
  //     { name: 'apartment', label: 'Apartment' },
  //   ];
  //   const handleTabClick = (tabName: string) => {
  //     setActiveTab(tabName);
  //   };

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
        {/* <div className="md:flex justify-center mt-10">
          <TabSwitch
            tabs={tabs}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </div> */}

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mt-5">
          {isLoading ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-xl">Loading...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-xl">No properties found</p>
            </div>
          ) : (
            properties.slice(0, 3).map((property: Property, idx: number) => (
              <div key={idx}>
                <PropertyCard property={property} />
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            label="Explore More"
            type="button"
            className="border border-[#000000] hover:text-white "
            onClick={() => navigate('/properties')}
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;
