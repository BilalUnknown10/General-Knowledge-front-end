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

  const { mobileMenu, setMobileMenu, isUserLogin, setIsUserLogin } = useContext(UserContext);

  const openMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const logout =  async () => {
    localStorage.removeItem("GKT");
    setIsUserLogin(false);
  }

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
  },[]);

  const backToHome = () => {
    setMobileMenu(false)
  }
  
  return (
    <>
      {/* main container of navbar */}
      <div className="bg-green-600 text-white flex justify-between items-center p-4 md:p-4 md:px-10 md:h-20">
        {/* Logo or name of website */}
        <div className=" text-2xl md:text-3xl font-bold headingWebName">
          <h1 className="hover:text-blue-900 cursor-pointer">
            <Link to={'/'}>General Knowledge</Link>
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
            <div className="text-center flex flex-col justify-center items-center">
              {isUserLogin ? <div className="h-24 w-24 rounded-full">
                <img src="./feedbackImage.jpg" alt="profile image" className="h-20 w-20 object-cover rounded-full" />
                <h1>User Name</h1>
              </div> : <>
                <AccountCircleIcon className={`!text-7xl`} />
              </>}
            </div>
            <div className="mt-5">
              <ul className=" flex flex-col gap-6 text-xl font-semibold">
                <Link to={'/'}>
                  <li onClick={backToHome} className="cursor-pointer border-b">Home</li>
                </Link>
                <Link to={'/mcqs'}>
                  <li onClick={backToHome} className="cursor-pointer border-b">MCQS</li>
                </Link>
                { isUserLogin ? <>
                  <Link onClick={logout}>
                  <li className="cursor-pointer border-b">Logout</li>
                </Link>
                </> :
                <>
                  <Link to={"/login"}>
                  <li onClick={backToHome} className="cursor-pointer border-b">Login</li>
                </Link>
                <Link to={"/signup"}>
                  <li onClick={backToHome} className="cursor-pointer border-b">Signup</li>
                </Link>
                </>
                }
              </ul>
            </div>
          </div>
        </div>
        

        {/* pages login and signup of website */}
        <div className=" md:flex md:items-center md:gap-x-20 hidden">
          {/* pages */}
          <div className="headingWebpages">
            <ul className="md:flex text-2xl font-semibold gap-x-5">
              <Link to={'/'}>
                <li className="cursor-pointer hover:text-blue-800">Home</li>
              </Link>
              <Link to={'/mcqs'}>
                <li className="cursor-pointer hover:text-blue-800">MCQS</li>
              </Link>
            </ul>
          </div>

          {/* login signup */}
          <div className="md:flex text-xl items-center gap-x-3 headingWebLogin">
            {isUserLogin ? <>
            <div className="w-16 h-16 rounded-full">
              <img className=" w-full rounded-full h-full object-cover" src="./feedbackImage.jpg" alt="profile image" />
            </div>
            <div className="border-r-1 h-16 hidden md:block"></div>
            <Link>
              <button onClick={logout} className=" rounded-md cursor-pointer hover:text-blue-800">
                Logout
              </button>
            </Link> </> :
            <>
              <Link to={"/signup"}>
              <button className=" rounded-md cursor-pointer hover:text-blue-800">
                Signup
              </button>
            </Link>
            <div className="border-r-1 h-7 hidden md:block"></div>
            <Link to={"/login"}>
              <button className="  rounded-md cursor-pointer hover:text-blue-800">
                Login
              </button>
            </Link>
            </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
