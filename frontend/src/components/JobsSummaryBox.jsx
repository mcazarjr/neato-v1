import { useState, useEffect } from "react";
import { useGetJobByStatusQuery } from "../slices/jobApiSlice";
import Loader from "./Loader";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const JobsSummaryBox = ({ status, text }) => {
  const [jobCount, setJobCount] = useState(0);

  const { data: jobs, isLoading, isSuccess } = useGetJobByStatusQuery(status);

  useEffect(() => {
    if (isSuccess) {
      const currentDate = dayjs().format("YYYY-MM-DD");
      const filteredJobs = jobs.filter((job) => {
        const jobDate = dayjs(job.job_date).utc().format("YYYY-MM-DD");
        return jobDate === currentDate;
      });
      setJobCount(filteredJobs.length);
    }
  }, [jobs]);

  let gradient = "";
  switch (status) {
    case "Active":
      gradient = "from-[#68CDFF] to-[#0A99E0]";
      break;
    case "Inactive":
      gradient = "from-[#FFC75C] to-[#F8A300]";
      break;
    case "Completed":
      gradient = "from-[#00DA98] to-[#31B58D]";
  }

  return (
    <div
      className={`bg-gradient-to-b ${gradient} grid grid-rows-2 justify-items-center rounded-md w-full py-6 text-white lg:grid-rows-[1fr,auto] lg:justify-items-start lg:pl-4 shadow-md`}
    >
      <div className="text-4xl font-bold lg:text-8xl self-end">
        {isLoading ? <Loader /> : jobCount}
      </div>
      <div className="text-center px-2 lg:text-left">{text}</div>
    </div>
  );
};

export default JobsSummaryBox;
