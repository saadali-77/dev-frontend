import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../appStore/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../appStore/connectionSlice";

export const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!connection) return null;

  if (connection.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white text-lg">
        No connections found
      </div>
    );
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8">
    <h1 className="text-4xl font-extrabold text-center text-white mb-12 tracking-wide">
      Your Connections ({connection.length})
    </h1>

    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {connection.map((user) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = user;

        return (
          <div
            key={_id}
            className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 border border-white/20"
          >
            {/* Image */}
            <div className="relative h-100 w-full">
              <img
                src={photoUrl || "https://via.placeholder.com/300"}
                alt="profile"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Info */}
            <div className="p-5 text-white space-y-2">
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>

              {age && gender && (
                <p className="text-sm text-gray-300">
                  {age} • {gender}
                </p>
              )}

              <p className="text-sm text-gray-400 line-clamp-2">
                {about}
              </p>

              {/* Button
              <button className="mt-3 w-full py-2 rounded-xl bg-pink-500 hover:bg-pink-600 transition duration-300 font-semibold shadow-lg">
                View Profile
              </button> */}
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}