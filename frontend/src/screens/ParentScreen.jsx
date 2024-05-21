import { Outlet } from "react-router-dom";

const ParentScreen = () => {
  return (
    <div className="md:mx-auto md:w-full overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default ParentScreen;
