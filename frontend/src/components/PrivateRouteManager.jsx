import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteManager = () => {
  const { user } = useSelector((state) => state.auth);
  return user && user.designation === "Manager" ? (
    <Outlet />
  ) : (
    <Navigate to="../unauthorize" replace />
  );
};

export default PrivateRouteManager;
