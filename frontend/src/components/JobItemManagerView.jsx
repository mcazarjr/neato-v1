import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBoxArchive,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import JobDetailsManagerView from "./JobDetailsManagerView";
import "./JobItemManagerView.css";

const JobItemManagerView = ({ job }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const HandleMouseEnter = () => {
    setIsHovered(true);
  };

  const HandleMouseLeave = () => {
    setIsHovered(false);
  };

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
    // console.log(dateString);
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
    <>
      <div
        className={`card card-side bg-base-100 shadow-xl cursor-pointer my-5 ${
          job.job_status == "Active"
            ? "border-[#13A5EE]"
            : job.job_status == "Inactive"
            ? "border-[#FFC350]"
            : "border-[#31B58D]"
        } border-l-[1rem] max-w-3xl`}
        onMouseEnter={HandleMouseEnter}
        onMouseLeave={HandleMouseLeave}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div
          className={`hidden md:flex items-center ${
            job.job_status == "Active"
              ? "text-[#13A5EE]"
              : job.job_status === "Inactive"
              ? "text-[#FFC350]"
              : "text-[#31B58D]"
          } text-5xl mx-[2rem]`}
        >
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div
          className={`job-item-card card-body py-3 pl-2.5 text-sm gap-0 ${
            job.isArchived ? "card-archived" : ""
          }`}
        >
          <h2
            className={"job-title card-title text-3xl"}
            style={{ alignItems: "flex-start" }}
          >
            {" "}
            {job.job_title}
            {job.isArchived ? <span>(archived)</span> : ""}
          </h2>
          <div className="job-location-list">
            <p>{job.job_location}</p>
          </div>
          <div
            className={"flex flex-row mt-5 job-date-time gap-10"}
            style={{ marginTop: "0" }}
          >
            <div className="job-date">{formatDate(job.job_date)}</div>
            <div className="job-time">
              <FontAwesomeIcon icon={faClock} className="icon" />
              {formatTime(job.job_starttime)} - {formatTime(job.job_endtime)}
            </div>
          </div>

          <div className="job-staff">
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
        </div>

        {isHovered ? (
          <div className={`job-item-icons ${job.isArchived ? "hidden" : ""}`}>
            <div className="icon-container" onClick={handleEditJob}>
              <FontAwesomeIcon icon={faPenToSquare} className="hovered-icon" />
              <span className="icon-text">Edit</span>
            </div>
            <div className="icon-container" onClick={handleArchiveJob}>
              <FontAwesomeIcon icon={faBoxArchive} className="hovered-icon" />
              <span className="icon-text">Archive</span>
            </div>
          </div>
        ) : (
          <div className={`job-item-icons ${job.isArchived ? "hidden" : ""}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="hidden-icon"
              onClick={handleEditJob}
            />
            <FontAwesomeIcon
              icon={faBoxArchive}
              className="hidden-icon"
              onClick={handleArchiveJob}
            />
          </div>
        )}
      </div>

      <div>
        {openModal && (
          <JobDetailsManagerView
            closeModal={() => setOpenModal(false)}
            job={job}
          />
        )}
      </div>
    </>
  );
};

export default JobItemManagerView;
