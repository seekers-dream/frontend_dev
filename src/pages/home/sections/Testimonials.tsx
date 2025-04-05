import HeadingTag from '@/components/headingTag/HeadingTag';
import { useState } from 'react';
import ArrowLeft from '@/assets/svg/arrow-left.svg?react';
import ArrowRight from '@/assets/svg/arrow-right.svg?react';
const testimonies = [
  {
    id: 1,
    name: 'Sarah & Michael Stone',
    role: 'Homeowners',
    text: '“SeekersDream made buying our first home an absolute breeze! Their team was incredibly attentive and guided us through every step. We couldn’t be happier with our new home.”',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Manager',
    text: '“SeekersDream made buying our first home an absolute breeze! Their team was incredibly attentive and guided us through every step. We couldn’t be happier with our new home.”',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div>
      <div className="w-[90%] mx-auto py-16">
        <div>
          <div className="w-full ">
            <HeadingTag title="Testimonial" />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
              What People Are Saying
            </h1>
            <p className="text-[#8C8C8C] mt-3 text-sm">
              Real feedback from clients who’ve experienced the SeekersDream
              difference.
            </p>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto relative">
          <div className="text-center">
            <h1 className="text-black text-2xl md:text-4xl md:leading-[48px] font-medium mt-10 text-center">
              {testimonies[activeIndex].text}
            </h1>
            <p className="pb-2 text-black font-medium text-sm mt-10">
              {testimonies[activeIndex].name}
            </p>
            <p className="text-[#8C8C8C] text-xs">
              {testimonies[activeIndex].role}
            </p>
          </div>

          <div className="flex justify-center items-center gap-5 mt-10">
            <button onClick={handlePrev} className=" ">
              <ArrowLeft />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2">
              {testimonies.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>

            <button onClick={handleNext} className=" ">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
