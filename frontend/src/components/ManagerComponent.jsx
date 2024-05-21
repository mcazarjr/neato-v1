import CreateJobButton from "./CreateJobButton";
import JobsSummaryBox from "./JobsSummaryBox";
import ProgressBarRadial from "./ProgressBarRadial";
import Calendar from "./Calendar";
import JobsListManagerView from "./JobsListManagerView";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ManagerComponent = () => {
  const navigate = useNavigate();

  const handleCreateJob = () => {
    navigate("job/create");
  };

  return (
    <>
      <div className="md:hidden">
        <div className="flex justify-between mx-4">
          <div className="text-3xl font-bold flex flex-col gap-2 my-4">
            <span>{dayjs().format("MMMM D, YYYY")}</span>
            <span>{dayjs().format("dddd")}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="flex flex-grow gap-4 justify-around mx-4 md:mx-0">
          <JobsSummaryBox status="Active" text="Active Jobs" />
          <JobsSummaryBox status="Inactive" text="Upcoming Jobs" />
          <JobsSummaryBox status="Completed" text="Completed Jobs" />
        </div>
        <div className="flex flex-grow items-center justify-center py-4 border-2 rounded-lg mt-4 mx-4 shadow-md md:mx-0 lg:mt-0 lg:px-10 lg:py-2">
          <ProgressBarRadial />
        </div>
      </div>
      <div className="pt-4 pb-4 w-full md:pt-10 grid grid-cols-[1fr,42%] gap-4">
        <div className="">
          <div className="hidden md:flex md:items-center md:justify-between md:px-0 col-span-2">
            <h1 className="text-2xl font-bold">Today's Jobs</h1>
            <CreateJobButton action={handleCreateJob} />
          </div>
          <div className="mx-4 lg:h-[21rem] overflow-y-auto">
            <JobsListManagerView filteredByCurrentDate={true} />
          </div>
        </div>
        <div className="hidden lg:flex md:items-center md:justify-center border-2 rounded-xl p-4 shadow-lg">
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default ManagerComponent;
