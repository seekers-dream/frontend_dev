import HeadingTag from '@/components/headingTag/HeadingTag';
import FaqItem from './FaqItem';

interface faqProps {
  _id: string;
  question: string;
  answer: string | JSX.Element[];
}

const faqs = [
  {
    _id: '1',
    question: 'How do I start searching for a property with SeekersDream?',
    answer:
      "You can begin by using our property search tool, which allows you to filter by location, property type, price range, and other features. Once you find a property you're interested in, simply click 'View Details' to learn more or schedule a visit.",
  },
  {
    _id: '2',
    question:
      'What services does SeekersDream offer for first-time homebuyers?',
    answer:
      'No! We offer flexibility with our Quick Start Plan (daily access) and Momentum Plan (monthly access), so you can choose what works best for you. The Mastery Plan offers great value for those who want to commit to long-term learning and save on a yearly basis.',
  },

  {
    _id: '3',
    question: 'Can Urbanouse help me sell my property?',
    answer:
      'Yes! We offer a free trial for the Momentum Plan to give you a taste of our premium content and features before you commit. You can explore everything from expert articles to interactive Q&A during the trial period.',
  },
  {
    _id: '4',
    question: 'What types of properties does SeekersDream specialize in?',
    answer:
      'Absolutely! You can upgrade or downgrade your subscription at any time through your account settings. Any changes will take effect at the start of the next billing cycle.',
  },
  {
    _id: '5',
    question: 'Can I schedule a visit to view properties?',
    answer:
      "Yes, you can switch between plans whenever you'd like. Whether you want to scale up to more advanced features or try out a different plan, we make it easy to adjust your subscription based on your evolving needs.",
  },
];

const Faq = () => {
  // const { data: getFaqs, isLoading } = useGetFaqsQuery({
  //   active: "all",
  // });

  // console.log(getFaqs);
  // const faqs = getFaqs?.message || [];

  return (
    <div className="bg-[#F9FAFB]">
      <div className="w-[90%] mx-auto py-16 md:flex justify-between gap-10 ">
        <div className="w-full md:w-1/2  py-5">
          {faqs?.map((faq: faqProps) => <FaqItem key={faq._id} faq={faq} />)}
        </div>

        <div className="w-full md:w-[550px] text-right">
          <HeadingTag title="FAQ's" />
          <h1 className="text-4xl md:text-6xl md:leading-[72px] font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-[#8C8C8C] mt-3 text-sm">
            Have questions about buying, selling, or renting with Urbanouse?
            We’ve got the answers to help guide you through the process.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Faq;
