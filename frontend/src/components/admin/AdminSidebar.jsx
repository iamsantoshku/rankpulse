




// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   FileText,
//   CreditCard,
//   Settings,
//   ChevronDown
// } from "lucide-react";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     icon: <LayoutDashboard size={18} />
//   },
//   {
//     name: "Users",
//     path: "/admin/users",
//     icon: <Users size={18} />
//   },

//   {
//     name: "Exam Management",
//     icon: <BookOpen size={18} />,
//     children: [
//       { name: "Add Exam", path: "/admin/add-exam" },
//       { name: "Add Test Series", path: "/admin/add-test-series" },
//       { name: "Add Previous Papers", path: "/admin/add-pyp" },
//       { name: "Create Test Paper", path: "/admin/create-test" }
//     ]
//   },

//   {
//     name: "Question Management",
//     icon: <FileText size={18} />,
//     children: [
//       { name: "Add Questions", path: "/admin/add-question" },
//       { name: "All Questions", path: "/admin/questions" }
//     ]
//   },

//   {
//     name: "Results",
//     path: "/admin/results",
//     icon: <FileText size={18} />
//   },

//   {
//     name: "Payments",
//     path: "/admin/payments",
//     icon: <CreditCard size={18} />
//   },

//   {
//     name: "Settings",
//     path: "/admin/settings",
//     icon: <Settings size={18} />
//   }
// ];

// const AdminSidebar = () => {
//   const location = useLocation();

//   const [openMenus, setOpenMenus] = useState({});

//   const toggleMenu = (name) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [name]: !prev[name]
//     }));
//   };

//   const isActive = (path) => location.pathname === path;

//   const isParentActive = (children) =>
//     children?.some((child) => location.pathname === child.path);

//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed overflow-y-auto">

//       <h2 className="text-xl font-bold mb-6">RankPulse Admin</h2>

//       <ul className="space-y-3">
//         {menu.map((item, i) => (
//           <li key={i}>

//             {/* 🔹 SIMPLE LINK */}
//             {!item.children && (
//               <Link
//                 to={item.path}
//                 className={`flex items-center gap-2 p-2 rounded transition ${
//                   isActive(item.path)
//                     ? "bg-blue-500"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             )}

//             {/* 🔹 COLLAPSIBLE MENU */}
//             {item.children && (
//               <div>
//                 <button
//                   onClick={() => toggleMenu(item.name)}
//                   className={`w-full flex items-center justify-between p-2 rounded ${
//                     isParentActive(item.children)
//                       ? "bg-gray-800"
//                       : "hover:bg-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     {item.icon}
//                     {item.name}
//                   </div>

//                   <ChevronDown
//                     size={16}
//                     className={`transition ${
//                       openMenus[item.name] ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* CHILDREN */}
//                 {openMenus[item.name] && (
//                   <ul className="pl-6 mt-2 space-y-1">
//                     {item.children.map((sub) => (
//                       <li key={sub.path}>
//                         <Link
//                           to={sub.path}
//                           className={`block p-2 text-sm rounded ${
//                             isActive(sub.path)
//                               ? "bg-blue-500"
//                               : "hover:bg-gray-700"
//                           }`}
//                         >
//                           {sub.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminSidebar;




import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut,
  BarChart3
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const menu = [
  {
    section: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard size={18} />
      },
      {
        name: "Users",
        path: "/admin/users",
        icon: <Users size={18} />
      },
      {
        name: "Analytics",
        path: "/admin/analytics",
        icon: <BarChart3 size={18} />
      }
    ]
  },

  {
    section: "EXAM MANAGEMENT",
    items: [
      {
        name: "Exam Management",
        icon: <BookOpen size={18} />,
        children: [
          { name: "Add Exam", path: "/admin/add-exam" },
          { name: "Add Test Series", path: "/admin/add-test-series" },
          { name: "Add Previous Papers", path: "/admin/add-pyp" },
          { name: "Create Test Paper", path: "/admin/create-test" }
        ]
      }
    ]
  },

  {
    section: "QUESTIONS",
    items: [
      {
        name: "Question Management",
        icon: <FileText size={18} />,
        children: [
          { name: "Add Questions", path: "/admin/add-question" },
          { name: "All Questions", path: "/admin/questions" }
        ]
      }
    ]
  },

  {
    section: "OTHER",
    items: [
      {
        name: "Results",
        path: "/admin/results",
        icon: <FileText size={18} />
      },
      {
        name: "Payments",
        path: "/admin/payments",
        icon: <CreditCard size={18} />
      },
      {
        name: "Settings",
        path: "/admin/settings",
        icon: <Settings size={18} />
      }
    ]
  }
];

const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed flex flex-col">

      {/* 🔥 LOGO */}
      <div className="p-5 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-blue-400">RankPulse</h2>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>

      {/* 🔥 USER INFO */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
          {user?.name?.charAt(0) || "A"}
        </div>
        <div>
          <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* 🔥 MENU */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">

        {menu.map((section, idx) => (
          <div key={idx}>
            <p className="text-xs text-gray-400 mb-2 px-2">
              {section.section}
            </p>

            <ul className="space-y-1">
              {section.items.map((item, i) => (
                <li key={i}>

                  {/* SIMPLE LINK */}
                  {!item.children && (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        isActive(item.path)
                          ? "bg-blue-500 shadow"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )}

                  {/* COLLAPSIBLE */}
                  {item.children && (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                          isParentActive(item.children)
                            ? "bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-sm">{item.name}</span>
                        </div>

                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            openMenus[item.name] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* CHILD */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openMenus[item.name]
                            ? "max-h-96 mt-1"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="pl-8 space-y-1">
                          {item.children.map((sub) => (
                            <li key={sub.path}>
                              <Link
                                to={sub.path}
                                className={`block px-3 py-2 text-sm rounded-lg ${
                                  isActive(sub.path)
                                    ? "bg-blue-500"
                                    : "hover:bg-gray-700"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* 🔥 FOOTER */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default AdminSidebar;