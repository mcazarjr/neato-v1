import { useNavigate, useParams } from "react-router-dom";

import { useGetStaffByIdQuery } from "../slices/staffApiSlice";

import Loader from "../components/Loader";
import ChevronLeftIcon from "../assets/ChevronLeftIcon";

const ViewStaff = () => {
  const { id: paramID } = useParams();
  const navigate = useNavigate();

  const {
    data: staffData,
    isLoading: isFetching,
    isSuccess: isFetched,
  } = useGetStaffByIdQuery(paramID);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/app/staff");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/app/staff/edit/${paramID}`);
  };

  const handleArchive = (e) => {
    e.preventDefault();
    navigate(`/app/staff/archive/${paramID}`);
  };

  const handleExit = (e) => {
    e.preventDefault();
    navigate("/app/staff");
  };

  return (
    <>
      {isFetching && <Loader />}

      {isFetched && (
        <div className="p-8 flex flex-col gap-4 bg-white drop-shadow-md rounded-xl">
          <h2 className="text-xl font-bold flex items-center justify-center gap-4 relative md:justify-start md:pl-10">
            <button
              className="rounded-lg w-5 absolute left-0 top-0 flex items-center justify-center"
              onClick={handleExit}
            >
              <ChevronLeftIcon />
            </button>
            <div>
              <p>Staff Information</p>
            </div>
          </h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 relative">
            {staffData.isArchived && (
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-[#3db3881d] flex items-center justify-center z-50">
                <p className="text-7xl tracking-widest -rotate-45">Archived</p>
              </div>
            )}
            <div className="flex flex-col gap-4 md:gap-8 justify-center">
              <img
                src="https://picsum.photos/200"
                alt="Staff"
                className="mx-auto"
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* <div className="flex justify-end pr-4">
                
              </div> */}
              <div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="first_name">Name</label>
                  <input
                    name="first_name"
                    type="text"
                    className="p-1 bg-[#CACACA] rounded-md"
                    value={staffData.first_name}
                    disabled
                  />
                  <input
                    name="first_name"
                    type="text"
                    className="p-1 bg-[#CACACA] rounded-md"
                    value={staffData.last_name}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="employee_id">Employee ID</label>
                <input
                  name="employee_id"
                  type="text"
                  className="p-1 bg-[#CACACA] rounded-md"
                  value={staffData.employee_id}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="designation">Designation</label>
                <input
                  name="designation"
                  type="text"
                  className="p-1 bg-[#CACACA] rounded-md"
                  value={staffData.designation}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="mobile">Mobile</label>
                <input
                  name="mobile"
                  type="text"
                  className="p-1 bg-[#CACACA] rounded-md"
                  value={staffData.mobile}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  className="p-1 bg-[#CACACA] rounded-md"
                  value={staffData.email}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="hiring_date">Date Hired</label>
                <input
                  name="hiring_date"
                  type="text"
                  className="p-1 bg-[#CACACA] rounded-md"
                  value={staffData.hiring_date.slice(0, 10)}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span>Task Completed: </span>
                <span>50</span>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="flex-grow border-[1px] border-current rounded-lg px-6 py-3 disabled:bg-[#CACACA] disabled:color-[#000000] disabled:border-none"
                  onClick={handleArchive}
                  disabled={staffData.isArchived}
                >
                  archive
                </button>
                <div></div>
                <button
                  className="flex-grow rounded-lg bg-secondary px-6 py-3 disabled:bg-[#CACACA] disabled:color-[#000000]"
                  onClick={handleEdit}
                  disabled={staffData.isArchived}
                >
                  edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewStaff;
