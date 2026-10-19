import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const Contact = () => {
  // Տվյալների զանգված
  const contactData = [
    {
      id: 1,
      label: 'Հասցե',
      value: 'ՀՀ, 0010 Երևան, Հանրապետության փող. 44/2 շենք',
      isList: false
    },
    {
      id: 2,
      label: 'Հեռախոսահամար',
      value: ['+374 10 605555,', '84-44'],
      isList: true
    },
    {
      id: 3,
      label: 'Էլ. փոստ',
      value: 'hello@evoca.am',
      isList: false
    },
    {
      id: 4,
      label: 'SWIFT',
      value: 'PRML AM 22',
      isList: false
    },
    {
      id: 5,
      label: 'Աշխատանքային ժամեր',
      value: '9:00 - 18:00',
      isList: false
    },
    {
      id: 6,
      label: 'Հաճախորդների սպասարկման ժամեր',
      value: '9:30 - 17:00',
      isList: false
    }
  ];

  return (
    <>
      <Header />

      <section className="w-full bg-white py-8 px-4 md:px-12">
        <div className="max-w-5xl mx-auto flex gap-6 md:gap-12">
          {/* Սոցիալական կնոպկաներ ձախ մասում */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          {/* Հետադարձ կապի բաժին և աղյուսակ */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Հետադարձ կապ
            </h2>

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
                        {item.isList ? (
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
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;