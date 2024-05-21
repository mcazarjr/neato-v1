import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation } from "../slices/staffApiSlice";
import { useCreateAvailabilitiesMutation } from "../slices/availabilitiesSlice";

import AvailabilityItem from "../components/AvailabilityItem";
import StaffAvailabilityTab from "../components/StaffAvailabilityTab";

const AddStaffScreen = () => {
  // Hooks *********************************************************************
  const navigate = useNavigate();

  // API States ****************************************************************
  const [
    createStaff,
    { isLoading: isCreateLoading, isSuccess: isCreateSuccess },
  ] = useCreateStaffMutation();
  const [
    createAvailability,
    { isLoading: isAvailabilityLoading, isSuccess: isAvailabilitySuccess },
  ] = useCreateAvailabilitiesMutation();

  // Staff States **************************************************************
  const [staff, setStaff] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
    password: "",
    designation: "",
    mobile: "",
    email: "",
    hiring_date: new Date().toLocaleString("en-CA").slice(0, 10),
  });

  const [staffAvailability, setStaffAvailability] = useState({
    employee_id: 0,
    sunday: {
      accr: "sun",
      name: "Sunday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    monday: {
      accr: "mon",
      name: "Monday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    tuesday: {
      accr: "tue",
      name: "Tuesday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    wednesday: {
      accr: "wed",
      name: "Wednesday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    thursday: {
      accr: "thu",
      name: "Thursday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    friday: {
      accr: "fri",
      name: "Friday",
      checked: false,
      start_time: "",
      end_time: "",
    },
    saturday: {
      accr: "sat",
      name: "Saturday",
      checked: false,
      start_time: "",
      end_time: "",
    },
  });

  // Component Events **********************************************************

  const handleAvailabilityCheckedChange = (day, availabilityFlag) => {
    setStaffAvailability((prevAvailability) => {
      const newAvailability = { ...prevAvailability };
      newAvailability[day.toLowerCase()].checked = availabilityFlag;
      if (!availabilityFlag) {
        newAvailability[day.toLowerCase()].start_time = "";
        newAvailability[day.toLowerCase()].end_time = "";
      }
      return newAvailability;
    });
  };

  const handleAvailabilityStartTimeChange = (day, startTime) => {
    setStaffAvailability((prevAvailability) => {
      const newAvailability = { ...prevAvailability };
      newAvailability[day.toLowerCase()].start_time = startTime;
      return newAvailability;
    });
  };

  const handleAvailabilityEndTimeChange = (day, endTime) => {
    setStaffAvailability((prevAvailability) => {
      const newAvailability = { ...prevAvailability };
      newAvailability[day.toLowerCase()].end_time = endTime;
      return newAvailability;
    });
  };

  // Local Events **************************************************************
  const handleOnChange = (e) => {
    setStaff((prevStaff) => {
      return { ...prevStaff, [e.target.id]: e.target.value };
    });
    setStaffAvailability((prevAvailability) => {
      return { ...prevAvailability, employee_id: Number(staff.employee_id) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    const res = await createStaff(staff);
    const updatedStaffAvailability = {
      ...staffAvailability,
      _id: res.data._id,
    };
    console.log(updatedStaffAvailability);
    await createAvailability(updatedStaffAvailability);
    setTimeout(() => {}, 1000);
    e.target.disabled = false;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/app/staff");
  };

  return (
    <>
      {/* Success Modal ********************************************************** */}
      {isCreateSuccess && isAvailabilitySuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl">
            <h1 className="text-2xl font-bold text-center">Success</h1>
            <p className="text-center">Staff has been created</p>
            <div className="mt-4 flex justify-center">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/app/staff")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form ********************************************************************** */}
      <form className="p-8 flex flex-col gap-4 bg-white drop-shadow-md  rounded-xl">
        <div className="flex flex-col gap-8 md:flex-row md:gap-2 lg:gap-12">
          <div className="flex flex-col gap-2 h-full flex-1 pt-5">
            {/* Name */}
            <label className="flex items-center" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="first_name"
              placeholder="First Name"
              className="border border-primary rounded-md p-2"
              value={staff.first_name}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="name"
              id="last_name"
              placeholder="Last Name"
              className="border border-primary rounded-md p-2"
              value={staff.last_name}
              onChange={handleOnChange}
            />
            {/* Email */}
            <label className="flex items-center mt-2" htmlFor="employeeid">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeid"
              id="employee_id"
              placeholder="Employee ID"
              className="border border-primary rounded-md p-2"
              value={staff.employee_id}
              onChange={handleOnChange}
            />
            {/* Password */}
            <label className="flex items-center" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="border border-primary rounded-md p-2"
              value={staff.password}
              onChange={handleOnChange}
            />
            {/* Designation */}
            <label className="flex items-center mt-2" htmlFor="designation">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="border border-primary rounded-md p-2"
              value={staff.designation}
              onChange={handleOnChange}
            >
              <option value="Cleaner">Cleaner</option>
              <option value="Manager">Manager</option>
            </select>
            {/* Contact Information */}
            <label className="flex items-center mt-2" htmlFor="contactinfo">
              Contact Information
            </label>
            <input
              type="text"
              name="contactinfo"
              id="mobile"
              placeholder="Phone Number"
              className="border border-primary rounded-md p-2"
              value={staff.mobile}
              onChange={handleOnChange}
            />
            <input
              type="text"
              name="contactinfo"
              id="email"
              placeholder="Email Address"
              className="border border-primary rounded-md p-2"
              value={staff.email}
              onChange={handleOnChange}
            />
            {/* Date Hired */}
            <label className="flex items-center mt-2" htmlFor="datehired">
              Date Hired
            </label>
            <input
              type="date"
              name="datehired"
              id="hiring_date"
              className="border border-primary rounded-md p-2 w-44"
              value={staff.hiring_date}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex-1 pt-5">
            <h3 className="text-lg">Availability</h3>
            <StaffAvailabilityTab
              days={staffAvailability}
              handleAvailabilityCheckedChange={handleAvailabilityCheckedChange}
              handleAvailabilityStartTimeChange={
                handleAvailabilityStartTimeChange
              }
              handleAvailabilityEndTimeChange={handleAvailabilityEndTimeChange}
            />
            <div className="mt-12 flex gap-16 justify-center">
              <button className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-secondary" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddStaffScreen;
