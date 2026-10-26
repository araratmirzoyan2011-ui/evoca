import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LocationSharer() {
  const [user, setUser] = useState(null);
  const lastPos = useRef(null);
  const lastWrite = useRef(0);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        console.log("AUTH USER:", u?.uid, u?.email);
        setUser(u);
      }),
    []
  );

  useEffect(() => {
    if (!user || !navigator.geolocation) return;

    const save = () => {
      if (!lastPos.current) return;
      lastWrite.current = Date.now();
      setDoc(
        doc(db, "locations", user.uid),
        {
          ...lastPos.current,
          name: user.displayName || user.email,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ).catch(console.error);
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        lastPos.current = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        if (Date.now() - lastWrite.current >= 5000) save();
      },
      (err) => {
        if (err.code === 1) console.error("Տեղադրության թույլտվությունը մերժված է");
        else if (err.code === 2) console.error("Տեղադրությունը հասանելի չէ");
        else if (err.code === 3) console.error("Տեղադրության հարցումը ժամանակը լրացավ");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    const heartbeat = setInterval(save, 30000);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(heartbeat);
    };
  }, [user]);

  return null;
}