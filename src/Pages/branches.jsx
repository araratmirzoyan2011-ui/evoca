import { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';
import { Header } from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';

// ───────────────────────────────────────────────────────────────
// Տվյալներ և Երևանի վարչական շրջանների որոշում
// ───────────────────────────────────────────────────────────────

const REGION_BY_CITY = {
  Երևան: 'Երևան',
  Վանաձոր: 'Լոռի',
  Գյումրի: 'Շիրակ',
  Դիլիջան: 'Տավուշ',
  Աբովյան: 'Կոտայք',
  Արտաշատ: 'Արարատ',
  Արմավիր: 'Արմավիր',
  Մերձավան: null,
  Գեղանիստ: null,
};

const getDistrictByAddress = (address, name, city) => {
  if (city !== 'Երևան') return null;
  const text = `${address} ${name}`.toLowerCase();
  
  if (text.includes('ազատության') || text.includes('կոմիտաս') || text.includes('հակոբյան') || text.includes('արամ խաչատրյան') || (text.includes('աբովյան') && text.includes('սայաթ'))) return 'Արաբկիր';
  if (text.includes('աբելյան') || text.includes('մազմանյան') || text.includes('դավթաշեն') || text.includes('պետրոսյան')) return 'Աջափնյակ / Դավթաշեն';
  if (text.includes('հանրապետության') || text.includes('թումանյան') || text.includes('մաշտոց') || text.includes('ամիրյան') || text.includes('բուզանդ') || text.includes('արգիշտի') || text.includes('իսահակյան') || text.includes('պուշկին') || text.includes('տերյան') || text.includes('զաքյան') || text.includes('պարոնյան') || text.includes('խորենացի') || text.includes('հյուսիսային')) return 'Կենտրոն';
  if (text.includes('գայի') || text.includes('վիլնյուս') || text.includes('լվովյան') || text.includes('ծարավ աղբյուր') || text.includes('նոր նորք')) return 'Նոր Նորք';
  if (text.includes('նժդեհ') || text.includes('շենգավիթ') || text.includes('արտաշիսյան') || text.includes('չեխովի') || text.includes('սվաճյան') || text.includes('շերամ')) return 'Շենգավիթ';
  if (text.includes('էրեբունի') || text.includes('գաջեգործների') || text.includes('արշակունյաց') || text.includes('տիգրան մեծ')) return 'Էրեբունի';
  if (text.includes('անդրանիկի') || text.includes('մալաթիա') || text.includes('իսակով')) return 'Մալաթիա-Սեբաստիա';
  
  return 'Կենտրոն';
};

const withRegion = (item) => ({
  region: REGION_BY_CITY[item.city] ?? null,
  district: item.district || getDistrictByAddress(item.address, item.name, item.city),
  lat: item.lat ?? 40.1792,
  lng: item.lng ?? 44.4991,
  ...item,
});

const MAIN_PHONE = '+374 10 60 55 55';

const branches = [
  { name: 'Գլխամասային գրասենյակ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Հանրապետության 44/2', phone: '+374 10 60 55 55', lat: 40.1748, lng: 44.5165 },
  { name: 'Evoca Premium Branch', city: 'Երևան', hours: '10:00 - 18:00', address: 'Զաքյան 10, 0052', phone: '8444', vip: true, lat: 40.1741, lng: 44.5074 },
  { name: '«Ազատության 12» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Ազատության 12', phone: MAIN_PHONE, lat: 40.2033, lng: 44.5245 },
  { name: '«Թումանյան» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 21:30', address: 'Թումանյան 15', phone: MAIN_PHONE, lat: 40.1831, lng: 44.5147 },
  { name: '«Կասյան» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Վազգեն Առաջին Վեհափառի 5', phone: MAIN_PHONE, lat: 40.1983, lng: 44.4922 },
  { name: '«Գարեգին Նժդեհ» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Գարեգին Նժդեհ 9/45', phone: MAIN_PHONE, lat: 40.1517, lng: 44.4891 },
  { name: '«Դավթաշեն» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Տիգրան Պետրոսյան 32/8', phone: MAIN_PHONE, lat: 40.2225, lng: 44.4831 },
  { name: '«Էրեբունի» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Գաջեգործների 76', phone: MAIN_PHONE, limited: true, lat: 40.1442, lng: 44.5126 },
  { name: '«Կոտայք» մասնաճյուղ', city: 'Աբովյան', hours: '09:30 - 17:00', address: 'Օգոստոսի 23 1/2', phone: '+374 222 60 555', lat: 40.2736, lng: 44.6258 },
  { name: '«Վանաձոր» մասնաճյուղ', city: 'Վանաձոր', hours: '09:30 - 17:00', address: 'Գր. Լուսավորիչի 34', phone: '+374 322 60 555', lat: 40.8078, lng: 44.4972 },
  { name: '«Կիևյան» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Կիևյան 11ա', phone: MAIN_PHONE, lat: 40.1956, lng: 44.4883 },
  { name: '«Մալաթիա» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Անդրանիկի 134/8', phone: MAIN_PHONE, lat: 40.1723, lng: 44.4552 },
  { name: '«Նոր Նորք» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Գայի պողոտա 14/9', phone: MAIN_PHONE, lat: 40.1975, lng: 44.5642 },
  { name: '«Երևան Մոլ» մասնաճյուղ', city: 'Երևան', hours: '10:30 - 21:30', address: 'Արշակունյաց պող., 34/3', phone: MAIN_PHONE, limited: true, lat: 40.1534, lng: 44.5079 },
  { name: '«Հանրապետության» մասնաճյուղ', city: 'Երևան', hours: '10:30 - 21:30', address: 'Հանրապետության 59', phone: MAIN_PHONE, limited: true, lat: 40.1772, lng: 44.5153 },
  { name: '«Աջափնյակ» մասնաճյուղ', city: 'Երևան', hours: '9:30 - 17:00', address: 'Աբելյան 2/1', phone: MAIN_PHONE, lat: 40.1988, lng: 44.4712 },
  { name: '«Գյումրի» մասնաճյուղ', city: 'Գյումրի', hours: '9:30 - 17:00', address: 'Մաքսիմ Գորկու 58', phone: MAIN_PHONE, lat: 40.7876, lng: 43.8421 },
  { name: '«Պարոնյան» մասնաճյուղ', city: 'Երևան', hours: '09:30 - 17:00', address: 'Պարոնյան 15/3', phone: MAIN_PHONE, lat: 40.1802, lng: 44.5021 },
  { name: '«Դիլիջան» մասնաճյուղ', city: 'Դիլիջան', hours: '09:30 - 17:30', address: 'Մյասնիկյան 74', phone: '8444', lat: 40.7412, lng: 44.8631 },
].map((b, i) => withRegion({ id: `b${i + 1}`, ...b }));

const atmRows = [
  ['Տիտոգրադյան 15/1', { lat: 40.165, lng: 44.532 }], ['Կիևյան 11ա 64', { lat: 40.196, lng: 44.488 }], ['Խորենացի 47', { lat: 40.171, lng: 44.505 }], ['Արշակունյաց 48/5', { lat: 40.149, lng: 44.506 }],
  ['Մելքումով 23/4', { cashIn: true, lat: 40.210, lng: 44.475 }], ['Փավստոս Բուզանդի 45', { cashIn: true, lat: 40.178, lng: 44.512 }],
  ['Մոնթե Մելքոնյան 50/1', { lat: 40.182, lng: 44.485 }], ['Տիգրան Պետրոսյան 30/30', { lat: 40.224, lng: 44.482 }],
  ['Երևանյան 1/55', { city: 'Մերձավան', lat: 40.185, lng: 44.380 }], ['Վերին Անտառային 131/34', { lat: 40.190, lng: 44.520 }],
  ['Ազատության 6/67', { cashIn: true, lat: 40.195, lng: 44.525 }], ['Մանանդյան 33/3', { lat: 40.155, lng: 44.470 }], ['Արշակունյաց 34', { lat: 40.153, lng: 44.507 }],
  ['Վահան Տերյան 108', { lat: 40.187, lng: 44.515 }], ['Մամիկոնյանց 40', { lat: 40.201, lng: 44.510 }], ['Դավթաշեն 4-րդ թաղ. 26/1', { lat: 40.228, lng: 44.475 }],
  ['Կոմիտաս 46', { lat: 40.205, lng: 44.512 }], ['Կոմիտաս 43', { lat: 40.202, lng: 44.510 }], ['Զովունի 1փ 145', { lat: 40.250, lng: 44.550 }], ['Հյուսիսային պողոտա 1', { lat: 40.182, lng: 44.515 }],
  ['Բյուզանդ 97/2', { lat: 40.176, lng: 44.510 }], ['Թումանյան 0/12', { lat: 40.183, lng: 44.514 }], ['Տիգրան Մեծ 47/1', { lat: 40.168, lng: 44.518 }], ['Արգիշտի 7/3', { lat: 40.178, lng: 44.502 }],
  ['Իսաբեկյան 1/2', { lat: 40.188, lng: 44.495 }], ['Պիոներական 1', { hours: '08:00 - 24:00', lat: 40.160, lng: 44.480 }], ['Շահումյան 33', { lat: 40.150, lng: 44.460 }],
  ['Հասրաթյան 4/1', { lat: 40.220, lng: 44.480 }], ['Աբելյան 2/1-3', { lat: 40.198, lng: 44.471 }], ['Արտեմ Միկոյան 15', { lat: 40.190, lng: 44.560 }], ['Արգիշտի 11/3', { lat: 40.179, lng: 44.503 }],
  ['Հ. Հակոբյան 7', { lat: 40.195, lng: 44.485 }], ['Մայրաքաղաքային 19', { lat: 40.185, lng: 44.530 }], ['Մաշտոց 46/1', { lat: 40.185, lng: 44.512 }], ['Հանրապետության 44/2', { lat: 40.174, lng: 44.516 }],
  ['Գրիբոյեդով 17', { hours: '08:30 - 01:00', lat: 40.200, lng: 44.520 }], ['Չարենց 9/51', { lat: 40.180, lng: 44.530 }], ['Մաշտոց 13', { lat: 40.175, lng: 44.510 }],
  ['Անաստաս Միկոյան 2/1', { lat: 40.210, lng: 44.490 }], ['Տիգրան Մեծ 16', { cashIn: true, lat: 40.172, lng: 44.515 }],
  ['Մյասնիկյան 74', { city: 'Դիլիջան', lat: 40.741, lng: 44.863 }], ['Պարոնյան 15/3', { lat: 40.180, lng: 44.502 }],
  ['Վազգեն Առաջին Վեհափառի 5', { lat: 40.198, lng: 44.492 }], ['Երվանդ Քոչար 17/1', { lat: 40.170, lng: 44.522 }],
  ['Ազատության 12', { cashIn: true, lat: 40.203, lng: 44.524 }], ['Գարեգին Նժդեհ 19', { cashIn: true, lat: 40.152, lng: 44.488 }],
  ['Տիգրան Պետրոսյան 32/8', { cashIn: true, lat: 40.222, lng: 44.483 }],
  ['Գր. Լուսավորիչի 34', { city: 'Վանաձոր', lat: 40.807, lng: 44.497 }], ['Գաջեգործների 76', { lat: 40.144, lng: 44.512 }], ['Հերացի 5', { lat: 40.188, lng: 44.535 }],
  ['Անդրանիկի 134/8', { lat: 40.172, lng: 44.455 }], ['Թամանյան 3', { lat: 40.188, lng: 44.515 }], ['Իսահակյան 28', { lat: 40.184, lng: 44.518 }], ['Սունդուկյան 9', { lat: 40.198, lng: 44.505 }],
  ['Աբովյան 35', { lat: 40.189, lng: 44.520 }], ['Վ. Փափազյան 21', { lat: 40.205, lng: 44.505 }], ['Գարեգին Նժդեհ 2/39', { lat: 40.155, lng: 44.485 }], ['Թումանյան 15', { lat: 40.183, lng: 44.514 }],
  ['Գյուրջյան 1/8', { lat: 40.195, lng: 44.555 }], ['Մեսրոպ Մաշտոց 5/15', { lat: 40.177, lng: 44.510 }], ['Պուշկինի 35/20', { lat: 40.182, lng: 44.516 }], ['Մաշտոց 40', { lat: 40.184, lng: 44.512 }],
  ['Գարեգին Նժդեհ 9/45', { lat: 40.151, lng: 44.489 }], ['Ծարավ Աղբյուր 55/6', { lat: 40.215, lng: 44.550 }], ['Նորաշեն 21/2', { lat: 40.230, lng: 44.470 }],
  ['Փիրումյանների 5', { lat: 40.225, lng: 44.478 }], ['Վիլնյուս 37/1', { lat: 40.190, lng: 44.570 }], ['Մազմանյան 5/13', { lat: 40.195, lng: 44.475 }], ['Սվաճյան 11', { lat: 40.165, lng: 44.460 }],
  ['Էրեբունի 18/8', { lat: 40.138, lng: 44.520 }], ['Մաքսիմ Գորկու 58', { city: 'Գյումրի', lat: 40.787, lng: 43.842 }],
  ['Սպանդարյան 19/8', { city: 'Գյումրի', lat: 40.790, lng: 43.850 }], ['Ա. Մանուկյան 7', { lat: 40.185, lng: 44.530 }], ['Բաղրամյան 2', { lat: 40.190, lng: 44.500 }],
  ['Անդրանիկի 50/3', { lat: 40.170, lng: 44.465 }], ['Պարույր Սևակ 55/2', { lat: 40.210, lng: 44.525 }], ['Փավստոս Բուզանդի 17/233', { lat: 40.177, lng: 44.512 }],
  ['Ֆանարջյան 55', { lat: 40.215, lng: 44.535 }], ['Փափազյան 14', { lat: 40.204, lng: 44.508 }], ['Գայի պողոտա 14/9', { lat: 40.197, lng: 44.564 }], ['Չեխովի 29/6', { lat: 40.158, lng: 44.475 }],
  ['Տարոնցի 1/3', { lat: 40.155, lng: 44.480 }], ['Աբովյան 17', { lat: 40.186, lng: 44.518 }], ['Խուդյակովի 214/6', { lat: 40.200, lng: 44.560 }], ['Մամիկոնյանց 2', { lat: 40.198, lng: 44.510 }],
  ['Իսակովի 8', { lat: 40.175, lng: 44.485 }], ['Հյուսիսային պողոտա 10', { lat: 40.183, lng: 44.516 }], ['Տիգրան Մեծի 31Ա', { lat: 40.170, lng: 44.518 }], ['Նորագավիթ 100/1', { lat: 40.125, lng: 44.485 }],
  ['Խորենացի 33/7', { lat: 40.172, lng: 44.506 }], ['Աբովյան - Սայաթ-Նովա խաչմերուկ', { lat: 40.185, lng: 44.520 }],
  ['Աբովյան - Իսահակյան խաչմերուկ', { lat: 40.186, lng: 44.519 }], ['Տիգրան Մեծ - Խանջյան խաչմերուկ', { lat: 40.171, lng: 44.520 }],
  ['Հանրապետության հրապարակ', { lat: 40.177, lng: 44.512 }], ['Ն. Տիգրանյան 1, նրբ. 9', { lat: 40.208, lng: 44.515 }],
  ['Տիգրան Մեծի պողոտա 18/1-3', { city: 'Վանաձոր', lat: 40.805, lng: 44.495 }],
  ['Շահումյան 33', { city: 'Արտաշատ', lat: 39.955, lng: 44.560 }], ['Գալշոյան 6', { lat: 40.190, lng: 44.480 }], ['Իսակովի 27/12', { lat: 40.173, lng: 44.475 }],
  ['Օգոստոսի 23', { city: 'Աբովյան', lat: 40.273, lng: 44.625 }], ['Արտաշիսյան 86/1', { lat: 40.155, lng: 44.478 }], ['Արշակունյաց 210/1', { lat: 40.130, lng: 44.500 }],
  ['Երևանյան 33/3', { city: 'Արմավիր', lat: 40.152, lng: 44.040 }], ['Ուլնեցի 57/2', { lat: 40.210, lng: 44.530 }], ['Ադոնց 4/3', { lat: 40.208, lng: 44.518 }],
  ['Քաջազնունի 6/1', { lat: 40.168, lng: 44.525 }], ['Կենտրոնական 28 1/1', { city: 'Գեղանիստ', lat: 40.120, lng: 44.420 }], ['Շերամ 77', { lat: 40.168, lng: 44.450 }],
  ['Պապ թագավորի 15', { lat: 40.150, lng: 44.490 }], ['Թումանյան 31/4', { lat: 40.184, lng: 44.518 }],
  ['Աբովյան 1/3 (ԶՈՎՔ սուպերմարկետ)', { cashIn: true, lat: 40.270, lng: 44.620 }],
];

const atms = atmRows.map(([address, extra = {}], i) =>
  withRegion({ id: `a${i + 1}`, name: 'Բանկոմատ', city: extra.city || 'Երևան', address, ...extra })
);

const terminalRows = [
  ['Հանրապետության 44/2', { lat: 40.174, lng: 44.516 }], ['Ադմիրալ Իսակով 9/2', { lat: 40.175, lng: 44.482 }], ['Պռոշյան 2/1', { lat: 40.185, lng: 44.498 }],
  ['Սմբատ Զորավարի 11/1', { lat: 40.145, lng: 44.515 }], ['Հակոբ Հակոբյան 8/2', { lat: 40.195, lng: 44.485 }], ['Շերամի 77/53', { lat: 40.168, lng: 44.450 }],
  ['Ծարավ Աղբյուր 55/15', { lat: 40.215, lng: 44.550 }], ['Չեխովի 52/26', { lat: 40.158, lng: 44.475 }], ['Լվովյան 14/1', { lat: 40.190, lng: 44.570 }], ['Երևանյան 1/55', { lat: 40.185, lng: 44.380 }],
  ['Ադոնց 19/8', { lat: 40.208, lng: 44.518 }], ['Վիլնյուս 41', { lat: 40.190, lng: 44.570 }], ['Արշակունյաց 48/5', { lat: 40.149, lng: 44.506 }], ['Տիգրան Մեծ 47/1', { lat: 40.168, lng: 44.518 }],
  ['Ծարավ Աղբյուր 55/6', { lat: 40.215, lng: 44.550 }], ['Արգիշտի 7/3', { lat: 40.178, lng: 44.502 }], ['Հանրապետության 67/1', { lat: 40.178, lng: 44.515 }], ['Տիչինա 136', { lat: 40.165, lng: 44.440 }],
  ['Պուշկին 35', { lat: 40.182, lng: 44.516 }], ['Աբելյան 2/1-3', { hours: '09:30 - 17:00', lat: 40.198, lng: 44.471 }], ['Արամ Խաչատրյան 3', { lat: 40.205, lng: 44.505 }],
];

const terminals = terminalRows.map(([address, extra = {}], i) =>
  withRegion({ id: `t${i + 1}`, name: 'Արտարժույթի փոխանակման տերմինալ', city: 'Երևան', address, ...extra })
);

const PURPLE = '#6D0AD6';
const YEREVAN = { lat: 40.1792, lng: 44.4991 };
const datasets = { branches, atms, terminals };

const tabs = [
  { key: 'branches', label: 'Մասնաճյուղեր' },
  { key: 'atms', label: 'Բանկոմատներ' },
  { key: 'terminals', label: 'Արտարժույթի փոխանակման տերմինալներ' },
];

const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
  <path d="M20 0C9 0 0 9 0 20c0 14 20 30 20 30s20-16 20-30C40 9 31 0 20 0z" fill="${PURPLE}"/>
  <path d="M10 13h6l4 11 4-11h6l-8 19h-4z" fill="#fff"/>
</svg>`;
const markerUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg);

const selectClass =
  'h-11 min-w-[150px] rounded-lg bg-white px-4 text-sm font-medium shadow-md outline-none ' +
  'cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6D0AD6]';

const unique = (list) => [...new Set(list.filter(Boolean))];

function BranchesMap({ items, activeId, onSelect }) {
  const [map, setMap] = useState(null);

  const icon = useMemo(
    () => ({
      url: markerUrl,
      scaledSize: new window.google.maps.Size(40, 50),
      anchor: new window.google.maps.Point(20, 50),
    }),
    []
  );

  const clusterOptions = useMemo(
    () => ({
      renderer: {
        render: ({ count, position }) =>
          new window.google.maps.Marker({
            position,
            label: { text: String(count), color: '#111', fontWeight: '600', fontSize: '13px' },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 16,
              fillColor: '#fff',
              fillOpacity: 1,
              strokeColor: PURPLE,
              strokeWeight: 4,
            },
            zIndex: 1000 + count,
          }),
      },
    }),
    []
  );

  useEffect(() => {
    if (!map || items.length === 0) return;
    if (items.length === 1) {
      map.panTo({ lat: items[0].lat, lng: items[0].lng });
      map.setZoom(15);
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    items.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
    map.fitBounds(bounds, 60);
  }, [map, items]);

  useEffect(() => {
    if (!map || activeId == null) return;
    const b = items.find((x) => x.id === activeId);
    if (!b) return;
    map.panTo({ lat: b.lat, lng: b.lng });
    map.setZoom(16);
  }, [map, activeId, items]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={YEREVAN}
      zoom={12}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      <MarkerClusterer options={clusterOptions}>
        {(clusterer) =>
          items.map((b) => (
            <Marker
              key={b.id}
              position={{ lat: b.lat, lng: b.lng }}
              icon={icon}
              clusterer={clusterer}
              title={b.name}
              onClick={() => onSelect(b)}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
}

function InfoRow({ children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-3 text-sm text-gray-500">
      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C9B3EF]" />
      <span>{children}</span>
    </div>
  );
}

function Branches() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  const [tab, setTab] = useState('branches');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [activeId, setActiveId] = useState(null);

  const items = datasets[tab];

  const regions = useMemo(() => unique(items.map((b) => b.region)), [items]);

  const districts = useMemo(() => {
    if (region !== 'Երևան') return [];
    return unique(items.filter((b) => b.region === 'Երևան' && b.district).map((b) => b.district));
  }, [items, region]);

  const filtered = useMemo(
    () =>
      items.filter(
        (b) => (!region || b.region === region) && (!district || b.district === district)
      ),
    [items, region, district]
  );

  const changeTab = (key) => {
    setTab(key);
    setRegion('');
    setDistrict('');
    setActiveId(null);
  };

  const changeRegion = (value) => {
    setRegion(value);
    setDistrict('');
    setActiveId(null);
  };

  const changeDistrict = (value) => {
    setDistrict(value);
    setActiveId(null);
  };

  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1920px]">
        <div className="px-6 pb-0 pt-12 lg:px-[280px]">
          <h1 className="mb-10 text-4xl font-bold text-gray-900">
            Բանկի հասցեները և աշխատաժամերը
          </h1>

          <div className="flex flex-wrap gap-x-12">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => changeTab(t.key)}
                className={`border-b-4 px-4 pb-3 text-sm transition-colors ${
                  tab === t.key
                    ? 'border-[#6D0AD6] font-semibold text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-[715px] flex-col md:flex-row">
          <div className="max-h-[300px] w-full shrink-0 overflow-y-auto shadow-md md:max-h-none md:w-[355px]">
            {filtered.length === 0 && (
              <p className="p-8 text-sm text-gray-500">
                Այս ընտրությամբ արդյունք չի գտնվել։ Փոխիր մարզը կամ համայնքը։
              </p>
            )}

            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveId(b.id)}
                className={`block w-full space-y-3 border-b border-gray-100 px-9 py-7 text-left transition-colors hover:bg-gray-50 ${
                  activeId === b.id ? 'bg-gray-50' : ''
                }`}
              >
                <h3 className="text-base font-semibold text-gray-900">{b.name}</h3>
                <InfoRow>{b.hours}</InfoRow>
                <InfoRow>{b.city !== 'Երևան' ? `${b.city}, ${b.address}` : b.address}</InfoRow>
                <InfoRow>{b.phone}</InfoRow>
                {b.cashIn && <InfoRow>Կանխիկի մուտք՝ Այո</InfoRow>}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            {loadError && (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                Քարտեզը չհաջողվեց բեռնել
              </div>
            )}
            {!loadError && !isLoaded && <div className="h-full w-full bg-gray-100" />}
            {isLoaded && (
              <BranchesMap items={filtered} activeId={activeId} onSelect={(b) => setActiveId(b.id)} />
            )}

            <div className="absolute right-4 top-4 z-10 flex gap-3">
              <select
                value={region}
                onChange={(e) => changeRegion(e.target.value)}
                className={selectClass}
                aria-label="Մարզ"
              >
                <option value="">Մարզ</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => changeDistrict(e.target.value)}
                className={selectClass}
                aria-label="Համայնք"
                disabled={region !== 'Երևան'}
              >
                <option value="">Համայնք</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Branches;