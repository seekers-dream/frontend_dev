import truckImg from '@/assets/images/truckImg.jpg';
import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from 'react-icons/md';

const truckData = [
  {
    id: 1,
    image: truckImg,
    priceRange: 'N50,000 - N70,000',
    location: 'Lagos state',
  },
  {
    id: 2,
    image: truckImg,
    priceRange: 'N50,000 - N70,000',
    location: 'Lagos state',
  },
  {
    id: 3,
    image: truckImg,
    priceRange: 'N50,000 - N70,000',
    location: 'Lagos state',
  },
  {
    id: 4,
    image: truckImg,
    priceRange: 'N50,000 - N70,000',
    location: 'Lagos state',
  },
];
const Trucks = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto py-16">
        <div className="md:flex items-center gap-10 justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl leading-[45px] lg:text-6xl lg:leading-[72px] font-semibold">
              Discover Tailored Logistics Solutions with SeekersDream
            </h1>
          </div>

          <div className="w-full md:w-1/2 text-[#8C8C8C] text-sm lg:text-lg mt-5 md:mt-0">
            <p>
              Browse a handpicked selection of high-quality logistics solutions,
              crafted to provide exceptional efficiency and dependability for
              your transportation and supply chain requirements customized to
              align with your unique operational objectives.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {truckData.map((truck) => (
              <div
                key={truck.id}
                onClick={() => console.log('Truck clicked')}
                className=" cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={truck.image}
                    alt="Truck"
                    className="rounded-2xl h-[320px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
                  <div className="bg-[#090C1B] rounded-full w-[112px] h-[39px] text-white text-center font-semibold absolute top-5 left-5 flex items-center justify-center">
                    FOR HIRE
                  </div>
                </div>

                <div className="mt-6 text-black">
                  <h1 className="font-semibold text-xl md:text-2xl">
                    {truck.priceRange}
                  </h1>
                  <p className="text-base md:text-xl font-medium">
                    {truck.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <Link
            to="/partnership"
            className="flex items-center gap-2 uppercase border rounded-full px-4 py-2 text-primary font-semibold text-base mt-10 hover:bg-primary hover:text-white transition duration-700 ease-in-out"
          >
            partner with us
            <MdOutlineArrowOutward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trucks;
