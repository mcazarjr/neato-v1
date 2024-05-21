import { useState } from "react";
import StaffAvailabilityContent from "./StaffAvailabilityContent";

const StaffAvailabilityTab = ({
  days,
  handleAvailabilityCheckedChange,
  handleAvailabilityStartTimeChange,
  handleAvailabilityEndTimeChange,
}) => {
  const [tabs, setTabs] = useState([
    {
      headerClasses: "tab tab-lifted tab-active",
      day: "monday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "tuesday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "wednesday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "thursday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "friday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "saturday",
    },
    {
      headerClasses: "tab tab-lifted",
      day: "sunday",
    },
  ]);
  const [selectedDay, setSelectedDay] = useState("monday");

  const resetTabClasses = () => {
    setTabs((prevTabs) => {
      return prevTabs.map((tab) => {
        return {
          ...tab,
          headerClasses: "tab tab-lifted",
          contentClasses: "hidden",
        };
      });
    });
  };

  const handleTabActivity = (e, day) => {
    e.preventDefault();
    resetTabClasses();
    const selectedTab = day.toLowerCase();
    setSelectedDay(selectedTab);

    setTabs((prevTabs) => {
      return prevTabs.map((tab) => {
        if (tab.day === selectedTab) {
          return {
            ...tab,
            headerClasses: "tab tab-lifted tab-active",
          };
        }
        return tab;
      });
    });
  };

  return (
    <>
      <div className="tabs bg-primary rounded-tr-lg rounded-tl-lg grid grid-cols-7">
        {tabs.map((tab) => (
          <button
            key={tab.day}
            className={tab.headerClasses}
            onClick={(evt) => handleTabActivity(evt, tab.day)}
          >
            {tab.day.charAt(0).toUpperCase() + tab.day.slice(1, 3)}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-stretch gap-y-4 bg-white py-8 px-8 rounded-br-lg rounded-bl-lg">
        <StaffAvailabilityContent
          key={selectedDay}
          day={days[selectedDay]}
          handleAvailabilityCheckedChange={handleAvailabilityCheckedChange}
          handleAvailabilityStartTimeChange={handleAvailabilityStartTimeChange}
          handleAvailabilityEndTimeChange={handleAvailabilityEndTimeChange}
        />
      </div>
    </>
  );
};

export default StaffAvailabilityTab;
