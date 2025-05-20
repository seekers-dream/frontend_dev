import partner from '@/assets/images/partners-process.png';
import HeadingTag from '@/components/headingTag/HeadingTag';
import { IoCheckmarkDone } from 'react-icons/io5';

const partnerProcessData = [
  {
    title: 'Legally Binding Agreement',
    content:
      "All partnerships are formalized with a comprehensive legal agreement that protects both parties' interests.",
  },
  {
    title: 'Digital Signing Process',
    content:
      'Our streamlined digital signing process makes partnership formation quick and efficient.',
  },
  {
    title: 'Customized Terms',
    content:
      'We work with you to create partnership terms that align with your business goals and capabilities.',
  },
];

const partnershipSteps = [
  {
    title: 'Application',
    content: 'Submit your partnership application through our online form.',
  },
  {
    title: 'Evaluation',
    content: 'Our team evaluates your application and identifies synergies.',
  },
  {
    title: 'Agreement',
    content:
      'We draft and finalize a partnership agreement that benefits both parties.',
  },
  {
    title: 'Integration',
    content: 'Seamless integration of systems, processes, and teams.',
  },
];

const PartnershipProcess = () => {
  return (
    <div>
      <div className="py-16 w-[90%] mx-auto ">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={partner}
              alt="partnership process"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 ">
            <HeadingTag title="Partnership Agreement" />
            <h1 className="text-4xl md:text-5xl md:leading-[72px] font-semibold">
              Our Partnership Process
            </h1>
            <p className="text-[#8C8C8C] text-sm md:text-base mt-2">
              Our partnership agreements are designed to be transparent, fair,
              and mutually beneficial. We believe in creating long-term
              relationships that drive success for all parties involved.
            </p>

            <div className="space-y-5">
              {partnerProcessData.map((item, index) => (
                <div key={index} className="flex items-start gap-3 mt-5">
                  <div className="bg-primary rounded-full p-2">
                    <IoCheckmarkDone className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="max-w-[1135px] mx-auto text-center mt-16">
            <h1 className="text-black font-bold text-3xl md:text-5xl">
              Our Partnership Process
            </h1>

            <p className="text-[#999999] font-semibold text-base md:text-2xl mt-3">
              A simple, transparent process to establish a mutually beneficial
              partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            {partnershipSteps.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-50 shadow-md hover:scale-105 ease-in-out transition-all duration-500 rounded-lg p-5 flex flex-col items-center"
              >
                <div className="rounded-full font-bold text-3xl bg-black text-white size-16 flex justify-center items-center mb-7">
                  {index + 1}
                </div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 text-center ">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipProcess;
