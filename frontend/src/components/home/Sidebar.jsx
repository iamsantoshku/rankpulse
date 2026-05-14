

// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
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
//   Layers,
//   Menu,
//   X,
// } from "lucide-react";

// const menu = [
//   { title: "Home", path: "/", icon: Home },
//   { title: "Mock Test", path: "/exams", icon: FileText },
//   { title: "Free Mock Test", path: "/exams", icon: Zap },
//   { title: "Live Test", icon: Clock, highlight: true },
//   { title: "Free Test", icon: BarChart },
//   { title: "Daily Quiz", path: "/daily-quiz", icon: BookOpen },
//   { title: "Typing Test", icon: Keyboard },
//   { title: "Previous Year Paper", icon: Layers },
//   { title: "Current Affairs", icon: Newspaper },
//   { title: "Study Notes", path: "/study-notes", icon: Book },
//   { title: "Practice Batch", icon: FileText },
//   { title: "AI Chat", path: "/ai-chat", icon: Zap, highlight: true },
// ];

// const Sidebar = () => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* 🔥 MOBILE TOGGLE BUTTON */}
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow mt-10"
//       >
//         <Menu size={20} />
//       </button>

//       {/* 🔥 OVERLAY (MOBILE) */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//         />
//       )}

//       {/* 🔥 SIDEBAR */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md z-50
//           transform transition-transform duration-300

//           ${open ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:top-16 md:h-[calc(100vh-64px)]
//         `}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-5 py-4 border-b">
//           <h2 className="text-xl font-bold text-indigo-600">
//             RankPulse
//           </h2>

//           {/* CLOSE BUTTON (MOBILE) */}
//           <button
//             onClick={() => setOpen(false)}
//             className="md:hidden"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* MENU */}
//         <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

//           {menu.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.title}
//                 to={item.path || "#"}
//                 onClick={() => setOpen(false)}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200

//                 ${
//                   isActive
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }

//                 ${item.highlight ? "text-red-500 font-semibold" : ""}
//                 `}
//               >
//                 <Icon size={18} />
//                 <span>{item.title}</span>
//               </Link>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div className="p-4 border-t text-xs text-gray-400 text-center">
//           © 2026 RankPulse
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;





// ==========================================
// src/components/layout/Sidebar.jsx
// ==========================================

// import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// import {
//   Home,
//   FileText,
//   Zap,
//   Clock3,
//   BookOpen,
//   BarChart3,
//   Keyboard,
//   Newspaper,
//   Book,
//   Layers3,
//   Menu,
//   X,
//   ChevronRight,
//   Sparkles,
//   Trophy,
//   Brain,
//   ShieldCheck,
// } from "lucide-react";

// const menu = [
//   {
//     title: "Home",
//     path: "/",
//     icon: Home,
//   },

//   {
//     title: "Mock Tests",
//     path: "/exams",
//     icon: FileText,
//   },

//   {
//     title: "Free Mock Test",
//     path: "/exams",
//     icon: Zap,
//     badge: "FREE",
//   },

//   {
//     title: "Live Test",
//     path: "/live-test",
//     icon: Clock3,
//     highlight: true,
//     badge: "LIVE",
//   },

//   {
//     title: "Daily Quiz",
//     path: "/daily-quiz",
//     icon: BookOpen,
//     badge: "NEW",
//   },

//   {
//     title: "Study Notes",
//     path: "/study-notes",
//     icon: Book,
//   },

//   {
//     title: "Current Affairs",
//     path: "/current-affairs",
//     icon: Newspaper,
//   },

//   {
//     title: "Previous Papers",
//     path: "/previous-papers",
//     icon: Layers3,
//   },

//   {
//     title: "Typing Test",
//     path: "/typing-test",
//     icon: Keyboard,
//   },

//   {
//     title: "Performance",
//     path: "/dashboard",
//     icon: BarChart3,
//   },

//   {
//     title: "Practice Batch",
//     path: "/practice-batch",
//     icon: Trophy,
//   },

//   {
//     title: "AI Chat",
//     path: "/ai-chat",
//     icon: Brain,
//     highlight: true,
//     badge: "AI",
//   },
// ];

// const Sidebar = () => {
//   const location = useLocation();

//   const [open, setOpen] = useState(false);

//   // 🔥 CLOSE MOBILE SIDEBAR ON ROUTE CHANGE
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   // 🔥 LOCK BODY SCROLL WHEN SIDEBAR OPEN
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   return (
//     <>
//       {/* ========================================= */}
//       {/* MOBILE MENU BUTTON */}
//       {/* ========================================= */}

//       <button
//         onClick={() => setOpen(true)}
//         className="
//           md:hidden fixed top-4 left-4 z-[60]
//           w-11 h-11 rounded-xl
//           bg-white/90 backdrop-blur-xl
//           border border-gray-200
//           shadow-lg
//           flex items-center justify-center
//         "
//       >
//         <Menu size={20} />
//       </button>

//       {/* ========================================= */}
//       {/* OVERLAY */}
//       {/* ========================================= */}

//       <div
//         onClick={() => setOpen(false)}
//         className={`
//           fixed inset-0 bg-black/50 backdrop-blur-sm z-40
//           transition-all duration-300 md:hidden

//           ${
//             open
//               ? "opacity-100 visible"
//               : "opacity-0 invisible"
//           }
//         `}
//       />

//       {/* ========================================= */}
//       {/* SIDEBAR */}
//       {/* ========================================= */}

//       <aside
//         className={`
//           fixed top-0 left-0 z-50

//           w-[256px]
//           h-screen

//           bg-white/95
//           backdrop-blur-2xl

//           border-r border-gray-200

//           flex flex-col

//           transition-transform duration-300

//           ${
//             open
//               ? "translate-x-0"
//               : "-translate-x-full"
//           }

//           md:translate-x-0
//         `}
//       >

//         {/* ========================================= */}
//         {/* HEADER */}
//         {/* ========================================= */}

//         <div className="
//           px-5 py-5 border-b border-gray-100
//           flex items-center justify-between
//         ">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="flex items-center gap-3"
//           >

//             <div className="
//               w-12 h-12 rounded-2xl
//               bg-gradient-to-br
//               from-indigo-600
//               to-purple-600
//               flex items-center justify-center
//               shadow-lg
//             ">
//               <Sparkles
//                 className="text-white"
//                 size={22}
//               />
//             </div>

//             <div>
//               <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 RankPulse
//               </h1>

//               <p className="text-xs text-gray-500">
//                 Crack Govt Exams 🚀
//               </p>
//             </div>

//           </Link>

//           {/* CLOSE BUTTON */}
//           <button
//             onClick={() => setOpen(false)}
//             className="
//               md:hidden
//               w-9 h-9 rounded-lg
//               hover:bg-gray-100
//               flex items-center justify-center
//             "
//           >
//             <X size={20} />
//           </button>

//         </div>

       

//         <div className="
//           flex-1 overflow-y-auto
//           px-3 py-5
//           custom-scrollbar
//         ">

//           <div className="space-y-1">

//             {menu.map((item) => {
//               const Icon = item.icon;

//               const isActive =
//                 location.pathname === item.path;

//               return (
//                 <Link
//                   key={item.title}
//                   to={item.path}
//                   className={`
//                     group flex items-center justify-between
//                     px-4 py-3 rounded-2xl
//                     transition-all duration-300

//                     ${
//                       isActive
//                         ? `
//                           bg-gradient-to-r
//                           from-indigo-600
//                           to-purple-600
//                           text-white
//                           shadow-lg
//                         `
//                         : `
//                           text-gray-700
//                           hover:bg-gray-100
//                         `
//                     }
//                   `}
//                 >

//                   {/* LEFT */}
//                   <div className="flex items-center gap-3">

//                     <div className={`
//                       w-10 h-10 rounded-xl
//                       flex items-center justify-center
//                       transition-all

//                       ${
//                         isActive
//                           ? "bg-white/20"
//                           : `
//                             bg-gray-100
//                             group-hover:bg-white
//                           `
//                       }
//                     `}>

//                       <Icon size={18} />

//                     </div>

//                     <div>

//                       <p className={`
//                         text-sm font-semibold

//                         ${
//                           item.highlight
//                             ? "text-red-500"
//                             : ""
//                         }

//                         ${
//                           isActive
//                             ? "text-white"
//                             : ""
//                         }
//                       `}>
//                         {item.title}
//                       </p>

//                     </div>

//                   </div>

//                   {/* RIGHT */}
//                   <div className="flex items-center gap-2">

//                     {item.badge && (
//                       <span className={`
//                         text-[10px] font-bold px-2 py-1 rounded-full

//                         ${
//                           isActive
//                             ? "bg-white/20 text-white"
//                             : `
//                               bg-indigo-100
//                               text-indigo-700
//                             `
//                         }
//                       `}>
//                         {item.badge}
//                       </span>
//                     )}

//                     <ChevronRight
//                       size={16}
//                       className={`
//                         transition-transform duration-300

//                         group-hover:translate-x-1

//                         ${
//                           isActive
//                             ? "text-white"
//                             : "text-gray-400"
//                         }
//                       `}
//                     />

//                   </div>

//                 </Link>
//               );
//             })}

//           </div>

//         </div>

//         {/* ========================================= */}
//         {/* FOOTER */}
//         {/* ========================================= */}

//         <div className="
//           border-t border-gray-100
//           p-4
//         ">

//           <div className="
//             bg-gray-50 rounded-2xl
//             p-4
//           ">

//             <div className="flex items-center gap-3">

//               <div className="
//                 w-11 h-11 rounded-xl
//                 bg-gradient-to-br
//                 from-orange-500
//                 to-red-500

//                 flex items-center justify-center
//                 text-white
//               ">
//                 🔥
//               </div>

//               <div>

//                 <h4 className="font-bold text-sm text-gray-800">
//                   Daily Quiz Challenge
//                 </h4>

//                 <p className="text-xs text-gray-500">
//                   Attempt today's quiz now
//                 </p>

//               </div>

//             </div>

//             <Link
//               to="/daily-quiz"
//               className="
//                 mt-4 block text-center
//                 bg-indigo-600 hover:bg-indigo-700
//                 text-white py-2.5 rounded-xl
//                 text-sm font-semibold
//                 transition
//               "
//             >
//               Start Quiz
//             </Link>

//           </div>

//           <p className="
//             text-center text-xs
//             text-gray-400 mt-4
//           ">
//             © 2026 RankPulse
//           </p>

//         </div>

//       </aside>
//     </>
//   );
// };

// export default Sidebar;



import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Home,
  FileText,
  Zap,
  Clock3,
  BookOpen,
  BarChart3,
  Keyboard,
  Newspaper,
  Book,
  Layers3,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Trophy,
  Brain,
} from "lucide-react";

const menu = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },

  {
    title: "Mock Tests",
    path: "/exams",
    icon: FileText,
  },

  {
    title: "Free Mock Test",
    path: "/exams",
    icon: Zap,
    badge: "FREE",
  },

  {
    title: "Live Test",
    path: "/live-test",
    icon: Clock3,
    highlight: true,
    badge: "LIVE",
  },

  {
    title: "Daily Quiz",
    path: "/daily-quiz",
    icon: BookOpen,
    badge: "NEW",
  },

  {
    title: "Study Notes",
    path: "/study-notes",
    icon: Book,
  },

  {
    title: "Current Affairs",
    path: "/current-affairs",
    icon: Newspaper,
  },

  {
    title: "Previous Papers",
    path: "/previous-papers",
    icon: Layers3,
  },

  {
    title: "Typing Test",
    path: "/typing-test",
    icon: Keyboard,
  },

  {
    title: "Performance",
    path: "/dashboard",
    icon: BarChart3,
  },

  {
    title: "Practice Batch",
    path: "/practice-batch",
    icon: Trophy,
  },

  {
    title: "AI Chat",
    path: "/ai-chat",
    icon: Brain,
    highlight: true,
    badge: "AI",
  },
];

const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  // ✅ AUTO CLOSE ON ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ✅ LOCK BODY SCROLL
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* ======================================= */}
      {/* MOBILE MENU BUTTON */}
      {/* ======================================= */}

      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          fixed
          top-3
          left-4
          z-[120]

          w-11
          h-11

          rounded-xl
          bg-white
          shadow-lg
          border

          flex
          items-center
          justify-center
        "
      >
        <Menu size={20} />
      </button>

      {/* ======================================= */}
      {/* OVERLAY */}
      {/* ======================================= */}

      <div
        onClick={() => setOpen(false)}
        className={`
          md:hidden
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          z-[130]

          transition-all
          duration-300

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* ======================================= */}
      {/* SIDEBAR */}
      {/* ======================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0

          z-[140]

          // w-[260px]
          w-[350px] md:w-[270px]
          h-screen

          bg-white
          border-r
          border-gray-200

          flex
          flex-col

          shadow-2xl

          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* ======================================= */}
        {/* HEADER */}
        {/* ======================================= */}

        <div
          className="
            h-[72px]
            border-b
            border-gray-100

            px-5

            flex
            items-center
            justify-between

            shrink-0
          "
        >

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div
              className="
                w-11
                h-11
                rounded-2xl

                bg-gradient-to-br
                from-indigo-600
                to-purple-600

                flex
                items-center
                justify-center

                shadow-lg
              "
            >
              <Sparkles
                size={20}
                className="text-white"
              />
            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-black

                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600

                  bg-clip-text
                  text-transparent
                "
              >
                RankPulse
              </h1>

              <p className="text-xs text-gray-500">
                Crack Govt Exams 🚀
              </p>

            </div>

          </Link>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="
              md:hidden

              w-9
              h-9

              rounded-xl

              hover:bg-gray-100

              flex
              items-center
              justify-center
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* ======================================= */}
        {/* MENU */}
        {/* ======================================= */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-3
            py-4

            space-y-1
          "
        >

          {menu.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.title}
                to={item.path}
                className={`
                  group

                  flex
                  items-center
                  justify-between

                  px-4
                  py-3

                  rounded-2xl

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600

                        text-white
                        shadow-lg
                      `
                      : `
                        text-gray-700
                        hover:bg-gray-100
                      `
                  }
                `}
              >

                {/* LEFT */}
                <div className="flex items-center gap-3">

                  <div
                    className={`
                      w-10
                      h-10

                      rounded-xl

                      flex
                      items-center
                      justify-center

                      transition-all

                      ${
                        isActive
                          ? "bg-white/20"
                          : `
                            bg-gray-100
                            group-hover:bg-white
                          `
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  <div>

                    <p
                      className={`
                        text-sm
                        font-semibold

                        ${
                          item.highlight &&
                          !isActive
                            ? "text-red-500"
                            : ""
                        }
                      `}
                    >
                      {item.title}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">

                  {item.badge && (
                    <span
                      className={`
                        text-[10px]
                        font-bold

                        px-2
                        py-1

                        rounded-full

                        ${
                          isActive
                            ? `
                              bg-white/20
                              text-white
                            `
                            : `
                              bg-indigo-100
                              text-indigo-700
                            `
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                  <ChevronRight
                    size={16}
                    className={`
                      transition-transform
                      duration-300

                      group-hover:translate-x-1

                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400"
                      }
                    `}
                  />

                </div>

              </Link>
            );
          })}

        </div>

        {/* ======================================= */}
        {/* FOOTER */}
        {/* ======================================= */}

        <div
          className="
            border-t
            border-gray-100

            p-4

            shrink-0
          "
        >

          <div
            className="
              bg-gradient-to-r
              from-indigo-50
              to-purple-50

              rounded-2xl

              p-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12

                  rounded-xl

                  bg-gradient-to-br
                  from-orange-500
                  to-red-500

                  flex
                  items-center
                  justify-center

                  text-white
                  text-lg
                "
              >
                🔥
              </div>

              <div>

                <h4 className="font-bold text-sm">
                  Daily Quiz Challenge
                </h4>

                <p className="text-xs text-gray-500">
                  Improve your rank daily
                </p>

              </div>

            </div>

            <Link
              to="/daily-quiz"
              className="
                mt-4
                block

                text-center

                bg-indigo-600
                hover:bg-indigo-700

                text-white

                py-2.5

                rounded-xl

                text-sm
                font-semibold

                transition
              "
            >
              Start Quiz
            </Link>

          </div>

          <p
            className="
              text-center
              text-xs
              text-gray-400
              mt-4
            "
          >
            © 2026 RankPulse
          </p>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;