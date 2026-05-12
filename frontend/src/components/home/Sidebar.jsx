


// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   FileText,
//   Zap,
//   Clock,
//   BookOpen,
//   BarChart,
//   Keyboard,
//   Newspaper,
//   Book,
//   Layers
// } from "lucide-react";

// const menu = [
//   { title: "Home", path: "/", icon: Home },
//   { title: "Mock Test", path: "/exams" ,icon: FileText },
//   { title: "Free Mock Test", path: "/exams", icon: Zap },
//   { title: "Live Test", icon: Clock, highlight: true },
//   { title: "Free Test", icon: BarChart },
//   { title: "Daily Quiz", icon: BookOpen },
//   { title: "Typing Test", icon: Keyboard },
//   { title: "Previous Year Paper", icon: Layers },
//   { title: "Current Affairs", icon: Newspaper },
//   { title: "E-Books", icon: Book },
//   { title: "Practice Batch", icon: FileText },
// ];

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white border-r shadow-sm flex flex-col">

//       {/* LOGO */}
//       <div className="px-5 py-4 border-b">
//         <h2 className="text-2xl font-bold text-indigo-600 tracking-wide">
//           RankPulse
//         </h2>
//       </div>

//       {/* MENU */}
//       <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

//         {menu.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.path;

//           return (
//             <Link
//               key={item.title}
//               to={item.path || "#"}
//               className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
              
//               ${
//                 isActive
//                   ? "bg-indigo-100 text-indigo-700"
//                   : "text-gray-700 hover:bg-gray-100"
//               }

//               ${item.highlight ? "text-red-500 font-semibold" : ""}
//               `}
//             >
//               <Icon size={18} />
//               <span>{item.title}</span>
//             </Link>
//           );
//         })}
//       </div>

//       {/* FOOTER */}
//       <div className="p-4 border-t text-xs text-gray-400">
//         © 2026 RankPulse
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  FileText,
  Zap,
  Clock,
  BookOpen,
  BarChart,
  Keyboard,
  Newspaper,
  Book,
  Layers,
  Menu,
  X,
} from "lucide-react";

const menu = [
  { title: "Home", path: "/", icon: Home },
  { title: "Mock Test", path: "/exams", icon: FileText },
  { title: "Free Mock Test", path: "/exams", icon: Zap },
  { title: "Live Test", icon: Clock, highlight: true },
  { title: "Free Test", icon: BarChart },
  { title: "Daily Quiz", path: "/daily-quiz", icon: BookOpen },
  { title: "Typing Test", icon: Keyboard },
  { title: "Previous Year Paper", icon: Layers },
  { title: "Current Affairs", icon: Newspaper },
  { title: "E-Books", icon: Book },
  { title: "Practice Batch", icon: FileText },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔥 MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow mt-10"
      >
        <Menu size={20} />
      </button>

      {/* 🔥 OVERLAY (MOBILE) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md z-50
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-16 md:h-[calc(100vh-64px)]
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">
            RankPulse
          </h2>

          {/* CLOSE BUTTON (MOBILE) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.title}
                to={item.path || "#"}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200

                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }

                ${item.highlight ? "text-red-500 font-semibold" : ""}
                `}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t text-xs text-gray-400 text-center">
          © 2026 RankPulse
        </div>
      </div>
    </>
  );
};

export default Sidebar;