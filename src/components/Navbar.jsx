import React from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import UserContext from "../Store/UserContext";


function Navbar() {
  gsap.registerPlugin(useGSAP);

  const { mobileMenu, setMobileMenu } = useContext(UserContext);

  const openMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useGSAP(() => {
    const navbarTimeline = gsap.timeline();
    navbarTimeline.from(
      [".headingWebName", ".headingWebpages", ".headingWebLogin"],
      {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.5,
      }
    );
  });

  const backToHome = () => {
    setMobileMenu(false)
  }
  
  return (
    <>
      {/* main container of navbar */}
      <div className="bg-green-600 text-white flex justify-between items-center p-4 md:p-4 md:px-10">
        {/* Logo or name of website */}
        <div className=" text-2xl md:text-3xl font-bold headingWebName">
          <h1 className="hover:text-blue-900 cursor-pointer">
            General Knowledge
          </h1>
        </div>

        {/* Menu icon */}
        <div className=" md:hidden font-bold headingWebpages">
          <div
            onClick={openMenu}
            className={`
              transform
              transition-transform duration-700 ease-in-out
              ${mobileMenu ? "rotate-90" : "rotate-0"}
              inline-block
            `}>
            <DensityMediumIcon className="!text-3xl" />
          </div>
        </div>

        {/* Mobile menu */}
       <div className={`absolute right-0 transition-all duration-700 ease-in-out ${mobileMenu ? "top-[50px] opacity-100" : "top-[-500px] opacity-0"} z-50 w-full bg-green-800  mobileMenu`}>
          <div className="p-5">
            <div className="text-center">
              <AccountCircleIcon className={`!text-7xl`} />
              <h1>User Name</h1>
            </div>
            <div className="mt-5">
              <ul className=" flex flex-col gap-6 text-xl font-semibold">
                <Link to={'/'}>
                  <li onClick={backToHome} className="cursor-pointer border-b">Home</li>
                </Link>
                <li className="cursor-pointer border-b">MCQS</li>
                <Link to={"/login"}>
                  <li className="cursor-pointer border-b">Login</li>
                </Link>
                <Link to={"/signup"}>
                  <li className="cursor-pointer border-b">Signup</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        

        {/* pages login and signup of website */}
        <div className=" md:flex md:items-center md:gap-x-20 hidden">
          {/* pages */}
          <div className="headingWebpages">
            <ul className="md:flex text-2xl font-semibold gap-x-5">
              <li className="cursor-pointer hover:text-blue-800">Home</li>
              <li className="cursor-pointer hover:text-blue-800">MCQS</li>
            </ul>
          </div>

          {/* login signup */}
          <div className="md:flex text-xl gap-x-2 headingWebLogin">
            <Link to={"/signup"}>
              <button className=" rounded-md cursor-pointer hover:text-blue-800">
                Signup
              </button>
            </Link>
            <div className="border-x-1 hidden md:block"></div>
            <Link to={"/login"}>
              <button className="  rounded-md cursor-pointer hover:text-blue-800">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
