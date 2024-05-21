import { Link, useNavigate } from "react-router-dom";
import CheckIcon from "../assets/CheckIcon";
import "./CreateJobConfirmPopup.css";

// const CreateJobConfirmPopup = ( { jobId}) => {
const CreateJobConfirmPopup = () => {
  const navigate = useNavigate();

  const handleToJobsOverview = () => {
    navigate("/app/job/");
    //  navigate(`/app/job/"${job_id}`);
  };

  return (
    <div className="create-job-confirm-popup">
      <div className="popup-content flex justify-center flex-col items-center">
        <div className="flex items-center justify-center w-24">
          <CheckIcon />
        </div>
        <h2 className="mt-6">You've created a new job!</h2>
        <p>You can see your newly created job on the Job Overview Page </p>
        <div className="popup-buttons">
          <button
            className="button bg-secondary py-2 px-4 text-[#263C44] rounded-lg"
            onClick={handleToJobsOverview}
          >
            Go to Job Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobConfirmPopup;
