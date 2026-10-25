import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LocationSharer() {
  const [user, setUser] = useState(null);
  const lastWrite = useRef(0);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (!user || !navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const now = Date.now();
        if (now - lastWrite.current < 5000) return; // առավելագույնը 5 վրկ մեկ
        lastWrite.current = now;

        setDoc(
          doc(db, "locations", user.uid),
          {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            name: user.displayName || user.email,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        ).catch(console.error);
      },
      (err) => {
  if (err.code === 1) console.error("Տեղադրության թույլտվությունը մերժված է");
  else if (err.code === 2) console.error("Տեղադրությունը հասանելի չէ");
  else if (err.code === 3) console.error("Տեղադրության հարցումը ժամանակը լրացավ");
},
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);

  return null;
}