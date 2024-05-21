import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useEffect } from "react";
import Loader from "./Loader";

const Logout = () => {
  const [logoutApiCall] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      logoutApiCall().unwrap();
      dispatch(clearCredentials());
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (err) {
      console.log(err?.data?.message || err.message);
    }
  }, []);

  return <Loader />;
};

export default Logout;
