import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


  export const Navbar = () => {
  
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      
      {/* Logo */}
      <div className="flex-1">
        <Link to='/feed' className="btn btn-ghost text-xl">Dev tinder</Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* Welcome text */}
        {user && (
          <p className="hidden md:block font-semibold">
            Welcome, {user.firstName}
          </p>
        )}

        {/* Dropdown */}
        <div className="dropdown dropdown-end">
          
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user && (
              <div className="w-10 rounded-full">
                <img alt="user" src={user.photoUrl} />
              </div>
            // ) : (
            //  // <div className="w-10 rounded-full bg-gray-400"></div>
            // )}
       )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li><Link to='/profile'>Profile</Link></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

