import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// WebRTC կարգավորումներ (STUN). Խիստ ցանցերի համար ավելացրու նաև TURN սերվեր։
const ICE_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

const RING_TIMEOUT_MS = 45000;

const IDLE_CALL = {
  phase: "idle", // idle | calling | incoming | connecting | active
  type: null, // 'audio' | 'video'
  peer: null,
  callId: null,
  isCaller: false,
  offer: null,
};

const formatDuration = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

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

  // ---------- ԶԱՆԳԻ state-եր ----------
  const [call, setCall] = useState(IDLE_CALL);
  const callRef = useRef(IDLE_CALL); // միշտ թարմ արժեք snapshot-ների համար
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);
  const [callNotice, setCallNotice] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const unsubsRef = useRef([]);
  const pendingCandidatesRef = useRef([]);
  const answerSetRef = useRef(false);
  const ringTimeoutRef = useRef(null);
  const timerRef = useRef(null);
  const noticeTimeoutRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // auth.currentUser-ը կարող է սկզբում null լինել, ուստի լսում ենք փոփոխությունը
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

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

          const querySnapshot = await getDocs(collection(db, "Users"));
          const allUsers = [];
          querySnapshot.forEach((d) => {
            if (d.id !== currentUser.uid) {
              allUsers.push({ id: d.id, ...d.data() });
            }
          });
          setUsersList(allUsers);
          if (allUsers.length > 0 && !selectedUser) {
            setSelectedUser(allUsers[0]);
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
        // Անջատում ենք միկրոֆոնը, որ չմնա միացած
        stream.getTracks().forEach((t) => t.stop());

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

  // =====================================================
  // 6. ԶԱՆԳԵՐ (WebRTC + Firestore signaling)
  // =====================================================
  //
  // Firestore կառուցվածք.
  //   calls/{callId}                    -> { callerId, calleeId, type, status, offer, answer }
  //   calls/{callId}/offerCandidates    -> ICE candidates (զանգողից)
  //   calls/{callId}/answerCandidates   -> ICE candidates (պատասխանողից)
  // callId = getChatId(uid1, uid2)

  const updateCall = (patch) => {
    callRef.current = { ...callRef.current, ...patch };
    setCall(callRef.current);
  };

  const showNotice = (text) => {
    setCallNotice(text);
    clearTimeout(noticeTimeoutRef.current);
    noticeTimeoutRef.current = setTimeout(() => setCallNotice(""), 3500);
  };

  // Ամբողջ լոկալ մաքրումը (media, peer, listeners, timers)
  const cleanupCall = () => {
    clearTimeout(ringTimeoutRef.current);
    clearInterval(timerRef.current);
    ringTimeoutRef.current = null;
    timerRef.current = null;

    unsubsRef.current.forEach((u) => {
      try {
        u();
      } catch (e) {
        /* ignore */
      }
    });
    unsubsRef.current = [];

    if (pcRef.current) {
      pcRef.current.onicecandidate = null;
      pcRef.current.ontrack = null;
      pcRef.current.onconnectionstatechange = null;
      try {
        pcRef.current.close();
      } catch (e) {
        /* ignore */
      }
      pcRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    remoteStreamRef.current = null;
    pendingCandidatesRef.current = [];
    answerSetRef.current = false;

    setLocalStream(null);
    setRemoteStream(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setDuration(0);
    updateCall(IDLE_CALL);
  };

  // Ավարտ առանց Firestore-ում գրելու (երբ մյուս կողմն է ավարտել)
  const endLocal = (notice) => {
    cleanupCall();
    if (notice) showNotice(notice);
  };

  const getMedia = async (type) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("NO_MEDIA_API");
    }
    return navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
      video: type === "video" ? { facingMode: "user" } : false,
    });
  };

  const mediaErrorText = (err) => {
    if (err?.message === "NO_MEDIA_API")
      return "Զանգերը աշխատում են միայն HTTPS-ով (կամ localhost-ում)։";
    if (err?.name === "NotAllowedError")
      return "Թույլ տվեք միկրոֆոնի/տեսախցիկի հասանելիությունը բրաուզերում։";
    if (err?.name === "NotFoundError")
      return "Միկրոֆոն կամ տեսախցիկ չի գտնվել։";
    if (err?.name === "NotReadableError")
      return "Սարքը զբաղված է մեկ այլ ծրագրի կողմից։";
    return "Չհաջողվեց սկսել զանգը։";
  };

  const flushPendingCandidates = async () => {
    const pc = pcRef.current;
    if (!pc) return;
    const list = pendingCandidatesRef.current;
    pendingCandidatesRef.current = [];
    for (const c of list) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(c));
      } catch (e) {
        console.error("ICE candidate սխալ:", e);
      }
    }
  };

  const createPeer = (callId, myCandidatesCollection) => {
    const pc = new RTCPeerConnection(ICE_CONFIG);
    remoteStreamRef.current = new MediaStream();
    setRemoteStream(remoteStreamRef.current);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        addDoc(
          collection(db, "calls", callId, myCandidatesCollection),
          e.candidate.toJSON()
        ).catch((err) => console.error("Candidate ուղարկման սխալ:", err));
      }
    };

    pc.ontrack = (e) => {
      if (remoteStreamRef.current && !remoteStreamRef.current.getTracks().includes(e.track)) {
        remoteStreamRef.current.addTrack(e.track);
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === "connected") {
        clearTimeout(ringTimeoutRef.current);
        if (callRef.current.phase !== "active") {
          updateCall({ phase: "active" });
          clearInterval(timerRef.current);
          timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
        }
      } else if (state === "failed") {
        hangUp("Կապը խզվեց");
      }
    };

    pcRef.current = pc;
    return pc;
  };

  // Լսում ենք մյուս կողմի ICE candidates-ը
  const listenCandidates = (callId, collectionName) => {
    const unsub = onSnapshot(collection(db, "calls", callId, collectionName), (snap) => {
      snap.docChanges().forEach((ch) => {
        if (ch.type !== "added") return;
        const data = ch.doc.data();
        const pc = pcRef.current;
        if (!pc) return;
        if (pc.remoteDescription) {
          pc.addIceCandidate(new RTCIceCandidate(data)).catch((e) =>
            console.error("ICE candidate սխալ:", e)
          );
        } else {
          pendingCandidatesRef.current.push(data);
        }
      });
    });
    unsubsRef.current.push(unsub);
  };

  // Լսում ենք call փաստաթղթի փոփոխությունները (answer, rejected, ended)
  const listenCallDoc = (callId) => {
    const unsub = onSnapshot(doc(db, "calls", callId), async (snap) => {
      const data = snap.data();
      const pc = pcRef.current;
      if (!data || !pc) return;

      if (data.status === "rejected") {
        endLocal("Զանգը մերժվեց");
        return;
      }
      if (data.status === "ended") {
        endLocal("Զանգն ավարտվեց");
        return;
      }

      if (
        callRef.current.isCaller &&
        data.answer &&
        !answerSetRef.current
      ) {
        answerSetRef.current = true;
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          await flushPendingCandidates();
          if (callRef.current.phase === "calling") {
            updateCall({ phase: "connecting" });
          }
        } catch (e) {
          console.error("Answer սխալ:", e);
          hangUp("Չհաջողվեց միացնել զանգը");
        }
      }
    });
    unsubsRef.current.push(unsub);
  };

  // --- Զանգ սկսել ---
  const startCall = async (type) => {
    if (!selectedUser || !currentUser) return;
    if (callRef.current.phase !== "idle") return;

    const peer = selectedUser;
    const callId = getChatId(currentUser.uid, peer.id);
    updateCall({ phase: "calling", type, peer, callId, isCaller: true, offer: null });

    try {
      const stream = await getMedia(type);
      localStreamRef.current = stream;
      setLocalStream(stream);

      const pc = createPeer(callId, "offerCandidates");
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));

      // Հին candidates-ի մաքրում
      for (const sub of ["offerCandidates", "answerCandidates"]) {
        const old = await getDocs(collection(db, "calls", callId, sub));
        await Promise.all(old.docs.map((d) => deleteDoc(d.ref)));
      }

      const offer = await pc.createOffer();

      await setDoc(doc(db, "calls", callId), {
        callerId: currentUser.uid,
        calleeId: peer.id,
        type,
        status: "ringing",
        offer: { type: offer.type, sdp: offer.sdp },
        answer: null,
        createdAt: serverTimestamp(),
      });

      listenCallDoc(callId);
      listenCandidates(callId, "answerCandidates");

      // Սա սկսում է ICE candidates հավաքելը
      await pc.setLocalDescription(offer);

      ringTimeoutRef.current = setTimeout(() => {
        if (callRef.current.phase === "calling") {
          hangUp("Պատասխան չկա");
        }
      }, RING_TIMEOUT_MS);
    } catch (err) {
      console.error("Զանգի սկսման սխալ:", err);
      const text = mediaErrorText(err);
      updateDoc(doc(db, "calls", callId), { status: "ended" }).catch(() => {});
      cleanupCall();
      showNotice(text);
    }
  };

  // --- Մուտքային զանգին պատասխանել ---
  const acceptCall = async () => {
    const { callId, type, offer, phase } = callRef.current;
    if (phase !== "incoming" || !offer) return;

    updateCall({ phase: "connecting" });

    try {
      const stream = await getMedia(type);
      localStreamRef.current = stream;
      setLocalStream(stream);

      const pc = createPeer(callId, "answerCandidates");
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      listenCandidates(callId, "offerCandidates");
      await flushPendingCandidates();

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      await updateDoc(doc(db, "calls", callId), {
        answer: { type: answer.type, sdp: answer.sdp },
        status: "accepted",
      });

      listenCallDoc(callId);
    } catch (err) {
      console.error("Պատասխանելու սխալ:", err);
      const text = mediaErrorText(err);
      updateDoc(doc(db, "calls", callId), { status: "ended" }).catch(() => {});
      cleanupCall();
      showNotice(text);
    }
  };

  // --- Մերժել մուտքային զանգը ---
  const rejectCall = () => {
    const { callId } = callRef.current;
    if (callId) {
      updateDoc(doc(db, "calls", callId), { status: "rejected" }).catch(() => {});
    }
    cleanupCall();
  };

  // --- Անջատել (երկու կողմերի համար) ---
  const hangUp = (notice) => {
    const { callId, phase } = callRef.current;
    if (callId && phase !== "idle") {
      updateDoc(doc(db, "calls", callId), { status: "ended" }).catch(() => {});
    }
    cleanupCall();
    if (typeof notice === "string" && notice) showNotice(notice);
  };

  // Mute / Camera toggle (իրականում անջատում են track-երը)
  const toggleMute = () => {
    const next = !isMuted;
    localStreamRef.current?.getAudioTracks().forEach((t) => {
      t.enabled = !next;
    });
    setIsMuted(next);
  };

  const toggleVideo = () => {
    const next = !isVideoOff;
    localStreamRef.current?.getVideoTracks().forEach((t) => {
      t.enabled = !next;
    });
    setIsVideoOff(next);
  };

  // Մուտքային զանգերի լսում (աշխատում է նույնիսկ երբ չատը փակ է)
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "calls"),
      where("calleeId", "==", currentUser.uid),
      where("status", "==", "ringing")
    );

    const unsub = onSnapshot(q, async (snap) => {
      for (const ch of snap.docChanges()) {
        const data = ch.doc.data();

        if (ch.type === "added") {
          // Եթե արդեն զանգի մեջ ենք՝ մերժում ենք որպես զբաղված
          if (callRef.current.phase !== "idle") {
            updateDoc(ch.doc.ref, { status: "rejected" }).catch(() => {});
            continue;
          }

          // Շատ հին "ringing" զանգերը անտեսում ենք
          const created = data.createdAt?.toMillis?.();
          if (created && Date.now() - created > RING_TIMEOUT_MS + 5000) continue;

          let peer = { id: data.callerId, fullName: "Անհայտ" };
          try {
            const s = await getDoc(doc(db, "Users", data.callerId));
            if (s.exists()) peer = { id: data.callerId, ...s.data() };
          } catch (e) {
            /* ignore */
          }

          // Մինչ տվյալները բեռնվում էին՝ կարող էր վիճակը փոխվել
          if (callRef.current.phase !== "idle") continue;

          updateCall({
            phase: "incoming",
            type: data.type,
            peer,
            callId: ch.doc.id,
            isCaller: false,
            offer: data.offer,
          });
        }

        if (ch.type === "removed") {
          // Զանգողը անջատեց մինչ մենք պատասխանել ենք
          if (
            callRef.current.phase === "incoming" &&
            callRef.current.callId === ch.doc.id
          ) {
            endLocal("Բաց թողնված զանգ");
          }
        }
      }
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  // Stream-երը կապում ենք video տարրերի հետ
  useEffect(() => {
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
  }, [localStream, remoteStream, call.phase, call.type]);

  // Կոմպոնենտի unmount-ի ժամանակ զանգը ավարտել
  useEffect(() => {
    return () => {
      const { callId, phase } = callRef.current;
      if (callId && phase !== "idle") {
        updateDoc(doc(db, "calls", callId), { status: "ended" }).catch(() => {});
      }
      cleanupCall();
      clearTimeout(noticeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inCall = call.phase !== "idle";
  const isVideoCall = call.type === "video";

  const callStatusText = () => {
    switch (call.phase) {
      case "calling":
        return "Զանգում ենք...";
      case "incoming":
        return isVideoCall ? "Մուտքային տեսազանգ" : "Մուտքային ձայնային զանգ";
      case "connecting":
        return "Միացում...";
      case "active":
        return formatDuration(duration);
      default:
        return "";
    }
  };

  return (
    <>
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
          <div className="bg-white w-[90vw] sm:w-[680px] h-[520px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden relative">
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
              <div className="flex flex-grow overflow-hidden relative">
                {/* ՁԱԽ ՄԱՍ. Օգտատերերի ցանկ */}
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

                {/* ԱՋ ՄԱՍ. Չատի պատուհան */}
                <div className="w-2/3 flex flex-col bg-white relative">
                  {selectedUser ? (
                    <>
                      {/* Header՝ Զանգի և Վիդեոզանգի կոճակներով */}
                      <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">{selectedUser.fullName}</p>
                          <p className="text-[10px] text-gray-400">{selectedUser.email}</p>
                        </div>

                        {/* Զանգի և Վիդեոզանգի կոճակները */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startCall("audio")}
                            disabled={inCall}
                            className="p-2 text-purple-700 hover:bg-purple-50 rounded-lg transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Ձայնային զանգ"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => startCall("video")}
                            disabled={inCall}
                            className="p-2 text-purple-700 hover:bg-purple-50 rounded-lg transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Տեսազանգ"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Հաղորդագրությունների ցանկ */}
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

                      {/* Մուտքագրում */}
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

      {/* ԶԱՆԳԻ ՊԱՏՈՒՀԱՆ (չատի մոդալից դուրս, որպեսզի մուտքային զանգը երևա նույնիսկ չատը փակ ժամանակ) */}
      {inCall && call.peer && (
        <div className="fixed inset-0 z-[60] bg-gray-900/95 flex flex-col items-center justify-between p-6 text-white">
          {/* Հեռավոր տեսանյութ (միշտ DOM-ում է, որ ձայնը նվագարկվի) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={
              isVideoCall && call.phase === "active"
                ? "absolute inset-0 w-full h-full object-cover"
                : "hidden"
            }
          />

          {/* Վերևի տեղեկություն */}
          <div className="relative z-10 text-center mt-8">
            <div className="w-24 h-24 rounded-full bg-purple-600 mx-auto flex items-center justify-center text-3xl font-bold border-4 border-purple-400/30 mb-3 shadow-xl">
              {call.peer.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <h3 className="text-xl font-bold drop-shadow">{call.peer.fullName}</h3>
            <p
              className={`text-sm text-purple-200 mt-1 drop-shadow ${
                call.phase === "calling" || call.phase === "incoming" ? "animate-pulse" : ""
              }`}
            >
              {callStatusText()}
            </p>
          </div>

          {/* Սեփական տեսախցիկ (փոքր պատուհան) */}
          {isVideoCall && call.phase !== "incoming" && (
            <div className="absolute top-4 right-4 z-10 w-28 h-36 sm:w-36 sm:h-48 bg-gray-800 rounded-xl border border-gray-600 overflow-hidden shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover -scale-x-100 ${isVideoOff ? "hidden" : ""}`}
              />
              {isVideoOff && (
                <div className="w-full h-full flex items-center justify-center text-[11px] text-gray-400 text-center px-2">
                  Տեսախցիկն անջատված է
                </div>
              )}
            </div>
          )}

          {/* Կառավարման կոճակներ */}
          <div className="relative z-10 flex items-center gap-4 mb-6">
            {call.phase === "incoming" ? (
              <>
                <button
                  type="button"
                  onClick={rejectCall}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition cursor-pointer shadow-lg"
                >
                  ✕ Մերժել
                </button>
                <button
                  type="button"
                  onClick={acceptCall}
                  className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition cursor-pointer shadow-lg animate-pulse"
                >
                  {isVideoCall ? "📹 Պատասխանել" : "📞 Պատասխանել"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!localStream}
                  className={`p-3.5 rounded-full text-xs font-semibold transition cursor-pointer disabled:opacity-40 ${
                    isMuted ? "bg-red-500 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {isMuted ? "🔇 Unmute" : "🎙️ Mute"}
                </button>

                {isVideoCall && (
                  <button
                    type="button"
                    onClick={toggleVideo}
                    disabled={!localStream}
                    className={`p-3.5 rounded-full text-xs font-semibold transition cursor-pointer disabled:opacity-40 ${
                      isVideoOff ? "bg-red-500 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {isVideoOff ? "📷 Cam On" : "📹 Cam Off"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => hangUp()}
                  className="p-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold transition cursor-pointer shadow-lg"
                >
                  📞 Անջատել
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Ծանուցում (մերժվեց, բաց թողնված, սխալ և այլն) */}
      {callNotice && (
        <div className="fixed bottom-24 right-5 z-[70] bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl max-w-xs">
          {callNotice}
        </div>
      )}
    </>
  );
}