import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../appStore/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../appStore/RequestSlice";

export const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
const reviewRequest = async (status, _id) => {
    try {
       await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error.message);
    }
  };


  // Fetch incoming requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No Requests found
      </h1>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight drop-shadow-lg">
        Requests ({requests.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {requests.map((user) => (
            
          <div
            key={user._id}
            className="relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 border border-white/20"
          >
            {/* Profile Image */}
            <div className="relative h-80 w-full">
              <img
                src={user.fromUserId.photoUrl || "https://via.placeholder.com/300"}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            </div>

            {/* Age & Gender */}
            <div className="flex justify-between items-center px-5 py-2 bg-brown-900 text-white font-semibold">
              <span>
                {user.fromUserId.firstName} {user.fromUserId.lastName}, {user.fromUserId.age}
              </span>
              <span className="px-3 py-1 bg-brown-700 text-white rounded-xl text-sm">
                {user.fromUserId.gender}
              </span>
            </div>

            {/* Info Section */}
            <div className="p-5 space-y-3">
              {/* About */}
              <p className="text-white/90 text-sm line-clamp-3">{user.fromUserId.about}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-brown-700 text-white rounded-full shadow-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-3">
                <button className="flex-1 py-2 rounded-xl bg-yellow-300 text-yellow-900 font-semibold shadow hover:scale-105 transition-transform duration-300" onClick={()=>reviewRequest("accepted",user._id)}>
                  accept
                </button>
                <button className="flex-1 py-2 rounded-xl bg-red-300 text-red-900 font-semibold shadow hover:bg-red-400 transition-colors duration-300" onClick={()=>reviewRequest("ignored",user.toUserId._id)}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};