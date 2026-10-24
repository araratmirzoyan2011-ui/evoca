import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChatToggle = async () => {
    if (!isOpen) {
      setLoading(true);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setIsRegistered(false);
        setChatMessage("Դուք չեք կարող բացել չատը, որովհետև գրանցված չեք։");
        setIsOpen(true);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().fullName) {
          setIsRegistered(true);
          setChatMessage("");

          // Վերցնում ենք բոլոր գրանցված օգտատերերին "Users" հավաքածուից (բացառությամբ հենց իրեն)
          const querySnapshot = await getDocs(collection(db, "Users"));
          const allUsers = [];
          querySnapshot.forEach((doc) => {
            if (doc.id !== currentUser.uid) {
              allUsers.push({ id: doc.id, ...doc.data() });
            }
          });
          setUsersList(allUsers);
          setIsOpen(true);
        } else {
          setIsRegistered(false);
          setChatMessage("Դուք չեք կարող բացել չատը, որովհետև գրանցված չեք։");
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Ստուգման սխալ:", err);
        setChatMessage("Տեղի ունեցավ սխալ ստուգման ընթացքում։");
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    } else {
      setIsOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={handleChatToggle}
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-200 cursor-pointer disabled:opacity-50"
          title="Բացել չատը"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      ) : (
        <div className="bg-white w-80 rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Վերնագիր */}
          <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-bold text-sm">
              {selectedUser ? selectedUser.fullName : "Chats (Գրանցված մարդիկ)"}
            </span>
            <button
              onClick={() => {
                if (selectedUser) {
                  setSelectedUser(null); // Եթե չատի մեջ է, հետ է գալիս ցանկ
                } else {
                  setIsOpen(false);
                }
              }}
              className="text-white hover:text-gray-200 font-bold text-sm cursor-pointer"
            >
              {selectedUser ? "← Հետ" : "✕"}
            </button>
          </div>

          {/* Մարմին */}
          <div className="p-3 h-72 overflow-y-auto bg-gray-50 flex flex-col">
            {!isRegistered ? (
              <div className="my-auto text-center">
                <div className="text-red-600 text-xs font-medium bg-red-50 p-3 rounded-lg border border-red-200 mb-3">
                  {chatMessage}
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg text-xs font-semibold transition cursor-pointer w-full"
                >
                  Մուտք գործել / Գրանցվել
                </button>
              </div>
            ) : selectedUser ? (
              // Առանձին օգտատիրոջ հետ նամակագրության պատուհան
              <div className="flex flex-col h-full justify-between">
                <div className="text-xs text-gray-500 text-center mb-2">
                  Զրույց {selectedUser.fullName}-ի հետ
                </div>
                <div className="flex-grow bg-white p-3 rounded-lg border border-gray-200 text-xs text-gray-700 overflow-y-auto">
                  Այստեղ կցուցադրվեն նամակները...
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Գրեք հաղորդագրություն..."
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                  <button className="bg-purple-700 text-white px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer">
                    Ուղարկել
                  </button>
                </div>
              </div>
            ) : (
              // Գրանցված մարդկանց ցանկ
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold mb-2">Ընտրեք զրուցակից:</p>
                {usersList.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-10">Այլ գրանցված օգտատերեր չկան։</p>
                ) : (
                  usersList.map((u) => (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs hover:border-purple-600 cursor-pointer flex items-center gap-3 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                        {u.fullName ? u.fullName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-800 truncate">{u.fullName}</p>
                        <p className="text-[10px] text-gray-500 truncate">{u.email}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}