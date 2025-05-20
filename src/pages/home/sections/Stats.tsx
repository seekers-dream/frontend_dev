const statsData = [
  { title: 'Home for Rent', value: '5300+' },
  { title: 'Home to Buy', value: '300+' },
  { title: 'Cities Covered', value: '120+' },
  { title: 'Total Properties', value: '5300+' },
];

const Stats = () => {
  return (
    <div className="bg-[#090C1B] py-16">
      <div className="flex gap-16 items-center mx-auto justify-center  flex-wrap">
        {statsData.map((stat, index) => (
          <div key={index} className="text-white mx-4">
            <p className="font-medium text-[#8C8C8C] pb-3">{stat.title}</p>
            <h1 className="font-semibold text-4xl lg:text-6xl">{stat.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
