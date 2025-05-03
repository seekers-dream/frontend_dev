import HeadingTag from '@/components/headingTag/HeadingTag';
import FindProperty from '../home/sections/FindProperty';
import TabSwitch from '@/components/tabSwitch/TabSwitch';
import { useState } from 'react';
import PropertyCard from '@/components/cards/PropertyCard';
import { useGetAllPropertiesQuery } from '@/features/properties/api';
import { Property } from '@/features/properties/interfaces';
import Pagination from '@/components/pagination/Pagination';

export const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [activeTab, setActiveTab] = useState('all');
  const { data: getAllProperties, isLoading } = useGetAllPropertiesQuery({
    page: currentPage,
    limit: pageSize,

    // flatType: 'all',
    // listingType: 'all',
  });
  const properties = getAllProperties?.data?.houseListing || [];
  const totalProperties = getAllProperties?.data.pagination.total || 0;
  const totalPages = Math.ceil(totalProperties / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // console.log(properties);
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
      <FindProperty />
      <div className="w-[90%] mx-auto py-10">
        <div className="w-full md:w-[814px]">
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
          {isLoading ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-xl">Loading...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-3 flex justify-center items-center">
              <p className="text-xl">No properties found</p>
            </div>
          ) : (
            properties.map((property: Property, idx: number) => (
              <div key={idx}>
                <PropertyCard property={property} />
              </div>
            ))
          )}
        </div>
        {!isLoading && properties.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </div>
  );
};
