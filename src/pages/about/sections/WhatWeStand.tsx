import HeadingTag from '@/components/headingTag/HeadingTag';
import Value1 from '@/assets/svg/value1.svg?react';
import Value2 from '@/assets/svg/value2.svg?react';
import Value3 from '@/assets/svg/value3.svg?react';
import Value4 from '@/assets/svg/value4.svg?react';
import Value5 from '@/assets/svg/value5.svg?react';
import Value6 from '@/assets/svg/value6.svg?react';
const coreValues = [
  {
    title: 'Integrity',
    description:
      'We are always honest and transparent in all dealings, ensuring that clients receive clear and accurate information to make informed decisions.',
    icon: <Value1 />,
  },
  {
    title: 'Excellence',
    description:
      'We strive to exceed expectations by delivering outstanding results, paying close attention to detail and committing fully to the quality of our services.',
    icon: <Value2 />,
  },
  {
    title: 'Customer-Centricity',
    description:
      'Our clients are our top priority; we listen carefully to their needs and provide personalized solutions tailored to each individual.',
    icon: <Value3 />,
  },
  {
    title: 'Innovation',
    description:
      'We continuously adopt the latest technologies and ideas to offer better, more efficient, and relevant services in the ever-evolving real estate market.',
    icon: <Value4 />,
  },
  {
    title: 'Collaboration',
    description:
      'We believe in the power of teamwork, both internally and with our clients, ensuring that every project benefits from collective expertise and shared goals.',
    icon: <Value5 />,
  },
  {
    title: 'Sustainability',
    description:
      'We are dedicated to supporting eco-friendly practices and sustainable development, ensuring a positive impact on both the community and the environment.',
    icon: <Value6 />,
  },
];

const WhatWeStand = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto py-5 md:py-10">
        <div>
          <HeadingTag title="Our Core Value" />
          <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold my-3">
            What We Stand For You
          </h1>
          <p className="text-[#8C8C8C] text-sm md:text-lg">
            Core principles that guide every transaction, ensuring excellence
            and client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((value, idx) => (
            <div key={idx} className="p-6">
              <div className="flex flex-col gap-4 items- md:items-start my-5">
                <div className="w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl mb-3 font-semibold text-black">
                    {value.title}
                  </h1>
                  <p className="text-[#8C8C8C] text-sm md:text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeStand;
