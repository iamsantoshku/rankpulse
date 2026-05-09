

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ LOAD USER FROM TOKEN (ON REFRESH FIX)
//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5050/api/auth/me", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setUser(res.data);
//       } catch (err) {
//         localStorage.removeItem("token");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   // ✅ LOGIN
//   const login = (data) => {
//     localStorage.setItem("token", data.accessToken);
//     setUser(data.user);
//   };

//   // ✅ LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5050/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ CUSTOM HOOK (THIS IS WHAT YOU NEED)
export const useAuth = () => useContext(AuthContext);