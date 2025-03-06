import React from 'react';

interface CategoryStats {
  totalDeals: number;
  averageReturn: number;
  minInvestment: number;
}

interface FundingCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: CategoryStats;
  gradient: string;
}

const categories: FundingCategory[] = [
  {
    id: 'recommended',
    title: 'Recommended for You',
    description: 'Personalized opportunities based on your preferences and history',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    stats: {
      totalDeals: 24,
      averageReturn: 12.5,
      minInvestment: 25000
    },
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'bridge',
    title: 'Bridge Loans',
    description: 'Short-term financing opportunities with quick returns',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    stats: {
      totalDeals: 18,
      averageReturn: 15.2,
      minInvestment: 50000
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'crowdfunding',
    title: 'Crowdfunding',
    description: 'Join other investors in funding real estate projects',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stats: {
      totalDeals: 32,
      averageReturn: 9.8,
      minInvestment: 5000
    },
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'emd',
    title: 'EMD Funding',
    description: 'Earnest Money Deposit funding opportunities',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stats: {
      totalDeals: 15,
      averageReturn: 18.5,
      minInvestment: 10000
    },
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 'emerging',
    title: 'Emerging Markets',
    description: 'Discover opportunities in high-growth real estate markets',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    stats: {
      totalDeals: 21,
      averageReturn: 14.3,
      minInvestment: 35000
    },
    gradient: 'from-pink-500 to-rose-500'
  }
];

const FundingCategories: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          {/* Gradient Background Overlay */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${category.gradient} transition-opacity duration-300`} />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className={`mb-4 p-3 rounded-lg bg-gradient-to-br ${category.gradient} text-white w-fit`}>
              {category.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {category.description}
            </p>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Active Deals</span>
                <span className="font-medium text-gray-900 dark:text-white">{category.stats.totalDeals}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Avg. Return</span>
                <span className="font-medium text-gray-900 dark:text-white">{category.stats.averageReturn}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Min. Investment</span>
                <span className="font-medium text-gray-900 dark:text-white">${category.stats.minInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FundingCategories; 