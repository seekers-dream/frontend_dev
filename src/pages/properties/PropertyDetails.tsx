/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/ui/Button';
import { RxAvatar } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { MdOutlinePhone } from 'react-icons/md';
import { useGetSinglePropertyQuery } from '@/features/properties/api';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

export const PropertyDetails = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  console.log(propertyId);
  const { data: getPropertyDetails, isLoading } = useGetSinglePropertyQuery(
    propertyId as string,
  );
  console.log(getPropertyDetails);
  const property = getPropertyDetails?.data || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.media || [];

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  if (isLoading)
    return <div className="flex justify-center items-center">Loading...</div>;
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="mt-10 md:grid md:grid-cols-12 gap-5 pb-10">
          <div className="col-span-8">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl mt-5">
              {images && images.length > 0 ? (
                <>
                  <img
                    src={
                      images[currentImageIndex]?.url ||
                      images[currentImageIndex]
                    }
                    alt={`Property image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation buttons */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
                    aria-label="Previous image"
                  >
                    <IoIosArrowBack size={24} />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
                    aria-label="Next image"
                  >
                    <IoIosArrowForward size={24} />
                  </button>

                  {/* Pagination indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p>No images available</p>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-black font-semibold text-2xl mt-5 md:text-4xl">
                {property.title}
              </h1>
              <p className="mt-5 text-base md:text-xl text-[#8C8C8C] font-normal">
                {property.description}
              </p>
            </div>

            <div className="my-5">
              <p>Address</p>
              <p className="text-lg font-normal text-[#8C8C8C]">
                {property.city}, {property.state}
              </p>
              <div className="text-[#8C8C8C] text-base mt-2">
                {/* 3 beds · 2 bath · 900 sq.ft */}
                {property.flatType}
              </div>
              <p className="text-[#8C8C8C] text-base mt-2">
                {property.address}, {property.city}, {property.state}
              </p>
            </div>
          </div>
          <div className=" col-span-4 space-y-10">
            <div className="font-bold text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="text-base md:text-2xl">Price</p>
              <h1 className="text-2xl md:text-4xl">
                {' '}
                NGN {Number(property.price).toLocaleString()}
              </h1>
            </div>

            <div className=" text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="font-semibold text-base md:text-2xl">
                Thinking of renting?
              </p>
              <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-10">
                <Button
                  type="button"
                  label="Tour in person"
                  className="bg-black  w-full md:w-1/2 text-white"
                />
                <Button
                  type="button"
                  label="Tour via video call"
                  className="text-black w-full md:w-1/2"
                />
              </div>
              <div>
                <Button
                  type="button"
                  label="Request Showing"
                  className="w-full hover:text-white rounded-[9999px] text-black"
                />
                <p className="my-10 text-center text-sm text-black font-semibold">
                  or
                </p>
                <Button
                  type="button"
                  label="Start an offer"
                  className="w-full rounded-[9999px] text-white bg-black"
                />
              </div>
            </div>

            <div className=" text-black border border-[#F0F0F0] rounded-2xl p-5">
              <p className="font-semibold text-base md:text-2xl">
                Inquire About this Property
              </p>
              <div className="flex items-center gap-5 my-10">
                <div>
                  <RxAvatar className="size-10 md:size-20" />
                </div>
                <div>
                  <h1 className="font-semibold text-black text-lg md:text-xl">
                    {property.listedBy?.firstName} {property.listedBy?.lastName}
                  </h1>
                  <p className="text-[#8C8C8C] font-normal text-sm md:text-base">
                    {property.listedBy?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Button
                  type="button"
                  label="Message"
                  icon={<FiMail />}
                  className="rounded-[9999px] flex-row-reverse bg-black text-white w-1/2"
                />
                <Button
                  type="button"
                  label="Call"
                  icon={<MdOutlinePhone />}
                  className="rounded-[9999px] flex-row-reverse text-black hover:text-white w-1/2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
