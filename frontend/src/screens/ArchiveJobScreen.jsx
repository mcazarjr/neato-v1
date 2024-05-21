import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetJobByIdQuery,
  useArchiveJobMutation,
} from "../slices/jobApiSlice";
import Loader from "../components/Loader";
import "./ArchiveJobScreen.css";

const ArchiveJobScreen = () => {
  const { id: paramID } = useParams();
  const navigate = useNavigate();

  // API Events ****************************************************************
  const { data: jobData, isLoading, isSuccess } = useGetJobByIdQuery(paramID);

  const [archiveJob, { isLoading: isArchiving, isSuccess: isArchived }] =
    useArchiveJobMutation();

    
  const [isArchivedSuccess, setIsArchivedSuccess] = useState(false);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  // Local Events **************************************************************
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/app/job");
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    archiveJob(paramID)
      .then((response) => {
        setIsArchivedSuccess(true);
        console.log("Job has been archived:", response);
        navigate("/app/job");
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error archiving job:", error);
      });
  };

  return (
    <>
      {isArchived && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl">
            <h3 className="text-base font-semibold">
              Job data has been archived.
            </h3>
            <div className="flex gap-8 pl-12">
              <button
                className="btn btn-secondary font-normal btn-sm p-2 mt-4"
                onClick={() => navigate("/app/job")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <Loader />}
      {isSuccess && (
        <div>
          <div className="job-details-modal">
            <div className="job-details-content">
              <div className="job-details-header">
                <h1>{jobData.job_title}</h1>
                <p>
                  <span className="job-details-label">Location: </span>
                  {jobData.job_location}
                </p>
                <p>
                  <span className="job-details-label">Client: </span>
                  {jobData.job_client}
                </p>

                <p>
                  <span className="job-details-label">Date: </span>
                  {jobData.job_date.slice(0, 10)}
                </p>
                <p>
                  <span className="job-details-label">Timeline: </span>
                  {formatTime(jobData.job_starttime)} -{" "}
                  {formatTime(jobData.job_endtime)}
                </p>
                <p>
                  <span className="job-details-label">Special Notes: </span>
                  {jobData.job_description}
                </p>
                <div>
                  <span className="job-details-label">Assignee: </span>
                  {jobData.job_staff.map((staff) => (
                    <span key={staff.id}>{staff.name}</span>
                  ))}
                </div>
        

                <p>
                  <span className="job-details-label">Status: </span>
                  {jobData.job_status}
                </p>
              </div>
              <div className="job-details-body">
                <h2 className="job-details-subheading">Task List:</h2>
                <ul className="job-details-task-list">
                  {jobData.job_task && jobData.job_task.length > 0 ? (
                    jobData.job_task.map((task, index) => (
                      <li key={index}>{task.task_title}</li>
                    ))
                  ) : (
                    <p>No tasks to show</p>
                  )}
                </ul>
              </div>

              <div className="job-details-archive-footer">
                <h3 className="text-base font-semibold">
                  Do you want to archive this job data?
                </h3>
                <div className="job-details-archive-buttons">
                  <button
                    className="job-details-archive-button cancel-archive"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="job-details-archive-button"
                    onClick={handleConfirm}
                  >
                    Confirm
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

export default ArchiveJobScreen;
