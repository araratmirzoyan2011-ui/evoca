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
  arrayRemove,
} from "firebase/firestore";

// WebRTC կարգավորումներ (STUN). Խիստ ցանցերի համար ավելացրու նաև TURN սերվեր։
const ICE_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

const RING_TIMEOUT_MS = 45000;
const NOT_REGISTERED_TEXT = "Դուք չեք կարող բացել չատը, որովհետև գրանցված չեք։";

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

const getChatId = (uid1, uid2) => [uid1, uid2].sort().join("_");

// Փոքր ծանուցման ձայն
const playBeep = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
    osc.onended = () => ctx.close();
  } catch (e) {
    /* ignore */
  }
};

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [myName, setMyName] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // ---------- ԽՄԲԵՐ ----------
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembersSel, setGroupMembersSel] = useState([]);
  const [groupError, setGroupError] = useState("");

  // Փոքր էկրանների համար՝ ցույց տալ կա՛մ ցանկը, կա՛մ չատը
  const [mobileShowChat, setMobileShowChat] = useState(false);

  // ---------- ԾԱՆՈՒՑՈՒՄՆԵՐ ----------
  const [notifications, setNotifications] = useState([]); // չկարդացածներ
  const [toasts, setToasts] = useState([]);

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
  const callRef = useRef(IDLE_CALL);
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

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  const uid = currentUser?.uid;

  // ---------- Ընթացիկ ընտրված չատ ----------
  const selectedGroup = groups.find((g) => g.id === selectedGroupId) || null;

  const getTarget = () => {
    if (!uid) return null;
    if (selectedGroup) {
      return {
        chatId: selectedGroup.id,
        recipients: (selectedGroup.members || []).filter((m) => m !== uid),
        groupName: selectedGroup.name,
      };
    }
    if (selectedUser) {
      return {
        chatId: getChatId(uid, selectedUser.id),
        recipients: [selectedUser.id],
        groupName: null,
      };
    }
    return null;
  };

  const activeChatId = getTarget()?.chatId || null;

  // Refs՝ snapshot callback-ների համար
  const isOpenRef = useRef(false);
  const activeChatIdRef = useRef(null);
  isOpenRef.current = isOpen;
  activeChatIdRef.current = activeChatId;

  const memberName = (id) => {
    if (id === uid) return myName || "Ես";
    return usersList.find((u) => u.id === id)?.fullName || "Անհայտ";
  };

  const unreadByChat = notifications.reduce((acc, n) => {
    acc[n.chatId] = (acc[n.chatId] || 0) + 1;
    return acc;
  }, {});
  const totalUnread = notifications.length;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Օգտատերերի realtime ցանկ + գրանցվածության ստուգում
  useEffect(() => {
    if (!uid) {
      setIsRegistered(false);
      setProfileLoaded(true);
      setUsersList([]);
      return;
    }
    setProfileLoaded(false);
    const unsub = onSnapshot(
      collection(db, "Users"),
      (snap) => {
        const others = [];
        let mine = null;
        snap.forEach((d) => {
          if (d.id === uid) mine = d.data();
          else others.push({ id: d.id, ...d.data() });
        });
        setUsersList(others);
        setIsRegistered(!!(mine && mine.fullName));
        setMyName(mine?.fullName || currentUser?.displayName || currentUser?.email || "");
        setProfileLoaded(true);
      },
      (err) => {
        console.error("Users սխալ:", err);
        setProfileLoaded(true);
      }
    );
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Առաջին չատի ավտոմատ ընտրություն
  useEffect(() => {
    if (
      isRegistered &&
      usersList.length > 0 &&
      !selectedUser &&
      !selectedGroupId &&
      !isCreatingGroup
    ) {
      setSelectedUser(usersList[0]);
    }
  }, [isRegistered, usersList, selectedUser, selectedGroupId, isCreatingGroup]);

  // 2. Խմբերի realtime ցանկ (միայն այն խմբերը, որտեղ ես անդամ եմ)
  useEffect(() => {
    if (!uid || !isRegistered) {
      setGroups([]);
      return;
    }
    const q = query(collection(db, "groups"), where("members", "array-contains", uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        setGroups(list);
      },
      (err) => console.error("Groups սխալ:", err)
    );
    return () => unsub();
  }, [uid, isRegistered]);

  // Եթե ընտրված խումբը այլևս չկա (լքել եմ)՝ ազատել ընտրությունը
  useEffect(() => {
    if (selectedGroupId && groups.length >= 0 && !groups.find((g) => g.id === selectedGroupId)) {
      // Խմբերը կարող են դեռ բեռնվել. ազատում ենք միայն երբ ցանկը ստացվել է
      const t = setTimeout(() => {
        setSelectedGroupId((cur) => (cur && !groups.find((g) => g.id === cur) ? null : cur));
      }, 800);
      return () => clearTimeout(t);
    }
  }, [groups, selectedGroupId]);

  // 3. Realtime հաղորդագրություններ (անձնական կամ խմբային)
  useEffect(() => {
    setMessages([]);
    if (!activeChatId) return;

    const messagesRef = collection(db, "chats", activeChatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [activeChatId]);

  // 4. Չկարդացած ծանուցումների լսում (աշխատում է նաև երբ չատը փակ է)
  useEffect(() => {
    if (!uid) {
      setNotifications([]);
      return;
    }
    let first = true;
    const q = query(
      collection(db, "notifications"),
      where("toUid", "==", uid),
      where("read", "==", false)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setNotifications(list);

        if (first) {
          first = false;
          return; // առաջին բեռնման ժամանակ toast չենք ցույց տալիս, միայն badge
        }

        snap.docChanges().forEach((ch) => {
          if (ch.type !== "added") return;
          const n = { id: ch.doc.id, ...ch.doc.data() };
          // Եթե հենց այդ չատը բաց է՝ ծանուցում պետք չէ
          if (isOpenRef.current && activeChatIdRef.current === n.chatId) return;

          playBeep();
          setToasts((prev) => [...prev.slice(-2), n]);
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== n.id));
          }, 7000);

          // Բրաուզերի ծանուցում, եթե էջը հետին պլանում է
          try {
            if (
              typeof Notification !== "undefined" &&
              Notification.permission === "granted" &&
              document.hidden
            ) {
              const title = n.chatType === "group" ? `${n.groupName} (խումբ)` : n.fromName;
              const body =
                n.chatType === "group" ? `${n.fromName}: ${n.preview}` : n.preview;
              const bn = new Notification(title, { body });
              bn.onclick = () => {
                window.focus();
                bn.close();
              };
            }
          } catch (e) {
            /* ignore */
          }
        });
      },
      (err) => console.error("Notifications սխալ:", err)
    );
    return () => unsub();
  }, [uid]);

  // Երբ չատը բաց է՝ ակտիվ չատի ծանուցումները նշել որպես կարդացված
  useEffect(() => {
    if (!isOpen || !activeChatId) return;
    notifications
      .filter((n) => n.chatId === activeChatId)
      .forEach((n) => {
        updateDoc(doc(db, "notifications", n.id), { read: true }).catch(() => {});
      });
  }, [notifications, isOpen, activeChatId]);

  // Չատը բացել/փակել
  const handleChatToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      try {
        if (typeof Notification !== "undefined" && Notification.permission === "default") {
          Notification.requestPermission();
        }
      } catch (e) {
        /* ignore */
      }
    } else {
      setIsOpen(false);
    }
  };

  // Toast-ի վրա սեղմելիս բացում ենք համապատասխան չատը
  const openFromNotification = (n) => {
    setToasts((prev) => prev.filter((t) => t.id !== n.id));
    setIsCreatingGroup(false);
    if (n.chatType === "group") {
      setSelectedUser(null);
      setSelectedGroupId(n.chatId);
    } else {
      const u = usersList.find((x) => x.id === n.fromId);
      if (u) {
        setSelectedGroupId(null);
        setSelectedUser(u);
      }
    }
    setMobileShowChat(true);
    setIsOpen(true);
  };

  // Ծանուցում ենք ստացողներին (յուրաքանչյուրի համար առանձին փաստաթուղթ)
  const notifyRecipients = async (target, preview) => {
    if (!target || !uid) return;
    try {
      await Promise.all(
        target.recipients.map((toUid) =>
          addDoc(collection(db, "notifications"), {
            toUid,
            fromId: uid,
            fromName: myName || "Անհայտ",
            chatId: target.chatId,
            chatType: target.groupName ? "group" : "user",
            groupName: target.groupName || null,
            preview,
            read: false,
            createdAt: serverTimestamp(),
          })
        )
      );
    } catch (err) {
      console.error("Ծանուցման սխալ:", err);
    }
  };

  // 5. Հաղորդագրություն ուղարկել / խմբագրել
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const target = getTarget();
    if (!inputText.trim() || !target || !currentUser) return;

    const messagesRef = collection(db, "chats", target.chatId, "messages");

    try {
      if (editingMsgId) {
        const msgDocRef = doc(db, "chats", target.chatId, "messages", editingMsgId);
        await updateDoc(msgDocRef, {
          text: inputText,
          isEdited: true,
        });
        setEditingMsgId(null);
      } else {
        const text = inputText;
        await addDoc(messagesRef, {
          senderId: currentUser.uid,
          senderName: myName || "Անհայտ",
          text,
          type: "text",
          createdAt: serverTimestamp(),
        });
        notifyRecipients(target, text.trim().slice(0, 80));
      }
      setInputText("");
    } catch (err) {
      console.error("Ուղարկման սխալ:", err);
    }
  };

  // 6. Հաղորդագրություն ջնջել
  const handleDeleteMessage = async (msgId) => {
    const target = getTarget();
    if (!target || !currentUser) return;
    try {
      await deleteDoc(doc(db, "chats", target.chatId, "messages", msgId));
    } catch (err) {
      console.error("Ջնջման սխալ:", err);
    }
  };

  const handleStartEdit = (msg) => {
    setEditingMsgId(msg.id);
    setInputText(msg.text);
  };

  // 7. Ձայնային հաղորդագրություն
  const startRecording = async () => {
    const target = getTarget(); // ֆիքսում ենք ձայնագրության սկզբում
    if (!target) return;
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
        stream.getTracks().forEach((t) => t.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          if (currentUser) {
            try {
              const messagesRef = collection(db, "chats", target.chatId, "messages");
              await addDoc(messagesRef, {
                senderId: currentUser.uid,
                senderName: myName || "Անհայտ",
                audioUrl: base64Audio,
                type: "audio",
                createdAt: serverTimestamp(),
              });
              notifyRecipients(target, "🎤 Ձայնային հաղորդագրություն");
            } catch (err) {
              console.error("Ձայնի ուղարկման սխալ:", err);
            }
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
  // 8. ԽՄԲԵՐԻ ԿԱՌԱՎԱՐՈՒՄ
  // =====================================================
  const openCreateGroup = () => {
    setIsCreatingGroup(true);
    setGroupName("");
    setGroupMembersSel([]);
    setGroupError("");
  };

  const toggleGroupMember = (id) => {
    setGroupMembersSel((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = async () => {
    if (!uid) return;
    if (!groupName.trim()) {
      setGroupError("Մուտքագրեք խմբի անունը։");
      return;
    }
    if (groupMembersSel.length < 2) {
      setGroupError("Խմբում պետք է լինի առնվազն 2 այլ մասնակից։");
      return;
    }
    try {
      const ref = await addDoc(collection(db, "groups"), {
        name: groupName.trim(),
        members: [uid, ...groupMembersSel],
        createdBy: uid,
        createdAt: serverTimestamp(),
      });
      setIsCreatingGroup(false);
      setSelectedUser(null);
      setSelectedGroupId(ref.id);
      setMobileShowChat(true);
    } catch (err) {
      console.error("Խմբի ստեղծման սխալ:", err);
      setGroupError("Չհաջողվեց ստեղծել խումբը։");
    }
  };

  const handleLeaveGroup = async () => {
    if (!selectedGroup || !uid) return;
    if (!window.confirm(`Լքե՞լ «${selectedGroup.name}» խումբը։`)) return;
    try {
      await updateDoc(doc(db, "groups", selectedGroup.id), {
        members: arrayRemove(uid),
      });
      setSelectedGroupId(null);
      setMobileShowChat(false);
    } catch (err) {
      console.error("Խումբը լքելու սխալ:", err);
    }
  };

  // =====================================================
  // 9. ԶԱՆԳԵՐ (WebRTC + Firestore signaling)
  // =====================================================
  //
  // Firestore կառուցվածք.
  //   calls/{callId}                    -> { callerId, calleeId, type, status, offer, answer }
  //   calls/{callId}/offerCandidates    -> ICE candidates (զանգողից)
  //   calls/{callId}/answerCandidates   -> ICE candidates (պատասխանողից)
  // callId = getChatId(uid1, uid2). Զանգերը աշխատում են միայն անձնական չատերում։

  const updateCall = (patch) => {
    callRef.current = { ...callRef.current, ...patch };
    setCall(callRef.current);
  };

  const showNotice = (text) => {
    setCallNotice(text);
    clearTimeout(noticeTimeoutRef.current);
    noticeTimeoutRef.current = setTimeout(() => setCallNotice(""), 3500);
  };

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

      if (callRef.current.isCaller && data.answer && !answerSetRef.current) {
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

  const rejectCall = () => {
    const { callId } = callRef.current;
    if (callId) {
      updateDoc(doc(db, "calls", callId), { status: "rejected" }).catch(() => {});
    }
    cleanupCall();
  };

  const hangUp = (notice) => {
    const { callId, phase } = callRef.current;
    if (callId && phase !== "idle") {
      updateDoc(doc(db, "calls", callId), { status: "ended" }).catch(() => {});
    }
    cleanupCall();
    if (typeof notice === "string" && notice) showNotice(notice);
  };

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
    if (!uid) return;

    const q = query(
      collection(db, "calls"),
      where("calleeId", "==", uid),
      where("status", "==", "ringing")
    );

    const unsub = onSnapshot(q, async (snap) => {
      for (const ch of snap.docChanges()) {
        const data = ch.doc.data();

        if (ch.type === "added") {
          if (callRef.current.phase !== "idle") {
            updateDoc(ch.doc.ref, { status: "rejected" }).catch(() => {});
            continue;
          }

          const created = data.createdAt?.toMillis?.();
          if (created && Date.now() - created > RING_TIMEOUT_MS + 5000) continue;

          let peer = { id: data.callerId, fullName: "Անհայտ" };
          try {
            const s = await getDoc(doc(db, "Users", data.callerId));
            if (s.exists()) peer = { id: data.callerId, ...s.data() };
          } catch (e) {
            /* ignore */
          }

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
  }, [uid]);

  useEffect(() => {
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
  }, [localStream, remoteStream, call.phase, call.type]);

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

  const hasActiveChat = !!(selectedUser || selectedGroup);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen ? (
          <button
            onClick={handleChatToggle}
            className="relative bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-200 cursor-pointer"
            title="Բացել չատը"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalUnread > 99 ? "99+" : totalUnread}
              </span>
            )}
          </button>
        ) : (
          <div className="bg-white w-[92vw] sm:w-[680px] h-[85vh] max-h-[520px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden relative">
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

            {!currentUser || (profileLoaded && !isRegistered) ? (
              <div className="p-6 my-auto text-center flex flex-col items-center">
                <div className="text-red-600 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-200 mb-4 max-w-sm">
                  {NOT_REGISTERED_TEXT}
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-purple-700 hover:bg-purple-800 text-white py-2.5 px-6 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Մուտք գործել / Գրանցվել
                </button>
              </div>
            ) : !profileLoaded ? (
              <div className="my-auto text-center text-xs text-gray-400 py-10">Բեռնվում է...</div>
            ) : (
              <div className="flex flex-grow overflow-hidden relative">
                {/* ՁԱԽ ՄԱՍ. Խմբեր + Օգտատերերի ցանկ */}
                <div
                  className={`${
                    mobileShowChat || isCreatingGroup ? "hidden" : "flex"
                  } sm:flex w-full sm:w-1/3 sm:min-w-[180px] bg-gray-50 border-r border-gray-200 flex-col p-2 overflow-y-auto`}
                >
                  {/* Խմբեր */}
                  <div className="flex items-center justify-between px-2 py-1 mb-1">
                    <p className="text-[11px] font-bold text-gray-500 uppercase">
                      Խմբեր ({groups.length})
                    </p>
                    <button
                      type="button"
                      onClick={openCreateGroup}
                      className="text-[11px] font-bold text-purple-700 hover:bg-purple-100 rounded px-1.5 py-0.5 cursor-pointer"
                      title="Ստեղծել նոր խումբ"
                    >
                      ＋ Նոր
                    </button>
                  </div>

                  {groups.length === 0 ? (
                    <p className="text-[11px] text-gray-400 px-2 pb-2">Խմբեր դեռ չկան</p>
                  ) : (
                    groups.map((g) => {
                      const isSelected = selectedGroupId === g.id && !isCreatingGroup;
                      const unread = unreadByChat[g.id] || 0;
                      return (
                        <button
                          key={g.id}
                          onClick={() => {
                            setIsCreatingGroup(false);
                            setSelectedUser(null);
                            setSelectedGroupId(g.id);
                            setEditingMsgId(null);
                            setInputText("");
                            setMobileShowChat(true);
                          }}
                          className={`w-full p-2.5 mb-1.5 rounded-xl text-left flex items-center gap-2.5 transition cursor-pointer ${
                            isSelected
                              ? "bg-purple-100 border border-purple-300 text-purple-900"
                              : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                            👥
                          </div>
                          <div className="overflow-hidden flex-grow">
                            <p className="text-xs font-bold truncate">{g.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {(g.members || []).length} մասնակից
                            </p>
                          </div>
                          {unread > 0 && (
                            <span className="min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                              {unread}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}

                  {/* Անձնական չատեր */}
                  <p className="text-[11px] font-bold text-gray-500 uppercase px-2 py-1 mt-2 mb-1">
                    Չատեր ({usersList.length})
                  </p>
                  {usersList.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">Չկան այլ մարդիկ</p>
                  ) : (
                    usersList.map((u) => {
                      const isSelected =
                        selectedUser?.id === u.id && !selectedGroupId && !isCreatingGroup;
                      const unread = unreadByChat[getChatId(uid, u.id)] || 0;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setIsCreatingGroup(false);
                            setSelectedGroupId(null);
                            setSelectedUser(u);
                            setEditingMsgId(null);
                            setInputText("");
                            setMobileShowChat(true);
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
                          <div className="overflow-hidden flex-grow">
                            <p className="text-xs font-bold truncate">{u.fullName}</p>
                            <p className="text-[10px] text-gray-500 truncate">{u.email}</p>
                          </div>
                          {unread > 0 && (
                            <span className="min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                              {unread}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* ԱՋ ՄԱՍ */}
                <div
                  className={`${
                    mobileShowChat || isCreatingGroup ? "flex" : "hidden"
                  } sm:flex w-full sm:w-2/3 flex-col bg-white relative`}
                >
                  {isCreatingGroup ? (
                    /* ---- Նոր խմբի ստեղծում ---- */
                    <div className="flex flex-col h-full">
                      <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-800">Նոր խումբ</p>
                        <button
                          type="button"
                          onClick={() => setIsCreatingGroup(false)}
                          className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
                        >
                          ✕ Չեղարկել
                        </button>
                      </div>

                      <div className="p-3 flex flex-col gap-3 flex-grow overflow-hidden">
                        <input
                          type="text"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          maxLength={40}
                          placeholder="Խմբի անունը..."
                          className="px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:border-purple-600"
                        />

                        <p className="text-[11px] font-bold text-gray-500 uppercase">
                          Ընտրեք մասնակիցներին ({groupMembersSel.length})
                        </p>

                        <div className="flex-grow overflow-y-auto space-y-1.5 pr-1">
                          {usersList.length === 0 ? (
                            <p className="text-xs text-gray-400">Չկան այլ մարդիկ</p>
                          ) : (
                            usersList.map((u) => {
                              const checked = groupMembersSel.includes(u.id);
                              return (
                                <label
                                  key={u.id}
                                  className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition ${
                                    checked
                                      ? "bg-purple-50 border-purple-300"
                                      : "bg-white border-gray-200 hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleGroupMember(u.id)}
                                    className="accent-purple-700"
                                  />
                                  <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-[11px] flex-shrink-0">
                                    {u.fullName ? u.fullName.charAt(0).toUpperCase() : "U"}
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-xs font-bold truncate">{u.fullName}</p>
                                    <p className="text-[10px] text-gray-500 truncate">{u.email}</p>
                                  </div>
                                </label>
                              );
                            })
                          )}
                        </div>

                        {groupError && (
                          <p className="text-[11px] text-red-600 font-medium">{groupError}</p>
                        )}

                        <button
                          type="button"
                          onClick={handleCreateGroup}
                          className="bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                        >
                          Ստեղծել խումբը
                        </button>
                      </div>
                    </div>
                  ) : hasActiveChat ? (
                    <>
                      {/* Header */}
                      <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2">
                        {selectedGroup ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setMobileShowChat(false)}
                              className="sm:hidden text-purple-700 font-bold text-base mr-1 cursor-pointer flex-shrink-0"
                              title="Հետ"
                            >
                              ←
                            </button>
                            <div className="overflow-hidden flex-grow">
                              <p className="text-xs font-bold text-gray-800 truncate">
                                👥 {selectedGroup.name}
                              </p>
                              <p
                                className="text-[10px] text-gray-400 truncate"
                                title={(selectedGroup.members || []).map(memberName).join(", ")}
                              >
                                {(selectedGroup.members || []).map(memberName).join(", ")}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleLeaveGroup}
                              className="text-[11px] text-red-600 hover:bg-red-50 rounded-lg px-2 py-1 transition cursor-pointer flex-shrink-0"
                              title="Լքել խումբը"
                            >
                              Լքել
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setMobileShowChat(false)}
                              className="sm:hidden text-purple-700 font-bold text-base mr-1 cursor-pointer flex-shrink-0"
                              title="Հետ"
                            >
                              ←
                            </button>
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-gray-800">{selectedUser.fullName}</p>
                              <p className="text-[10px] text-gray-400">{selectedUser.email}</p>
                            </div>

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
                          </>
                        )}
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
                                {/* Խմբում ուրիշների անունը */}
                                {selectedGroup && !isMe && (
                                  <span className="text-[10px] font-semibold text-purple-700 mb-0.5 ml-1">
                                    {msg.senderName || memberName(msg.senderId)}
                                  </span>
                                )}
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

      {/* ՆՈՐ ՀԱՂՈՐԴԱԳՐՈՒԹՅԱՆ ԾԱՆՈՒՑՈՒՄՆԵՐ (toast) */}
      <div className="fixed top-5 right-5 z-[65] flex flex-col gap-2 w-[min(320px,90vw)]">
        {toasts.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => openFromNotification(n)}
            className="text-left bg-white border border-purple-200 border-l-4 border-l-purple-700 shadow-xl rounded-xl px-4 py-3 cursor-pointer hover:bg-purple-50 transition"
          >
            <p className="text-[11px] font-bold text-purple-700">
              💬 Ձեզ նոր հաղորդագրություն է գրել
            </p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5 truncate">
              {n.fromName}
              {n.chatType === "group" ? ` · «${n.groupName}»` : ""}
            </p>
            <p className="text-xs text-gray-500 truncate">{n.preview}</p>
          </button>
        ))}
      </div>

      {/* ԶԱՆԳԻ ՊԱՏՈՒՀԱՆ */}
      {inCall && call.peer && (
        <div className="fixed inset-0 z-[60] bg-gray-900/95 flex flex-col items-center justify-between p-6 text-white">
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

      {callNotice && (
        <div className="fixed bottom-24 right-5 z-[70] bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl max-w-xs">
          {callNotice}
        </div>
      )}
    </>
  );
}