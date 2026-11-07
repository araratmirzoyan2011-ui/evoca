import React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Header from '../Components/About-us-Header.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Menu.jsx';
import SocialIcons from '../Components/SocialIcons.jsx';

/* ===================== i18n ===================== */
const structureResources = {
  hy: {
    structure: {
      title: 'Բանկի կառուցվածքը',
      scrollHint: 'Սահեցրեք ձախ-աջ՝ սխեման դիտելու համար',
      alt: 'Evocabank-ի կառուցվածքը',
    }
  },
  en: {
    structure: {
      title: 'Bank Structure',
      scrollHint: 'Swipe left-right to view the diagram',
      alt: 'Evocabank Structure',
    }
  },
  ru: {
    structure: {
      title: 'Структура банка',
      scrollHint: 'Проведите влево-вправо, чтобы просмотреть схему',
      alt: 'Структура Evocabank',
    }
  }
};

Object.entries(structureResources).forEach(([lng, tr]) => {
  i18n.addResourceBundle(lng, 'translation', tr, true, true);
});

function Structure() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Navbar />

      <section className="w-full bg-white py-12 overflow-x-hidden max-[400px]:py-6">
        <div className="max-w-6xl mx-auto px-6 max-[400px]:px-4">
          <div className="flex gap-8 max-[400px]:flex-col max-[400px]:gap-4">
            <div className="shrink-0 max-[400px]:order-2">
              <SocialIcons />
            </div>

            <div className="flex-1 min-w-0 w-full max-[400px]:order-1">
              <h1 className="text-3xl font-medium mb-10 pl-[8%] max-[400px]:pl-0 max-[400px]:text-xl max-[400px]:mb-5">
                {t('structure.title')}
              </h1>

              <p className="hidden max-[400px]:block text-[11px] text-gray-500 mb-2">
                {t('structure.scrollHint')}
              </p>

              <div className="w-full max-w-full overflow-x-auto max-[400px]:pb-2">
                <div className="max-[400px]:min-w-[800px]">
                  <a
                    href={t('structure.imgUrl')}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <img
                      src="https://www.evoca.am/file_manager/new-structure/%D5%80%D5%A1%D5%B5.png"
                      alt={t('structure.alt')}
                      className="block w-full h-auto object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Structure;