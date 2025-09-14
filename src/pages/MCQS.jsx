import React, { useContext, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import {questions} from '../components/homePageComponents/json.js'
import UserContext from "../Store/UserContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { handleDownloadPdf } from "../Store/Download_pdf.jsx";

function MCQS() {
  const [nextTooltip, setNextToolTip] = useState(false);
  const [prevTooltip, setPrevToolTip] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [submitAnswer, setSubmitAnswer] = useState("");
  const [isMcqsFill, setIsMcqsFill] = useState("");
  const [completedAllQuestions, setCompletedAllQuestions] = useState(false);
  const navigate = useNavigate();

  const {
    userDetails,
    loginUserToken,
    User_Api,
    refreshUserDetails,
  } = useContext(UserContext);
  

  // next mcqs
  const nextMcqs = (e) => {
    e.preventDefault();
    if (userDetails?.submittedAnswers[questionNumber]) {
      if (questionNumber < allQuestions.length - 1) {
        setQuestionNumber((prev) => prev + 1);
      }
    }
  };

  // previous mcqs
  const prevMcqs = () => {
    if (questionNumber > 0) {
      setQuestionNumber((prev) => prev - 1);
    }
  };

  const submittedAnswer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${User_Api}/userSubmitAnswer/${allQuestions[questionNumber]._id}`,
        { submitAnswer },
        {
          headers: {
            Authorization: `Bearer ${loginUserToken}`,
          },
        }
      );

      if (response.status === 200) {
        await refreshUserDetails(loginUserToken);
        const convertToNumber = Number(
          response.data?.saveAnswer?.submittedAnswers?.length - 1 || 0
        );
        setQuestionNumber(convertToNumber);
      }
    } catch (error) {
      setIsMcqsFill(error.response.data.message);
    }
  };

  const inputValue = (e) => {
    const value = e.target.value;
    setSubmitAnswer(value);
  };

  const downloadMcqs = () => {
    handleDownloadPdf(allQuestions);
  }

  useEffect(() => {
    if (userDetails?.isEmailVerified === false) {
      toast.warn("Please check guideline section verify your email");
      navigate("/");
    }

    if (!loginUserToken) {
      navigate("/login");
    }

    const getAllQuestions = async () => {
      try {
        const response = await axios.get(`${User_Api}/getAllQuestions`, {
          headers: {
            Authorization: `Bearer ${loginUserToken}`,
          },
        });
        setAllQuestions(response.data);

        if (allQuestions?.length > userDetails?.submittedAnswers?.length) {
          // const convertToNumber = Number(allQuestions?.length - 1);
          const convertToNumber = Number(userDetails?.submittedAnswers?.length);
          setQuestionNumber(convertToNumber);
        } else {
          const convertToNumber = Number(
            userDetails?.submittedAnswers?.length - 1 || 0
          );
          setQuestionNumber(convertToNumber);
          setCompletedAllQuestions(true);
        }
      } catch (error) {
        console.log("Error in getting all mcqs function : ", error);
      }
    };

    getAllQuestions();
  }, [loginUserToken, navigate, User_Api, userDetails]);

  return (
    <div className=" relative p-5 md:p-10 bg-green-100 h-[90vh] flex justify-center flex-col items-center">
      {userDetails?.submittedAnswers?.length === allQuestions?.length && (
        <div>
        <button onClick={downloadMcqs} className="text-xl bg-green-500 px-10 py-2 text-white font-bold rounded-md absolute md:top-10 bottom-10 right-10 cursor-pointer">Download All MCQS</button>
       </div>
      )}
      <div className="flex items-center justify-between  relative text-white p-5 bg-green-500 w-full md:w-1/2 rounded-t-md">
        <h1 className="text-2xl font-bold">Question</h1>
        <div className="flex items-center gap-5 ">
          <div
            className=" "
            onMouseEnter={() => setPrevToolTip(true)}
            onMouseLeave={() => setPrevToolTip(false)}
          >
            <ArrowRightAltIcon
              onClick={prevMcqs}
              className="rotate-180 cursor-pointer !text-4xl"
            />
            <span
              className={`hidden md:block md:absolute md:top-1 md:right-16 md:px-2 md:rounded-b-sm  md:bg-green-800 md:text-white md:transition-all md:ease-in-out md:duration-500 ${
                prevTooltip
                  ? "md:translate-x-[0px] md:opacity-100"
                  : "md:translate-y-[-10px] md:opacity-0"
              }`}
            >
              Previous
            </span>
          </div>

          <div
            className=""
            onMouseEnter={() => setNextToolTip(true)}
            onMouseLeave={() => setNextToolTip(false)}
          >
            <ArrowRightAltIcon
              onClick={nextMcqs}
              className={`cursor-pointer !text-4xl`}
            />
            <span
              className={`hidden md:block absolute top-1 right-2 px-2 rounded-b-sm bg-green-800 text-white transition-all ease-in-out duration-500 ${
                nextTooltip
                  ? "translate-x-[0px] opacity-100"
                  : "translate-y-[-10px] opacity-0"
              }`}
            >
              Next
            </span>
          </div>
        </div>
      </div>
      <div className="border border-green-500 rounded-b-md h-[48vh] w-full md:w-1/2 md:min-h-1/2  relative overflow-x-hidden">
        {allQuestions.length > 0 ?
          <ul className={`md:px-10 px-5 mt-10`}>
            <li className=" flex gap-2 font-bold text-xl">
              {questionNumber + 1}.
              <p>
                {allQuestions?.length > 0 &&
                  allQuestions[questionNumber]?.question}
              </p>
            </li>
          </ul>
         :
          <div className="h-[30vh] flex justify-center items-center">
            <p className="font-bold md:text-2xl text-xl">No MCQS Posted Yet</p>
          </div>
        }

        {allQuestions.length > 0 ?
        <>
        {userDetails?.submittedAnswers?.[questionNumber] ? (
          <div>
            {userDetails?.submittedAnswers?.[questionNumber]?.status ===
            true ? (
              <div className="py-10 px-10">
                <h1 className="font-semibold md:text-xl text-green-600 ">
                  Correct Answer
                </h1>
                <p className="py-5">
                  Your Answer is ={" "}
                  <strong className="text-green-600 ">
                    {userDetails?.submittedAnswers?.[questionNumber]?.answer}
                  </strong>
                </p>
                <p>
                  Correct Answer is ={" "}
                  <strong className="text-green-600 ">
                    {allQuestions?.[questionNumber]?.correctAnswer}
                  </strong>
                </p>
                {completedAllQuestions && (
                  <h1 className="mt-10 font-bold text-green-700">
                    You completed all questions
                  </h1>
                )}
              </div>
            ) : (
              <div className="py-10 px-10">
                <h1 className="font-semibold md:text-xl text-red-600">
                  Wrong Answer
                </h1>
                <p className="py-5">
                  Your Answer is ={" "}
                  <strong className="text-red-600">
                    {userDetails?.submittedAnswers?.[questionNumber]?.answer}
                  </strong>
                </p>
                <p>
                  Correct Answer is ={" "}
                  <strong className="text-green-500 ">
                    {allQuestions?.[questionNumber]?.correctAnswer}
                  </strong>
                </p>
                {completedAllQuestions && (
                  <h1 className="mt-10 font-bold text-green-700">
                    You completed all questions
                  </h1>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <form className="space-y-4 p-10">
              {submitAnswer === "" && (
                <span className="text-red-500 my-2">{isMcqsFill}</span>
              )}
              {allQuestions?.length > 0 &&
                allQuestions[questionNumber]?.answers.map((answer, i) => {
                  return (
                    <label className="block cursor-pointer" key={i}>
                      <input
                        type="radio"
                        name="question1"
                        value={`${answer}`}
                        className="mr-2 cursor-pointer"
                        onClick={inputValue}
                      />
                      {answer}
                    </label>
                  );
                })}
            </form>
            {allQuestions.length > 0 && (
              <div className=" text-right m-5">
                <button
                  onClick={submittedAnswer}
                  className="bg-green-500 px-5 py-2 rounded-md hover:cursor-pointer text-white hover:bg-green-700 transition-all duration-500 ease-in-out border-none"
                >
                  Move Next
                </button>
              </div>
            )}
          </div>
        )}</> : ""}
      </div> 
    </div>
  );
}

export default MCQS;
