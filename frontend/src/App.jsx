import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";

import DashboardScreen from "./screens/DashboardScreen";
import StaffScreen from "./screens/StaffScreen";
import ViewStaffScreen from "./screens/ViewStaffScreen";
import AddStaffScreen from "./screens/AddStaffScreen";
import EditStaffScreen from "./screens/EditStaffScreen";
import ArchiveStaffScreen from "./screens/ArchiveStaffScreen";
import ArchiveJobScreen from "./screens/ArchiveJobScreen";
import CreateJobScreen from "./screens/CreateJobScreen";
import EditJobScreen from "./screens/EditJobScreen";
import JobsScreen from "./screens/JobsScreen";
import TestScreen from "./screens/TestScreen";

import Layout from "./screens/Layout";
import Logout from "./components/Logout";
import PrivateRouteManager from "./components/PrivateRouteManager";
import UnauthorizeScreen from "./screens/UnauthorizeScreen";
import MessageScreen from "./screens/MessageScreen";

library.add(fas);

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {/* Test Layout Page */}

        {/* Landing Page and public pages */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        {/* Main App Manager */}
        <Route element={<PrivateRoute />}>
          <Route path="app" element={<Layout />}>
            <Route index element={<DashboardScreen />} />

            {/* Staff */}
            <Route path="staff" element={<PrivateRouteManager />}>
              <Route index element={<StaffScreen />} />
              <Route path=":id" element={<ViewStaffScreen />} />
              <Route path="add" element={<AddStaffScreen />} />
              <Route path="archive/:id" element={<ArchiveStaffScreen />} />
              <Route path="edit/:id" element={<EditStaffScreen />} />
            </Route>

            {/* Job */}
            <Route path="job" element={<PrivateRouteManager />}>
              <Route index element={<JobsScreen />} />
              <Route path="create" element={<CreateJobScreen />} />
              <Route path="archive/:id" element={<ArchiveJobScreen />} />
              <Route path="edit/:id" element={<EditJobScreen />} />
              {/* <Route path="job/:id" element={<JobDetailsManagerView} */}
            </Route>

            {/* Calendar */}
            <Route path="calendar" element={<h1>Calendar Screen</h1>} />
            {/* Message */}
            <Route path="message" element={<MessageScreen />} />
            {/* Logout */}
            <Route path="logout" element={<Logout />} />
            {/* Unauthorize */}
            <Route path="unauthorize" element={<UnauthorizeScreen />} />
            <Route path="*" element={<PageNotFoundScreen />} />
          </Route>
        </Route>

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
    </>
  );
};

export default App;
