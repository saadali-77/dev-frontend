import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../appStore/userSlice";
import { BASE_URL } from "../appStore/constant";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({
    emailId: "khabib@gmail.com",
    password: "khabib5912@",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: form.emailId,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));

      navigate("/feed");

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="backdrop-blur-lg bg-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/30">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome on DevTinder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-white text-sm">
              Email ID
            </label>

            <input
              type="email"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white border border-white/40 focus:ring-2 focus:ring-white"
              required
            />
          </div>


          <div>
            <label className="text-white text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white border border-white/40 focus:ring-2 focus:ring-white"
              required
            />
          </div>


          {error && (
            <h2 className="text-red-400 font-bold text-center">
              {error}
            </h2>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-purple-600 font-semibold hover:scale-105 transition duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
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
};
