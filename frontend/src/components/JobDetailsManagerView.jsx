import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JobDetailsManagerView.css";
import JobDetailsManagerViewImages from "./JobDetailsManagerViewImages";

const JobDetailsManagerView = ({ closeModal, job }) => {
  const [staffAvatars, setStaffAvatars] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const generateRandomAvatars = () => {
      const avatars = {};
      job.job_staff.forEach((staff) => {
        avatars[staff.id] = `https://picsum.photos/50?random=${staff.id}`;
      });
      setStaffAvatars(avatars);
    };

    generateRandomAvatars();
  }, [job.job_staff]);

  const handleEditJob = () => {
    navigate(`/app/job/edit/${job._id}`);
  };

  const handleArchiveJob = () => {
    navigate(`/app/job/archive/${job._id}`);
  };

  const handleStaffClick = (event, staff) => {
    event.stopPropagation();
    console.log("staff clicked", staff);
    navigate(`/app/staff/${staff.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  return (
    <div>
      <div className="job-details-modal">
        <div
          className={`job-details-content ${
            job.isArchived ? "deatiled-job-view-archived" : ""
          }`}
        >
          <div className="job-details-close pl-4">
            <button onClick={() => closeModal(false)}>&#10005;</button>
          </div>
          <div className="job-details-header mb-0 pt-0">
            <h1>
              {job.job_title}
              {job.isArchived ? <span>(archived)</span> : ""}
            </h1>
            <p>
              <span className="job-details-label">Location: </span>
              {job.job_location}
            </p>
            <p>
              <span className="job-details-label">Client: </span>
              {job.job_client}
            </p>

            <p>
              <span className="job-details-label">Date: </span>
              {formatDate(job.job_date)}
            </p>
            <p>
              <span className="job-details-label">Timeline: </span>
              {formatTime(job.job_starttime)} - {formatTime(job.job_endtime)}
            </p>
            <p>
              <span className="job-details-label">Special Notes: </span>
              {job.job_description}
            </p>
            <div className="staff">
              <span className="job-details-label">Assignee: </span>
              {job.job_staff.map((staff) => (
                <div
                  key={staff.id}
                  onClick={(event) => handleStaffClick(event, staff)}
                >
                  <img
                    src={staffAvatars[staff.id]}
                    alt={`Avatar for ${staff.name}`}
                    className="avatar"
                  />
                  <span>{staff.name} </span>
                </div>
              ))}
            </div>
            <p>
              <span className="job-details-label">Status: </span>
              {job.job_status === "Inactive" ? "Upcoming" : job.job_status}
            </p>
          </div>
          <div className="job-details-body pb-2 grid md:grid-cols-[auto_1fr] lg:gap-10">
            <div className="pr-4">
              <h2 className="job-details-subheading m-0">Task List:</h2>
              <div className="ml-4">
                <h3 className="font-semibold text-lg py-2">Completed Task</h3>
                <ul className="job-details-task-list">
                  {job.job_task && job.job_task.length > 0 ? (
                    job.job_task.map(
                      (task, index) =>
                        task.task_status && (
                          <li className="text-[#263C44] ml-4" key={index}>
                            {task.task_title}
                          </li>
                        )
                    )
                  ) : (
                    <p>No Tasks to show</p>
                  )}
                </ul>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg py-2">Uncompleted Task</h3>
                <ul className="job-details-task-list">
                  {job.job_task && job.job_task.length > 0 ? (
                    job.job_task.map(
                      (task, index) =>
                        !task.task_status && (
                          <li className="text-[#263C44] ml-4" key={index}>
                            {task.task_title}
                          </li>
                        )
                    )
                  ) : (
                    <p>No Tasks to show</p>
                  )}
                </ul>
              </div>
            </div>
            <div className="hidden md:grid md:grid-rows-2">
              <div className="job-details-images">
                <h3 className="text-lg font-semibold">Images</h3>
                <div className="flex overflow-x-auto gap-2">
                  <JobDetailsManagerViewImages id={job._id} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Notes</h3>
                <p className={job.cleaner_description ? "italic" : ""}>
                  {job.cleaner_description ? job.job_notes : "No Notes to show"}
                </p>
              </div>
            </div>
          </div>
          <div className="job-details-footer mt-0">
            <button
              className="job-details-button"
              disabled={job.isArchived}
              onClick={handleEditJob}
            >
              Edit
            </button>
            <button
              className="job-details-button archive"
              disabled={job.isArchived}
              onClick={handleArchiveJob}
            >
              Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsManagerView;
