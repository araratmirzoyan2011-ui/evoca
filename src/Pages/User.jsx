import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError("Օգտատերը մուտք չի գործել համակարգ։");
          setLoading(false);
          return;
        }

        if (currentUser.photoURL) {
          setPhotoURL(currentUser.photoURL);
        }
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          if (docSnap.data().photoURL) {
            setPhotoURL(docSnap.data().photoURL);
          }
        } else {
          setError("Օգտատիրոջ տվյալները չեն գտնվել տվյալների բազայում։");
        }
      } catch (err) {
        console.error(err);
        setError("Տվյալները ստանալիս տեղի ունեցավ սխալ։");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Դուրս գալու սխալ:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="bg-white w-full max-w-xl rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Օգտատիրոջ պրոֆիլ
            </h2>
            
            <div className="relative flex-shrink-0">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="User Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-600 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xl border-2 border-purple-600 shadow-sm">
                  {userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Բեռնվում է...</div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center">
              {error}
            </div>
          ) : userData ? (
            <div className="space-y-4 text-gray-700">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-6">
                <p className="text-xs text-purple-600 font-semibold uppercase">Էլ. հասցե</p>
                <p className="text-lg font-bold text-gray-900">{userData.email || "Նշված չէ"}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-xs font-semibold text-gray-400">Անուն Ազգանուն</span>
                  <span className="text-base font-medium text-gray-800">{userData.fullName || "Լրացված չէ"}</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-xs font-semibold text-gray-400">Հեռախոսահամար</span>
                  <span className="text-base font-medium text-gray-800">{userData.phone || "Լրացված չէ"}</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-xs font-semibold text-gray-400">Ծննդյան ամսաթիվ</span>
                  <span className="text-base font-medium text-gray-800">{userData.birthDate || "Լրացված չէ"}</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="block text-xs font-semibold text-gray-400">Զբաղվածություն</span>
                  <span className="text-base font-medium text-gray-800">{userData.occupation || "Լրացված չէ"}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-2">
                <span className="block text-xs font-semibold text-gray-400">Հասցե</span>
                <span className="text-base font-medium text-gray-800">{userData.address || "Լրացված չէ"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm cursor-pointer text-sm text-center"
                >
                  Գլխավոր էջ
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Զամբյուղ
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm cursor-pointer text-sm text-center"
                >
                  Դուրս գալ
                </button>
              </div>

            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default User;