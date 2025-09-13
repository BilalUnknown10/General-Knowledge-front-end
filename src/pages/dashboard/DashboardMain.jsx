import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../../Store/UserContext";
import { toast } from 'react-toastify';

function DashboardMain() {
  const { Admin_Api, loginUserToken } = useContext(UserContext);
  const [addMcq, setAddMcq] = useState({
    question: "",
    answers: "",
    correctAnswer: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setAddMcq((prev)=> (
        {
            ...prev,
            [name] : value
        }
    ))
  }

  const uploadMcq = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${Admin_Api}/uploadMCQ`,addMcq,{
        headers : {
            "Content-Type" : "Application/json",
            Authorization : `Bearer ${loginUserToken}`
        }
      });
      console.log(response.data);
      if(response.status === 200) {
        toast.success("MCQ Posted");
        setAddMcq({
          question : "",
          answers : "",
          correctAnswer : ""
        });
      }
    } catch (error) {
      // console.log("error in upload mcq file front-end", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="py-3 px-10 bg-green-500 font-bold md:text-4xl text-white">
        <h1>General Knowledge</h1>
      </div>
      <div className="my-5 px-10 font-bold flex flex-wrap gap-5">
        <button className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
          Users
        </button>
        <button className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
          MCQS
        </button>
        <button className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
          Feedbacks
        </button>
      </div>
      <div className="h-[82.5vh] flex justify-center items-center px-2">
        <form action="">
          <div>
            <label htmlFor="mcq" className="font-bold text-2xl text-green-500">
              Question
            </label>
            <div>
              <textarea
                name="question"
                value={addMcq.question}
                onChange={handleInput}
                id="mcq"
                rows={5}
                className={`border border-green-500 md:w-[90vh] w-full rounded-md md:px-10 md:py-5 outline-none`}
              ></textarea>
            </div>
          </div>
          <div className="my-10">
            <label
              htmlFor="answers"
              className="font-bold text-2xl text-green-500"
            >
              Answers :{" "}
              <span className="font-normal text-sm text-black">
                (Enter three or four options separate by ( , ) comma)
              </span>
            </label>
            <div className="">
              <input
                type="text"
                id="answers"
                name="answers"
                value={addMcq.answers}
                onChange={handleInput}
                placeholder="e.g  wrong, correct, etc,"
                className="border w-full rounded-md border-green-500 md:px-10 px-5 md:py-5 py-3 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="correctAnswer"
              className="font-bold text-2xl text-green-500"
            >
              Correct Answer :{" "}
              <span className="font-normal text-sm text-black">
                (Enter the correct one from answers)
              </span>
            </label>
            <div className="">
              <input
                type="text"
                id="correctAnswer"
                name="correctAnswer"
                value={addMcq.correctAnswer}
                placeholder="Enter correct answer"
                onChange={handleInput}
                className="border w-full rounded-md border-green-500 md:px-10 px-5 md:py-5 py-3 outline-none"
              />
            </div>
          </div>
          <div className="text-end mt-10">
            <button
              onClick={uploadMcq}
              disabled = {loading}
              className="px-10 bg-green-500 text-white py-2 rounded-md md:text-xl cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              {loading ? "Please wait" : "Post New Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashboardMain;
