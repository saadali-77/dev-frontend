import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../appStore/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../appStore/connectionSlice';

export const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
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
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight drop-shadow-lg">
        Explore Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {connection.map((user) => (
          <div
            key={user._id}
            className="relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 border border-white/20"
          >
            {/* Profile Image */}
            <div className="relative h-80 w-full">
              <img
                src={user.photoUrl || 'https://via.placeholder.com/300'}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            </div>

            {/* Age & Gender */}
            <div className="flex justify-between items-center px-5 py-2 bg-green sm font-semibold">
              <span>
                {user.firstName} {user.lastName}, {user.age}
              </span>
              <span className="px-2 py-1 bg-green-400
              
              text-green-900 rounded-xl">
                {user.gender}
              </span>
            </div>

            {/* Info Section */}
            <div className="p-5 space-y-3">
              {/* About */}
              <p className="text-white/90 text-sm line-clamp-3">{user.about}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-indigo-200/30 text-white rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-3">
                <button className="flex-1 py-2 rounded-xl bg-green-200/60 text-green-900 font-semibold shadow hover:scale-105 transition-transform duration-300">
                  View
                </button>
                <button className="flex-1 py-2 rounded-xl bg-red-600 textd-900 font-semibold shadow hover:bg-red-300 transition-colors duration-300">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};