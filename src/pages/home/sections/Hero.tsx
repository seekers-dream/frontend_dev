import Navbar from '@/components/navbar/Navbar';

const Hero = () => {
  return (
    <div className="bg-hero-pattern md:min-h-screen bg-no-repeat bg-center bg-cover relative">
      <Navbar background="bg-transparent" color="text-white" />
      <div className="px-5 md:px-[60px] pb-10 pt-[100px] md:pt-[140px] flex flex-col md:justify-between md:h-screen ">
        <div className="text-center  text-white  font-semibold text-3xl md:text-6xl md:leading-[64px]">
          <h2>
            Ready to Find Your <br /> Dream Home with SeekersDream?
          </h2>
        </div>
        <p className="text-white text-center md:text-left my-5 md:my-0 text-xs md:text-xl md:max-w-[475px] ">
          Discover meticulously crafted homes and properties, blending
          contemporary aesthetics with sustainable living.
        </p>
      </div>
    </div>
  );
};

export default Hero;
