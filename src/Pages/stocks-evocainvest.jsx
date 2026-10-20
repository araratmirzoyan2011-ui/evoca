import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import SocialIcons from '../Components/SocialIcons.jsx';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../Components/Menuall.jsx';
import InfoCard from '../Components/AccountsCard.jsx';
import VideoAccordion from '../Components/video-accordion.jsx';
import InfoAccordion from '../Components/InfoAccordion.jsx';

const PURPLE = "text-[#6a00d4]";

const renderRich = (text) => {
  if (!text) return null;
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={PURPLE}>{part}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const SectionTitle = ({ children }) => (
  <h3 className={`font-bold text-lg ${PURPLE}`}>{children}</h3>
);

const BulletList = ({ items }) => {
  if (!items) return null;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-[#6a00d4]" />
          <span>{renderRich(item)}</span>
        </li>
      ))}
    </ul>
  );
};

const EvocaInvest = () => {
  const [loading, setLoading] = useState(true);

  // Firestore-ից բեռնվող state-եր
  const [securitiesmenu, setSecuritiesmenu] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [usefulMaterials, setUsefulMaterials] = useState(null);
  const [accordionsData, setAccordionsData] = useState([]);
  const [introTexts, setIntroTexts] = useState([]);
  const [instrumentsSection, setInstrumentsSection] = useState(null);
  const [stepsSection, setStepsSection] = useState(null);
  const [benefitsSection, setBenefitsSection] = useState(null);
  const [telegramSection, setTelegramSection] = useState(null);
  const [contactSection, setContactSection] = useState(null);
  const [importantSection, setImportantSection] = useState(null);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        setLoading(true);

        const menuSnapshot = await getDocs(collection(db, "securitiesmenu"));
        if (!menuSnapshot.empty) {
          setSecuritiesmenu(
            menuSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
        }

        const cardSnapshot = await getDocs(collection(db, "evocaInvestCardData"));
        if (!cardSnapshot.empty) {
          setCardData(cardSnapshot.docs[0].data());
        }

        const materialsSnapshot = await getDocs(collection(db, "evocaInvestUsefulMaterials"));
        if (!materialsSnapshot.empty) {
          setUsefulMaterials(materialsSnapshot.docs[0].data());
        }

        const accordionsSnapshot = await getDocs(collection(db, "evocaInvestAccordions"));
        if (!accordionsSnapshot.empty) {
          setAccordionsData(
            accordionsSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
          );
        }

        const introSnapshot = await getDocs(collection(db, "evocaInvestIntroTexts"));
        if (!introSnapshot.empty) {
          setIntroTexts(
            introSnapshot.docs.map((d) => d.data().text)
          );
        }

        const instrumentsSnapshot = await getDocs(collection(db, "evocaInvestInstrumentsSection"));
        if (!instrumentsSnapshot.empty) {
          setInstrumentsSection(instrumentsSnapshot.docs[0].data());
        }

        const stepsSnapshot = await getDocs(collection(db, "evocaInvestStepsSection"));
        if (!stepsSnapshot.empty) {
          setStepsSection(stepsSnapshot.docs[0].data());
        }

        const benefitsSnapshot = await getDocs(collection(db, "evocaInvestBenefitsSection"));
        if (!benefitsSnapshot.empty) {
          setBenefitsSection(benefitsSnapshot.docs[0].data());
        }

        const telegramSnapshot = await getDocs(collection(db, "evocaInvestTelegramSection"));
        if (!telegramSnapshot.empty) {
          setTelegramSection(telegramSnapshot.docs[0].data());
        }

        const contactSnapshot = await getDocs(collection(db, "evocaInvestContactSection"));
        if (!contactSnapshot.empty) {
          setContactSection(contactSnapshot.docs[0].data());
        }

        const importantSnapshot = await getDocs(collection(db, "evocaInvestImportantSection"));
        if (!importantSnapshot.empty) {
          setImportantSection(importantSnapshot.docs[0].data());
        }

      } catch (error) {
        console.error("Firestore-ից տվյալների բեռնման սխալ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Բեռնվում են տվյալները Firebase-ից...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar items={securitiesmenu} />

      <main className="w-full py-8 px-4 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {cardData && (
            <InfoCard
              title={cardData.title}
              description={cardData.description}
              imageUrl={cardData.imageUrl}
              altText={cardData.altText}
            />
          )}
        </div>
      </main>

      <section className="w-full bg-white py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-24">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <SocialIcons />
            </div>
          </div>

          <div className="flex-1 max-w-4xl text-gray-800 space-y-6 text-base leading-relaxed">
            {introTexts.map((t, i) => (
              <p key={i}>{renderRich(t)}</p>
            ))}

            {instrumentsSection && (
              <>
                <SectionTitle>{instrumentsSection.title}</SectionTitle>
                <p>{renderRich(instrumentsSection.text)}</p>
                <BulletList items={instrumentsSection.items} />
                <p>{renderRich(instrumentsSection.footer)}</p>
              </>
            )}

            {stepsSection && (
              <>
                <SectionTitle>{stepsSection.title}</SectionTitle>
                {stepsSection.steps.map((step, i) => (
                  <div key={i} className="space-y-3">
                    <SectionTitle>{step.title}</SectionTitle>
                    <p>{step.text}</p>
                    {step.links && (
                      <p>
                        {step.linksPrefix} (
                        {step.links.map((l, j) => (
                          <React.Fragment key={l.label}>
                            {j > 0 && " և "}
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${PURPLE} underline font-semibold`}
                            >
                              {l.label}
                            </a>
                          </React.Fragment>
                        ))}
                        )։
                      </p>
                    )}
                  </div>
                ))}
                {stepsSection.imageUrl && (
                  <img
                    src={stepsSection.imageUrl}
                    alt="EvocaINVEST քայլեր"
                    className="w-full rounded-lg"
                  />
                )}
              </>
            )}

            {benefitsSection && (
              <>
                <SectionTitle>{benefitsSection.title}</SectionTitle>
                {benefitsSection.items.map((b, i) => (
                  <div key={i} className="space-y-2">
                    <SectionTitle>{b.title}</SectionTitle>
                    <p>{b.text}</p>
                  </div>
                ))}
              </>
            )}

            {telegramSection && (
              <>
                <SectionTitle>{telegramSection.title}</SectionTitle>
                <p>{renderRich(telegramSection.text)}</p>
                <BulletList items={telegramSection.items} />
                <p>
                  {telegramSection.linkPrefix}{" "}
                  <a
                    href={telegramSection.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${PURPLE} underline font-semibold`}
                  >
                    {telegramSection.linkLabel}
                  </a>
                  ։
                </p>
              </>
            )}

            {contactSection && (
              <>
                <SectionTitle>{contactSection.title}</SectionTitle>
                {contactSection.texts.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
                <div className={`flex flex-wrap gap-x-8 gap-y-2 font-bold ${PURPLE}`}>
                  <a href={`mailto:${contactSection.email}`}>✉ {contactSection.email}</a>
                  <a href={`tel:${contactSection.phone}`}>☎ {contactSection.phone}</a>
                </div>
              </>
            )}

            {importantSection && (
              <>
                <SectionTitle>{importantSection.title}</SectionTitle>
                <p>{renderRich(importantSection.text)}</p>

                <iframe
                  src={importantSection.formUrl}
                  title="EvocaINVEST հետադարձ կապ"
                  className="w-full h-[600px] border-0 bg-gray-100"
                />
              </>
            )}
          </div>
          
        </div>

        <div className="w-[60%] ml-[20%] mt-[40px] space-y-10">
          {usefulMaterials && (
            <div>
              <h2 className="text-2xl font-bold uppercase mb-[40px]">
                {usefulMaterials.heading}
              </h2>
              <VideoAccordion
                title={usefulMaterials.accordionTitle}
                videos={usefulMaterials.videos}
              />
            </div>
          )}

          {accordionsData.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                Հաճախ տրվող հարցեր
              </h2>
              <div className="space-y-4">
                {accordionsData.map((item) => (
                  <InfoAccordion key={item.docId || item.id} title={item.title} blocks={item.blocks} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EvocaInvest;