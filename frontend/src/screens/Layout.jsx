import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import ParentScreen from "./ParentScreen";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const isManager = user?.designation === "Manager";

  const [sidenavFlag, setSidenavFlag] = useState(false);
  const [burgerFlag, setBurgerFlag] = useState(false);

  const toggleSideNav = () => {
    setBurgerFlag(!burgerFlag);
    setSidenavFlag(!sidenavFlag);
  };

  return (
    <div className="h-screen bg-[#F8F8F8] md:grid md:grid-cols-[215px_1fr] md:grid-rows-[auto_1fr] gap-6">
      <Header toggleSideNav={toggleSideNav} burgerFlag={burgerFlag} />
      <Navigation
        sidenavFlag={sidenavFlag}
        isManager={isManager}
        toggleSideNav={toggleSideNav}
      />
      <main className="md:pr-4 md:pl-0 lg:pr-10 lg:pl-6">
        <ParentScreen />
      </main>
    </div>
  );
};

export default Layout;
