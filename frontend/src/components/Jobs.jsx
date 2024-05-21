import { useState, useEffect } from "react";
import { useGetJobByStatusQuery } from "../slices/jobApiSlice";
import JobItem from "./JobItem";
import ConfirmationModal from "./ConfirmationModal";
import ProgressBarRadial from "./ProgressBarRadial";
import Calendar from "./Calendar";
import dayjs from "dayjs";

const Jobs = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [inactiveJobs, setInactiveJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);

  const [showData, setShowData] = useState(true);
  const [showData2, setShowData2] = useState(true);
  const [showData3, setShowData3] = useState(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

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

  useEffect(() => {
    if (activeJobSuccess) {
      setActiveJobs(activeJobData);
    }

    if (inactiveJobSuccess) {
      // Sort the inactiveJobData based on the 'createdAt' timestamp
      const sortedInactiveJobs = [...inactiveJobData].sort((a, b) => {
        const dateA = new Date(a.job_date);
        const dateB = new Date(b.job_date);
        return dateA - dateB;
      });
      setInactiveJobs(sortedInactiveJobs);
    }

    if (completedJobSuccess) {
      // Sort the completedJobData based on the 'updatedAt' timestamp
      const sortedCompletedJobs = [...completedJobData].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      setCompletedJobs(sortedCompletedJobs);
    }
  }, [activeJobSuccess, inactiveJobSuccess, completedJobSuccess]);

  const handleButtonClick = () => {
    setShowData(!showData);
    setShowData3(false);
  };

  const handleButtonClick2 = () => {
    setShowData2(!showData2);
    setShowData3(false);
  };

  const handleButtonClick3 = () => {
    setShowData3(!showData3);
    setShowData(false);
  };

  return (
    <div className="flex flex-col mx-4 md:mx-0 lg:flex-row lg:gap-10 md:h-[45rem]">
      <div className="md:hidden">
        <div className="flex justify-between">
          <div className="text-3xl font-bold flex flex-col gap-2 my-4">
            <span>{dayjs().format("MMMM D, YYYY")}</span>
            <span className="text-sm">{dayjs().format("dddd")}</span>
          </div>
        </div>
      </div>
      <div className="pt-2 flex-grow overflow-y-auto">
        <h1 className="text-3xl font-bold">Today's Jobs</h1>
        <div className="flex flex-row pt-2">
          <button
            className={`tab ${
              showData ? "border-b-4 rounded border-blue-400" : ""
            } px-0 mt-0 text-black text-md my-4 font-medium`}
            onClick={handleButtonClick}
          >
            {showData
              ? `Active Jobs (${activeJobs ? activeJobs.length : 0})`
              : `Active Jobs (${activeJobs ? activeJobs.length : 0})`}
          </button>

          <button
            className={`tab ${
              showData3 ? "border-b-4 rounded border-blue-400" : ""
            } mt-0 sm:ml-[2rem] text-black text-md my-4 font-medium`}
            onClick={handleButtonClick3}
          >
            {showData3
              ? `Completed Jobs (${completedJobs ? completedJobs.length : 0})`
              : `Completed Jobs (${completedJobs ? completedJobs.length : 0})`}
          </button>
        </div>

        {showData && (
          <div className="ml-[2rem] md:ml-0">
            {activeJobs.length === 0 ? (
              <p className="my-4 text-lg">No Active Jobs</p>
            ) : (
              activeJobs.map((job) => (
                <JobItem
                  key={job._id}
                  job={job}
                  handleConfirmationModal={handleConfirmationModal}
                />
              ))
            )}
          </div>
        )}

        {showData3 && (
          <div className="ml-[2rem] md:ml-0">
            {completedJobs.length === 0 ? (
              <p className="my-4 text-lg">No Completed Jobs</p>
            ) : (
              completedJobs.map((job) => <JobItem key={job._id} job={job} />)
            )}
          </div>
        )}

        <button
          className="px-0 block tab text-black text-md my-4 mb-0 font-medium ml-[2rem] md:ml-0 mt-0"
          onClick={handleButtonClick2}
        >
          {showData2
            ? `Upcoming Jobs (${inactiveJobs ? inactiveJobs.length : 0})`
            : `Upcoming Jobs (${inactiveJobs ? inactiveJobs.length : 0})`}
        </button>

        {showData2 && (
          <div className="ml-[2rem] md:ml-0">
            {inactiveJobs.length === 0 ? (
              <p className="my-4 text-lg">No Upcoming Jobs</p>
            ) : (
              inactiveJobs.map((job) => <JobItem key={job._id} job={job} />)
            )}
          </div>
        )}

        {/* Render ConfirmationModal */}
        {openConfirmationModal && (
          <ConfirmationModal
            ConfirmationModalClose={() => setOpenConfirmationModal(false)}
          />
        )}
      </div>

      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4">
        <div className="flex justify-center items-center p-4 bg-white shadow-lg rounded-xl w-full">
          <ProgressBarRadial />
        </div>
        <div className="flex justify-center items-center p-2 bg-white shadow-lg rounded-xl w-full">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
