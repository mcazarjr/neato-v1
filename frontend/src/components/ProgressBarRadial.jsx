import { useState, useEffect } from "react";
import { useGetJobByStatusQuery } from "../slices/jobApiSlice";
import Loader from "./Loader";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const ProgressBarRadial = () => {
  const {
    data: activeJobs,
    isLoading: activeJobsLoading,
    isSuccess: activeJobsSuccess,
  } = useGetJobByStatusQuery("Active");
  const {
    data: inactiveJobs,
    isLoading: inactiveJobsLoading,
    isSuccess: inactiveJobsSuccess,
  } = useGetJobByStatusQuery("Inactive");
  const {
    data: completedJobs,
    isLoading: completedJobsLoading,
    isSuccess: completedJobsSuccess,
  } = useGetJobByStatusQuery("Completed");

  const [activeJobCount, setActiveJobCount] = useState(0);
  const [inactiveJobCount, setInactiveJobCount] = useState(0);
  const [completedJobCount, setCompletedJobCount] = useState(0);

  const currentDate = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (activeJobsSuccess) {
      const filteredJobs = activeJobs.filter((job) => {
        const jobDate = dayjs(job.job_date).utc().format("YYYY-MM-DD");
        return jobDate === currentDate;
      });
      setActiveJobCount(filteredJobs.length);
    }

    if (inactiveJobsSuccess) {
      const filteredJobs = inactiveJobs.filter((job) => {
        const jobDate = dayjs(job.job_date).utc().format("YYYY-MM-DD");
        return jobDate === currentDate;
      });
      setInactiveJobCount(filteredJobs.length);
    }

    if (completedJobsSuccess) {
      const filteredJobs = completedJobs.filter((job) => {
        const jobDate = dayjs(job.job_date).utc().format("YYYY-MM-DD");
        return jobDate === currentDate;
      });
      setCompletedJobCount(filteredJobs.length);
    }
  }, [activeJobs, inactiveJobs, completedJobs]);

  if (
    activeJobsLoading ||
    inactiveJobsLoading ||
    completedJobsLoading ||
    !activeJobsSuccess ||
    !inactiveJobsSuccess ||
    !completedJobsSuccess
  ) {
    return <Loader />;
  }

  const calculateProgress = (active, inactive, completed) => {
    const totalJobs = active + inactive + completed;
    if (totalJobs === 0) {
      return 0;
    }
    const progress = (completed / totalJobs) * 100;
    return Math.round(progress);
  };

  const progress = calculateProgress(
    activeJobCount,
    inactiveJobCount,
    completedJobCount
  );

  return (
    <div className="progress-bar-radial flex flex-col items-center justify-center py-4">
      <h2 className="font-semibold text-[#263C44] text-xl pb-8">
        Today's Progress
      </h2>
      <div
        className="radial-progress text-primary font-semibold text-2xl lg:text-4xl"
        style={{
          "--value": progress,
          "--size": "200px",
          "--thickness": "1.5rem",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBarRadial;
