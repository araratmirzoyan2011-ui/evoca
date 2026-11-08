import { useTranslation } from 'react-i18next';

// Մաքուր {hy, en, ru} օբյեկտ է՞ (այլ բանալիներով օբյեկտները չեն հաշվվում)
const isLocalized = (v) =>
  v &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  Object.keys(v).length > 0 &&
  Object.keys(v).every((k) => k === 'hy' || k === 'en' || k === 'ru');

// Ընթացիկ լեզվի string-ը, հակառակ դեպքում՝ hy, հակառակ դեպքում՝ ցանկացած string
const pick = (v, lang) => {
  if (typeof v[lang] === 'string' && v[lang].trim()) return v[lang];
  if (typeof v.hy === 'string') return v.hy;
  return Object.values(v).find((x) => typeof x === 'string') ?? '';
};

// Ռեկուրսիվ՝ ամեն {hy, en, ru} օբյեկտ (նաև ներդրված զանգվածներում/օբյեկտներում)
// դառնում է string։ Մնացածը (string, number, Timestamp և այլն) անփոփոխ է մնում։
export const deepLocalize = (value, lang) => {
  if (isLocalized(value)) return pick(value, lang);
  if (Array.isArray(value)) return value.map((x) => deepLocalize(x, lang));
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepLocalize(v, lang)]));
  }
  return value;
};

// Օգտագործում՝ const deep = useDeepLocalized(); const item = deep(rawItem);
export function useDeepLocalized() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'hy').slice(0, 2);
  return (value) => deepLocalize(value, lang);
}