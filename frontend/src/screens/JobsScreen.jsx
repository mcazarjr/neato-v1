import JobsListManagerView from "../components/JobsListManagerView";
import CreateJobButton from "../components/CreateJobButton";
import "./JobsScreen.css";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";

const JobsScreen = () => {
  const navigate = useNavigate();
  const handleCreateJob = () => {
    navigate("/app/job/create");
  };

  return (
    <div className="px-4 md:px-0 lg:grid lg:grid-cols-[1fr_auto] lg:gap-4 lg:items-center">
      <div className="">
        <div className="flex items-center py-4 justify-between">
          <h2 className="text-2xl font-semibold text-[#263C44]">Job List</h2>
          <CreateJobButton action={handleCreateJob} />
        </div>
        <div className="lg:h-[40rem] overflow-y-auto">
          <JobsListManagerView filteredByCurrentDate={false} />
        </div>
      </div>
      <div className="hidden lg:flex lg:p-4 lg:shadow-xl lg:border-2 lg:rounded-xl lg:items-center lg:justify-center">
        <Calendar />
      </div>
    </div>
  );
};

export default JobsScreen;
