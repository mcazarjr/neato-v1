import { useNavigate } from "react-router-dom";

import StaffList from "../components/StaffList";

const StaffScreen = () => {
  const navigate = useNavigate();

  const handleAddStaff = () => {
    navigate("/app/staff/add");
  };

  return (
    <>
      <div className="flex justify-between items-center pb-4 pt-4 md:pt-0 px-4 md:px-0 lg:pl-2">
        <h1 className="text-2xl font-semibold">Staff</h1>
        <button className="btn btn-secondary" onClick={handleAddStaff}>
          Add Staff
        </button>
      </div>
      <div className="flex flex-col gap-4 bg-white drop-shadow-md rounded-xl lg:max-h-[40rem] overflow-auto mx-4 md:mx-0 lg:ml-2">
        <StaffList />
      </div>
    </>
  );
};

export default StaffScreen;
