import { useState } from "react";
import { useSelector } from "react-redux";

import Jobs from "../components/Jobs";
import ManagerComponent from "../components/ManagerComponent";

const DashboardScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [isManager, setIsManager] = useState(user.designation === "Manager");

  return (
    <>
      {isManager ? (
        <>
          <ManagerComponent />
        </>
      ) : (
        <Jobs />
      )}
    </>
  );
};

export default DashboardScreen;
