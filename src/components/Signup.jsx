import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../appStore/constant";

export  function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL + "/signup", form, {
        withCredentials: true,
      });
      navigate("/feed");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center p-4
bg-slate-950 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
bg-[size:40px_40px]">
      {/* Card */}
      <div className="backdrop-blur-lg bg-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/30">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 
        </h2>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-white outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-white outline-none"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="emailId"
            placeholder="Email address"
            value={form.emailId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-white outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-white outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-purple-600 font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-white/80 text-sm text-center mt-5">
          Already have an account?
          <Link to="/login" className="font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

