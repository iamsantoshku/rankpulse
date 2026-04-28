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




import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./header/SearchBar";
import AccountDropdown from "./header/AccountDropdown";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

          {/* LEFT */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold text-indigo-600"
            >
              RankPulse
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">

              {/* Test Series Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium">
                  Test Series
                  <span className="text-xs">▼</span>
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                  <Link
                    to="/test-series"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Test Series
                  </Link>
                  <Link
                    to="/pyp"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Previous Year Papers
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* CENTER - SEARCH (HIDDEN ON MOBILE) */}
          <div className="hidden md:block w-[40%]">
            <SearchBar />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-4">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm"
                >
                  Signup
                </Link>
              </>
            ) : (
              <AccountDropdown user={user} logout={logout} />
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-xl"
            >
              ☰
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">

            <SearchBar />

            <Link
              to="/test-series"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Test Series
            </Link>

            <Link
              to="/pyp"
              className="block text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Previous Year Papers
            </Link>

          </div>
        )}
      </header>

      {/* ✅ SPACER (VERY IMPORTANT - FIX OVERLAP ISSUE) */}
      <div className="h-[70px] md:h-[80px]" />
    </>
  );
};

export default Header;