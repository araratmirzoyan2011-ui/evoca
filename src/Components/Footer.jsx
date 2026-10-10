import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-10 px-5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8 max-[400px]:flex-col max-[400px]:items-center max-[400px]:text-center">
        
        <div className="flex-1 min-w-[200px] max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:items-center">
          <div className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-1">
            <Link to="/">
              evoca<span className="text-purple-700">BANK</span>
            </Link>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            ք. Երևան, 0010,<br />Հանրապետության 44/2
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
            Evocabank-ը վերահսկվում է<br />
            Հայաստանի Հանրապետության<br />
            Կենտրոնական բանկի կողմից
          </p>
          <p className="text-[10px] text-gray-400">
            1990 - 2026, © ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ
          </p>
        </div>

        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Բանկի մասին</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/about" className="text-gray-600 hover:text-purple-700 transition">Մեր մասին</Link></li>
            <li><Link to="/management" className="text-gray-600 hover:text-purple-700 transition">Ղեկավարություն</Link></li>
            <li><Link to="/shareholders" className="text-gray-600 hover:text-purple-700 transition">Բաժնետերեր</Link></li>
            <li><Link to="/reports" className="text-gray-600 hover:text-purple-700 transition">Հաշվետվություններ</Link></li>
            <li><Link to="/laws" className="text-gray-600 hover:text-purple-700 transition">Իրավական ակտեր</Link></li>
            <li><Link to="/tariffs" className="text-gray-600 hover:text-purple-700 transition">Սակագներ</Link></li>
            <li><Link to="/property" className="text-gray-600 hover:text-purple-700 transition">Օտարվող գույք</Link></li>
            <li><Link to="/builders" className="text-gray-600 hover:text-purple-700 transition">Կառուցապատողներ</Link></li>
            <li><Link to="/dealers" className="text-gray-600 hover:text-purple-700 transition">Գործընկեր ավտոսրահներ</Link></li>
            <li><Link to="/archive" className="text-gray-600 hover:text-purple-700 transition">Սակագների արխիվ</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Օգտակար հղումներ</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/rights" className="text-gray-600 hover:text-purple-700 transition">Հաճախորդի իրավունքները<br />(Բողոքի ներկայացման<br />կանոններ)</Link></li>
            <li><Link to="/criteria" className="text-gray-600 hover:text-purple-700 transition">Հաճախորդի<br />ռեզիդենտության<br />չափանիշներ</Link></li>
            <li><Link to="/regulation" className="text-gray-600 hover:text-purple-700 transition">Կարգավորում</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-purple-700 transition">Գաղտնիության<br />քաղաքականություն</Link></li>
            <li><Link to="/ombudsman" className="text-gray-600 hover:text-purple-700 transition">Ֆին. հաշտարար</Link></li>
            <li><Link to="/security" className="text-gray-600 hover:text-purple-700 transition">Ֆինանսական<br />հանցագործությունների<br />կանխարգելում</Link></li>
            <li><Link to="/cardholders" className="text-gray-600 hover:text-purple-700 transition">Հղումներ Բանկի<br />քարտապանների համար</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[180px] max-[400px]:w-full">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Այլ հղումներ</h3>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/online" className="text-gray-600 hover:text-purple-700 transition">EvocaONLINE</Link></li>
            <li><Link to="/boxes" className="text-gray-600 hover:text-purple-700 transition">Պահատուփեր</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-purple-700 transition">Հաճախ տրվող հարցեր</Link></li>
            <li><Link to="/announcements" className="text-gray-600 hover:text-purple-700 transition">Հայտարարություններ</Link></li>
            <li><Link to="/dibrary" className="text-gray-600 hover:text-purple-700 transition">Dibrary</Link></li>
            <li><Link to="/bulletins" className="text-gray-600 hover:text-purple-700 transition">Բուլետեններ</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-purple-700 transition">Հետադարձ կապ</Link></li>
            <li><Link to="/map" className="text-gray-600 hover:text-purple-700 transition">Կայքի քարտեզ</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[180px] flex flex-col gap-4 max-[400px]:w-full max-[400px]:items-center">

          <div className="flex items-center gap-3 text-gray-500 mb-1 max-[400px]:justify-center">
            <Link to="/facebook" title="Facebook" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </Link>
            <Link to="/instagram" title="Instagram" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
            <Link to="/youtube" title="YouTube" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </Link>
            <Link to="/linkedin" title="LinkedIn" className="hover:opacity-80 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
          </div>
          
          <div className="flex flex-col gap-2 mb-1 max-[400px]:items-center">
            <Link to="/appstore" className="inline-block">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="App Store" 
                className="h-8 object-contain"
              />
            </Link>
            <Link to="/googleplay" className="inline-block">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="h-8 object-contain"
              />
            </Link>
          </div>

          <ul className="space-y-2.5 text-xs">
            <li><Link to="/addresses" className="text-purple-700 font-medium hover:underline">Բանկի հասցեները և<br />աշխատաժամերը</Link></li>
            <li><Link to="/reach-us" className="text-purple-700 font-medium hover:underline">Կապ մեզ հետ</Link></li>
            <li><a href="tel:+37410605555" className="text-gray-800 font-semibold hover:text-purple-700 transition">+374 10 605555</a></li>
            <li><a href="tel:8444" className="text-gray-800 font-semibold hover:text-purple-700 transition">8444</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}