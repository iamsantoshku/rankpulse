




// import { Link, useLocation } from "react-router-dom";

// const menu = [
//   { name: "Dashboard", path: "/admin/dashboard" },
//   { name: "Users", path: "/admin/users" },

//   {
//     name: "Exam Management",
//     children: [
//       { name: "Add Exam", path: "/admin/add-exam" },
//       { name: "Add Test Series", path: "/admin/add-test-series"},
//       { name: "Add Previous Papers", path: "/admin/add-pyp" }
//     ]
//   },

//   { name: "Questions", path: "/admin/questions" },
//   { name: "Results", path: "/admin/results" },
//   { name: "Payments", path: "/admin/payments" },
//   { name: "Settings", path: "/admin/settings" }
// ];

// const AdminSidebar = () => {
//   const location = useLocation();

//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed overflow-y-auto">
      
//       <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

//       <ul className="space-y-3">
//         {menu.map((item, i) => (
//           <li key={i}>
            
//             {/* SIMPLE LINK */}
//             {!item.children && (
//               <Link
//                 to={item.path}
//                 className={`block p-2 rounded ${
//                   location.pathname === item.path
//                     ? "bg-blue-500"
//                     : "hover:bg-gray-700"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             )}

//             {/* GROUP MENU */}
//             {item.children && (
//               <div>
//                 <p className="text-gray-400 text-sm mb-1">
//                   {item.name}
//                 </p>

//                 <ul className="space-y-1 pl-2">
//                   {item.children.map((sub) => (
//                     <li key={sub.path}>
//                       <Link
//                         to={sub.path}
//                         className={`block p-2 rounded text-sm ${
//                           location.pathname === sub.path
//                             ? "bg-blue-500"
//                             : "hover:bg-gray-700"
//                         }`}
//                       >
//                         {sub.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
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
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  Settings,
  ChevronDown
} from "lucide-react";

const menu = [
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
    name: "Exam Management",
    icon: <BookOpen size={18} />,
    children: [
      { name: "Add Exam", path: "/admin/add-exam" },
      { name: "Add Test Series", path: "/admin/add-test-series" },
      { name: "Add Previous Papers", path: "/admin/add-pyp" },
      { name: "Create Test Paper", path: "/admin/create-test" }
    ]
  },

  {
    name: "Question Management",
    icon: <FileText size={18} />,
    children: [
      { name: "Add Questions", path: "/admin/add-question" },
      { name: "All Questions", path: "/admin/questions" }
    ]
  },

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
];

const AdminSidebar = () => {
  const location = useLocation();

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
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed overflow-y-auto">

      <h2 className="text-xl font-bold mb-6">RankPulse Admin</h2>

      <ul className="space-y-3">
        {menu.map((item, i) => (
          <li key={i}>

            {/* 🔹 SIMPLE LINK */}
            {!item.children && (
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded transition ${
                  isActive(item.path)
                    ? "bg-blue-500"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )}

            {/* 🔹 COLLAPSIBLE MENU */}
            {item.children && (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between p-2 rounded ${
                    isParentActive(item.children)
                      ? "bg-gray-800"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition ${
                      openMenus[item.name] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* CHILDREN */}
                {openMenus[item.name] && (
                  <ul className="pl-6 mt-2 space-y-1">
                    {item.children.map((sub) => (
                      <li key={sub.path}>
                        <Link
                          to={sub.path}
                          className={`block p-2 text-sm rounded ${
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
                )}
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;