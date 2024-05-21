import { useNavigate, useParams } from "react-router-dom";
import {
  useGetStaffByIdQuery,
  useArchiveStaffMutation,
} from "../slices/staffApiSlice";
import Loader from "../components/Loader";

const ArchiveStaffScreen = () => {
  const { id: paramID } = useParams();
  const navigate = useNavigate();

  // API Events ****************************************************************
  const {
    data: staffData,
    isLoading,
    isSuccess,
  } = useGetStaffByIdQuery(paramID);

  const [archiveStaff, { isLoading: isArchiving, isSuccess: isArchived }] =
    useArchiveStaffMutation();

  // Local Events **************************************************************
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/app/staff");
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const res = archiveStaff(paramID);
  };

  return (
    <>
      {isArchived && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-base font-semibold">
              Staff data has been archived.
            </h3>
            <div className="flex gap-8 pl-12">
              <button
                className="btn btn-secondary font-normal btn-sm p-2 mt-4"
                onClick={() => navigate("/app/staff")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <Loader />}
      {isSuccess && (
        <div className="p-8 flex gap-4 bg-white drop-shadow-md rounded-xl">
          <div className="flex-1 flex flex-col items-center justify-center mt-8 p-8">
            <img src="https://picsum.photos/200" className="rounded-xl w-1/2" />
            <button className="btn btn-outline btn-sm p-2 mt-4">
              Task History
            </button>
          </div>
          <div className="flex-1 flex mt-8 p-8">
            <div className="flex flex-col">
              <div className="flex flex-1 gap-10">
                <div className="flex flex-col gap-4">
                  <p>Name</p>
                  <p>Employee ID</p>
                  <p>Designation</p>
                  <p>Mobile</p>
                  <p>Email</p>
                  <p>Date Hired</p>
                  <p>Task Completed</p>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <p>{staffData.first_name + " " + staffData.last_name}</p>
                  <p>{staffData.employee_id}</p>
                  <p>{staffData.designation}</p>
                  <p>{staffData.mobile}</p>
                  <p>{staffData.email}</p>
                  <p>{staffData.hiring_date.slice(0, 10)}</p>
                  <p>10</p>
                </div>
              </div>
              <div className="flex-1 mt-12">
                <h3 className="text-base font-semibold">
                  Do you want to archive this staff data?
                </h3>
                <div className="flex gap-8 pl-12">
                  <button
                    className="btn btn-outline btn-sm p-2 mt-4 font-normal"
                    onClick={handleCancel}
                  >
                    cancel
                  </button>
                  <button
                    className="btn btn-secondary font-normal btn-sm p-2 mt-4"
                    onClick={handleConfirm}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArchiveStaffScreen;
