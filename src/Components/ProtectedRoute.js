import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  //login
  if (localStorage.getItem("userToken")) return children;
  //not login
  else return <Navigate to="/login"></Navigate>;
}
