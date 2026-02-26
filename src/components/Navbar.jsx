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

  return (<>
   <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  
  
  
  
  
  
  
  
  
  </>)}
//     <div className="navbar bg-base-300 shadow-sm px-4">
//       {/* Logo */}
//       <div className="flex-1">
//         <Link to="/feed" className="btn btn-ghost text-xl">
//           Dev Tinder
//         </Link>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-3">
//         {user?.firstName && (
//           <p className="hidden md:block font-semibold">Welcome, {user.firstName}</p>
//         )}

//         {user && (
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 h-10 rounded-full overflow-hidden">
//                 <img
//                   alt="user" src={user.photoUrl}
//                   // src={
//                   //   user?.photoUrl ||
//                   //   `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`
//                   // }
//                   onError={(e) => {
//                     e.target.src = `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`;
//                   }}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile">Profile</Link>
//               </li>
//               <li>
//                 <a>Settings</a>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };