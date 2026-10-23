import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

const AboutYou = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    birthDate: "",
    address: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.phone || !formData.birthDate) {
      setError("Խնդրում ենք լրացնել պարտադիր դաշտերը (Անուն, Հեռախոս, Ծննդյան ամսաթիվ)");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      if (user) {
        await setDoc(
          doc(db, "Users", user.uid),
          {
            ...formData,
            email: user.email || "",
            uid: user.uid,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }

      navigate("/user");
    } catch (err) {
      console.error(err);
      setError("Տվյալների պահպանման սխալ:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="bg-white w-full max-w-xl rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Ձեր անձնական տվյալները
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Խնդրում ենք լրացնել հետևյալ տեղեկությունները հաշվի հետագա սպասարկման համար։
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Անուն Ազգանուն *</label>
              <input
                type="text"
                name="fullName"
                placeholder="օր. Արմեն Մկրտչյան"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Հեռախոսահամար *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+374 XX XXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ծննդյան ամսաթիվ *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Բնակության հասցե</label>
              <input
                type="text"
                name="address"
                placeholder="ք. Երևան, Հանրապետության փող."
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Զբաղվածություն / Մասնագիտություն</label>
              <input
                type="text"
                name="occupation"
                placeholder="օր. Ծրագրավորող"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6a00e5] hover:bg-[#5800c4] text-white font-semibold py-3.5 rounded-lg transition duration-200 mt-4 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "Պահպանվում է..." : "Պահպանել և գնալ User էջ"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutYou;