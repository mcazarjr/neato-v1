import { NavLink, useNavigate } from "react-router-dom";

import DashboardIcon from "../assets/DashboardIcon";
import JobIcon from "../assets/JobIcon";
import CalendarIcon from "../assets/CalendarIcon";
import StaffIcon from "../assets/StaffIcon";
import MessageIcon from "../assets/MessageIcon";
import LogoutIcon from "../assets/LogoutIcon";
import Logo from "../assets/Logo";

const Navigation = ({ sidenavFlag, isManager, toggleSideNav }) => {
  const navigate = useNavigate();

  const defaultNav = `
   grid 
   grid-cols-[35px_auto] 
   gap-x-2 h-[50px] 
   pl-3 items-center 
   md:rounded-bl-lg 
   md:rounded-tl-lg 
   fill-white 
   text-white 
  `;

  const activeNav = `
   grid 
   grid-cols-[35px_auto] 
   gap-x-2 h-[50px] 
   pl-3 items-center 
   md:rounded-bl-lg 
   md:rounded-tl-lg 
   relative
   fill-primary
   stroke-primary
   text-primary
   bg-[#f8f8f8]
   md:before:content-[''] 
   md:before:absolute 
   md:before:w-[40px] 
   md:before:h-[40px] 
   md:before:right-0
   md:before:-top-[40px]
   md:before:bg-primary
   md:before:rounded-full
   md:before:shadow-[20px_20px_rgb(248,248,248)]
   md:after:content-[''] 
   md:after:absolute 
   md:after:w-[40px] 
   md:after:h-[40px] 
   md:after:right-0
   md:after:-bottom-[40px]
   md:after:bg-primary
   md:after:rounded-full
   md:after:shadow-[20px_-20px_rgb(248,248,248)]
 `;

  return (
    <nav
      className={`bg-primary w-full pb-4 flex flex-col transition-all ease-in duration-150 motion-reduce:transition-all motion-reduce:hover:transform-all ${
        sidenavFlag ? "" : "-translate-x-full absolute"
      } md:transform-none md:static md:translate-x-0 md:last:place-self-end md:row-span-full`}
    >
      <ul className="bg-primary h-full flex flex-col">
        <li className="hidden md:list-item md:pb-10 pt-4 pl-2">
          <div className="w-[200px] fill-white p-2">
            <Logo />
          </div>
        </li>
        <li className="pl-5 py-2">
          <NavLink
            to="/app"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? activeNav : defaultNav
            }
            onClick={(e) => {
              toggleSideNav();
            }}
            end
          >
            <DashboardIcon />
            <span className="font-bold text-xl flex-auto">Dashboard</span>
          </NavLink>
        </li>

        {isManager && (
          <li className="pl-5 py-2">
            <NavLink
              to="/app/job"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? activeNav : defaultNav
              }
              onClick={(e) => {
                toggleSideNav();
              }}
              end
            >
              <JobIcon />
              <span className="font-bold text-xl flex-auto">Jobs</span>
            </NavLink>
          </li>
        )}

        <li className="pl-5 py-2">
          <NavLink
            to="/app/calendar"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? activeNav : defaultNav
            }
            onClick={(e) => {
              toggleSideNav();
            }}
            end
          >
            <CalendarIcon />
            <span className="font-bold text-xl flex-auto">Calendar</span>
          </NavLink>
        </li>

        {isManager && (
          <li className="pl-5 py-2">
            <NavLink
              to="/app/staff"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? activeNav : defaultNav
              }
              onClick={(e) => {
                toggleSideNav();
              }}
              end
            >
              <StaffIcon />
              <span className="font-bold text-xl flex-auto">Staff</span>
            </NavLink>
          </li>
        )}

        <li className="pl-5 py-2">
          <NavLink
            to="/app/message"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? activeNav : defaultNav
            }
            onClick={(e) => {
              toggleSideNav();
            }}
            end
          >
            <MessageIcon />
            <span className="font-bold text-xl flex-auto">Messages</span>
          </NavLink>
        </li>
        <li className="pl-5 py-2 h-full flex justify-end">
          <div className="flex-1 flex flex-col-reverse">
            <NavLink
              to="/app/logout"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? activeNav : defaultNav
              }
              onClick={(e) => navigate("/logout", { replace: true })}
              end
            >
              <LogoutIcon />
              <span className="font-bold text-xl flex-auto">Logout</span>
            </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
