import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../appStore/constant";

export function Signup() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "age" ? Number(value) : value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(BASE_URL + "/signup", form, { withCredentials: true });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        
        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="emailId"
            placeholder="Email Address"
            value={form.emailId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-gray-500 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Photo URL */}
          <input
            type="text"
            name="photoUrl"
            placeholder="Profile Photo URL"
            value={form.photoUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />

          {/* About */}
          <textarea
            name="about"
            placeholder="Write something about yourself..."
            value={form.about}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-purple-400 outline-none transition resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-white-400 font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl animate-bounce">
            🎉 Account created successfully!
          </div>
        </div>
      )}
    </div>
  );
}