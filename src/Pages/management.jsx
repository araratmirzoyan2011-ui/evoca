import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import ProfileCard from '../Components/ProfileCard.jsx';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Managment() {
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
        Բեռնվում է...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className='w-full mt-[60px] flex justify-center'>
        <h1 className="text-3xl font-medium mb-10 max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
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
                id={member.id}
                group="board"
                photo={member.photo}
                name={member.name}
                degrees={member.degrees}
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
                id={member.id}
                group="management"
                photo={member.photo}
                name={member.name}
                degrees={member.degrees}
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
                id={member.id}
                group="audit"
                photo={member.photo}
                name={member.name}
                degrees={member.degrees}
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