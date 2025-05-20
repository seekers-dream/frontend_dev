import Search from '@/assets/svg/search.svg?react';
import Button from '@/ui/Button';

const FindProperty = () => {
  return (
    <div className="py-10">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-10 max-w-[768px] mx-auto">
          <h1 className="text-black font-medium text-4xl ">
            Find Your Dream Property
          </h1>
          <p className="text-[#8C8C8C] text-xl mt-2 max-w-[468px] mx-auto">
            We offer modern properties with the best quality that meet all your
            needs.
          </p>
        </div>

        <div className="mt-10 flex flex-col md:flex-row mx-auto gap-10 flex-wrap justify-between">
          <div className="text-center">
            <label htmlFor="" className="block  text-[#8C8C8C] text-base ">
              Looking for
            </label>
            <select
              name="listingType"
              className=" w-full px-4 py-2  outline-0 border-b border-[#F0F0F0]"
            >
              <option value="" className="text-center">
                Select an option
              </option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>
          <div className="text-center">
            <label htmlFor="" className="block  text-[#8C8C8C] text-base ">
              Location
            </label>

            <input
              type="text"
              className=" w-full px-4 py-2  text-center placeholder:text-center outline-0 border-b border-[#F0F0F0]"
              name="city"
              placeholder="City"
            />
          </div>
          <div className="text-center">
            <label htmlFor="" className="block  text-[#8C8C8C] text-base ">
              State
            </label>
            <input
              type="text"
              className=" w-full px-4 py-2 text-center placeholder:text-center outline-0 border-b border-[#F0F0F0]"
              name="state "
              placeholder="State"
            />
          </div>
          <div className="text-center">
            <label htmlFor="" className="block  text-[#8C8C8C] text-base ">
              Property Type
            </label>
            <input
              type="text"
              className=" w-full px-4 py-2 text-center placeholder:text-center outline-0 border-b border-[#F0F0F0]"
              name="flattype "
              placeholder="2 or 3 bedroom flat"
            />
          </div>

          <div className="text-center">
            <label htmlFor="" className="block  text-[#8C8C8C] text-base ">
              Budget
            </label>
            <input
              type="text"
              className=" w-full px-4 text-center py-2 placeholder:text-center outline-0 border-b border-[#F0F0F0]"
              name="price "
              placeholder="0.5-5M"
            />
          </div>
          <div>
            <div className="hidden rounded-full bg-primary md:flex justify-center items-center w-[56px] h-[56px] cursor-pointer">
              <Search />
            </div>
          </div>
          <div className="block md:hidden">
            <Button
              type="submit"
              label="Search"
              icon={<Search />}
              className="w-full bg-primary text-white rounded-[999px] gap-5 items-center"
              // loading={isLoading}
              // disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindProperty;
