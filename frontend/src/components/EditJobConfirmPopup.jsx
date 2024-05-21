import { Link, useNavigate } from "react-router-dom";
import CheckIcon from "../assets/CheckIcon";
import "./EditJobConfirmPopup.css";

const EditJobConfirmPopup = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleToJobsOverview = () => {
    navigate("/app/job");
  };

  return (
    <>
      {visible && (
        <div className="create-job-confirm-popup">
          <div className="popup-content flex justify-center flex-col items-center">
            <div className="flex items-center justify-center w-24">
              <CheckIcon />
            </div>
            <h2 className="mt-6">You've edited job successfully!</h2>
            <p>You can see updated job on the Jobs Overview Page </p>
            <div className="popup-buttons">
              <button
                className="button bg-secondary py-2 px-4 text-[#263C44] rounded-lg"
                onClick={handleToJobsOverview}
              >
                Go to Jobs Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJobConfirmPopup;
