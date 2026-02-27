import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../appStore/constant";
import { removeUser } from "../appStore/userSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);









  
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  // ⭐ close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          👩‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-2 flex items-center">
          <div className="form-control">Welcome, {user.firstName}</div>

          <div ref={dropdownRef} className="relative mx-5">
            {/* avatar button */}
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </button>

            {/* dropdown */}
            {open && (
              <ul className="absolute right-0 mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-50 menu menu-sm">
                <li>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    Profile <span className="badge">New</span>
                  </Link>
                </li>

                <li>
                  <Link to="/connections" onClick={() => setOpen(false)}>
                    Connections
                  </Link>
                </li>

                <li>
                  <Link to="/requests" onClick={() => setOpen(false)}>
                    Requests
                  </Link>
                </li>

                <li>
                  <Link to="/premium" onClick={() => setOpen(false)}>
                    Premium
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};