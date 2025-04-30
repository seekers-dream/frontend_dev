import { Property } from '@/features/properties/interfaces';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }: { property: Property }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="border border-gray-200 rounded-[20px] cursor-pointer"
    >
      <div className="relative">
        <img
          src={property.media[0]?.url}
          alt="image"
          className="w-full h-[425px] object-cover rounded-[20px]"
        />
        <div className="absolute bg-black text-white font-medium rounded-2xl px-3 py-2 top-2 left-3 capitalize">
          {property.listingType}
        </div>
      </div>
      <div className="mt-6 p-3">
        <h1 className="text-3xl font-semibold text-black">
          NGN {Number(property.price).toLocaleString()}
        </h1>
        <h1 className="text-2xl my-3 font-medium text-black">
          {property.title}
        </h1>
        <p className="text-lg font-normal text-[#8C8C8C]">{property.address}</p>
        <p className="text-lg font-normal text-[#8C8C8C]">
          {property.city}, {property.state}
        </p>
        <div className="text-[#8C8C8C] text-base mt-2">
          {/* 3 beds · 2 bath · 900 sq.ft */}
          {property.flatType}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
