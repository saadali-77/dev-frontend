import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../appStore/constant";
import { removeUser } from "../appStore/userSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* logo */}
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>

      {/* right */}
      <div className="flex items-center gap-3">
        {user?.firstName && (
          <p className="hidden md:block font-semibold">
            Welcome, {user.firstName}
          </p>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {/* <img
                  alt="user"
                  src=
                    user.photoUrl ||
                    "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/image/2023-09/DELLA_MADDALENA_JACK_L_09-09.png"
                  
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;
                  }}
                /> */}
              <img
  alt="user"
  src={
    user?.photoUrl ?
     "https://media.gettyimages.com/id/2220331447/photo/nsw-blues-state-of-origin-training-session.jpg?s=612x612&w=gi&k=20&c=_-NBPIIQFsRFimGN5CYp5u0itioht_k4eo2fnF9D41c=":'not found'
  }
  onError={(e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`;
  }}
/>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};