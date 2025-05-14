import Navbar from '@/components/navbar/Navbar';

const Hero = () => {
  return (
    <div className="pt-32 pb-16 bg-hero-logistics md:min-h-screen bg-no-repeat bg-center bg-cover relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      <Navbar background="bg-transparent" color="text-white" />
      <div className="md:px-[60px] pb-10  md:py-[66px] flex flex-col md:justify-between md:h-screen ">
        <div className="text-center relative  text-white  font-semibold text-3xl md:text-6xl md:leading-[64px]">
          <h2>
            Ready to Find Your <br /> Dream Home with SeekersDream?
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
