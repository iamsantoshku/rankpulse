import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;