import React, {  } from 'react'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

function Navbar() {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const navbarTimeline = gsap.timeline();
      navbarTimeline.from([".headingWebName",".headingWebpages",".headingWebLogin"], {
        y : -50,
        opacity : 0,
        duration : 1,
        ease: "power3.out",
        stagger: 0.5,
      })
    });
  return (
    <>
      {/* main container of navbar */}
      <div className=' bg-green-600 text-white flex justify-between items-center p-4 md:p-4 md:px-10'>
        {/* Logo or name of website */}
        <div className=' text-xl md:text-3xl font-bold headingWebName'>
          <h1 className='hover:text-blue-900 cursor-pointer'>General Knowledge</h1>
        </div>

        {/* pages login and signup of website */}
          <div className=' md:hidden font-bold headingWebpages'><DensityMediumIcon/></div>
        <div className=' md:flex md:items-center md:gap-x-20 hidden'>
          {/* pages */}
          <div className='headingWebpages'>
            <ul className='md:flex text-2xl font-semibold gap-x-5'>
              <li className='cursor-pointer hover:text-blue-800'>Home</li>
              <li className='cursor-pointer hover:text-blue-800'>MCQS</li>
            </ul>
          </div>

          {/* login signup */}
          <div className='md:flex text-xl gap-x-2 headingWebLogin'>
            <Link to={'/signup'}>
              <button className=' rounded-md cursor-pointer hover:text-blue-800'>Signup</button>
            </Link>
            <div className='border-x-1 hidden md:block'></div>
            <Link to={'/login'}>
              <button className='  rounded-md cursor-pointer hover:text-blue-800'>Login</button>
            </Link>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Navbar;
