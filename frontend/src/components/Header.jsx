// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import SearchBar from "./header/SearchBar";
// import AccountDropdown from "./header/AccountDropdown";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <header className="fixed w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between z-50">
      
//       {/* LEFT */}
//       <div className="flex items-center gap-6">
        
//         {/* Logo */}
//         <Link to="/" className="text-xl font-bold text-blue-600">
//           RankPulse
//         </Link>

//         {/* Test Series Dropdown */}
//         <div className="relative">
//           <button className="flex items-center gap-1 border px-3 py-1 rounded-full">
//             Test Series ▼
//           </button>
//         </div>
//       </div>

//       {/* CENTER - SEARCH */}
//       <SearchBar />

//       {/* RIGHT */}
//       <div className="flex items-center gap-4">
        
//         {!user ? (
//           <>
//             <Link to="/login" className="text-gray-700 hover:text-blue-500">
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-blue-500 text-white px-4 py-1 rounded-full"
//             >
//               Signup
//             </Link>
//           </>
//         ) : (
//           <AccountDropdown user={user} logout={logout} />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import { Link } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import SearchBar from "./header/SearchBar";
// import AccountDropdown from "./header/AccountDropdown";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       {/* HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

//         <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

//           {/* LEFT */}
//           <div className="flex items-center gap-4 md:gap-6">

//             {/* Logo */}
//             <Link
//               to="/"
//               className="text-xl md:text-2xl font-bold text-indigo-600"
//             >
//               RankPulse
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center gap-4">

//               {/* Test Series Dropdown */}
              

//             </div>
//           </div>

//           {/* CENTER - SEARCH (HIDDEN ON MOBILE) */}
//           <div className="hidden md:block w-[40%]">
//             <SearchBar />
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3 md:gap-4">

//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-indigo-600 font-medium"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   to="/register"
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm"
//                 >
//                   Signup
//                 </Link>
//               </>
//             ) : (
//               <AccountDropdown user={user} logout={logout} />
//             )}

//             {/* MOBILE MENU BUTTON */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden text-xl"
//             >
//               ☰
//             </button>

//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">

//             <SearchBar />

//             <Link
//               to="/test-series"
//               className="block text-gray-700"
//               onClick={() => setMenuOpen(false)}
//             >
//               Test Series
//             </Link>

//             <Link
//               to="/pyp"
//               className="block text-gray-700"
//               onClick={() => setMenuOpen(false)}
//             >
//               Previous Year Papers
//             </Link>

//           </div>
//         )}
//       </header>

//       {/* ✅ SPACER (VERY IMPORTANT - FIX OVERLAP ISSUE) */}
//       <div className="h-[70px] md:h-[80px]" />
//     </>
//   );
// };

// export default Header;


import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import SearchBar from "./header/SearchBar";
import AccountDropdown from "./header/AccountDropdown";

import {
  Menu,
  X,
  BookOpen,
  FileText,
  Newspaper,
  GraduationCap,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    name: "Exams",
    path: "/exams",
    icon: FileText,
  },
  {
    name: "Daily Quiz",
    path: "/daily-quiz",
    icon: BrainCircuit,
  },
  {
    name: "Study Notes",
    path: "/study-notes",
    icon: BookOpen,
  },
  {
    name: "Current Affairs",
    path: "/current-affairs",
    icon: Newspaper,
  },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 HEADER SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 CLOSE MENU ON RESIZE
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 🔥 HEADER */}
      <header
        className={`
          fixed top-0 right-0 left-0 z-[60]
          transition-all duration-300

          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md border-b"
              : "bg-white"
          }

          md:left-64
        `}
      >
        <div className="h-16 md:h-[72px] px-4 md:px-8 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="
                md:hidden
                w-10 h-10
                flex items-center justify-center
                rounded-xl border bg-white shadow-sm
              "
            >
              <Menu size={20} />
            </button>

            {/* LOGO */}

            <Link
  to="/"
  className="flex items-center gap-3 group"
>
  {/* LOGO ICON */}
  <div
    className="
      w-11 h-11 rounded-2xl
      bg-gradient-to-br from-indigo-600 to-blue-500
      text-white
      flex items-center justify-center
      shadow-lg
      group-hover:scale-105
      transition
      md:hidden
    "
  >
    <GraduationCap size={22} />
  </div>

  {/* TEXT */}
  {/* <div className="hidden md:block">
    <h1
      className="
        text-xl md:text-2xl
        font-black tracking-tight
        bg-gradient-to-r
        from-indigo-600 to-blue-500
        bg-clip-text text-transparent
      "
    >
      RankPulse
    </h1>

    <p className="text-[11px] text-gray-500 -mt-1">
      Crack Govt Exams Faster
    </p>
  </div> */}
</Link>
           

            {/* DESKTOP NAV */}
            

          </div>

          {/* CENTER SEARCH */}
          <div className="hidden lg:block w-[34%]">
            <SearchBar />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* AI BUTTON */}
            <Link
              to="/ai-chat"
              className="
                hidden md:flex
                items-center gap-2
                bg-gradient-to-r from-indigo-600 to-blue-500
                hover:opacity-90
                text-white
                px-4 py-2
                rounded-xl
                text-sm font-semibold
                shadow-md
                transition
              "
            >
              <Sparkles size={16} />
              AI Assistant
            </Link>

            {/* USER */}
            {!user ? (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="
                    hidden sm:block
                    text-gray-700
                    hover:text-indigo-600
                    font-medium
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    px-4 md:px-5
                    py-2
                    rounded-xl
                    text-sm font-semibold
                    shadow-md
                    transition
                  "
                >
                  Get Started
                </Link>

              </div>
            ) : (
              <AccountDropdown
                user={user}
                logout={logout}
              />
            )}

          </div>

        </div>
      </header>

      {/* 🔥 MOBILE DRAWER */}
      <div
        className={`
          fixed inset-0 z-[80]
          transition-all duration-300
          md:hidden

          ${
            menuOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      >

        {/* OVERLAY */}
        <div
          onClick={() => setMenuOpen(false)}
          className="
            absolute inset-0
            bg-black/50 backdrop-blur-sm
          "
        />

        {/* SIDEBAR */}
        <div
          className={`
            absolute top-0 left-0
            w-[82%] max-w-[320px]
            h-full bg-white shadow-2xl
            transition-transform duration-300

            ${
              menuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          {/* TOP */}
          <div
            className="
              flex items-center justify-between
              px-5 py-5 border-b
            "
          >

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div
                className="
                  w-10 h-10 rounded-xl
                  bg-gradient-to-br from-indigo-600 to-blue-500
                  text-white flex items-center justify-center
                "
              >
                <GraduationCap size={20} />
              </div>

              <div>
                <h2 className="font-black text-lg text-indigo-600">
                  RankPulse
                </h2>

                <p className="text-xs text-gray-500">
                  Govt Exam Platform
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="
                w-10 h-10
                rounded-xl border
                flex items-center justify-center
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* SEARCH */}
          <div className="p-4 border-b">
            <SearchBar />
          </div>

          {/* MENU */}
          <div className="p-4 space-y-2 overflow-y-auto">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                      flex items-center gap-3
                      px-4 py-3 rounded-2xl
                      transition-all duration-200
                      font-medium

                      ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100 text-gray-700"
                      }
                    `
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}

            {/* EXTRA LINKS */}
            <div className="pt-4 border-t mt-4 space-y-2">

              <Link
                to="/test-series"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  hover:bg-gray-100
                  text-gray-700
                "
              >
                <FileText size={18} />
                Test Series
              </Link>

              <Link
                to="/pyp"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  hover:bg-gray-100
                  text-gray-700
                "
              >
                <BookOpen size={18} />
                Previous Year Papers
              </Link>

              <Link
                to="/ai-chat"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600 to-blue-500
                  text-white font-semibold
                "
              >
                <Sparkles size={18} />
                AI Assistant
              </Link>

            </div>

          </div>

          {/* FOOTER */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              p-4 border-t bg-gray-50
            "
          >
            <p className="text-xs text-center text-gray-500">
              © 2026 RankPulse. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* 🔥 SPACER */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
};

export default Header;