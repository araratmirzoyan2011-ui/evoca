import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

import JoinTeamForm from '../Components/JoinTeamForm.jsx';

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

const Contact = () => {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => (a.id > b.id ? 1 : -1));

        setContactData(data);
      } catch (error) {
        console.error("Սխալ տվյալների ստացման ժամանակ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return (
    <>
      <Header />

      <section className="w-full bg-white py-8 px-4 md:px-12">
        <div className="max-w-5xl mx-auto flex gap-6 md:gap-12">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Հետադարձ կապ
            </h2>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Բեռնվում է...</div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-purple-100 text-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {contactData.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={index !== contactData.length - 1 ? "border-b border-purple-50" : ""}
                      >
                        <td className="py-3 px-4 text-gray-600 font-medium w-1/3">
                          {item.label}
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          {item.isList && Array.isArray(item.value) ? (
                            <ul className="space-y-0.5">
                              {item.value.map((phone, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                  {phone}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            item.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <JoinTeamForm {...joinData} onSubmit={handleJoin} />
      <Footer />
    </>
  );
};

export default Contact;