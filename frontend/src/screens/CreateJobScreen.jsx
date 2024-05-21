import CreateJobForm from "../components/CreateJobForm";
import { useNavigate } from "react-router-dom";
import "./CreateJobScreen.css";

const CreateJobScreen = () => {
  let navigate = useNavigate();

  return (
    <div className="create-job-screen">
      <CreateJobForm />
    </div>
  );
};

export default CreateJobScreen;
