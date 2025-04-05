import { useState } from 'react';
import ArrowDown from '@/assets/svg/arrow-down.svg?react';
interface FaqItemProps {
  faq: {
    _id: string;
    question: string;
    answer: string | JSX.Element[];
  };
}

const FaqItem: React.FC<FaqItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-[#EAECF0] py-8 max-w-[800px] mx-auto">
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center gap-2">
          <p
            className={`font-medium text-gray-900 text-lg
            }`}
          >
            {faq.question}
          </p>
        </div>
        <div className=" flex justify-between items-center gap-2">
          <button onClick={toggleOpen} className="mr-8">
            <ArrowDown
              className={`transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 text-gray-600  rounded-2xl ">
          {Array.isArray(faq.answer) ? faq.answer : <p>{faq.answer}</p>}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
