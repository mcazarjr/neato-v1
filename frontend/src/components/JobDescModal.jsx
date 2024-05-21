import { useState, Fragment, useEffect } from "react";
import {
  useGetJobByStartedQuery,
  useUpdateJobStartMutation,
  useUpdateJobStatusMutation,
  useUpdateJobTaskStatusMutation,
  useUploadImageMutation,
  useUpdateNotesFromCleanerMutation,
} from "../slices/jobApiSlice";
import { Dialog, Transition } from "@headlessui/react";
import ConfirmationModal from "./ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "../assets/CloseIcon";

const JobDescModal = ({ closeModal, job, handleConfirmationFunc }) => {
  const jobId = job._id;
  const navigate = useNavigate();

  // const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // Mutation hook for uploading the image
  const [
    uploadImage,
    {
      isLoading: isUploading,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
    },
  ] = useUploadImageMutation();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPreviewImages = [];
      const newSelectedImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewImages.push(reader.result);
          if (newPreviewImages.length === files.length) {
            // All images have been read, update the state
            setPreviewImages(newPreviewImages);
            setSelectedImages(files);
          }
        };
        reader.readAsDataURL(file);
        newSelectedImages.push(file);
      }
    }
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    // Check if any images are selected
    if (selectedImages.length > 0) {
      try {
        for (const image of selectedImages) {
          // Create a new FormData object
          const formData = new FormData();
          // Add form data to the FormData object
          formData.append("img", image);
          formData.append("id", jobId);
          formData.append("img_name", image.name);

          // Call the uploadImage mutation with the FormData object
          const res = await uploadImage(formData);
          // Handle image upload success (if needed)
          setImageUrl(imageUrl);
        }
      } catch (error) {
        // Handle image upload error (if needed)
        console.error("Error uploading image:", error);
      }
    }

    // if (selectedImages.length > 0) {
    //   try {
    //     for (const image of selectedImages) {
    //       // Call the uploadImage mutation with the selected image file
    //       await uploadImage({ id: jobId, image });
    //       // Handle image upload success (if needed)
    //       // console.log("Image uploaded successfully");
    //       // setImageUrl(imageUrl);
    //     }
    //   } catch (error) {
    //     // Handle image upload error (if needed)
    //     console.error("Error uploading image:", error);
    //   }
    // }
  };

  const [updateNotesFromCleaner, { isLoading: isUpdatingNotesFromCleaner }] =
    useUpdateNotesFromCleanerMutation();

  const handleUpdateNotes = async () => {
    try {
      // Get the notes from the textarea
      const notes = document.getElementById("note").value;

      // Make the API call to update the notes
      console.log(await updateNotesFromCleaner({ id: jobId, notes }));

      // Handle the successful update
      console.log("Notes updated successfully");
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error updating notes:", error);
    }
  };

  // State to store the notes entered by the user
  const [notes, setNotes] = useState("");

  // Function to handle changes in the notes textarea
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const {
    data: jobStartedData,
    isLoading,
    isSuccess,
    isError,
  } = useGetJobByStartedQuery(jobId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const [allTasksChecked, setAllTasksChecked] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleMasterCheckboxChange = async (e) => {
    if (e && e.target) {
      // Check if event and event.target are defined
      const isChecked = e.target.checked;
      setAllTasksChecked(isChecked);

      // Update taskStatus for all tasks in the job
      const updatedTasks = job.job_task.map((task) => task._id.toString());

      // A single API call to update all task statuses
      try {
        await updateJobTaskStatus({
          id: jobId,
          taskIds: updatedTasks,
          taskStatus: isChecked,
        });

        // Update the checkedTasks state based on the master checkbox state
        if (isChecked) {
          const taskIndices = job.job_task.map((_, index) => index);
          setCheckedTasks(taskIndices);
        } else {
          setCheckedTasks([]);
        }
      } catch (error) {
        console.error("Error updating task statuses:", error);
      }
    }
  };

  const [updateJobStart, { isLoading: isStarting, isSuccess: isStarted }] =
    useUpdateJobStartMutation();

  const [updateJobStatus, { isLoading: isEnding, isSuccess: isEnded }] =
    useUpdateJobStatusMutation();

  const [updateJobTaskStatus, { isLoading: isUpdatingTask }] =
    useUpdateJobTaskStatusMutation();

  const [jobStarted, setJobStarted] = useState();

  useEffect(() => {
    if (isSuccess) {
      setJobStarted(jobStartedData.job_started);

      // Initialize checkedTasks based on task_status in the job data
      if (job.job_task && job.job_task.length > 0) {
        const initialCheckedTasks = job.job_task.reduce(
          (checkedTasks, task, index) => {
            if (task.task_status) {
              checkedTasks.push(index);
            }
            return checkedTasks;
          },
          []
        );
        setCheckedTasks(initialCheckedTasks);

        // Check if all tasks are checked and set the master checkbox state accordingly
        setAllTasksChecked(initialCheckedTasks.length === job.job_task.length);
      }
    }
  }, [jobStartedData]);

  const handleJobStarted = async () => {
    try {
      // Make the API call to update the job status
      await updateJobStart({
        id: jobId,
        job_started: !jobStarted,
        job_status: "Active",
      });

      // The API call is completed, now update the local state based on the API response
      setJobStarted(!jobStarted);
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error updating job start:", error);
    }
  };

  const handleJobEnded = async () => {
    try {
      // Perform any asynchronous operations here (e.g., fetching data from an API)

      // Once the asynchronous operations are completed, update the job status in the database
      await updateJobStart({
        id: jobId,
        job_started: !jobStarted,
        job_status: "Completed",
      });

      // Update the local state to reflect the job as not started
      setJobStarted(!jobStarted);

      closeModal(false);
      handleConfirmationFunc(true);
    } catch (error) {
      // Handle any errors that occurred during the asynchronous operations
      console.error("Error handling job completion:", error);
    }
  };

  const handleTaskStatusChange = (taskId, taskStatus, index) => {
    // Update the task status in the database
    updateJobTaskStatus({
      id: jobId,
      taskIds: [taskId], // Make sure to pass the taskId as an array
      taskStatus: taskStatus,
    });

    // Update the checkedTasks state based on the index of the task
    if (taskStatus) {
      // If the task is checked and not already in the checkedTasks, add it.
      setCheckedTasks((prevCheckedTasks) => [...prevCheckedTasks, index]);
    } else {
      // If the task is unchecked and exists in the checkedTasks, remove it.
      setCheckedTasks((prevCheckedTasks) =>
        prevCheckedTasks.filter((taskIndex) => taskIndex !== index)
      );
    }
  };

  const convertTo12HourFormat = (timeString) => {
    // Parse the time string into hours and minutes
    const [hours, minutes] = timeString.split(":");

    // Convert hours to a number
    let hoursNum = parseInt(hours, 10);

    // Determine AM or PM
    const amPm = hoursNum >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hoursNum = hoursNum % 12 || 12;

    // Format the time as "hh:mm AM/PM"
    return `${hoursNum}:${minutes} ${amPm}`;
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-0 px-0 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-0 pt-0
                            pb-4 text-left overflow-hidden shadow-xl transform transition-all
                            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-4xl md:w-full my-0 sm:p-0 md:max-h-[1800px]"
            >
              <div className="info-div bg-[#EEFFFA] border-b-4 border-[#92CEBC] pt-[1rem] pb-[1rem] pl-[1.9rem] sm:pl-[4rem]">
                <div className="mt-0 text-left sm:mt-0 flex flex-col sm:flex-row pr-[3rem] pl-[1rem]">
                  <button
                    type="button"
                    className="btn btn-sm btn-circle outline-none btn-ghost absolute left-2 top-2"
                    onClick={() => {
                      closeModal();
                      navigate(0);
                    }}
                  >
                    {CloseIcon()}
                  </button>
                  <div className="flex-1 text-neutral">
                    <h1 className="text-4xl font-bold text-[#263C44] pl-0">
                      {job.job_title}
                    </h1>
                    <div className="mt-0">
                      <p className="text-[1rem] text-[#263C44]">
                        {job.job_location}
                      </p>
                      <div className="mt-3">
                        <p className="text-[1.2rem] font-semibold mb-1 text-[#263C44]">
                          Assignees:&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-base font-normal">
                            {job.job_staff
                              .map((staff) => staff.name)
                              .join(", ")}
                          </span>
                        </p>

                        <p className="text-[1.2rem] font-semibold mb-1 text-[#263C44]">
                          Timeline: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-base font-normal">
                            {convertTo12HourFormat(job.job_starttime)} -{" "}
                            {convertTo12HourFormat(job.job_endtime)}{" "}
                          </span>
                        </p>

                        <p className="text-[1.2rem] font-semibold mb-1 text-[#263C44]">
                          Client:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-base font-normal">
                            {" "}
                            {job.job_client}{" "}
                          </span>
                        </p>

                        <p className="text-[1.2rem] font-semibold mb-1 text-[#263C44]">
                          Status
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-base font-normal">
                            {job.job_status === "Inactive"
                              ? "Upcoming"
                              : job.job_status}{" "}
                          </span>
                        </p>

                        <p className="text-[1.2rem] font-semibold mb-1 text-[#263C44]">
                          Notes:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span className="text-base font-normal">
                            {" "}
                            {job.job_description}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="btns flex-1 text-end sm:self-end">
                    {!jobStarted ? (
                      <>
                        {job.job_status === "Inactive" && (
                          <>
                            <button
                              className="mt-6 rounded-md border
                            border-transparent shadow-sm px-5 py-3 bg-[#31B58D] text-base font-medium
                            text-white focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-green-500 w-full sm:w-auto sm:text-sm"
                              onClick={handleJobStarted}
                            >
                              Start
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {job.job_status !== "Completed" && (
                          <button
                            className="mt-6 rounded-md border
                          border-transparent shadow-sm px-4 py-2 bg-[#13A5EE] text-base font-medium
                          text-white focus:outline-none focus:ring-2
                          focus:ring-offset-2 focus:ring-red-500 w-full sm:w-auto sm:text-sm"
                          >
                            In Progress
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col md:flex-row px-[3rem]">
                {!jobStarted ? (
                  <>
                    {job.job_status === "Inactive" && (
                      <>
                        <div className="checklist flex-1 ml-[3rem] mb-5">
                          <h2 className="text-2xl text-[#263C44] font-semibold">
                            Task List:
                          </h2>
                          <ul>
                            {job.job_task && job.job_task.length > 0 ? (
                              job.job_task.map((task, index) => (
                                <li
                                  className="text-[#263C44] text-lg my-2"
                                  key={index}
                                >
                                  {task.task_title}
                                </li>
                              ))
                            ) : (
                              <p>No tasks to show</p>
                            )}
                          </ul>
                        </div>
                      </>
                    )}

                    {job.job_status === "Completed" && (
                      <div className="checklist flex-1 ml-[3rem] mb-5">
                        <h2 className="text-4xl text-[#263C44] font-semibold">
                          Task List:
                        </h2>
                        <h3>Completed Tasks:</h3>
                        <ul>
                          {job.job_task && job.job_task.length > 0 ? (
                            job.job_task.map(
                              (task, index) =>
                                task.task_status && (
                                  <li
                                    className="text-[#263C44] text-lg my-2"
                                    key={index}
                                  >
                                    {task.task_title}
                                  </li>
                                )
                            )
                          ) : (
                            <p>No Tasks to show</p>
                          )}
                        </ul>

                        <h3>Uncompleted Tasks:</h3>
                        <ul>
                          {job.job_task && job.job_task.length > 0 ? (
                            job.job_task.map(
                              (task, index) =>
                                !task.task_status && (
                                  <li
                                    className="text-[#263C44] text-lg my-2"
                                    key={index}
                                  >
                                    {task.task_title}
                                  </li>
                                )
                            )
                          ) : (
                            <p>No Tasks to show</p>
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {job.job_status !== "Completed" && (
                      <button
                        className="hidden mt-6 w-full inline-flex justify-center rounded-md border
                        border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium
                        text-white focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                      >
                        In Progress
                      </button>
                    )}

                    <div className="checklist flex-1 ml-[3rem] mb-5">
                      <label className="relative text-2xl text-[#263C44] font-bold">
                        <input
                          checked={allTasksChecked}
                          onChange={handleMasterCheckboxChange}
                          className="mr-2 h-4 w-4 ring-2 ring-[#31B58D] appearance-none checked:bg-[#31B58D] rounded-sm"
                          type="checkbox"
                        />
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-lg h-4 w-4 text-white absolute left-0 top-2.5"
                        />
                        Task List:
                      </label>
                      <ul>
                        {job.job_task && job.job_task.length > 0 ? (
                          job.job_task.map((task, index) => (
                            <li
                              className="text-[#263C44] text-lg my-2"
                              key={index}
                            >
                              <label className="relative">
                                <input
                                  className="mr-2 h-4 w-4 ring-2 ring-[#31B58D] appearance-none checked:bg-[#31B58D] rounded-sm"
                                  type="checkbox"
                                  onChange={() => {
                                    const taskStatus =
                                      !checkedTasks.includes(index); // Flip the task status
                                    handleTaskStatusChange(
                                      task._id,
                                      taskStatus,
                                      index
                                    );
                                  }}
                                  checked={checkedTasks.includes(index)} // Set the checkbox state based on checkedTasks
                                />
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-lg h-4 w-4 text-white absolute left-0 top-1"
                                />
                                {task.task_title}
                              </label>
                            </li>
                          ))
                        ) : (
                          <p>No tasks to show</p>
                        )}
                      </ul>
                    </div>
                  </>
                )}
                <div className="image-upload flex-1 flex flex-col justify-start items-end gap-3 w-full">
                  <div
                    className="flex flex-col items-center
                                  justify-center border-[3px] rounded-lg
                                  border-dashed p-5 border-[#263C44] border-spacing-8 w-full"
                  >
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                    />
                    <label
                      htmlFor="file-input"
                      id="file-input"
                      className="block cursor-pointer"
                    >
                      <FontAwesomeIcon
                        className="text-4xl text-[#2B3B43]"
                        icon={faArrowUpFromBracket}
                      />
                    </label>
                    <label htmlFor=""></label>
                    <h1 className="font-semibold pt-0 text-[#263C44]">
                      Drag files to upload or browse
                    </h1>
                    {/* <button
                      className="mt-4 mb-5 ml-5 w-full inline-flex justify-center rounded-md border
                        border-transparent shadow-sm px-4 py-2 bg-[#31B58D] text-base font-medium
                        text-white focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                      
                    >
                      Upload Image
                    </button> */}
                    {imageUrl && (
                      <img src={imageUrl} alt="Uploaded" className="w-full" />
                    )}
                  </div>
                  <div className="flex justify-start">
                    {previewImages.map((previewImage, index) => (
                      <div key={index}>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                            margin: "10px 0",
                          }}
                          className="rounded"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex-1">
                    <label className="block text-[#2B3B43]" htmlFor="note">
                      Add Note
                    </label>
                    <textarea
                      id="note"
                      rows="3"
                      cols="44"
                      onChange={handleNotesChange}
                      className="w-full bg-slate-300 rounded-md"
                    />
                  </div>

                  {jobStarted ? (
                    <>
                      {job.job_status !== "completed" && (
                        <>
                          <button
                            className="mt-4 mb-5 ml-5 w-full inline-flex justify-center rounded-md border
                        border-transparent shadow-sm px-4 py-2 bg-[#31B58D] text-base font-medium
                        text-white focus:outline-none sm:w-auto sm:text-sm"
                            onClick={() => {
                              handleJobEnded();
                              handleImageUpload();
                              handleUpdateNotes();
                            }}
                          >
                            Complete Job
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default JobDescModal;
