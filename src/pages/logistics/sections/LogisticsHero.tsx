import Navbar from '@/components/navbar/Navbar';
import { Link } from 'react-router-dom';

const LogisticsHero = () => {
  return (
    <div className="pt-32 pb-16 bg-hero-logistics md:min-h-screen bg-no-repeat bg-center bg-cover relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      <Navbar background="bg-transparent" color="text-white" />
      <div className=" pb-10  flex flex-col md:justify-center gap-16 md:h-screen ">
        <div className="text-center relative  text-white  font-semibold text-3xl md:text-5xl lg:text-6xl md:leading-[64px]">
          <h2 className="max-w-[750px] mx-auto px-5">
            The Next Era of Logistics with SeekersDream?
          </h2>
        </div>
        <div className="relative flex justify-center">
          <Link
            to="#"
            className="bg-primary py-2 px-4  md:w-[400px] md:h-[60px] flex justify-center items-center rounded-full  text-white text-lg md:text-2xl font-semibold hover:bg-black transition duration-300 ease-in-out"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogisticsHero;
