import React from 'react';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import ProfileCard from '../Components/ProfileCard.jsx';

function Managment() {
    const boardMembers = [
    {
      id: 1,
      photo: "https://www.evoca.am/images-cache/team_members/1/16776012013335/230x230.png", 
      name: "ՎԱՐՈՒԺԱՆ ԱՎԵՏԻՔՅԱՆ, LL.M., MPA",
      role: "Խորհրդի նախագահ"
    },
    {
      id: 2,
      photo: "https://www.evoca.am/images-cache/team_members/1/17544805530896/230x230.png",
      name: "ՄԱՐՏԱ ԷԶԱՐՐԻ",
      role: "Խորհրդի անդամ, Աուդիտի կոմիտեի անդամ, Ռազմավարության կոմիտեի անդամ"
    },
    {
      id: 3,
      photo: "https://www.evoca.am/images-cache/team_members/1/17550915579199/230x230.png",
      name: "ՎԱԶԳԵՆ ԳԵՎՈՐԳՅԱՆ, MBA, PhD",
      role: "Խորհրդի անդամ, Ռազմավարության կոմիտեի նախագահ"
    },
    {
      id: 4,
      photo: "https://www.evoca.am/images-cache/team_members/1/17544805642771/230x230.png",
      name: "ՄԱՐԻՆԱ ԲՈՒԿԻ, MBA",
      role: "Խորհրդի անդամ Աուդիտի կոմիտեի նախագահ, Ռազմավարության կոմիտեի անդամ, Ռիսկերի և համապատասխանության կոմիտեի անդամ"
    },
    {
      id: 5,
      photo: "https://www.evoca.am/images-cache/team_members/1/1675080847328/230x230.png",
      name: "ԽՈՍԵ ՄԱՐԻԱ ՄՈՐԵՆՈ ԴԵ ԲԱՐՐԵՌԱ, LL.M., MBA, PhD",
      role: "Խորհրդի անդամ, Ռիսկերի և համապատասխանության կոմիտեի նախագահ, Ռազմավարության կոմիտեի անդամ"
    },
    {
      id: 6,
      photo: "https://www.evoca.am/images-cache/team_members/1/17544805424545/230x230.png",
      name: "ՊԻԵՐ ԿԱԶԻԱԿ, MBA",
      role: "Խորհրդի անդամ, Ռիսկերի և համապատասխանության կոմիտեի անդամ, Ռազմավարության կոմիտեի անդամ"
    },
    {
      id: 7,
      photo: "https://www.evoca.am/images-cache/team_members/1/17884208691388/230x230.png",
      name: "ԱՐԿԱԴԻ ՍԱՆԴԼԵՐ",
      role: "Խորհրդի անդամ, Աուդիտի կոմիտեի անդամ, Ռազմավարության կոմիտեի անդամ"
    }
  ];
  const managementMembers = [
    {
      id: 1,
      photo: "https://www.evoca.am/images-cache/team_members/1/1660202833495/230x230.png",
      name: "ԿԱՐԵՆ ԷԳԻՆԱԶԱՐՅԱՆ, MBA, PhD",
      role: "Վարչության նախագահ"
    },
    {
      id: 2,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602027630068/230x230.png",
      name: "ԱՐՄԵՆ ՀԱԿՈԲՅԱՆ, PhD",
      role: "Վարչության նախագահի առաջին տեղակալ"
    },
    {
      id: 3,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602030244095/230x230.png",
      name: "ՏԱԹԵՎԻԿ ԽԱՉԱՏՐՅԱՆ, MBA, PMP",
      role: "Վարչության նախագահի տեղակալ"
    },
    {
      id: 4,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602028118681/230x230.png",
      name: "ՀԱՅԿ ՊԵՏՐՈՍՅԱՆ",
      role: "Վարչության նախագահի տեղակալ"
    },
    {
      id: 5,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602028538342/230x230.png",
      name: "ԼԻԼԻԹ ԳԱԲՈՅԱՆ, MBA",
      role: "Վարչության նախագահի տեղակալ ֆինանսական գծով"
    },
    {
      id: 6,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602027917723/230x230.png",
      name: "ԷՄՄԱ ՋԱՆԻՆՅԱՆ, MBA, PhD, FCCA",
      role: "Վարչության անդամ, Գլխավոր հաշվապահ"
    },
    {
      id: 7,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602029763987/230x230.png",
      name: "ՍՄԲԱՏ ՄԱՐՏԻՐՈՍՅԱՆ",
      role: "Վարչության անդամ, Իրավաբանական վարչության պետ"
    },
    {
      id: 8,
      photo: "https://www.evoca.am/images-cache/team_members/1/16602028738374/230x230.png",
      name: "ՄՀԵՐ ՍԱՀԱԿՅԱՆ",
      role: "Վարչության անդամ, Ծրագրավորման և գործառնական համակարգերի վարչության պետ"
    }
  ];
  const auditarr=[
    {
      id: 1,
      photo: "https://www.evoca.am/images-cache/team_members/1/16282549740688/230x230.png",
      name: " ՆԱԶԵԼԻ ԵՂՈՅԱՆ, CIA",
      role: "Ներքին աուդիտի ստորաբաժանման ղեկավար"
    }
  ]
  return (
    <>
      <Header />
      <Navbar />
      <div className=' w-full mt-[60px] flex justify-center'>
        <h1 className="text-3xl font-medium mb-10  max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
            Ղեկավարություն
        </h1>
      </div>
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Բանկի խորհուրդ
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {boardMembers.map((member) => (
            <ProfileCard 
              key={member.id}
              photo={member.photo}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-[60px]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Բանկի վարչություն
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {managementMembers.map((member) => (
            <ProfileCard 
              key={member.id}
              photo={member.photo}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-[60px]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Բանկի ներքին աուդիտ
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {auditarr.map((member) => (
            <ProfileCard 
              key={member.id}
              photo={member.photo}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </div>
    
      <Footer />
    </>
  );
}

export default Managment;