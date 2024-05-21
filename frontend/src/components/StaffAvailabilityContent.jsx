import { useState } from "react";

const StaffAvailabilityContent = ({
  day,
  handleAvailabilityCheckedChange,
  handleAvailabilityStartTimeChange,
  handleAvailabilityEndTimeChange,
}) => {
  const [start_time, setStartTime] = useState(day.start_time);
  const [end_time, setEndTime] = useState(day.end_time);
  const [checked, setChecked] = useState(day.checked);

  const handleOnChange = (e) => {
    if (checked) {
      setStartTime("");
      setEndTime("");
    }
    setChecked(!checked);
    handleAvailabilityCheckedChange(day.name, !checked);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    handleAvailabilityStartTimeChange(day.name, e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    handleAvailabilityEndTimeChange(day.name, e.target.value);
  };

  return (
    <>
      <div className="grid grid-cols-2 ">
        <label className="font-medium text-gray-700" htmlFor="available">
          Available
        </label>
        <input
          type="checkbox"
          name="checked"
          id="checked"
          checked={checked}
          onChange={handleOnChange}
          className="rounded border-2 border-primary"
        />
      </div>
      <div className="grid grid-cols-2">
        <label className="font-medium text-gray-700 grid-" htmlFor="start_time">
          Start Time
        </label>
        <input
          type="time"
          name="start_time"
          id="start_time"
          className="rounded border-2 border-primary flex items-center"
          disabled={!checked}
          value={start_time}
          onChange={handleStartTimeChange}
        />
      </div>
      <div className="grid grid-cols-2">
        <label className="font-medium text-gray-700" htmlFor="end_time">
          End Time
        </label>
        <input
          type="time"
          name="end_time"
          id="end_time"
          className="rounded border-2 border-primary flex items-center"
          disabled={!checked}
          value={end_time}
          onChange={handleEndTimeChange}
        />
      </div>
    </>
  );
};

export default StaffAvailabilityContent;
