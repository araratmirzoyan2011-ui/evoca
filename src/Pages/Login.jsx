import React, { useState } from "react";
import { auth, db } from "../firebase"; // Համոզվիր, որ auth-ը ներմուծված է քո firebase.js-ից
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Խնդրում ենք լրացնել բոլոր դաշտերը");
      return;
    }

    try {
      setLoading(true);

      // Եթե մուտքանունը էլ. հասցե չէ, փնտրում ենք Firestore-ի "users" collection-ում
      let emailToLogin = username;

      if (!username.includes("@")) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          emailToLogin = userData.email;
        } else {
          // Եթե մուտքանունը չգտնվեց
          throw new Error("Սխալ մուտքանուն կամ գաղտնաբառ:");
        }
      }

      // Մուտք Firebase Auth-ի միջոցով
      await signInWithEmailAndPassword(auth, emailToLogin, password);
      alert("Մուտքը հաջողվեց:");
      // Այստեղ կարող ես ավելացնել navigate('/dashboard') կամ այլ էջ փոխելու տրամաբանություն
    } catch (err) {
      console.error(err);
      setError("Սխալ մուտքանուն կամ գաղտնաբառ:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
          Մուտք համակարգ
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Մուտքանուն */}
          <div>
            <input
              type="text"
              placeholder="Մուտքանուն"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
            />
          </div>

          {/* Գաղտնաբառ */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Գաղտնաբառ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors focus:outline-none p-1 cursor-pointer"
            >
              {showPassword ? (
                /* Աչքի իկոնա (բաց) */
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                /* Աչքի իկոնա (փակ / փակված գծով) */
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 014.122-.963c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-3-3m-3-3l-3-3m-2-2a3 3 0 00-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Մուտք կոճակ */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6a00e5] hover:bg-[#5800c4] text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Ստուգվում է..." : "Մուտք"}
          </button>
        </form>

        {/* Մոռացե՞լ եք... */}
        <div className="text-center mt-8">
          <a
            href="#"
            className="text-gray-900 font-medium text-sm hover:text-purple-700 transition-colors"
          >
            Մոռացե՞լ եք մուտքանունը կամ գաղտնաբառը
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;