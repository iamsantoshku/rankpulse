// import { useState, useRef, useEffect } from "react";

// const AccountDropdown = ({ user, logout }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     // cleanup (important)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2"
//       >
//         <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
//           {user?.name?.charAt(0)}
//         </div>
//         <span>{user?.name}</span>
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
//           <ul className="text-sm">
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">Test Results</li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">Subscription</li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">Attempted Tests</li>
//             <li
//               className="p-2 hover:bg-red-100 text-red-500 cursor-pointer"
//               onClick={logout}
//             >
//               Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountDropdown;





// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// const AccountDropdown = ({ user, logout }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const isAdmin = user?.role === "ADMIN";

//   return (
//     <div className="relative" ref={ref}>
      
//       {/* USER BUTTON */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2"
//       >
//         <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
//           {user?.name?.charAt(0)}
//         </div>
//         <span className="font-medium">{user?.name}</span>
//       </button>

//       {/* DROPDOWN */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50 overflow-hidden">
          
//           {/* USER INFO */}
//           <div className="px-4 py-3 border-b bg-gray-50">
//             <p className="font-semibold text-sm">{user?.name}</p>
//             <p className="text-xs text-gray-500">{user?.email}</p>
//           </div>

//           <ul className="text-sm">
            
//             {/* USER OPTIONS */}
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="/profile">My Profile</Link>
//             </li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="/results">Test Results</Link>
//             </li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="/subscription">Subscription</Link>
//             </li>
//             <li className="p-2 hover:bg-gray-100 cursor-pointer">
//               <Link to="/attempts">Attempted Tests</Link>
//             </li>

//             {/* 🔥 ADMIN SECTION */}
//             {isAdmin && (
//               <>
//                 <li className="px-4 py-2 text-xs text-gray-400 uppercase">
//                   Admin
//                 </li>

//                 <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600 font-medium">
//                   <Link to="/admin/dashboard">Dashboard</Link>
//                 </li>

//                 <li className="p-2 hover:bg-gray-100 cursor-pointer">
//                   <Link to="/admin/tests">Manage Tests</Link>
//                 </li>

//                 <li className="p-2 hover:bg-gray-100 cursor-pointer">
//                   <Link to="/admin/users">Manage Users</Link>
//                 </li>

//                 <li className="p-2 hover:bg-gray-100 cursor-pointer">
//                   <Link to="/admin/payments">Payments</Link>
//                 </li>
//               </>
//             )}

//             {/* LOGOUT */}
//             <li
//               className="p-2 hover:bg-red-100 text-red-500 cursor-pointer border-t"
//               onClick={logout}
//             >
//               Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountDropdown;




import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="relative" ref={ref}>
      
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          {user?.name?.charAt(0)}
        </div>
        <span>{user?.name}</span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50">
          
          {/* USER INFO */}
          <div className="p-3 border-b bg-gray-50">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <ul className="text-sm">
            
            {/* ADMIN BUTTON */}
            {isAdmin && (
              <li
                className="p-2 hover:bg-gray-100 cursor-pointer font-semibold text-blue-600"
                onClick={() => navigate("/admin/dashboard")}
              >
                Admin Dashboard
              </li>
            )}

            {/* NORMAL OPTIONS */}
            <li className="p-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/profile">My Profile</Link>
            </li>

            <li
              className="p-2 hover:bg-red-100 text-red-500 cursor-pointer border-t"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;