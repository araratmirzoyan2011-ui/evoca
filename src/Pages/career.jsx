import React, { useState, useEffect } from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu2.jsx';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import CultureBanner from '../Components/CultureBanner.jsx';
import WhyWorkSection from '../Components/WhyWorkSection.jsx';
import CoverflowSlider from '../Components/CoverflowSlider.jsx';
import TeamWordsSlider from '../Components/TeamWordsSlider.jsx';
import JoinTeamForm from '../Components/JoinTeamForm.jsx';
import { addDoc, serverTimestamp } from 'firebase/firestore';
function Career() {
    const teamData = {
  title: "Հարցրու՛ մեր թիմին. «Ինչպիսի՞ն է Evoca-ն՝ 3 բառով»",
  members: [
    {
      words: ["Թրենդային", "Պահանջված", "Ուրախ"],
      name: "Հարություն Սահակյան",
      role: "Անվտանգության մասնագետ",
    },
    {
      words: ["Դինամիկ", "Պրպտող", "Զարգացող"],
      name: "Լիլիթ Գաբոյան",
      role: "Գլխավոր ֆինանսական տնօրեն",
    },
    {
      words: ["Կրեատիվ", "Նորարար", "Մանուշակագույն"],
      name: "Ալլա Զաքարյան",
      role: "Վճարային գործիքների մասնագետ",
    },
    {
      words: ["Գույներ", "Էմոցիաներ", "Նորարարություններ"],
      name: "Գայանե Առաքելյան",
      role: "Մասնաճյուղի կառավարիչ",
    },
  ],
};
    const cultureData = {
  title: "Մշակույթ",
  text: "Evoca-ում աշխատելը հաճելի է: Առօրյան լցված է նորարարություններով: Այստեղ տաղանդները անընդհատ զարգանում ու կատարելագործվում են:",
  bgImage: "https://www.evoca.am/images-cache/menu/1/16195117975601/1920x634.jpg",
};
  const sliderIntro = {
  title: "Մշակույթ",
  text: "Evoca-ում մենք ոչ միայն անում ենք այն, ինչ սիրում ենք, այլ նաև կյանքից վերցնում ենք ամեն ինչ. Անընդհատ սովորում ենք, մեր փորձը կիսում ենք գործընկերների հետ, սպորտով ենք զբաղվում և հանգստանում: Միացեք մեզ!",
};
  const whyWorkData = {
    title: "Ինչո՞ւ աշխատել Evoca-ում",
    text: "«Բացահայտի՛ր, թե ինչն է Evoca-ն դարձնում այդքան յուրահատուկ: Աշխատակիցներն ուրախ են, մոտիվացված, իսկ առավելությունների մեծ փաթեթն օգնում է հոգ տանել իրենց և ընտանիքների մասին»",
    image: "https://www.evoca.am/file_manager/Career/evoca-girl.jpg",
  };

 const sliderData = [
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16760069357338/744x419.jpg",
    title: "Evoca New Year Corporate Party 2022",
    video:`<iframe width="560" height="315" src="https://www.youtube.com/embed/PvDYyPGb3RU?si=XOg8z4IZ4fGhI1Kr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16760071256254/744x419.jpg",
    title: "EVOCAISLAND Evoca Summer Party 2022",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/PF9JbEC-z-I?si=oCEtPCE-pez9MlEF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16335942010669/744x419.png",
    title: "Attention!!! You have never seen anything like this",
    video:`<iframe width="560" height="315" src="https://www.youtube.com/embed/Abpc2dbNEdU?si=sAZqQe7hIBUI1_5Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16196069660929/744x419.jpg",
    title: "Purple photoshoot with Evocabank",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/X9yAx39078s?si=RD-Do1iKZeG1RvVL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16196066065187/744x419.jpg",
    title: "Welcome to Evocabank!",
    video:`<iframe width="560" height="315" src="https://www.youtube.com/embed/ygQS-e1-2I8?si=77HRqHxOzi7L6X8G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16412988100187/744x419.jpg",
    title: "Evoca Corporate Party 2021",
    video:`<iframe width="560" height="315" src="https://www.youtube.com/embed/VNVSaTULcBk?si=_pRPZKQCmOyy9guL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
  {
    image: "https://www.evoca.am/images-cache/culture_sliders/1/16196059430279/744x419.jpg",
    title: "Evocabank neon art corporate party",
    video: `<iframe width="560" height="315" src="https://www.youtube.com/embed/gowxeSi1iJs?si=Ksy6YpgAS7E_I3xo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
  },
];
const joinData = {
  title: "Դառնալ թիմի անդամ",
  description: (
    <>
      Եթե ցանկանում ես միանալ{" "}
      <span className="font-semibold text-[#6a0fd9]">EvocaTEAM</span>-ին,
      <br />
      կարող ես ուղարկել դիմում՝ կցելով ինքնակենսագրականը:
    </>
  ),
  submitText: "Ես ուզում եմ աշխատել Evoca-ում :)",
  successText: "Շնորհակալություն, Ձեր դիմումը ուղարկվել է։",
};

const handleJoin = async ({ values, files }) => {
  await addDoc(collection(db, "teamApplications"), {
    ...values,
    resumeFiles: files.map((f) => f.name),
    createdAt: serverTimestamp(),
  });
};
  return (
    <>
      <Header />
      <Navbar />
      <CultureBanner {...cultureData} className="mb-[60px]" />
      <WhyWorkSection {...whyWorkData} />
        <CoverflowSlider {...sliderIntro} items={sliderData} />
        <TeamWordsSlider {...teamData} />
        <JoinTeamForm {...joinData} onSubmit={handleJoin} />
      <Footer />
    </>
  );
}

export default Career;