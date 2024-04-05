import { Navigate } from "react-router-dom";

const useAuth = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  },
};

const ProtectedRoute = ({children}) => {
  const auth = useAuth.isAuthenticated();
  
  return auth ? children : <Navigate to="/auth/login" />;  
};

export default ProtectedRoute;
