import React, { useState } from "react";

const AvailabilityItem = ({ day, onAvailabilityChange, onTimeChange }) => {
  const handleAvailability = (e) => {
    const newAvailabilityFlag = e.target.checked;
    onAvailabilityChange(day.id, newAvailabilityFlag);
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    onTimeChange(day.id, "start_time", newStartTime);
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    onTimeChange(day.id, "end_time", newEndTime);
  };

  return (
    <>
      <tr className="text-center hover hover:bg-primary">
        <td>{day.name}</td>
        <td>
          <input
            type="checkbox"
            name="available"
            id={day.id}
            className="checkbox checkbox-primary"
            checked={day.checked}
            onChange={handleAvailability}
          />
        </td>
        <td>
          <input
            type="time"
            name="starttime"
            id={day.id + "_starttime"}
            className="border border-primary rounded-md p-2"
            disabled={!day.checked}
            value={day.start_time}
            onChange={handleStartTimeChange}
          />
        </td>
        <td>
          <input
            type="time"
            name="endtime"
            id={day.id + "_endtime"}
            className="border border-primary rounded-md p-2"
            disabled={!day.checked}
            value={day.end_time}
            onChange={handleEndTimeChange}
          />
        </td>
      </tr>
    </>
  );
};

export default AvailabilityItem;
