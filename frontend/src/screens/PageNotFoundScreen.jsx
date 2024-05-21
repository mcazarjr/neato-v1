import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
const PageNotFoundScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary text-white w-screen h-screen flex justify-center items-center flex-col">
      <Logo />
      <h1 className="text-xl font-semibold">Page Not Found</h1>
      <p className="text-sm">The page you are looking for does not exist.</p>
      <button
        className="bg-white text-primary px-4 py-2 rounded-lg mt-4"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default PageNotFoundScreen;
