import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Logo from "../assets/Logo";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/app");
    } catch (err) {
      console.log(err?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-primary h-screen flex justify-center items-center flex-col">
      <div className="fill-white w-[20rem]">
        <Logo />
      </div>
      {isLoading && <p>Loading...</p>}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 w-11/12 max-w-[386px]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md p-1 w-full"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md p-1 w-full"
          ></input>
        </div>
        <button
          type="submit"
          className="p-1 rounded-lg bg-secondary w-full mt-4 py-2"
        >
          Login
        </button>
      </form>
      <div className="flex flex-col gap-2 mt-10 border-2 p-4 rounded-lg">
        <div className="text-sm border-b-2 pb-2 bg">
          <p>Demo Account(Manager)</p>
          <p>Email: samplemanager@neatoapp.live</p>
          <p>Password: 123456</p>
        </div>
        <div className="text-sm">
          <p>Demo Account(Cleaner)</p>
          <p>Email: samplecleaner@neatoapp.live</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
