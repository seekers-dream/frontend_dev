import { useNavigate } from 'react-router-dom';

interface Property {
  id: number;
  image: string;
  amount: number;
  name: string;
  address: string;
}

const PropertyCard = ({ property }: { property: Property }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="border border-gray-200 rounded-[20px] cursor-pointer"
    >
      <div className="relative">
        <img
          src={property.image}
          alt="image"
          className="w-full h-[425px] object-cover rounded-[20px]"
        />
      </div>
      <div className="mt-6 p-3">
        <h1 className="text-3xl font-semibold text-black">
          NGN {property.amount}
        </h1>
        <h1 className="text-2xl my-3 font-medium text-black">
          {property.name}
        </h1>
        <p className="text-lg font-normal text-[#8C8C8C]">{property.address}</p>
        <div className="text-[#8C8C8C] text-base mt-2">
          3 beds · 2 bath · 900 sq.ft
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
