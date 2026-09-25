import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-10 px-5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        
        {/* Ձախ հատված (Լոգո և տվյալներ) */}
        <div className="flex-1 min-w-[200px]">
          <div className="text-2xl font-bold text-gray-900 mb-5">
            evoca<span className="text-purple-700">BANK</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            ք. Երևան, 0010,<br />Հանրապետության 44/2[cite: 1]
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
            Evocabank-ը վերահսկվում է<br />
            Հայաստանի Հանրապետության<br />
            Կենտրոնական բանկի կողմից[cite: 1]
          </p>
          <p className="text-[10px] text-gray-400">
            1990 - 2026, © ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ[cite: 1]
          </p>
        </div>

        {/* Բանկի մասին */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Բանկի մասին</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#about" className="text-gray-600 hover:text-purple-700 transition">Մեր մասին</a>[cite: 1]</li>
            <li><a href="#management" className="text-gray-600 hover:text-purple-700 transition">Ղեկավարություն</a>[cite: 1]</li>
            <li><a href="#shareholders" className="text-gray-600 hover:text-purple-700 transition">Բաժնետերեր</a>[cite: 1]</li>
            <li><a href="#reports" className="text-gray-600 hover:text-purple-700 transition">Հաշվետվություններ</a>[cite: 1]</li>
            <li><a href="#laws" className="text-gray-600 hover:text-purple-700 transition">Իրավական ակտեր</a>[cite: 1]</li>
            <li><a href="#tariffs" className="text-gray-600 hover:text-purple-700 transition">Սակագներ</a>[cite: 1]</li>
            <li><a href="#property" className="text-gray-600 hover:text-purple-700 transition">Օտարվող գույք</a>[cite: 1]</li>
            <li><a href="#builders" className="text-gray-600 hover:text-purple-700 transition">Կառուցապատողներ</a>[cite: 1]</li>
            <li><a href="#dealers" className="text-gray-600 hover:text-purple-700 transition">Գործընկեր ավտոսրահներ</a>[cite: 1]</li>
            <li><a href="#archive" className="text-gray-600 hover:text-purple-700 transition">Սակագների արխիվ</a>[cite: 1]</li>
          </ul>
        </div>

        {/* Օգտակար հղումներ */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Օգտակար հղումներ</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#rights" className="text-gray-600 hover:text-purple-700 transition">Հաճախորդի իրավունքները (Բողոքի ներկայացման կանոններ)</a>[cite: 1]</li>
            <li><a href="#criteria" className="text-gray-600 hover:text-purple-700 transition">Հաճախորդի ռեզիդենտության չափանիշներ</a>[cite: 1]</li>
            <li><a href="#regulation" className="text-gray-600 hover:text-purple-700 transition">Կարգավորում</a>[cite: 1]</li>
            <li><a href="#privacy" className="text-gray-600 hover:text-purple-700 transition">Գաղտնիության քաղաքականություն</a>[cite: 1]</li>
            <li><a href="#ombudsman" className="text-gray-600 hover:text-purple-700 transition">Ֆին. հաշտարար</a>[cite: 1]</li>
            <li><a href="#security" className="text-gray-600 hover:text-purple-700 transition">Ֆինանսական հանցագործությունների կանխարգելում</a>[cite: 1]</li>
            <li><a href="#cardholders" className="text-gray-600 hover:text-purple-700 transition">Հղումներ Բանկի քարտապանների համար</a>[cite: 1]</li>
          </ul>
        </div>

        {/* Այլ հղումներ */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Այլ հղումներ</h3>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#online" className="text-gray-600 hover:text-purple-700 transition">EvocaONLINE</a>[cite: 1]</li>
            <li><a href="#boxes" className="text-gray-600 hover:text-purple-700 transition">Պահատուփեր</a>[cite: 1]</li>
            <li><a href="#faq" className="text-gray-600 hover:text-purple-700 transition">Հաճախ տրվող հարցեր</a>[cite: 1]</li>
            <li><a href="#announcements" className="text-gray-600 hover:text-purple-700 transition">Հայտարարություններ</a>[cite: 1]</li>
            <li><a href="#dibrary" className="text-gray-600 hover:text-purple-700 transition">Dibrary</a>[cite: 1]</li>
            <li><a href="#bulletins" className="text-gray-600 hover:text-purple-700 transition">Բուլետեններ</a>[cite: 1]</li>
            <li><a href="#contact" className="text-gray-600 hover:text-purple-700 transition">Հետադարձ կապ</a>[cite: 1]</li>
            <li><a href="#map" className="text-gray-600 hover:text-purple-700 transition">Կայքի քարտեզ</a>[cite: 1]</li>
          </ul>
        </div>

        {/* Աջ հատված (Կապ և հավելվածներ) */}
        <div className="flex-1 min-w-[180px] flex flex-col gap-4">
          <div className="flex gap-4 text-gray-600 font-bold text-sm">
            <a href="#facebook" className="hover:text-purple-700 transition">f</a>
            <a href="#instagram" className="hover:text-purple-700 transition">ig</a>
            <a href="#youtube" className="hover:text-purple-700 transition">yt</a>
            <a href="#linkedin" className="hover:text-purple-700 transition">in</a>
          </div>
          
          <div className="flex flex-col gap-2 max-w-[140px]">
            <a href="#appstore" className="bg-black text-white text-center py-2 px-3 rounded text-[11px] hover:opacity-80 transition">App Store</a>
            <a href="#googleplay" className="bg-black text-white text-center py-2 px-3 rounded text-[11px] hover:opacity-80 transition">Google Play</a>
          </div>

          <ul className="space-y-2.5 text-xs mt-2">
            <li><a href="#addresses" className="text-purple-700 font-medium hover:underline">Բանկի հասցեները և աշխատաժամերը</a>[cite: 1]</li>
            <li><a href="#reach-us" className="text-purple-700 font-medium hover:underline">Կապ մեզ հետ</a>[cite: 1]</li>
            <li><a href="tel:+37410605555" className="text-gray-800 font-semibold hover:text-purple-700 transition">+374 10 605555</a>[cite: 1]</li>
            <li><a href="tel:8444" className="text-gray-800 font-semibold hover:text-purple-700 transition">8444</a>[cite: 1]</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}