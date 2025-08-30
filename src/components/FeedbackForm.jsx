import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FeedbackForm() {
    const {userDetails, User_Api, loginUserToken} = useContext(UserContext);
    const [userFeedback, setUserFeedback] = useState({
      name : "",
      email : "",
      image : "",
      feedback : ""
    });

    const navigate = useNavigate();

    const handleFeedback = (e) => {
      const {name, value} = e.target;
      setUserFeedback((prev) => (
        {
          ...prev,
          [name] : value
        }
      ))
    };

    const submitFeedback = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${User_Api}/feedback`,userFeedback,{
          headers : {
            "Content-Type" : "Application/json",
            Authorization : `Bearer ${loginUserToken} `
          }
        });
        
        if(response.status === 201){
          setUserFeedback({
            feedback : "",
          });
          
          navigate('/');
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error from front end submit feed back: ",error);
      }
    }

    useEffect(() => {
      if (userDetails) {
      setUserFeedback((prev) => ({
        ...prev,
        name: userDetails.userName || "",
        email: userDetails.email || "",
        image : userDetails?.userProfileImage || null
      }));
    }
    
    if(!userDetails) {
      navigate("/login");
    }
  },[userDetails]);
  return (
    <div className="px-4 flex justify-center items-center md:h-[90vh] h-[85vh] bg-green-300">
      <form action="" className="bg-white px-5 py-10 rounded-md md:p-16">
        <div className="text-xl font-bold tracking-wider text-center">
          Your Feedback
        </div>
        <div className="text-xl md:p-4 py-4">
          <label className="font-bold" htmlFor="userName">
            Name :{" "}
          </label>
          <input
            type="text"
            name="name"
            readOnly
            value={userFeedback.name}
            className="border w-full border-gray-300 shadow-md rounded-md outline-0 py-2 px-4 md:text-xl"
          />
        </div>
        <div className="text-xl md:p-4 py-4">
          <label className="font-bold" htmlFor="email">
            Email :{" "}
          </label>
          <input
            type="email"
            readOnly
            id="email"
            name="email"
            value={userFeedback.email}
            className="border border-gray-300 shadow-md w-full rounded-md outline-0 py-2 px-4 md:text-xl"
          />
        </div>
        <div className="text-xl md:p-4 py-4">
          <label className="font-bold" htmlFor="message">
            
            Feedback :{" "}
          </label>
          <textarea
            id="message"
            name="feedback"
            value={userFeedback.feedback}
            onChange={handleFeedback}
            cols={"30"}
            rows={"5"}
            className="border border-gray-300 shadow-md w-full rounded-md outline-0 py-2 px-4 md:text-xl"
          />
        </div>
        <div className="p-2 text-end">
          <button onClick={submitFeedback} className="shadow-md  cursor-pointer hover:tracking-wider transition-all ease-in-out duration-500 hover:bg-green-500 md:hover:text-white font-semibold md:text-black md:text-xl py-2 px-5 rounded-md bg-green-400 text-white">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
