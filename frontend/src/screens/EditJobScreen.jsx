import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateJobMutation,
  useGetJobByIdQuery,
} from "../slices/jobApiSlice";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import SearchStaff from "../components/SearchStaff";
import EditJobConfirmPopup from "../components/EditJobConfirmPopup";
import "./EditJobScreen.css";

const formatDateForInput = (date) => {
  // to convert date to the correct format for the input field, like 2023-12-31
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const formattedDateString = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
  return formattedDateString;
};

const EditJobScreen = () => {
  const { id: paramID } = useParams();
  const navigate = useNavigate();

  const [updateJob, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateJobMutation();

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const today = formatDateForInput(new Date());

  const {
    data: jobData,
    isLoading: isFetching,
    isSuccess: isFetched,
  } = useGetJobByIdQuery(paramID);

  const [job, setJob] = useState({
    job_title: "",
    job_staff: [],
    job_client: "",
    job_location: "",
    job_date: "",
    job_starttime: "",
    job_endtime: "",
    job_description: "",
    job_task: [],
    job_status: "",
    cleaning_type: "",
  });

  useEffect(() => {
    if (isFetched) {
      const {
        _id,
        job_title,
        job_staff,
        job_client,
        job_location,
        job_date,
        job_starttime,
        job_endtime,
        job_description,
        job_task,
        job_status,
        cleaning_type,
      } = jobData;

      console.log(jobData);

      setJob((prevJob) => ({
        ...prevJob,
        _id: _id,
        job_title,
        job_staff,
        job_client,
        job_location,
        job_date: job_date.toString().split("T")[0],
        job_starttime,
        job_endtime,
        job_description,
        job_task,
        job_status,
        cleaning_type,
      }));
    }
  }, [jobData]);

  const handleOnChange = (e) => {
    setJob((prevJob) => ({
      ...prevJob,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "cleaning_type") {
      // also set tasks
      const tasks = getTasksForCleaningType(e.target.value);
      setJob((prevJob) => ({
        ...prevJob,
        job_task: tasks,
      }));
    }
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

  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false); // Define confirmPopupVisible state

  const [errorMessage, setErrorMessage] = useState("");

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

    // Check if the element is available before adding the event listener
    if (locationInput) {
      locationInput.addEventListener("input", handleLocationChange);

      return () => {
        // Remove the event listener when the component is unmounted
        locationInput.removeEventListener("input", handleLocationChange);
      };
    }
  }, []); // Empty dependency array ensures the effect runs only once after mounting

  const handleLocationSelection = (selectedSuggestion) => {
    setJob((prevJob) => ({
      ...prevJob,
      job_location: selectedSuggestion.description,
    }));
    setLocationSuggestions([]);
  };

  const handleClearLocation = () => {
    setJob((prevJob) => ({
      ...prevJob,
      job_location: "", // Clear the location input
    }));
  };

  const handleRemoveStaff = (staffId) => {
    setJob((prevJob) => ({
      ...prevJob,
      job_staff: prevJob.job_staff.filter((staff) => staff.id !== staffId),
    }));
  };

  const handleStaffSelection = (selectedStaff) => {
    // Check if the selected staff is already in the list

    const isStaffAlreadyAdded = job.job_staff.some(
      (staff) => staff.id === selectedStaff.id
    );

    if (!isStaffAlreadyAdded) {
      setJob((prevJob) => ({
        ...prevJob,
        job_staff: [...prevJob.job_staff, selectedStaff],
      }));
      // console.log("jobData", job);
    }
  };

  const handleSubmit = async (e) => {
    // console.log('validating')
    e.preventDefault();

    // Get current time as a Date object
    const currentTime = new Date();

    // Validate the start time
    const selectedStartTime = new Date(`${today}T${job.job_starttime}`);
    if (job.job_date === today && selectedStartTime <= currentTime) {
      setErrorMessage("Start time must be later than current time.");
      return;
    }

    // Validate the end time
    const startTime = new Date(`${job.job_date}T${job.job_starttime}`);
    const endTime = new Date(`${job.job_date}T${job.job_endtime}`);
    if (endTime <= startTime) {
      setErrorMessage("End time must be later than start time.");
      return;
    }

    if (endTime <= currentTime) {
      setErrorMessage("End time must be later than current time.");
      return;
    }

    setErrorMessage("");

    const updatedJob = await updateJob(job).unwrap();

    if (updatedJob) {
      // Job updated successfully
      // console.log(updatedJob);
      setConfirmPopupVisible(true);
    }
  };

  const handleConfirmPopupClose = () => {
    setConfirmPopupVisible(false);
    navigate("/app/job");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/app/job");
  };

  return (
    <>
      {isUpdated && (
        <EditJobConfirmPopup
          visible={confirmPopupVisible}
          onClose={handleConfirmPopupClose}
        />
      )}
      {isUpdating && <Loader />}
      {isFetched && (
        <form onSubmit={handleSubmit}>
          <div className="edit-job-form-fields lg:max-h-[39rem]">
            <h2>Job Details</h2>
            {/* Job Title */}
            <div className="edit-job-form-field">
              <label>Title</label>
              <input
                type="text"
                name="job_title"
                id="job_title"
                required
                placeholder="Job title"
                value={job.job_title}
                onChange={handleOnChange}
              />
            </div>
            {/* Job Client */}
            <div className="edit-job-form-field job-client">
              <label>Client Name</label>
              <input
                type="text"
                name="job_client"
                id="job_client"
                required
                placeholder="Client name"
                value={job.job_client}
                onChange={handleOnChange}
              />
            </div>
            {/* Job Location */}
            <div className="edit-job-form-field job-location">
              <label>Location</label>
              <input
                type="text"
                name="job_location"
                placeholder="Location"
                id="job_location"
                required
                value={job.job_location}
                onChange={handleOnChange}
              />
              {job.job_location && (
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
            <div className="edit-job-form-field job-date">
              <label>Date</label>
              <input
                type="date"
                name="job_date"
                id="job_date"
                placeholder="Date"
                value={job.job_date}
                onChange={handleOnChange}
                min={today} //Set today's date as the minimum date
                required
              />
            </div>
            {/* Job Time */}
            <div
              className={`job-time edit-job-form-field ${
                errorMessage && "error"
              }`}
            >
              <label>Time</label>
              <div className={`time-input-fields ${errorMessage && "error"}`}>
                <input
                  type="time"
                  name="job_starttime"
                  id="job_starttime"
                  placeholder="Start time"
                  value={job.job_starttime}
                  onChange={handleOnChange}
                  required
                />
                <input
                  type="time"
                  name="job_endtime"
                  id="job_endtime"
                  placeholder="End time"
                  value={job.job_endtime}
                  onChange={handleOnChange}
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            {/* Assigned Staff */}
            <div className="edit-job-form-field job-staff">
              <label>Assign Staff</label>
              <SearchStaff
                onSelectStaff={(selectedStaff) =>
                  handleStaffSelection(selectedStaff)
                }
              />
              {job.job_staff.length > 0 && (
                <ul className="assigned-staff-list pb-4">
                  {job.job_staff.map((staff) => (
                    <li
                      key={staff.id}
                      className="flex justify-between pl-4 pr-2 text-lg border-2 border-gray-300 rounded-lg"
                    >
                      {staff.name}
                      <span
                        className="delete-icon "
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
            <div className="edit-job-form-field">
              <label htmlFor="cleaning_type">Cleaning Type</label>
              <select
                className="select select-bordered bg-outline"
                name="cleaning_type"
                id="cleaning_type"
                value={job.cleaning_type}
                onChange={handleOnChange}
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  paddingLeft: "0.5rem",
                  // paddingTop: "0",
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
            <div className="edit-job-form-field job-notes">
              <label>Special Notes</label>
              <textarea
                type="textarea"
                className="textarea textarea-bordered textarea-lg"
                name="job_description"
                id="job_description"
                placeholder="Special Notes"
                value={job.job_description}
                onChange={handleOnChange}
                style={{
                  paddingLeft: "0.5rem",
                  paddingTop: "0",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  border: "0.5px solid black",
                }}
              />
            </div>
          </div>
          <div className="edit-job-form-buttons">
            <button className="button cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="button submit">
              Confirm
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditJobScreen;
