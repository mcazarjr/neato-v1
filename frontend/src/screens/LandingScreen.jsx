import LandingNav from "../components/LandingNav.jsx";
import Logo from "../assets/Logo.jsx";
import HamburgerIcon from "../assets/HamburgerIcon.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-10 drop-shadow-md">
        <nav className="grid grid-cols-[1fr_auto] items-center justify-between px-4 py-3 md:grid-cols-[auto_1fr_auto] md:gap-4">
          <div className="logo">
            <img src="logo-border.png" className="h-10 w-132.95" />
          </div>
          <div
            className={`order-last col-span-2 flex flex-col text-primary
            ${isMenuOpen ? "" : "-translate-y-full hidden"}
            transition-trasform
            md:order-none md:flex md:flex-row md:gap-4 md:transform-none md:col-span-1
            `}
          >
            <Link
              to="/"
              className="Features text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:border-transparent md:hover:border-b-2 md:hover:border-primary md:hover:bg-transparent md:hover:text-primary md:p-0"
            >
              Features
            </Link>
            <Link
              to="/"
              className="Pricing text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:border-transparent md:hover:border-b-2 md:hover:border-primary md:hover:bg-transparent md:hover:text-primary md:p-0"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="AboutUs text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:border-transparent md:hover:border-b-2 md:hover:border-primary md:hover:bg-transparent md:hover:text-primary md:p-0"
            >
              About Us
            </Link>
            <Link
              to="/"
              className="Contact text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:border-transparent md:hover:border-b-2 md:hover:border-primary md:hover:bg-transparent md:hover:text-primary md:p-0"
            >
              Contact
            </Link>
          </div>
          <div
            className={`order-last flex flex-col col-span-2 text-primary md:flex md:flex-row md:gap-6 md:col-span-1
          ${isMenuOpen ? "" : "hidden"}
          `}
          >
            <Link
              to=""
              className="text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:rounded-xl md:border-2 md:bg-secondary md:text-[#263C44] md:px-6"
            >
              Book a Demo
            </Link>
            <Link
              to="/login"
              className="text-xl border-b-2 p-2 hover:bg-primary hover:text-white md:rounded-xl md:border-2 md:bg-secondary md:text-[#263C44] md:px-10 md:border-[#263C44] md:bg-transparent"
            >
              Login
            </Link>
          </div>
          <div className="burger md:hidden">
            <label className="btn btn-circle bg-transparent border-0 swap swap-rotate">
              <input
                type="checkbox"
                checked={isMenuOpen}
                onChange={handleMenuClick}
              />
              <svg
                className="swap-off fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="swap-on fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
        </nav>
      </header>

      <main className="">
        <section className="bg-primary md:h-[659px] md:flex md:items-center">
          <div className="md:items-center md:grid md:grid-cols-[1fr,1fr]">
            <div className="hero-image w-full pt-10  md:pt-2 md:order-last md:flex md:items-center md:justify-center">
              <img src="hero-image.png" />
            </div>
            {/* end of hero-image */}
            <div className="hero-content text-white flex flex-col items-start md:gap-10 md:pl-20">
              <p className="text-4xl font-bold md:text-[2rem] lg:text-[4rem]">
                Streamline Cleaning
              </p>
              <p className="text-4xl font-bold md:text-[2rem] lg:text-[4rem]">
                Tasks with Ease
              </p>
              <p className="pb-5 text-lg">
                Modernize the cleaning industry by <br></br> providing a highly
                efficient <br></br> management system.
              </p>
              <button className="hidden md:block">Join Now</button>
            </div>
          </div>
        </section>

        {/* end of hero-content */}

        {/* start section2 */}
        <section className="flex flex-col items-center gap-6 justif-center md:h-[450px] md:pb-400 ">
          <h2 className="pb-5 pt-10 text-center text-2xl font-semibold md:text-3xl ">
            Neat and Organized
          </h2>
          <div className="section2 grid gap-4 px-6 md:grid-cols-3">
            {/* start of card1 */}
            <div className="card1 bg-[#E1F5FF] px-6 pt-4 rounded-lg min-h-[225px] drop-shadow-md flex flex-col gap-2 pb-4 md:w-[24rem]">
              <div className="card-header flex justify-between item-center pb-3">
                <h3 className="text-3xl font-medium flex items-center md:text-2xl">
                  Manage Project
                </h3>
                <div className="icon-bg p-2 bg-[#13A5EE] rounded-lg fill-white">
                  <img
                    src="icon1.png"
                    className="h-[50.57px] w-[50.57px] img-white"
                  />
                </div>
              </div>
              <p className="text-lg leading-tight font-light">
                Streamline jobs, staff scheduling, task management and
                communication keeping your housekeepers' and managers' mood
                bright and shiny.
              </p>
            </div>
            {/* end of card1 */}

            {/* start of card2 */}
            <div className="card2 bg-[#EEFFFA] px-6 pt-4 rounded-lg min-h-[225px] drop-shadow-md flex flex-col gap-2 md:w-[24rem]">
              <div className="card-header flex justify-between item-center pb-3">
                <h3 className="text-3xl font-medium flex items-center md:text-2xl">
                  Workload Tracker
                </h3>
                <div className="icon-bg p-2 bg-[#31B58D] rounded-lg fill-white">
                  <img
                    src="icon2.png"
                    className="h-[50.57px] w-[50.57px] img-white"
                  />
                </div>
              </div>
              <p className="pb-4 text-lg leading-tight font-light">
                An orderly view of tasks that allows you to stay on track no
                matter how grimy things might seem.
              </p>
            </div>

            {/* end of card2 */}
            {/* start of card3 */}
            <div className="card3 bg-[#FFF5E1] px-6 pt-4 rounded-lg min-h-[225px] drop-shadow-md flex flex-col gap-2 md:w-[24rem]">
              <div className="card-header flex justify-between item-center pb-3">
                <h3 className="text-3xl font-medium flex items-center">
                  Team Synergy
                </h3>
                <div className="icon-bg p-2 bg-[#FFC350] rounded-lg fill-white">
                  <img
                    src="icon3.png"
                    className="h-[50.57px] w-[50.57px] img-white"
                  />
                </div>
              </div>
              <p className="pb-4 text-lg leading-tight font-light">
                Keep everything neat and tidy through tight communication
                between managers and housekeepers.
              </p>

              {/* end of card3 */}
            </div>
          </div>
        </section>
        {/* end of section2 */}

        {/* start of section3 */}
        <section className="pricing flex flex-col items-center md:pb-[5rem]">
          <h2 className="pt-10 text-center text-2xl font-semibold pb-7 md:text-3xl md:col-span-3 grow">
            Pricing and Plan
          </h2>

          <div className=" grid gap-[2rem] px-[3rem] min-w-[10rem] max-w-[27rem] md:max-w-[60rem]  md:px-0 md:grid-cols-3 ">
            {/* start of pricecard2 */}
            <div className="card-1 md:max-w-[18rem]">
              <div className="price-card1-bg bg-[#EEFFFA] rounded-tl-[3rem] rounded-br-[3rem] drop-shadow-md py-6">
                <div className="price1-desciption px-5 pb-6">
                  <p className="text-center text-[#31B58D] text-xl font-medium">
                    Basic
                  </p>
                  <h3 className="text-center text-xl pt-5 pb-5 font-medium">
                    <span className="text-4xl font-bold">$199</span>/mo.
                  </h3>
                  <p className="pb-5 text-md">
                    All the essential features you need to start cleaning up
                    your workflow.
                  </p>
                  <p className="pb-5 text-md">
                    Jobs organization<br></br>Task scheduling<br></br>
                    Housekeepers management
                  </p>
                  <p>Works with 1-10 staff.</p>
                </div>
              </div>
            </div>

            {/* end of pricecard1 */}

            {/* start of pricecard2 */}
            <div className="card-2 md:max-w-[18rem] md:order-last">
              <div className="price-card1-bg bg-[#EEFFFA] rounded-tl-[3rem] rounded-br-[3rem] drop-shadow-md py-6">
                <div className="price1-desciption px-5 pb-6">
                  <p className="text-center text-[#31B58D] text-xl font-medium">
                    Standard
                  </p>
                  <h3 className="text-center text-xl pt-5 pb-5 font-medium">
                    <span className="text-4xl font-bold">$599</span>/mo.
                  </h3>
                  <p className="pb-5 text-md">
                    For emerging sparkly companies.
                  </p>
                  <p className="pb-5 text-md">
                    Jobs organization<br></br>Task scheduling<br></br>
                    Housekeepers management <br></br> 24-hour tech support
                  </p>
                  <p>Ideal with 11-50 staff.</p>
                </div>
              </div>
            </div>
            {/* end of pricecard2 */}

            {/* start ofp pricecard3 */}

            <div className="card-3 pb-[4rem] md:max-w-[18rem]">
              <div className="price-card1-bg bg-secondary rounded-tl-[3rem] rounded-br-[3rem] drop-shadow-m">
                <div className="price1-desciption bg-[#263C44] text-white rounded-br-[3rem] rounded-tl-[3rem]">
                  <div className="bg-secondary rounded-br-[3rem] rounded-tl-[3rem]">
                    <p className="text-center text-[#263C44] text-xl font-medium pt-5">
                      Enterprise
                    </p>
                    <h3 className="text-center text- pt-2 pb-5 font-medium text-3xl text-[#263C44]">
                      Contact Us <br></br> for Pricing
                    </h3>
                  </div>
                  <p className="pb-5 pt-2 text-md px-5">
                    For emerging sparkly companies.
                  </p>
                  <p className="pb-4 text-md px-5">
                    Jobs organization<br></br>Task scheduling<br></br>
                    Housekeepers management <br></br> 24-hour tech support
                  </p>
                  <p className="pb-[1.9rem] px-5">Ideal with 11-50 staff.</p>
                </div>
              </div>
            </div>
          </div>
          {/* end of pro */}
        </section>
        {/* end of section3 */}

        {/* start of section 4 */}
        <section className="our-team bg-[#EEFFFA] py-[2.5rem]">
          <div className="team-heading text-center">
            <div className="pb-3">
              <h2 className="text-center text-2xl font-semibold pb-2 md:text-3xl">
                At Your Service
              </h2>
              <p>We are a team of designers and developers </p>
              <p> committed to creating platforms that </p>
              <p>improve business.</p>
            </div>
          </div>

          <div className="images-cleaners grid grid-cols-2 gap-5 px-8 md:grid-cols-3 md:max-w-[45rem] md:m-auto">
            {/* start of meralds */}
            <div className="meralds text-center">
              <img src="Cleaner-6.png" className="" />
              <h3 className="font-bold text-lg m-0 text-[#263C44] md:text-xl">
                Meraldo Cazar Jr.
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D] md:text-[0.9rem]">
                Full Stack Developer
              </h4>
            </div>

            {/* end of meralds */}
            {/* start of genia */}

            <div className="genia text-center">
              <img src="Cleaner-5.png" className="" />
              <h3 className="font-bold text-lg md:text-xl">
                {" "}
                Ievgeniia Chornobai
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D] md:text-[0.9rem]">
                Full Stack Developer
              </h4>
            </div>
            {/* end of genia */}
            {/* start of rahav */}

            <div className="raghav text-center">
              <img src="Cleaner-3.png" className="" />
              <h3 className="font-bold text-lg m-0 text-[#263C44] md:text-xl">
                Raghav Khanna
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D] md:text-[0.9rem]">
                Full Stack Developer
              </h4>
            </div>
            {/* end of raghav */}
            {/* start of aerick */}
            <div className="aerick text-center">
              <img src="Cleaner-1.png" className="" />
              <h3 className="font-bold text-lg m-0 text-[#263C44] md:text-xl">
                Aerick Estrella
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D] md:text-[0.9rem] ">
                UX/UI Designer
              </h4>
            </div>
            {/* end of aerick */}

            {/* start of cj */}

            <div className="cj text-center">
              <img src="Cleaner-4.png" className="" />
              <h3 className="font-bold text-lg m-0 text-[#263C44] md:text-xl">
                Christian Flordeliza
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D]  md:text-[0.9rem]">
                UX/UI Designer
              </h4>
            </div>
            {/* end of cj */}

            {/* start of rock */}

            <div className="rock text-center">
              <img src="Cleaner-2.png" className="" />
              <h3 className="font-bold text-lg m-0 text-[#263C44] md:text-xl">
                Rock Manuel
              </h3>
              <h4 className="font-normal text-sm text-[#31B58D] md:text-[0.9rem]">
                UX/UI Designer,PM
              </h4>
            </div>
            {/* end of rock */}
          </div>
        </section>
        {/* end of section4 */}

        <section className="contactUs py-16 md:flex md:items-center">
          <div className="md:grid md:grid-cols-[35%,1fr] md:gap-10 md:items-center md:w-full md:px-5">
            {/* contact image */}
            <div className="contact-image hidden md:block">
              <img
                src="photo-contactUs.png"
                className="md:w-full md:max-w-[567px] md:max-h-[551.08px] md:m-auto"
              />
            </div>
            {/* end of contact image */}
            <div>
              <h2 className=" text-center text-2xl font-semibold pb-7 md:text-left md:px-4">
                Contact Us
              </h2>
              <form className="grid grid-cols-2 gap-4 px-4 pt-3">
                {/* Start of fullnameInput */}
                <div className="fullnameInput flex flex-col gap-2 ">
                  <label htmlFor="fullname" className="text-[1.148rem]">
                    Fullname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Name"
                    className="border-b-2 border-[#D9D9D9] text-base bg-[#F8F8F8]"
                  ></input>
                </div>
                {/* End of fullnameInput */}
                {/* Start of EmailInput */}
                <div className="emailInput flex flex-col gap-2 ">
                  <label htmlFor="email" className="text-[1.148rem]">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="border-b-2 border-[#D9D9D9] text-base bg-[#F8F8F8]"
                  ></input>
                </div>
                {/* End of EmailInput */}
                {/* Start of CompanyInput */}
                <div className="companyInput flex flex-col col-span-2 gap-2 ">
                  <label htmlFor="company" className="text-[1.148rem]">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Company Name"
                    className="border-b-2 border-[#D9D9D9] text-base bg-[#F8F8F8]"
                  ></input>
                </div>
                {/* End of CompanyInput */}
                {/* Start of SubjectInput */}
                <div className="subjectInput flex flex-col col-span-2 gap-2 pb-4">
                  <label htmlFor="subject" className="text-[1.148rem] ">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Subject"
                    className="border-b-2 border-[#D9D9D9] text-base bg-[#F8F8F8]"
                  ></input>
                </div>
                {/* End of CompanyInput */}

                {/* start of button */}
                <div className="col-span-2 md:justify-self-end md:w-32">
                  <button
                    type="submit"
                    className="bg-primary h-[30.62px] w-full text-white text-[1.148rem] font-semibold rounded-md"
                  >
                    Submit
                  </button>
                </div>
                {/* End of button */}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-[#00DA98] to-[#31b58d] flex flex-col items-center md:flex-row md:justify-between md:py-[0.5rem] md:px-[1rem] ">
        <div className="logo pt-3 md:pt-0">
          <img src="logofooter.png" className="w-[184.75px]" />
        </div>
        <nav className="pt-6 pb-[4rem] md:pt-0 md:pb-0">
          <ul className="text-white flex flex-col gap-5 text-lg md:flex-row ">
            <li className="">
              <Link to="/"> Features </Link>
            </li>
            <li>
              <Link to="/"> Pricing </Link>
            </li>
            <li>
              <Link to="/"> About Us </Link>
            </li>
            <li>
              <Link to="/"> Contact </Link>
            </li>
          </ul>
        </nav>

        <div className="socials pb-[5rem] flex flex-col gap-2 md:pb-0">
          <p className="text-xl text-white font-medium text-center md:hidden">
            Let's Connect!
          </p>

          <div className="flex gap-3 fill-white">
            <Link to="/" className="md:hover:fill-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
              </svg>
            </Link>

            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
              </svg>
            </Link>

            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
              </svg>
            </Link>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingScreen;
