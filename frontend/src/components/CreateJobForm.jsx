import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateJobMutation } from "../slices/jobApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import SearchStaff from "./SearchStaff";
import CreateJobConfirmPopup from "./CreateJobConfirmPopup";
import "./CreateJobForm.css";

const formatDateForInput = (date) => {
  // to convert date to the correct format for the input field, like 2023-12-31
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const formattedDateString = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
  return formattedDateString;
};

const CreateJobForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [createJob, { isLoading, isSuccess, isError }] = useCreateJobMutation();
  const navigate = useNavigate();
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const unformattedToday = new Date();
  const today = formatDateForInput(unformattedToday);
  const [cleaningType, setCleaningType] = useState("regular-domestic");
  const [jobData, setJobData] = useState({
    job_title: "",
    job_client: "",
    job_location: "",
    job_date: "",
    job_starttime: "",
    job_endtime: "",
    job_staff: [],
    cleaning_type: "regular-domestic",
    job_task: [],
    job_description: "",
    job_status: "Inactive",
    job_started: false,
    job_createdby: user._id,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    console.log("name", name);

    // If the input is the job_date field, convert the selected date to the correct format
    if (name === "job_date") {
      const selectedDate = new Date(value);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setJobData((prevJobData) => ({
        ...prevJobData,
        [name]: formattedDate,
      }));
    } else {
      setJobData((prevJobData) => ({
        ...prevJobData,
        [name]: value,
      }));
    }
  };

  const onSelectHandler = (e) => {
    setJobData((prevJobData) => ({
      ...prevJobData,
      cleaning_type: e.target.value,
    }));
    if (e.target.name === "cleaning_type") {
      setCleaningType(e.target.value);
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    navigate("/app/job");
  };

  const getTasksForCleaningType = (type) => {
    switch (type) {
      case "regular-domestic":
        return [
          { task_title: "Regular bathrooms cleaning", task_status: false },
          { task_title: "Regular bedrooms cleaning", task_status: false },
          { task_title: "Regular kitchen cleaning", task_status: false },
          { task_title: "Regular living room cleaning", task_status: false },
          { task_title: "Regular dining room cleaning", task_status: false },
          { task_title: "Regular corridors cleaning", task_status: false },
          { task_title: "Regular patio cleaning", task_status: false },
        ];
      case "deep-domestic":
        return [
          { task_title: "Deep bathrooms cleaning", task_status: false },
          { task_title: "Deep bedrooms cleaning", task_status: false },
          { task_title: "Deep kitchen cleaning", task_status: false },
          { task_title: "Deep living room cleaning", task_status: false },
          { task_title: "Deep dining room cleaning", task_status: false },
          { task_title: "Deep corridors cleaning", task_status: false },
          { task_title: "Deep patio cleaning", task_status: false },
        ];
      case "light-domestic":
        return [
          { task_title: "Light bathrooms cleaning", task_status: false },
          { task_title: "Light bedrooms cleaning", task_status: false },
          { task_title: "Light kitchen cleaning", task_status: false },
          { task_title: "Light living room cleaning", task_status: false },
          { task_title: "Light dining room cleaning", task_status: false },
          { task_title: "Light corridors cleaning", task_status: false },
          { task_title: "Light patio cleaning", task_status: false },
        ];
      default:
        return [];
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('validating edit form')

    // Get current time as a Date object
    const currentTime = new Date();

    // Validate start time
    const selectedStartTime = new Date(`${today}T${jobData.job_starttime}`);

    if (jobData.job_date === today && selectedStartTime <= currentTime) {
      console.log("start time error");
      setErrorMessage("Start time must be later than current time.");
      return;
    }

    // Validate end time
    const startTime = new Date(`${jobData.job_date}T${jobData.job_starttime}`);
    const endTime = new Date(`${jobData.job_date}T${jobData.job_endtime}`);

    console.log("startTime", startTime);
    console.log("endTime", endTime);

    if (endTime <= startTime) {
      console.log("end time error");
      setErrorMessage("End time must be later than start time.");
      return;
    }

    setErrorMessage("");
    createJob(jobData);
  };

  useEffect(() => {
    const autoFillLocation =
      new window.google.maps.places.AutocompleteService();

    const handleLocationChange = (e) => {
      const inputLocation = e.target.value;
      if (inputLocation.trim() !== "") {
        autoFillLocation.getPlacePredictions(
          { input: inputLocation },
          (predictions) => {
            setLocationSuggestions(predictions || []);
          }
        );
      } else {
        setLocationSuggestions([]);
      }
    };

    const locationInput = document.getElementById("job_location");
    locationInput.addEventListener("input", handleLocationChange);

    return () => {
      locationInput.removeEventListener("input", handleLocationChange);
    };
  }, [setLocationSuggestions]);

  const handleLocationSelection = (selectedSuggestion) => {
    setJobData((prevJobData) => ({
      ...prevJobData,
      job_location: selectedSuggestion.description,
    }));
    setLocationSuggestions([]);
  };

  const handleClearLocation = () => {
    setJobData((prevJobData) => ({
      ...prevJobData,
      job_location: "", // Clear the location input
    }));
  };

  useEffect(() => {
    const tasks = getTasksForCleaningType(cleaningType);
    setJobData((prevJobData) => ({
      ...prevJobData,
      job_task: tasks,
    }));
  }, [cleaningType, errorMessage]);

  // console.log("Today's date: ", today);

  const handleRemoveStaff = (staffId) => {
    setJobData((prevJobData) => ({
      ...prevJobData,
      job_staff: prevJobData.job_staff.filter((staff) => staff.id !== staffId),
    }));
  };

  const handleStaffSelection = (selectedStaff) => {
    console.log("selectedStaff", selectedStaff);
    // Add the selected staff to the job staff list if not already present

    const staffAlreadyAdded = jobData.job_staff.some(
      (staff) => staff.id === selectedStaff.id
    );

    console.log("staffAlreadyAdded", staffAlreadyAdded);

    if (!staffAlreadyAdded) {
      setJobData((prevJobData) => ({
        ...prevJobData,
        job_staff: [...prevJobData.job_staff, selectedStaff],
      }));
      console.log("jobData", jobData);
    }
  };

  return (
    <>
      {isLoading && <p className="loading-message">Loading...</p>}
      {isSuccess && <CreateJobConfirmPopup />}
      <form onSubmit={submitHandler} className="">
        <div className="create-job-form-fields lg:max-h-[39rem] w-[95%]">
          <h2 className="pb-4">Job Details</h2>
          {/* Job Title */}
          <div className="create-job-form-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter job title"
              value={jobData.job_title}
              onChange={onChangeHandler}
              name="job_title"
              id="job_title"
              required
            />
          </div>
          {/* Job Client */}
          <div className="create-job-form-field job-client">
            <label>Client Name</label>
            <input
              type="text"
              placeholder="Enter client name"
              value={jobData.job_client}
              onChange={onChangeHandler}
              name="job_client"
              id="job_client"
              required
            />
          </div>
          {/* Job Location */}
          <div className="create-job-form-field job-location">
            <label>Location</label>
            <input
              type="text"
              value={jobData.job_location}
              onChange={onChangeHandler}
              name="job_location"
              id="job_location"
              placeholder="Enter job location"
              required
            />
            {jobData.job_location && (
              <span className="clear-icon" onClick={handleClearLocation}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </span>
            )}
            {locationSuggestions.length > 0 && (
              <ul className="location-suggestions">
                {locationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleLocationSelection(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Job Date */}
          <div className="create-job-form-field job-date">
            <label>Date</label>
            <input
              type="date"
              value={jobData.job_date}
              onChange={onChangeHandler}
              name="job_date"
              id="job_date"
              min={today} //Set today's date as the minimum date
              max={today.slice(0, 4) * 1 + 1 + today.slice(4)} // Set the maximum date to 1 year from today
              required
            />
          </div>
          {/* Job Time */}
          <div
            className={`job-time create-job-form-field ${
              errorMessage && "error"
            }`}
          >
            <label>Time</label>
            <div className={`time-input-fields ${errorMessage && "error"}`}>
              <input
                type="time"
                placeholder="Start time"
                value={jobData.job_starttime}
                onChange={onChangeHandler}
                name="job_starttime"
                id="job_starttime"
                required
              />
              <input
                type="time"
                placeholder="End time"
                value={jobData.job_endtime}
                onChange={onChangeHandler}
                name="job_endtime"
                id="job_endtime"
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          {/* Assigned Staff */}
          <div className="create-job-form-field job-staff">
            <label>Assign Staff</label>
            <SearchStaff
              onSelectStaff={(selectedStaff) =>
                handleStaffSelection(selectedStaff)
              }
            />
            {jobData.job_staff.length > 0 && (
              <ul className="assigned-staff-list pb-4">
                {jobData.job_staff.map((staff) => (
                  <li
                    key={staff.id}
                    className="flex justify-between pl-4 pr-2 text-lg border-2 border-gray-300 rounded-lg"
                  >
                    {staff.name}
                    <span
                      className="delete-icon"
                      onClick={() => handleRemoveStaff(staff.id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Cleaning Type */}
          <div className="create-job-form-field">
            <label htmlFor="cleaning_type">Cleaning Type</label>
            <select
              className="select select-bordered bg-outline"
              name="cleaning_type"
              id="cleaning_type"
              value={cleaningType}
              onChange={onSelectHandler}
              style={{
                fontSize: "1rem",
                fontWeight: "400",
                paddingLeft: "0.5rem",
                border: "0.5px solid black",
              }}
            >
              <option value="regular-domestic">
                Regular domestic cleaning
              </option>
              <option value="deep-domestic">Deep domestic cleaning</option>
              <option value="light-domestic">Light domestic cleaning</option>
            </select>
          </div>
          {/* Job Description */}
          <div className="create-job-form-field job-notes">
            <label>Special Notes</label>
            <textarea
              type="textarea"
              className="textarea textarea-bordered textarea-lg"
              value={jobData.job_description}
              onChange={onChangeHandler}
              name="job_description"
              id="job_description"
              style={{
                paddingLeft: "0.5rem",
                paddingTop: "0",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                border: "0.5px solid black",
              }}
            ></textarea>
          </div>
        </div>
        <div className="create-job-form-buttons w-[95%]">
          <button className="button cancel" onClick={onCancelHandler}>
            Cancel
          </button>
          <button type="submit" className="button submit">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateJobForm;
