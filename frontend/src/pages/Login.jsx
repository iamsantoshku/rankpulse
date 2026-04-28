// import { useState, useContext } from "react";
// import { loginUser } from "../services/auth.service";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await loginUser(form);
//     login(res.data);

//     navigate("/");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Email"
//         onChange={(e) =>
//           setForm({ ...form, email: e.target.value })
//         }
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) =>
//           setForm({ ...form, password: e.target.value })
//         }
//       />

//       <button>Login</button>
//     </form>
//   );
// };

// export default Login;





import { useState, useContext } from "react";
import { loginUser } from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Dummy Google Login (replace with real API later)
  const handleGoogleLogin = () => {
    alert("Google Login Coming Soon 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Welcome Back 👋
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition mb-4"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">or</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;