import React from "react";
import { useState, useEffect } from "react";
import JobDescModal from "./JobDescModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const JobItem = ({ job, handleConfirmationModal }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(false);
  };

  const handleConfirmationFunc = (v) => {
    handleConfirmationModal(v);
  };

  const convertTo12HourFormat = (timeString) => {
    // Parse the time string into hours and minutes
    const [hours, minutes] = timeString.split(":");

    // Convert hours to a number
    let hoursNum = parseInt(hours, 10);

    // Determine AM or PM
    const amPm = hoursNum >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hoursNum = hoursNum % 12 || 12;

    // Format the time as "hh:mm AM/PM"
    return `${hoursNum}:${minutes} ${amPm}`;
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

  return (
    <>
      <div
        className={`card card-side bg-base-100 shadow-xl cursor-pointer my-5
                  ${
                    job.job_status == "Active"
                      ? "border-[#13A5EE] border-4"
                      : job.job_status == "Completed"
                      ? "border-[#31B58D]"
                      : "border-[#FFC350]"
                  }
                  border-l-[1rem] max-w-3xl`}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div
          className={`hidden md:flex items-center
                        ${
                          job.job_status == "Active"
                            ? "text-[#13A5EE]"
                            : job.job_status == "Completed"
                            ? "text-[#31B58D]"
                            : "text-[#FFC350]"
                        } text-5xl mx-[2rem]`}
        >
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div className="card-body py-3 pl-2.5 text-sm gap-0">
          <h2 className="card-title text-3xl">{job.job_title}</h2>
          <div>
            <p>{job.job_location}</p>

            <p className="text-[#263C44] my-3">
              Assignees:{" "}
              <span className="font-normal">
                {job.job_staff.map((staff) => staff.name).join(", ")}
              </span>
            </p>
            <div className="flex flex-row mt-3">
              <p className="text-[#263C44]">
                Date:{" "}
                <span className="text-base font-normal">
                  {formatDate(job.job_date)}{" "}
                </span>
              </p>
              <p>
                <FontAwesomeIcon icon={faClock} />{" "}
                {convertTo12HourFormat(job.job_starttime)} -{" "}
                {convertTo12HourFormat(job.job_endtime)}
              </p>
              {/* <p>
                Status: {job.job_status == 'Inactive' ? 'Upcoming' :
                        job.job_status == 'Active' ? 'Active' : 'Completed'}
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {openModal && (
          <JobDescModal
            closeModal={() => handleModal()}
            job={job}
            handleConfirmationFunc={handleConfirmationFunc}
          />
        )}
      </div>
    </>
  );
};

export default JobItem;
