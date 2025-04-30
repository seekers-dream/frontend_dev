import { useParams } from 'react-router-dom';

export const PropertyDetails = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  console.log(propertyId);
  return (
    <div>
      <div className="w-[90%] mx-auto">Property Details</div>
    </div>
  );
};
