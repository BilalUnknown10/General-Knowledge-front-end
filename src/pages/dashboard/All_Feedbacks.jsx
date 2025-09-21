import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import UserContext from '../../Store/UserContext';
import { useEffect } from 'react';

function All_Feedbacks() {
    const [allFeedbacks, setAllFeedbacks] = useState([]);

    const {Admin_Api} = useContext(UserContext);

    const token = localStorage.getItem("GKT");

    const getAllFeedbacks = async () => {
        try {
            const response = await axios.get(`${Admin_Api}/allFeedbacks`,{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            });
            // console.log(response.data);
            if(response.status === 200) {
                setAllFeedbacks(response.data);
            }
        } catch (error) {
            console.log("error in all feedbacks : ", error);
        }
    }

    useEffect(() => {
        getAllFeedbacks();
    },[]);
  return (
    <div>
      <div className="py-3 px-10 bg-green-500 font-bold md:text-4xl text-white">
        <h1>All Feedbacks</h1>
      </div>

      <div className="my-10 px-10 text-end">
        <button className="bg-red-500 text-xl font-bold cursor-pointer text-white px-10 py-2 rounded-md">
          Delete All Feedbacks
        </button>
      </div>
      {allFeedbacks.map((feedback, i) => {
        return<div key={i} className='px-10 py-5 border border-green-500 my-5 mx-10 rounded-md'>
            <h1 className='text-xl font-bold'>{feedback.name}</h1>
            <p>{feedback.feedback}</p>

            <div className="mt-5 text-end">
          <button className="px-10 bg-red-500 cursor-pointer text-white py-2 rounded-md font-bold">Delete</button>
        </div>        
        </div>
      })}
      
    </div>
  )
}

export default All_Feedbacks
