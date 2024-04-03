import React from 'react';

const PriceCard = ({ title, price, features }) => {
  return (
    <div className="max-w-xs  flex flex-col items-center hover:border-[#00a7ac] hover:border-[1px] cursor-pointer  rounded-lg h-full overflow-hidden shadow-lg mx-4">
      <div className="px-6 py-4">
        <div className="text-center text-[#00a7ac] font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700  text-[14px]">
          ${price} / month
        </p>
      </div>
      <div className="px-6 py-4">
        <ul className="list-disc">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700 text-base mb-1">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-[#00a7ac] hover:bg-[#2e888b] text-white font-bold py-2 px-4 rounded">
          Subscribe
        </button>
      </div>
    </div>
  );
};

const PricePlans = () => {
  const plans = [
    {
      title: 'Basic',
      price: 10,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      title: 'Pro',
      price: 20,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      title: 'Premium',
      price: 30,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];

  return (
    <div className="grid  lg:grid-cols-3 grid-cols-1 gap-[20px] items-center justify-center mt-20">
      {plans.map((plan, index) => (
        <PriceCard
          key={index}
          title={plan.title}
          price={plan.price}
          features={plan.features}
        />
      ))}
    </div>
  );
};

export default PricePlans;
