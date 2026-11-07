import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase.js';


export async function migrateImportantBlocks() {
  let updatedCount = 0;
  let addedCount = 0;
  
  const snap = await getDocs(collection(db, 'importantBlocks'));
  const existingOrders = new Set(snap.docs.map(d => Number(d.data().order)));

  // Ավելացնում կամ թարմացնում ենք միայն 82-ից սկսած բլոկները
  for (const item of translatedCreditBlocks) {
    if (item.order >= 82) {
      // Ստուգում ենք՝ արդյոք այս order-ով փաստաթուղթ արդեն կա բազայում, թե ոչ
      const existingDoc = snap.docs.find(d => Number(d.data().order) === Number(item.order));

      if (existingDoc) {
        // Եթե կա, թարմացնում ենք
        const patch = { ...item };
        delete patch.id;
        await updateDoc(doc(db, 'importantBlocks', existingDoc.id), patch);
        updatedCount++;
      } else {
        // Եթե չկա, կարող եք ավելացնել որպես նոր փաստաթուղթ (կամ ուղղակի թողնել, եթե արդեն ստեղծված են)
        // await addDoc(collection(db, 'importantBlocks'), item);
        // addedCount++;
      }
    }
  }

  alert(`Գործողությունն ավարտվեց։ Թարմացվեց ${updatedCount} բլոկ (սկսած 82-րդից) ✅`);
}