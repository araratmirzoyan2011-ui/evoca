import React from 'react';
import SocialIcons from './SocialIcons';

export default function CsrInfoSection({ leadText, listItems, bottomText }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        
        <div className="flex md:flex-col items-center shrink-0 pt-2">
          <SocialIcons />
        </div>

        <div className="flex-1 space-y-6 text-gray-800">
          <p className="text-base sm:text-lg leading-relaxed">
            <span className="text-purple-700 font-semibold">Evocabank</span>-ում Կորպորատիվ սոցիալական պատասխանատվությունը կարևորագույն արժեք է, որն արտացոլվում է Բանկի գրեթե բոլոր նախաձեռնություններում։ Բանկը շարունակաբար աջակցություն է ցուցաբերում հանրության տարբեր խմբերին և հասարակական նախաձեռնություններին հետևյալ ոլորտներում՝
          </p>

          <ul className="space-y-4 pl-2">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-700 shrink-0"></span>
              <span className="text-base sm:text-lg">Նորագույն տեխնոլոգիաների զարգացում,</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-700 shrink-0"></span>
              <span className="text-base sm:text-lg">Երիտասարդության կրթական, գիտական և մշակութային նախաձեռնություններ,</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-700 shrink-0"></span>
              <span className="text-base sm:text-lg">Հասարակական կարևոր նշանակություն ունեցող նախաձեռնություններ,</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 mt-2.5 rounded-full bg-purple-700 shrink-0"></span>
              <span className="text-base sm:text-lg">Հասարակության առավել խոցելի խմբեր, մասնավորապես՝ ծնողազուրկ կամ հատուկ խնամքի տակ գտնվող երեխաներ:</span>
            </li>
          </ul>

          <p className="text-base sm:text-lg leading-relaxed pt-4">
            Մեր բոլորի կողմից Կորպորատիվ սոցիալական պատասխանատվությանն ուղղված յուրաքանչյուր փոքրիկ քայլ վկայում է աշխարհն ավելի լուսավոր ու գեղեցիկ դարձնելու կարևորության մասին:
          </p>
        </div>

      </div>
    </div>
  );
}