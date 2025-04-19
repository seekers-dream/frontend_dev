import ArrowUp from '@/assets/svg/arrow-up-right.svg?react';
import HeadingTag from '@/components/headingTag/HeadingTag';
import { useNavigate } from 'react-router-dom';

interface AboutSectionProps {
  title: string;
  subTitle: string;
  content: string;
  about1: string;
  about2: string;
  about3: string;
  about4: string;
  link: string;
}

const AboutSection = ({
  title,
  subTitle,
  content,
  about1,
  about2,
  about3,
  about4,
  link,
}: AboutSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="py-10">
      <div className="w-[90%] mx-auto ">
        <div className="md:flex items-center gap-10 justify-between">
          <div className="w-full md:w-1/2">
            <HeadingTag title={title} />
            <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
              {subTitle}
            </h1>
          </div>

          <div className="w-full md:w-1/2 text-[#8C8C8C] text-sm md:text-lg mt-5 md:mt-0">
            <p>{content}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row gap-5">
          <div className="relative">
            <img src={about1} alt="image" className="rounded-2xl h-[320px]" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>

            <div className="absolute bottom-5 text-white mx-10">
              <h1 className="text-xl font-semibold">Family House</h1>
              <p className="text-base pt-4">
                Discover modern family living with spacious layouts and top-tier
                amenities designed for comfort and style.
              </p>
              <p>650+ units available</p>
            </div>
          </div>
          <div>
            <img
              src={about2}
              alt="image"
              className="rounded-2xl h-full w-full"
            />
          </div>
          <div>
            <img src={about3} alt="image" className="rounded-2xl w-full" />
          </div>
          <div>
            <img src={about4} alt="image" className="rounded-2xl w-full" />
          </div>
          <div
            onClick={() => navigate(link)}
            className="hidden  text-center md:flex flex-col  justify-center items-center gap-2  rounded-2xl h-[320px] cursor-pointer"
          >
            <div className="border border-primary rounded-full size-[72px] flex justify-center items-center">
              <ArrowUp />
            </div>
            More
          </div>
          <div
            onClick={() => navigate(link)}
            className="border border-primary h-[48px] md:hidden text-center flex justify-center items-center gap-5  rounded-full cursor-pointer"
          >
            More
            <ArrowUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
