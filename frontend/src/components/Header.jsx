import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/Logo";
import SearchBar from "../components/SearchBar";
import NotificationBellIcon from "../assets/NotificationBellIcon";
import HamburgerIcon from "../assets/HamburgerIcon";
import CloseIcon from "../assets/CloseIcon";

const Header = ({ toggleSideNav, burgerFlag }) => {
  let title = "";

  const location = useLocation().pathname;
  switch (true) {
    case location.includes("/app/staff/add"):
      title = "Add Staff";
      break;
    case location.includes("/app/staff/edit"):
      title = "Edit Staff";
      break;
    case location.includes("/app/staff/archive"):
      title = "Archive Staff";
      break;
    case location.includes("/app/staff"):
      title = "Staff Overview";
      break;
    case location.includes("/app/job/create"):
      title = "Create Job";
      break;
    case location.includes("/app/job/edit"):
      title = "Edit Job";
      break;
    case location.includes("/app/job/archive"):
      title = "Archive Job";
      break;
    case location.includes("/app/job"):
      title = "Jobs Overview";
      break;
    case location.includes("/app"):
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      title = formattedDate;
      break;
    default:
      title = "";
  }

  return (
    <header className="bg-primary flex flex-wrap items-center justify-between md:pt-6 p-3 md:gap-3 md:bg-[#F8F8F8] md:p-0 md:pr-4 lg:pr-10 md:grid md:grid-cols-[1fr_auto_auto]">
      <Link
        to={"/app"}
        className="grow md:bg-primary md:items-center md:justify-center md:hidden"
      >
        <div className="fill-white w-full max-w-[215px] md:p-4">
          <Logo />
        </div>
      </Link>
      <div className="grow md:ml-1 lg:ml-7">
        <h2 className="hidden md:flex md:flex-col">
          <span className="text-white md:text-[#263C44] font-bold text-4xl">
            {title}
          </span>
          {title ===
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) ? (
            <span className="text-[#263C44] font-semibold">
              {new Date().toLocaleDateString("en-US", { weekday: "long" }) +
                " "}
            </span>
          ) : (
            <span className="font-semibold text-white">.</span>
          )}
        </h2>
      </div>
      <div className="avatar w-12 h-12 p-1 md:order-last md:p-0">
        <Link to={""}>
          <img
            src="https://picsum.photos/200"
            alt="Profile Picture"
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="w-full flex items-center gap-3 md:w-fit">
        <div className="grow md:max-w-[215px]">
          <SearchBar />
        </div>
        <div className="stroke-white md:stroke-[#2B3B43]">
          <NotificationBellIcon />
        </div>
        <label className="btn btn-circle swap swap-rotate text-white bg-transparent border-transparent hover:bg-primary md:hidden">
          <input
            type="checkbox"
            onChange={toggleSideNav}
            checked={burgerFlag}
          />
          <div className="swap-off fill-current">
            <HamburgerIcon />
          </div>
          <div className="swap-on fill-current">
            <CloseIcon />
          </div>
        </label>
      </div>
    </header>
  );
};

export default Header;
