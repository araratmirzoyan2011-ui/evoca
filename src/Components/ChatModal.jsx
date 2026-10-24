import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Չատի տվյալներ
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingMsgId, setEditingMsgId] = useState(null);

  // Ձայնային հաղորդագրության state-եր
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Չատի պատուհանը բացել/փակել և օգտատերերի ստուգում
  const handleChatToggle = async () => {
    if (!isOpen) {
      setLoading(true);

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

          // Ստանում ենք մյուս բոլոր օգտատերերին
          const querySnapshot = await getDocs(collection(db, "Users"));
          const allUsers = [];
          querySnapshot.forEach((d) => {
            if (d.id !== currentUser.uid) {
              allUsers.push({ id: d.id, ...d.data() });
            }
          });
          setUsersList(allUsers);
          if (allUsers.length > 0 && !selectedUser) {
            setSelectedUser(allUsers[0]); // Ավտոմատ ընտրում է առաջին օգտատիրոջը
          }
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
    }
  };

  const getChatId = (uid1, uid2) => {
    return [uid1, uid2].sort().join("_");
  };

  // 2. Realtime հաղորդագրություններ
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const chatId = getChatId(currentUser.uid, selectedUser.id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  // 3. Հաղորդագրություն ուղարկել / խմբագրել
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser || !currentUser) return;

    const chatId = getChatId(currentUser.uid, selectedUser.id);
    const messagesRef = collection(db, "chats", chatId, "messages");

    try {
      if (editingMsgId) {
        const msgDocRef = doc(db, "chats", chatId, "messages", editingMsgId);
        await updateDoc(msgDocRef, {
          text: inputText,
          isEdited: true,
        });
        setEditingMsgId(null);
      } else {
        await addDoc(messagesRef, {
          senderId: currentUser.uid,
          text: inputText,
          type: "text",
          createdAt: serverTimestamp(),
        });
      }
      setInputText("");
    } catch (err) {
      console.error("Ուղարկման սխալ:", err);
    }
  };

  // 4. Հաղորդագրություն ջնջել
  const handleDeleteMessage = async (msgId) => {
    if (!selectedUser || !currentUser) return;
    const chatId = getChatId(currentUser.uid, selectedUser.id);
    try {
      await deleteDoc(doc(db, "chats", chatId, "messages", msgId));
    } catch (err) {
      console.error("Ջնջման սխալ:", err);
    }
  };

  const handleStartEdit = (msg) => {
    setEditingMsgId(msg.id);
    setInputText(msg.text);
  };

  // 5. Ձայնային հաղորդագրություն
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          if (selectedUser && currentUser) {
            const chatId = getChatId(currentUser.uid, selectedUser.id);
            const messagesRef = collection(db, "chats", chatId, "messages");
            await addDoc(messagesRef, {
              senderId: currentUser.uid,
              audioUrl: base64Audio,
              type: "audio",
              createdAt: serverTimestamp(),
            });
          }
        };
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Միկրոֆոնի սխալ:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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
        /* Մեծացված չատի պատուհան՝ երկու մասից */
        <div className="bg-white w-[90vw] sm:w-[650px] h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Վերնագիր */}
          <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between border-b border-purple-800">
            <span className="font-bold text-sm">
              {isRegistered ? "Evoca Chat System" : "Chats"}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 font-bold text-base cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Պատուհանի ներսի մասը */}
          {!isRegistered ? (
            <div className="p-6 my-auto text-center flex flex-col items-center">
              <div className="text-red-600 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-200 mb-4 max-w-sm">
                {chatMessage}
              </div>
              <button
                onClick={() => navigate("/login")}
                className="bg-purple-700 hover:bg-purple-800 text-white py-2.5 px-6 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Մուտք գործել / Գրանցվել
              </button>
            </div>
          ) : (
            <div className="flex flex-grow overflow-hidden">
              {/* ՁԱԽ ՄԱՍ. Չատեր մտնելու կոճակներ / Օգտատերերի ցանկ */}
              <div className="w-1/3 min-w-[180px] bg-gray-50 border-r border-gray-200 flex flex-col p-2 overflow-y-auto">
                <p className="text-[11px] font-bold text-gray-500 uppercase px-2 py-1 mb-1">
                  Չատեր ({usersList.length})
                </p>
                {usersList.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">Չկան այլ մարդիկ</p>
                ) : (
                  usersList.map((u) => {
                    const isSelected = selectedUser?.id === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          setSelectedUser(u);
                          setEditingMsgId(null);
                          setInputText("");
                        }}
                        className={`w-full p-2.5 mb-1.5 rounded-xl text-left flex items-center gap-2.5 transition cursor-pointer ${
                          isSelected
                            ? "bg-purple-100 border border-purple-300 text-purple-900"
                            : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {u.fullName ? u.fullName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold truncate">{u.fullName}</p>
                          <p className="text-[10px] text-gray-500 truncate">{u.email}</p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* ԱՋ ՄԱՍ. Ընտրված չատի պատուհանը */}
              <div className="w-2/3 flex flex-col bg-white">
                {selectedUser ? (
                  <>
                    {/* Չատի վերևի անվան հատվածը */}
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">
                        {selectedUser.fullName}
                      </span>
                      <span className="text-[10px] text-gray-400">{selectedUser.email}</span>
                    </div>

                    {/* Հաղորդագրությունները */}
                    <div className="flex-grow p-3 overflow-y-auto space-y-2.5 bg-gray-50/30">
                      {messages.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center my-auto py-10">
                          Ուղարկեք առաջին հաղորդագրությունը...
                        </p>
                      ) : (
                        messages.map((msg) => {
                          const isMe = msg.senderId === currentUser?.uid;
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col group ${
                                isMe ? "items-end" : "items-start"
                              }`}
                            >
                              <div
                                className={`max-w-[85%] p-2.5 rounded-xl text-xs relative ${
                                  isMe
                                    ? "bg-purple-600 text-white rounded-br-none"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-2xs"
                                }`}
                              >
                                {msg.type === "text" ? (
                                  <p className="break-words">{msg.text}</p>
                                ) : (
                                  <audio controls src={msg.audioUrl} className="w-44 h-8" />
                                )}

                                {msg.isEdited && (
                                  <span className="text-[9px] opacity-70 block text-right mt-0.5">
                                    (փոփոխված)
                                  </span>
                                )}

                                {/* Խմբագրել / Ջնջել */}
                                {isMe && (
                                  <div className="hidden group-hover:flex gap-1.5 absolute -top-3 right-0 bg-gray-800 text-white rounded px-1.5 py-0.5 text-[10px] shadow">
                                    {msg.type === "text" && (
                                      <button
                                        onClick={() => handleStartEdit(msg)}
                                        className="hover:text-purple-300"
                                      >
                                        ✎
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteMessage(msg.id)}
                                      className="hover:text-red-400"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Մուտքագրման դաշտ */}
                    <form
                      onSubmit={handleSendMessage}
                      className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                          editingMsgId
                            ? "Փոփոխել հաղորդագրությունը..."
                            : "Գրեք հաղորդագրություն..."
                        }
                        className="flex-grow px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-purple-600"
                      />

                      {!inputText.trim() && (
                        <button
                          type="button"
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`p-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                            isRecording
                              ? "bg-red-500 text-white animate-pulse"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title={isRecording ? "Կանգնեցնել և ուղարկել" : "Ձայնագրել"}
                        >
                          🎤
                        </button>
                      )}

                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-2 text-xs rounded-xl font-medium cursor-pointer disabled:opacity-40 transition"
                      >
                        {editingMsgId ? "Փոխել" : "Ուղարկել"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="my-auto text-center text-xs text-gray-400 py-10">
                    Ընտրեք որևէ չատ ձախ ցանկից
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}