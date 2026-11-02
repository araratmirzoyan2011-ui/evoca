import React, { useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

/* ===================== i18n ===================== */
const calcResources = {
  hy: {
    calc: {
      title: 'Հաշվիչներ',
      tabLoan: 'Վարկ',
      tabDeposit: 'Ավանդ',
      loanAmount: 'Վարկի գումար',
      termMonths: 'Ժամկետ (ամիս)',
      annualRate: 'Տարեկան տոկոսադրույք (%)',
      oneMonth: '1 ամիս',
      monthsMax: '1200 ամիս',
      repayment: 'Մարման ձև',
      equal: 'Զուգահեռաձև',
      annuity: 'Անուիտետ',
      disclaimer: 'Բոլոր հաշվարկները կրում են մոտավոր բնույթ և չեն հանդիսանում հրապարակային առաջարկ:',
      calculate: 'Հաշվել',
      depositAmount: 'Ներդրվող գումար',
      depositTermDays: 'Ավանդի ժամկետ (օր)',
      days91: '91 օր',
      days1095: '1095 օր',
      dailyInterest: 'Օրական կտրվածքով հաշվարկվող տոկոսագումար *',
      totalInterest: 'Ավանդային պայմանագրի գործողության ընթացքում հաշվարկվող ընդհանուր տոկոսային եկամուտ',
      netInterest: 'Ավանդային պայմանագրի գործողության ընթացքում ավանդատուին փաստացի վճարվող զուտ տոկոսային եկամուտ',
      taxNote: 'Ներդրված ավանդի դիմաց ստացվող տոկոսագումարներն հարկվում են՝ 10% եկամտային հարկի չափով',
      resultsTitle: 'Վարկային հաշվիչի արդյունքներ',
      sumAmount: 'Գումար',
      sumRate: 'Տարեկան տոկոսադրույք',
      sumTerm: 'Վարկի ժամկետը',
      sumTotal: 'Ընդհանուր վճարումը',
      colMonth: 'Ամիս',
      colInterest: 'Վճարվելիք տոկոսագումար',
      colPrincipal: 'Վարկի մասնակի մարում',
      colMonthly: 'Վարկի ամսական վճար',
      footTotal: 'Ընդամենը',
    },
  },
  en: {
    calc: {
      title: 'Calculators',
      tabLoan: 'Loan',
      tabDeposit: 'Deposit',
      loanAmount: 'Loan amount',
      termMonths: 'Term (months)',
      annualRate: 'Annual interest rate (%)',
      oneMonth: '1 month',
      monthsMax: '1200 months',
      repayment: 'Repayment type',
      equal: 'Differentiated',
      annuity: 'Annuity',
      disclaimer: 'All calculations are approximate and do not constitute a public offer.',
      calculate: 'Calculate',
      depositAmount: 'Deposit amount',
      depositTermDays: 'Deposit term (days)',
      days91: '91 days',
      days1095: '1095 days',
      dailyInterest: 'Interest accrued per day *',
      totalInterest: 'Total interest income accrued during the deposit agreement',
      netInterest: 'Net interest income actually paid to the depositor during the deposit agreement',
      taxNote: 'Interest received on the deposit is subject to 10% income tax',
      resultsTitle: 'Loan calculator results',
      sumAmount: 'Amount',
      sumRate: 'Annual interest rate',
      sumTerm: 'Loan term',
      sumTotal: 'Total payment',
      colMonth: 'Month',
      colInterest: 'Interest payable',
      colPrincipal: 'Principal repayment',
      colMonthly: 'Monthly payment',
      footTotal: 'Total',
    },
  },
  ru: {
    calc: {
      title: 'Калькуляторы',
      tabLoan: 'Кредит',
      tabDeposit: 'Вклад',
      loanAmount: 'Сумма кредита',
      termMonths: 'Срок (мес.)',
      annualRate: 'Годовая процентная ставка (%)',
      oneMonth: '1 месяц',
      monthsMax: '1200 месяцев',
      repayment: 'Способ погашения',
      equal: 'Дифференцированный',
      annuity: 'Аннуитет',
      disclaimer: 'Все расчёты носят приблизительный характер и не являются публичной офертой.',
      calculate: 'Рассчитать',
      depositAmount: 'Сумма вклада',
      depositTermDays: 'Срок вклада (дни)',
      days91: '91 день',
      days1095: '1095 дней',
      dailyInterest: 'Проценты, начисляемые за день *',
      totalInterest: 'Общий процентный доход, начисляемый в течение срока действия договора вклада',
      netInterest: 'Чистый процентный доход, фактически выплачиваемый вкладчику в течение срока действия договора вклада',
      taxNote: 'Проценты, полученные по вкладу, облагаются подоходным налогом в размере 10%',
      resultsTitle: 'Результаты кредитного калькулятора',
      sumAmount: 'Сумма',
      sumRate: 'Годовая процентная ставка',
      sumTerm: 'Срок кредита',
      sumTotal: 'Общая выплата',
      colMonth: 'Месяц',
      colInterest: 'Проценты к уплате',
      colPrincipal: 'Погашение основного долга',
      colMonthly: 'Ежемесячный платёж',
      footTotal: 'Итого',
    },
  },
};

Object.entries(calcResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

export function Calculators() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('loan');

  // Loan states
  const [loanAmount, setLoanAmount] = useState(10223);
  const [loanTerm, setLoanTerm] = useState(12);
  const [loanRate, setLoanRate] = useState(1);
  const [repaymentType, setRepaymentType] = useState('equal');

  // Deposit states
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositRate, setDepositRate] = useState(1);
  const [depositTerm, setDepositTerm] = useState(91);

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Calculate Loan Schedule
  const generateLoanSchedule = () => {
    const principal = Number(loanAmount) || 0;
    const months = Number(loanTerm) || 1;
    const rate = Number(loanRate) || 0;

    let schedule = [];
    let totalInterest = 0;
    let monthlyPrincipal = months > 0 ? principal / months : 0;
    let monthlyPaymentTotal = 0;

    for (let i = 1; i <= months; i++) {
      let remainingBalance = principal - (monthlyPrincipal * (i - 1));
      let monthlyInterest = (remainingBalance * (rate / 100)) / 12;
      if (monthlyInterest < 0) monthlyInterest = 0;

      totalInterest += monthlyInterest;
      let monthlyPayment = monthlyPrincipal + monthlyInterest;
      if (i === 1) monthlyPaymentTotal = monthlyPayment;

      schedule.push({
        month: i,
        interest: monthlyInterest.toFixed(2),
        principalPart: monthlyPrincipal.toFixed(2),
        totalMonthly: monthlyPayment.toFixed(2)
      });
    }

    const totalPayment = principal + totalInterest;

    return {
      schedule,
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    };
  };

  const loanResults = generateLoanSchedule();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
        {t('calc.title')}
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('loan')}
            className={`pb-3 text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'loan'
                ? 'text-gray-900 border-b-2 border-[#6600cc]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('calc.tabLoan')}
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`pb-3 text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'deposit'
                ? 'text-gray-900 border-b-2 border-[#6600cc]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('calc.tabDeposit')}
          </button>
        </div>

        {activeTab === 'loan' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Վարկի գումար */}
              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">{t('calc.loanAmount')}</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-36 outline-none focus:border-b focus:border-[#6600cc]"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="10000"
                  value={loanAmount === '' ? 0 : loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>0</span>
                  <span>50000000</span>
                </div>
              </div>

              {/* Ժամկետ */}
              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">{t('calc.termMonths')}</span>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value === '' ? '' : Number(e.target.value))}
                    className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-24 outline-none focus:border-b focus:border-[#6600cc]"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="1200"
                  value={loanTerm === '' ? 1 : loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>{t('calc.oneMonth')}</span>
                  <span>{t('calc.monthsMax')}</span>
                </div>
              </div>

              {/* Տարեկան տոկոսադրույք */}
              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:border-gray-200 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500 font-medium">{t('calc.annualRate')}</span>
                  <input
                    type="number"
                    value={loanRate}
                    onChange={(e) => setLoanRate(e.target.value === '' ? '' : Number(e.target.value))}
                    className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-20 outline-none focus:border-b focus:border-[#6600cc]"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="36"
                  value={loanRate === '' ? 1 : loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>1 %</span>
                  <span>36 %</span>
                </div>
              </div>

              {/* Մարման ձև */}
              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 flex flex-col justify-center">
                <span className="text-xs text-gray-500 font-medium mb-2.5">{t('calc.repayment')}</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="repayment"
                      checked={repaymentType === 'equal'}
                      onChange={() => setRepaymentType('equal')}
                      className="w-4 h-4 accent-[#6600cc]"
                    />
                    <span className="text-sm font-medium text-gray-800">{t('calc.equal')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="repayment"
                      checked={repaymentType === 'annuity'}
                      onChange={() => setRepaymentType('annuity')}
                      className="w-4 h-4 accent-[#6600cc]"
                    />
                    <span className="text-sm font-medium text-gray-800">{t('calc.annuity')}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-gray-100 gap-4">
              <p className="text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
                {t('calc.disclaimer')}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto bg-[#6600cc] text-white font-semibold px-8 py-2.5 text-sm rounded-full hover:bg-[#5500aa] transition-all cursor-pointer shadow-sm"
              >
                {t('calc.calculate')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left Side: Inputs */}
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 font-medium">{t('calc.depositAmount')}</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value === '' ? '' : Number(e.target.value))}
                      className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-36 outline-none focus:border-b focus:border-[#6600cc]"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="10000"
                    value={depositAmount === '' ? 0 : depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>0</span>
                    <span>50000000</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 font-medium">{t('calc.annualRate')}</span>
                    <input
                      type="number"
                      value={depositRate}
                      onChange={(e) => setDepositRate(e.target.value === '' ? '' : Number(e.target.value))}
                      className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-20 outline-none focus:border-b focus:border-[#6600cc]"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={depositRate === '' ? 1 : depositRate}
                    onChange={(e) => setDepositRate(Number(e.target.value))}
                    className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>1 %</span>
                    <span>36 %</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 font-medium">{t('calc.depositTermDays')}</span>
                    <input
                      type="number"
                      value={depositTerm}
                      onChange={(e) => setDepositTerm(e.target.value === '' ? '' : Number(e.target.value))}
                      className="text-lg font-extrabold text-gray-900 bg-transparent text-right w-24 outline-none focus:border-b focus:border-[#6600cc]"
                    />
                  </div>
                  <input
                    type="range"
                    min="91"
                    max="1095"
                    value={depositTerm === '' ? 91 : depositTerm}
                    onChange={(e) => setDepositTerm(Number(e.target.value))}
                    className="w-full accent-[#6600cc] mt-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>{t('calc.days91')}</span>
                    <span>{t('calc.days1095')}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Results / Metrics */}
              <div className="space-y-4 lg:pl-4">
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {t('calc.dailyInterest')}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {((depositAmount * (depositRate / 100)) / 365).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {t('calc.totalInterest')}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {(((depositAmount * (depositRate / 100)) / 365) * depositTerm).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {t('calc.netInterest')}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {((((depositAmount * (depositRate / 100)) / 365) * depositTerm) * 0.9).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-400">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('calc.taxNote')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
                {t('calc.disclaimer')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all cursor-pointer z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
              {t('calc.resultsTitle')}
            </h3>

            {/* Top Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 gap-4 mb-6 shrink-0">
              <div>
                <span className="block text-xs text-gray-400 mb-1">{t('calc.sumAmount')}</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{loanAmount}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">{t('calc.sumRate')}</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{loanRate}%</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">{t('calc.sumTerm')}</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{loanTerm}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">{t('calc.sumTotal')}</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{loanResults.totalPayment}</span>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[400px] pr-2 border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-xs">
                  <tr className="border-b border-gray-100 text-xs text-gray-400">
                    <th className="py-3 px-3 font-medium">{t('calc.colMonth')}</th>
                    <th className="py-3 px-3 font-medium">{t('calc.colInterest')}</th>
                    <th className="py-3 px-3 font-medium">{t('calc.colPrincipal')}</th>
                    <th className="py-3 px-3 font-medium">{t('calc.colMonthly')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {loanResults.schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-3 font-medium text-gray-900">{row.month}</td>
                      <td className="py-3.5 px-3 text-gray-700">{row.interest}</td>
                      <td className="py-3.5 px-3 text-gray-700">{row.principalPart}</td>
                      <td className="py-3.5 px-3 font-semibold text-gray-900">{row.totalMonthly}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="sticky bottom-0 bg-gray-50 shadow-xs">
                  <tr className="border-t border-gray-200 font-bold text-gray-900">
                    <td className="py-4 px-3">{t('calc.footTotal')}</td>
                    <td className="py-4 px-3">{loanResults.totalInterest}</td>
                    <td className="py-4 px-3">{loanAmount}</td>
                    <td className="py-4 px-3">{loanResults.totalPayment}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}