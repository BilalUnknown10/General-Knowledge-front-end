import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Store/UserContext";

function All_MCQS() {
  const [allMCQS, setAllMCQS] = useState([]);

  const { Admin_Api } = useContext(UserContext);

  const token = localStorage.getItem("GKT");

  const getAllMCQS = async () => {
    try {
      const response = await axios.get(`${Admin_Api}/allMCQS`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAllMCQS(response.data.getAllMCQS);
      }
    } catch (error) {
      console.log("error in all mcqs dashboard : ", error);
    }
  };

  useEffect(() => {
    getAllMCQS();
  }, []);
  return (
    <div className="">
      <div className="py-3 px-10 bg-green-500 font-bold md:text-4xl text-white">
        <h1>All MCQ'S</h1>
      </div>

      <div className="my-10 px-10 text-end">
        <button className="bg-red-500 text-xl font-bold cursor-pointer text-white px-10 py-2 rounded-md">
          Delete All MCQ'S
        </button>
      </div>

      {allMCQS.map((question,i) => (
        <div key={i} className="border border-green-500 m-5 rounded-md py-5 px-10">
          {/* Question */}
          <div className="">
            <p className="font-bold text-xl"> {question.question}</p>
          </div>
          
          {/* Choices */}
          <div className="my-3">
            {question.answers.map((answer,i) => {
              return <p key={i} className="text-xl px-2">{answer}</p>
            })}
          </div>

          {/* Correct anser */}
          <div className="text-xl">
            <p>Correct Answer : {question.correctAnswer}</p>
          </div>

           {/* Buttons */}
        <div className="mt-5 text-end">
          <button className="px-10 bg-red-500 cursor-pointer text-white py-2 rounded-md font-bold">Delete</button>
        </div>
        </div>
      ))}
    </div>
  );
}

export default All_MCQS;
