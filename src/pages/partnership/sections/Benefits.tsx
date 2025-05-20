import HeadingTag from '@/components/headingTag/HeadingTag';
import partnerBenefits1 from '@/assets/svg/partnerBenefits1.svg';
import partnerBenefits2 from '@/assets/svg/partnerBenefits2.svg';
import partnerBenefits3 from '@/assets/svg/partnerBenefits3.svg';
import partnerBenefits4 from '@/assets/svg/partnerBenefits4.svg';
import partnerBenefits5 from '@/assets/svg/partnerBenefits5.svg';
import partnerBenefits6 from '@/assets/svg/partnerBenefits6.svg';

const benefitsData = [
  {
    title: 'Risk Mitigation',
    content:
      'Benefit from our proven risk management strategies and compliance frameworks all dealings, ensuring that clients receive clear and accurate information to make informed decisions.',
    icon: partnerBenefits1,
  },
  {
    title: 'Expanded Network',
    content:
      'Access our extensive network of  investors, and service providers across the country.',
    icon: partnerBenefits2,
  },
  {
    title: 'Logistics Expertise',
    content:
      'Leverage our advanced logistics and expertise to streamline your operations.',
    icon: partnerBenefits3,
  },
  {
    title: 'Earn N200k+ Every Month',
    content:
      'Unlock consistent revenue through our reliable logistics solutions and support.',
    icon: partnerBenefits4,
  },
  {
    title: 'Access to 100k+ Customers',
    content:
      'Boost your business performance with our trusted logistics solutions and ongoing assistance.',
    icon: partnerBenefits5,
  },
  {
    title: 'SeekersDream Support',
    content:
      'Achieve steady revenue growth with the backing of our dependable logistics solutions and dedicated support services.',
    icon: partnerBenefits6,
  },
];

const Benefits = () => {
  return (
    <div>
      <div className="py-16 w-[90%] mx-auto">
        <div className="w-full ">
          <HeadingTag title={'Why Partner With Us'} />
          <h1 className="text-4xl md:text-5xl md:leading-[72px] font-semibold">
            Benefits of Our Partnership
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {benefitsData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:scale-105 ease-in-out transition-all duration-500 rounded-lg p-5 flex flex-col items-start"
            >
              <div className="rounded-full bg-black size-16 flex justify-center items-center mb-7">
                <img src={item.icon} alt={item.title} className="size-8 " />
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 ">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
