import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../appStore/constant";
import { removeUser } from "../appStore/userSlice";


  export const Navbar = () => {
    const dispatch= useDispatch()
  const Navigate= useNavigate()
  const user = useSelector((store) => store.user);
  const handleLogout= async()=>{
    try{
     const res= axios.post(BASE_URL + '/logout',{
        withCredentials:true
      })
      dispatch(removeUser(res))
      return Navigate('/login')
    }catch(err){
      console.log(err.message)
    }
  }

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
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

