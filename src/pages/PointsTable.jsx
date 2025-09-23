import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Store/UserContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function PointsTable() {
  const { User_Api } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [allQuestions, setAllQuestions] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("GKT");

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
    if (token) {
      const getAllUsers = async () => {
        try {
          const response = await axios.get(`${User_Api}/getAllUsers`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setAllUsers(response.data);
          }
        } catch (error) {
          console.log("Error in get all user point table : ", error);
        }
      };

      const getAllQuestions = async () => {
        try {
          const response = await axios.get(`${User_Api}/getAllQuestions`, {
            headers : {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${token}`
            }
          });

          if(response.status === 200) {
            setAllQuestions(response.data)
          }
        } catch (error) {
          console.log("Error in get All questions in points table page : ", error)
        }
      }

      getAllUsers();
      getAllQuestions();
    }
  },[]);

  return (
    <div>
      <div className="hidden md:flex justify-between px-10 bg-green-300 p-5 text-2xl font-bold">
        <h1 className="w-1/5">Name</h1>
        <h1 className="w-1/5 text-center">Total Questions</h1>
        <h1 className="w-1/5 text-center"><span className="text-green-900">Correct</span> / <span className="text-red-500">Wrong</span></h1>
        <h1 className="w-1/5 text-center">Percentage</h1>
        <h1 className="w-1/5 text-end">Total Points</h1>
      </div>
      {allUsers.map((user, i) => (
        <div key={i} className={`bg-green-500 md:flex justify-between m-5 p-5 rounded-md text-xl font-semibold text-white`}>
            <h1 className="md:w-1/5"><span className="md:hidden">Name : </span> {user.userName}</h1>
            <p className="md:w-1/5 md:text-center"><span className="md:hidden">Total Questions : </span> {user?.submittedAnswers?.length} / {allQuestions.length}</p>
            <p className="md:w-1/5 md:text-center"><span className="md:hidden">Correct / Wrong : </span>  {user?.submittedAnswers.filter(item => item.status === true).length} / {user?.submittedAnswers.filter(item => item.status === false).length}</p>
            <p className="md:w-1/5 md:text-center"><span className="md:hidden">Percentage : </span> {user?.submittedAnswers.filter(item => item.status === true).length/allQuestions.length*100}%</p>
            <p className="md:w-1/5 md:text-end"> <span className="md:hidden">Total Points : </span>  {user?.submittedAnswers.filter(item => item.status === true).length}</p>
        </div>
      ))}
    </div>
  );
}

export default PointsTable;
