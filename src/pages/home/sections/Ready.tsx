import Search from '@/assets/svg/search.svg?react';
const Ready = () => {
  return (
    <div className="bg-ready bg-cover bg-no-repeat bg-center h-[500px] md:h-[600px] relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent "></div>
      <div className="w-[90%] mx-auto  relative">
        <div className="text-center">
          <h1 className="max-w-[1280px] mx-auto text-white text-4xl md:text-6xl font-semibold">
            Ready to Find <br /> Your Dream Home with SeekersDream?
          </h1>
          <p className="md:max-w-[696px] mx-auto mt-5 mb-10 text-[#D9D9D9] font-medium text-base md:text-xl">
            Join thousands of happy homeowners who found their perfect residence
            with us. Let’s make your property journey smooth and successful.
          </p>

          <div className="rounded-full border md:w-[424px] h-[48px] mx-auto flex justify-between items-center px-5">
            <input
              type="text"
              placeholder="Find your dream home"
              className="outline-0 bg-transparent text-white w-full border-0"
            />
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;
