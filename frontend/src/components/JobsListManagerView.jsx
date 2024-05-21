import { useState, useEffect } from "react";
import { useGetJobByStatusQuery } from "../slices/jobApiSlice";
import JobItemManagerView from "./JobItemManagerView";
import ConfirmationModal from "./ConfirmationModal";
import "./JobsListManagerView.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const JobsListManagerView = ({ filteredByCurrentDate }) => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [inactiveJobs, setInactiveJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [currentDateActiveJobs, setCurrentDateActiveJobs] = useState([]);
  const [currentDateInactiveJobs, setCurrentDateInactiveJobs] = useState([]);
  const [currentDateCompletedJobs, setCurrentDateCompletedJobs] = useState([]);

  const [showData, setShowData] = useState(true);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const currentDate = dayjs().format("YYYY-MM-DD");

  const formatDateForInput = (date) => {
    // to convert date to the correct format for the input field, like 2023-12-31
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const formattedDateString = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
    return formattedDateString;
  };

  const showJobsLength = (jobs) => {
    if (filteredByCurrentDate) {
      const length = filterJobsByCurrentDate(jobs).length;
      return length > 0 ? length : 0;
    } else {
      return jobs.length;
    }
  };

  const handleConfirmationModal = (v) => {
    setOpenConfirmationModal(v);
  };

  const {
    data: activeJobData,
    isFetching: activeJobsFetching,
    isSuccess: activeJobSuccess,
    isError: activeJobError,
  } = useGetJobByStatusQuery("Active");

  const {
    data: inactiveJobData,
    isFetching: inactiveJobsFetching,
    isSuccess: inactiveJobSuccess,
    isError: inactiveJobError,
  } = useGetJobByStatusQuery("Inactive");

  const {
    data: completedJobData,
    isFetching: completedJobsFetching,
    isSuccess: completedJobSuccess,
    isError: completedJobError,
  } = useGetJobByStatusQuery("Completed");

  // Sort jobs
  useEffect(() => {
    if (activeJobSuccess && activeJobData) {
      // Create a new array and sort it
      const sortedActiveJobs = [...activeJobData].sort((a, b) => {
        const dateA = new Date(a.job_date);
        const dateB = new Date(b.job_date);

        if (dateA.getTime() === dateB.getTime()) {
          return (
            new Date(`1970-01-01T${a.job_starttime}`) -
            new Date(`1970-01-01T${b.job_starttime}`)
          );
        } else {
          return dateA - dateB;
        }
      });

      setActiveJobs(sortedActiveJobs);
      const filteredJobs = filterJobsByCurrentDate(sortedActiveJobs);
      setCurrentDateActiveJobs(filteredJobs);
    } else {
      setActiveJobs([]);
    }
  }, [activeJobData, activeJobSuccess]);

  useEffect(() => {
    if (inactiveJobSuccess && inactiveJobData) {
      const sortedInactiveJobs = [...inactiveJobData].sort((a, b) => {
        const dateA = new Date(a.job_date);
        const dateB = new Date(b.job_date);

        if (dateA.getTime() === dateB.getTime()) {
          return (
            new Date(`1970-01-01T${a.job_starttime}`) -
            new Date(`1970-01-01T${b.job_starttime}`)
          );
        } else {
          return dateA - dateB;
        }
      });

      setInactiveJobs(sortedInactiveJobs);
      const filteredJobs = filterJobsByCurrentDate(sortedInactiveJobs);
      setCurrentDateInactiveJobs(filteredJobs);
    } else {
      setInactiveJobs([]);
    }
  }, [inactiveJobData, inactiveJobSuccess]);

  useEffect(() => {
    if (completedJobSuccess && completedJobData) {
      const sortedCompletedJobs = [...completedJobData].sort((a, b) => {
        const dateA = new Date(a.job_date);
        const dateB = new Date(b.job_date);

        if (dateA.getTime() === dateB.getTime()) {
          return (
            new Date(`1970-01-01T${a.job_starttime}`) -
            new Date(`1970-01-01T${b.job_starttime}`)
          );
        } else {
          return dateB - dateA;
        }
      });
      setCompletedJobs(sortedCompletedJobs);
      const filteredJobs = filterJobsByCurrentDate(sortedCompletedJobs);
      setCurrentDateCompletedJobs(filteredJobs);
    } else {
      setCompletedJobs([]);
    }
  }, [completedJobData, completedJobSuccess]);

  // Filter active jobs
  const filterJobsByCurrentDate = (jobs) => {
    const filteredJobs = jobs.filter((job) => {
      const jobDate = dayjs(job.job_date).utc().format("YYYY-MM-DD");
      return jobDate === currentDate;
    });
    return filteredJobs;
  };

  const handleButtonClick = () => {
    setShowData(!showData);
    setShowData2(false);
    setShowData3(false);
  };

  const handleButtonClick2 = () => {
    setShowData2(!showData2);
    setShowData(false);
    setShowData3(false);
  };

  const handleButtonClick3 = () => {
    setShowData3(!showData3);
    setShowData(false);
    setShowData2(false);
  };

  return (
    <div>
      <div className="flex flex-row">
        <button
          className={`tab ${
            showData ? "border-b-4 rounded" : ""
          } text-black text-sm my-4 font-medium active-jobs-button`}
          style={{ height: "max-content" }}
          onClick={handleButtonClick}
        >
          {`Active Jobs(${showJobsLength(activeJobs)})`}
        </button>
        <button
          className={`tab ${
            showData2 ? "border-b-4 rounded" : ""
          } text-black text-sm my-4 font-medium upcoming-jobs-button`}
          style={{ height: "max-content" }}
          onClick={handleButtonClick2}
        >
          {`Upcoming Jobs(${showJobsLength(inactiveJobs)})`}
        </button>
        <button
          className={`tab ${
            showData3 ? "border-b-4 rounded" : ""
          } text-black text-sm my-4 font-medium completed-jobs-button`}
          style={{ height: "max-content" }}
          onClick={handleButtonClick3}
        >
          {`Completed Jobs(${showJobsLength(completedJobs)})`}
        </button>
      </div>

      {filteredByCurrentDate ? (
        // Show jobs filtered by current date
        <>
          {showData && (
            <div>
              {currentDateActiveJobs.length > 0 ? (
                currentDateActiveJobs.map((job) => (
                  <JobItemManagerView
                    key={job._id}
                    job={job}
                    handleConfirmationModal={handleConfirmationModal}
                  />
                ))
              ) : (
                <p>No Active Jobs for today</p>
              )}
            </div>
          )}

          {showData2 && (
            <div>
              {currentDateInactiveJobs.length > 0 ? (
                currentDateInactiveJobs.map((job) => (
                  <JobItemManagerView key={job._id} job={job} />
                ))
              ) : (
                <p>No Upcoming Jobs for today</p>
              )}
            </div>
          )}

          {showData3 && (
            <div>
              {currentDateCompletedJobs.length > 0 ? (
                currentDateCompletedJobs.map((job) => (
                  <JobItemManagerView key={job._id} job={job} />
                ))
              ) : (
                <p>No Completed Jobs for today</p>
              )}
            </div>
          )}
        </>
      ) : (
        // Show all jobs without filtering
        <>
          {showData && (
            <div>
              {activeJobError ? (
                <p>No Active Jobs</p>
              ) : (
                activeJobs.map((job) => (
                  <JobItemManagerView
                    key={job._id}
                    job={job}
                    handleConfirmationModal={handleConfirmationModal}
                  />
                ))
              )}
            </div>
          )}

          {showData2 && (
            <div>
              {inactiveJobError ? (
                <p>No Upcoming Jobs</p>
              ) : (
                inactiveJobs.map((job) => (
                  <JobItemManagerView key={job._id} job={job} />
                ))
              )}
            </div>
          )}

          {showData3 && (
            <div>
              {completedJobError ? (
                <p>No Completed Jobs</p>
              ) : (
                completedJobs.map((job) => (
                  <JobItemManagerView key={job._id} job={job} />
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Render ConfirmationModal */}
      {openConfirmationModal && (
        <ConfirmationModal
          ConfirmationModalClose={() => setOpenConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default JobsListManagerView;
