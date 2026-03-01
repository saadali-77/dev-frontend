import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../appStore/userSlice";
import { BASE_URL } from "../appStore/constant";
import { Link, useNavigate } from "react-router-dom";
export const  Login= ()=> {
  const [form, setForm] = useState({
    emailId: "khabib@gmail.com",
    password: "khabib5912@",
  });
  const [error,setError]=useState("")
  const dispatch= useDispatch()
const Navigate= useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
          BASE_URL + "/login",
        {
          emailId: form.emailId,
          password: form.password,
        },
        { withCredentials: true } // ⭐ important
      );

      dispatch(addUser(res.data))
      return Navigate('/feed')
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="backdrop-blur-lg bg-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/30">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome on Devtinder
        </h2>

        {/* ⭐ form submit handler */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="text-white text-sm">Email ID</label>
            <input
              type="email"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white border border-white/40 focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white border border-white/40 focus:ring-2 focus:ring-white"
            />
          </div>
        <h2 className="text-red-400 font-bold">{error}</h2>
          {/* ⭐ submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-purple-600 font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Login
          </button>
          <Link
  to="/signup"
  className="block text-center text-white/80 hover:underline mt-3"
>
  Don’t have an account? Signup
</Link>
        </form>
      </div>
    </div>
  );
}
