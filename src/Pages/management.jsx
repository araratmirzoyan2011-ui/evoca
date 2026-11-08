import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import ProfileCard from '../Components/ProfileCard.jsx';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocalized } from '../hooks/useLocalized.js';
const managementResources = {
  hy: {
    managementPage: {
      loading: 'Բեռնվում է...',
      title: 'Ղեկավարություն',
      board: 'Բանկի խորհուրդ',
      executive: 'Բանկի վարչություն',
      audit: 'Բանկի ներքին աուդիտ',
    },
  },
  en: {
    managementPage: {
      loading: 'Loading...',
      title: 'Management',
      board: 'Board of Directors',
      executive: 'Management Board',
      audit: 'Internal Audit',
    },
  },
  ru: {
    managementPage: {
      loading: 'Загрузка...',
      title: 'Руководство',
      board: 'Совет директоров',
      executive: 'Правление банка',
      audit: 'Внутренний аудит',
    },
  },
};

Object.entries(managementResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

function Managment() { 
  const { t } = useTranslation();
  const l = useLocalized();
  // undefined/null դաշտերը (օր. degrees) թողնում ենք անփոփոխ, մնացածը՝ լոկալիզացնում
  const loc = (v) => (v == null ? v : l(v));

  const [boardMembers, setBoardMembers] = useState([]);
  const [managementMembers, setManagementMembers] = useState([]);
  const [auditarr, setAuditarr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardSnapshot = await getDocs(collection(db, 'boardMembers'));
        const boardData = boardSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBoardMembers(boardData);

        const managementSnapshot = await getDocs(collection(db, 'managementMembers'));
        const managementData = managementSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setManagementMembers(managementData);

        const auditSnapshot = await getDocs(collection(db, 'internalAudit'));
        const auditData = auditSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAuditarr(auditData);
      } catch (err) {
        console.error('Error fetching data from Firebase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        {t('managementPage.loading')}
      </div>
    );
  }
console.log(auditarr);

  return (
    <>
      <Header />
      <Navbar />
      <div className='w-full mt-[60px] flex justify-center'>
        <h1 className="text-3xl font-medium mb-10 max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
            {t('managementPage.title')}
        </h1>
      </div>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            {t('managementPage.board')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {boardMembers.map((member) => (
              <ProfileCard
                key={member.id}
                id={member.id}
                group="board"
                photo={member.photo}
                name={loc(member.name)}
                degrees={loc(member.degrees)}
                role={loc(member.role)}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-[60px]">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            {t('managementPage.executive')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {managementMembers.map((member) => (
              <ProfileCard
                key={member.id}
                id={member.id}
                group="management"
                photo={member.photo}
                name={loc(member.name)}
                degrees={loc(member.degrees)}
                role={loc(member.role)}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-[60px]">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
            {t('managementPage.audit')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {auditarr.map((member) => (
              <ProfileCard
                key={member.id}
                id={member.id}
                group="audit"
                photo={member.photo}
                name={loc(member.name)}
                degrees={loc(member.degrees)}
                role={loc(member.role)}
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