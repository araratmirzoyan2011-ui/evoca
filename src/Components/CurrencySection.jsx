import React, { useState } from 'react';

export function CurrencySection() {
  const [activeTab, setActiveTab] = useState('cash'); 
  
  // Հաշվիչի վիճակը (State)
  const [haveAmount, setHaveAmount] = useState('');
  const [wantAmount, setWantAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Փոխարժեքների տվյալներ ըստ թաբերի
  const ratesData = {
    cash: [
      { currency: 'USD', code: 'US', buy: 361, sell: 365, flag: '🇺🇸' },
      { currency: 'EUR', code: 'EU', buy: 408, sell: 419, flag: '🇪🇺' },
      { currency: 'RUB', code: 'RU', buy: 4.08, sell: 4.25, flag: '🇷🇺' },
      { currency: 'GBP', code: 'GB', buy: 472, sell: 488, flag: '🇬🇧' },
      { currency: 'CHF', code: 'CH', buy: 433, sell: 456, flag: '🇨🇭' },
    ],
    cashless: [
      { currency: 'USD', code: 'US', buy: 362.5, sell: 364.5, flag: '🇺🇸' },
      { currency: 'EUR', code: 'EU', buy: 410, sell: 417, flag: '🇪🇺' },
      { currency: 'RUB', code: 'RU', buy: 4.12, sell: 4.22, flag: '🇷🇺' },
      { currency: 'GBP', code: 'GB', buy: 474, sell: 486, flag: '🇬🇧' },
      { currency: 'CHF', code: 'CH', buy: 435, sell: 454, flag: '🇨🇭' },
    ],
    gold: [
      { currency: '999 (1գր)', code: 'AU', buy: 31000, sell: 32500, flag: '🟡' },
      { currency: '583/585 (1գր)', code: 'AU', buy: 18000, sell: 19200, flag: '🟡' },
    ],
    ruble: [
      { currency: 'RUB մուտք', code: 'RU', buy: 4.08, sell: 4.25, flag: '🇷🇺' },
    ]
  };

  const currentRates = ratesData[activeTab] || ratesData.cash;

  // Հաշվիչի տրամաբանություն
  const handleHaveChange = (val) => {
    setHaveAmount(val);
    if (!val || isNaN(val)) {
      setWantAmount('');
      return;
    }
    const currObj = currentRates.find(r => r.currency === selectedCurrency) || currentRates[0];
    const result = (parseFloat(val) / currObj.sell).toFixed(2);
    setWantAmount(result);
  };

  const handleCurrencySelect = (currCode) => {
    setSelectedCurrency(currCode);
    setIsDropdownOpen(false);
    if (haveAmount) {
      const currObj = currentRates.find(r => r.currency === currCode) || currentRates[0];
      const result = (parseFloat(haveAmount) / currObj.sell).toFixed(2);
      setWantAmount(result);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        
        {/* Ձախ և մեջտեղի հատված՝ փոխարժեքներ և հաշվիչ */}
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100">
          
          <p className="text-[11px] sm:text-sm text-gray-700 leading-relaxed mb-6">
            20,000 ԱՄՆ դոլարից ավել կամ դրան համարժեք այլ արտարժույթի փոխարկման դեպքում գործարքը հաստատվում է Բանկի հայեցողությամբ և Բանկի կողմից որոշված փոխարժեքով։ 100,000 դրամ կամ դրան համարժեք արտարժույթից ավելի փոխանակման գործարքների իրականացման համար անհրաժեշտ է ներկայացնել անձը հաստատող փաստաթուղթ։
          </p>

          {/* Թաբեր (Tabs) - Ավելացված է հատուկ փոքր էկրանների (մինչև 400px) համար ոլորման հնարավորություն */}
          <div className="flex items-center gap-x-6 sm:gap-x-8 border-b border-gray-200 mb-6 pb-1 overflow-x-auto scrollbar-none whitespace-nowrap">
            <button 
              onClick={() => setActiveTab('cash')}
              className={`pb-3 text-xs sm:text-base font-semibold transition-colors cursor-pointer relative shrink-0 ${
                activeTab === 'cash' ? 'text-purple-600 border-b-2 border-purple-600 -mb-[5px]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Կանխիկ
            </button>
            <button 
              onClick={() => setActiveTab('cashless')}
              className={`pb-3 text-xs sm:text-base font-semibold transition-colors cursor-pointer relative shrink-0 ${
                activeTab === 'cashless' ? 'text-purple-600 border-b-2 border-purple-600 -mb-[5px]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Անկանխիկ
            </button>
            <button 
              onClick={() => setActiveTab('gold')}
              className={`pb-3 text-xs sm:text-base font-semibold transition-colors cursor-pointer relative shrink-0 ${
                activeTab === 'gold' ? 'text-purple-600 border-b-2 border-purple-600 -mb-[5px]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Ոսկու փոխարժեք
            </button>
            <button 
              onClick={() => setActiveTab('ruble')}
              className={`pb-3 text-xs sm:text-base font-semibold transition-colors cursor-pointer relative shrink-0 ${
                activeTab === 'ruble' ? 'text-purple-600 border-b-2 border-purple-600 -mb-[5px]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Ռուբլու կանխիկ մուտք
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Աղյուսակի մասը */}
            <div className="md:col-span-7 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[240px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] sm:text-xs text-gray-400 uppercase">
                    <th className="pb-3 font-medium">Արտարժույթ</th>
                    <th className="pb-3 font-medium text-right">Առք</th>
                    <th className="pb-3 font-medium text-right">Վաճառք</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentRates.map((item, index) => (
                    <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 flex items-center space-x-2 sm:space-x-3">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 w-5 sm:w-6">{item.code}</span>
                        <span className="font-bold text-gray-900 text-xs sm:text-sm">{item.currency}</span>
                      </td>
                      <td className="py-3.5 text-right font-semibold text-gray-800 text-xs sm:text-sm">
                        <span className="text-red-500 text-[9px] sm:text-[10px] mr-0.5">▼</span> {item.buy}
                      </td>
                      <td className="py-3.5 text-right font-semibold text-gray-800 text-xs sm:text-sm">
                        <span className="text-green-500 text-[9px] sm:text-[10px] mr-0.5">▲</span> {item.sell}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-4">
                Թարմացվել է` 25.09.2026
              </p>
            </div>

            {/* Հաշվիչի մասը */}
            <div className="md:col-span-5 bg-gray-50/80 p-3.5 sm:p-5 rounded-2xl flex flex-col justify-between border border-gray-100">
              <div className="space-y-3.5 sm:space-y-4">
                {/* Ունեմ */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1">Ունեմ (AMD)</label>
                  <div className="relative bg-white border border-gray-200 rounded-xl px-2.5 sm:px-3 py-2 flex items-center justify-between shadow-sm focus-within:border-purple-500">
                    <input 
                      type="number" 
                      placeholder="0"
                      value={haveAmount}
                      onChange={(e) => handleHaveChange(e.target.value)}
                      className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm sm:text-base min-w-0"
                    />
                    <div className="flex items-center space-x-1 pl-2 border-l border-gray-200 text-xs sm:text-sm font-bold text-gray-700 shrink-0">
                      <span>AMD</span>
                    </div>
                  </div>
                </div>

                {/* Կստանամ */}
                <div className="relative">
                  <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1">Կստանամ</label>
                  <div className="relative bg-white border border-gray-200 rounded-xl px-2.5 sm:px-3 py-2 flex items-center justify-between shadow-sm focus-within:border-purple-500">
                    <input 
                      type="text" 
                      readOnly
                      placeholder="0"
                      value={wantAmount}
                      className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm sm:text-base cursor-default min-w-0"
                    />
                    
                    {/* Արտարժույթի ընտրության կոճակ / Dropdown */}
                    <div className="relative shrink-0">
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-1 pl-2 border-l border-gray-200 text-xs sm:text-sm font-bold text-gray-700 cursor-pointer focus:outline-none"
                      >
                        <span>{selectedCurrency}</span>
                        <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown ցանկ */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                          {currentRates.map((r, i) => (
                            <button
                              key={i}
                              onClick={() => handleCurrencySelect(r.currency)}
                              className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                            >
                              {r.currency}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Աջ կողմի հատված՝ «Մեր հասցեները» */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 mb-1">
              Մեր հասցեները
            </h3>
            <p className="text-[11px] sm:text-sm text-gray-500 mb-5 sm:mb-6">
              Բանկի հասցեները, աշխատաժամերը, բանկոմատները
            </p>

            <div className="relative w-full h-40 sm:h-48 bg-purple-50/30 rounded-2xl overflow-hidden flex items-center justify-center border border-purple-100/60 mb-5 sm:mb-6 group">
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(#9333EA_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform text-white">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
          </div>

          <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 group cursor-pointer shadow-sm">
            <span>Դիտել քարտեզը</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}