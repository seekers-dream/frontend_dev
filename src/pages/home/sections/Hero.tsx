import Navbar from '@/components/navbar/Navbar';

const Hero = () => {
  return (
    <div className="bg-hero-pattern min-h-screen bg-no-repeat bg-center bg-cover">
      <Navbar background="bg-transparent" />
      <div className="px-[60px] py-[66px] flex flex-col justify-between h-screen ">
        <div className="text-center  text-white  font-semibold text-6xl leading-[64px]">
          <h2>
            Ready to Find Your <br /> Dream Home with SeekersDream?
          </h2>
        </div>
        <p className="text-white text-xl max-w-[475px] ">
          Discover meticulously crafted homes and properties, blending
          contemporary aesthetics with sustainable living.
        </p>
      </div>
    </div>
  );
};

export default Hero;
