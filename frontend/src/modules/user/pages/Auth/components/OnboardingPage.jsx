import React, { useState } from 'react';
import { BiSearch, BiChevronRight } from 'react-icons/bi';

const INTERESTS = [
  { category: 'Entertainment & Culture', items: ['Trends', 'TV shows', 'Marvel', 'Comedy', 'Trends', 'BTS', 'HBO', 'Naruto'] },
  { category: 'Home & Family', items: ['Motherhood', 'Parenting', 'Weddings', 'Fatherhood', 'Married life', 'Relationships'] },
  { category: 'Fashion & Beauty', items: ['Makeup', 'Nails', 'Sneakers', 'Hydration'] },
];

const OnboardingPage = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);

  const toggleInterest = (item) => {
    setSelected(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="pt-12 px-6 pb-6 flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h1 className="text-3xl font-extrabold text-black mb-3">Choose your interests</h1>
          <p className="text-sm text-gray-500 leading-tight">
            Personalize your experience by picking 3 or more topics
          </p>
        </div>
        <button onClick={onComplete} className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-tight">Skip</button>
      </div>

      {/* Interests Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
        {INTERESTS.map((section, idx) => (
          <div key={idx} className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-black font-bold text-sm">
                {idx === 0 && <span className="text-lg">🎭</span>}
                {idx === 1 && <span className="text-lg">🏠</span>}
                {idx === 2 && <span className="text-lg">👗</span>}
                <span className="tracking-tight">{section.category}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {section.items.map((item, i) => {
                const isSelected = selected.includes(item);
                return (
                  <button
                    key={i}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all active:scale-95 ${
                      isSelected 
                        ? 'bg-tiktok-red border-tiktok-red text-white shadow-lg shadow-tiktok-red/20' 
                        : 'bg-white border-gray-100 text-black'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <button
          onClick={onComplete}
          disabled={selected.length < 3}
          className={`w-full py-4 rounded-sm font-bold text-base transition-all active:scale-[0.98] pointer-events-auto ${
            selected.length >= 3 
              ? 'bg-tiktok-red text-white shadow-xl shadow-tiktok-red/30' 
              : 'bg-gray-100 text-gray-300'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
