import { useNavigate } from "react-router-dom";

const CreateJobButton = ({ action }) => {
  return (
    <button className="py-2 px-4 bg-secondary rounded-full" onClick={action}>
      Create Job
    </button>
  );
};

export default CreateJobButton;
