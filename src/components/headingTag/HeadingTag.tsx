const HeadingTag = ({ title }: { title: string }) => {
  return (
    <div className="py-2 px-3 items-center gap-2 mb-5 border border-[#F0F0F0] rounded-full inline-flex">
      <div className="bg-black rounded-full size-3"></div>
      <p>{title}</p>
    </div>
  );
};

export default HeadingTag;
