import truckImg from '@/assets/images/truckImg.jpg';
const truckData = [
  {
    id: 1,
    image: truckImg,
  },
  {
    id: 2,
    image: truckImg,
  },
  {
    id: 3,
    image: truckImg,
  },
  {
    id: 4,
    image: truckImg,
  },
];
const Trucks = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto py-10">
        <div className="md:flex items-center gap-10 justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
              Discover Tailored Logistics Solutions with SeekersDream
            </h1>
          </div>

          <div className="w-full md:w-1/2 text-[#8C8C8C] text-sm md:text-lg mt-5 md:mt-0">
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
                className="relative cursor-pointer"
              >
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trucks;
