import React, { useContext, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleDownloadPdf } from "../Store/Download_pdf";

function MCQS() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [submitAnswer, setSubmitAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const token = localStorage.getItem("GKT");

  const navigate = useNavigate();

  const { User_Api, userDetails, refreshUserDetails } = useContext(UserContext);

  // Previous question...
  const prevQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber((prev) => prev - 1);
    }
  };

  // Next question...
  const nextQuestion = () => {
    console.log("Clicked");
    if (
      questionNumber < userDetails?.submittedAnswers?.length &&
      questionNumber < allQuestions?.length - 1
    ) {
      setQuestionNumber((prev) => prev + 1);
    }
  };

  // Submit answer API..
  const submitQuestion = async (id) => {
    setSubmitLoading(true);
    try {
      if (!submitAnswer) {
        return toast.error("Please select one");
      }
      const response = await axios.post(
        `${User_Api}/userSubmitAnswer/${id}`,
        { submitAnswer },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        setSubmitAnswer("");
        refreshUserDetails(token);
      }
    } catch (error) {
      console.log("error in submit question function : ", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Download all question function...
  const handleDownloadMCQS = () => {
    handleDownloadPdf(allQuestions)
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token && userDetails?.isEmailVerified === false) {
      navigate("/");
      toast.warn("Please Verify Your Email");
    }

    const getAllQuestions = async () => {
      try {
        const response = await axios.get(`${User_Api}/getAllQuestions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAllQuestions(response.data);
      } catch (error) {
        console.log("error in get all mcq's : ", error);
      }
    };

    getAllQuestions();

    if (userDetails?.submittedAnswers?.length > 0) {
      setQuestionNumber(userDetails?.submittedAnswers?.length - 1);
    } else {
      setQuestionNumber(userDetails?.submittedAnswers?.length);
    }
    console.log("useEffect....");
  }, [userDetails, User_Api, token]);
  console.log(questionNumber);

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      {/* MCQ'S header section */}
      <div className="bg-green-500 rounded-t-xl md:w-1/2 w-[90vw] px-5 py-2 flex justify-between items-center ">
        <div className="md:text-3xl text-xl font-bold text-white">
          <h1>Question</h1>
        </div>
        <div className="flex gap-5">
          <ArrowRightAltIcon
            onClick={prevQuestion}
            className="rotate-180 text-white !text-5xl hover:cursor-pointer"
          />
          <ArrowRightAltIcon
            onClick={nextQuestion}
            className="text-white !text-5xl hover:cursor-pointer"
          />
        </div>
      </div>

      {/* MCQ'S section */}
      <div className="border border-green-500 overflow-y-auto h-[50vh] md:w-1/2 w-[90vw] rounded-b-xl">
        {allQuestions.length < 1 ? (
          <div className="h-[45vh] flex justify-center items-center font-bold text-2xl">
            <p>No MCQ'S Posted Yet</p>
          </div>
        ) : (
          <>
            <>
              {/* Question */}
              <div className="p-10 flex flex-col">
                <p className="font-bold text-xl">
                  <strong className="text-green-600 text-2xl">
                    {questionNumber + 1}.{" "}
                  </strong>
                  {allQuestions[questionNumber]?.question}
                </p>
                {questionNumber > userDetails?.submittedAnswers?.length - 1 ? (
                  <>
                    <div className="mt-10">
                      {allQuestions[questionNumber]?.answers.map(
                        (answer, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <input
                              type="radio"
                              id={answer}
                              name="answer"
                              className="cursor-pointer"
                              value={answer}
                              onClick={(e) => setSubmitAnswer(e.target.value)}
                            />
                            <label
                              htmlFor={answer}
                              className="text-xl font-semibold cursor-pointer"
                            >
                              {answer}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                    <div className="text-end self-end mt-10">
                      <button
                        disabled={submitLoading}
                        onClick={() =>
                          submitQuestion(allQuestions[questionNumber]._id)
                        }
                        className={`px-10 py-1 rounded-md bg-green-500 font-semibold text-white text-xl ${
                          submitLoading
                            ? "cursor-not-allowed bg-green-800"
                            : "cursor-pointer"
                        }`}
                      >
                        {submitLoading ? "Please Wait..." : "Submit"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="md:p-10">
                    {userDetails?.submittedAnswers?.[questionNumber]?.status ===
                    true ? (
                      <>
                        <div className="md:mt-8 mt-20 font-bold text-xl">
                          <h1 className="text-green-500 mb-5 text-2xl">
                            <>Correct ✅</>
                          </h1>
                          <p>
                            Your Answer :{" "}
                            <strong className="text-green-500">
                              {
                                userDetails?.submittedAnswers?.[questionNumber]
                                  ?.answer
                              }
                            </strong>
                          </p>
                          <p>
                            Correct Answer :{" "}
                            <strong className="text-green-500">
                              {allQuestions[questionNumber]?.correctAnswer}
                            </strong>
                          </p>
                        </div>
                        {questionNumber !== allQuestions?.length - 1 && (
                          <div className="text-end self-end mt-10 flex justify-end gap-5">
                            <button
                              onClick={nextQuestion}
                              className={`px-10 py-1 rounded-md cursor-pointer bg-green-500 font-semibold text-white text-xl `}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="md:mt-8 mt-20 font-bold text-xl">
                          <h1 className="text-red-500 mb-5">Wrong ❌</h1>
                          <p>
                            Your Answer :{" "}
                            <strong className="text-red-500">
                              {
                                userDetails?.submittedAnswers?.[questionNumber]
                                  ?.answer
                              }
                            </strong>
                          </p>
                          <p>
                            Correct Answer :{" "}
                            <strong className="text-green-500">
                              {allQuestions[questionNumber]?.correctAnswer}
                            </strong>
                          </p>
                        </div>
                        {questionNumber !== allQuestions?.length - 1 && (
                          <div className="text-end self-end mt-10 flex justify-end">
                            <button
                              onClick={nextQuestion}
                              className={`px-10 py-1 rounded-md bg-green-500 font-semibold text-white text-xl cursor-pointer `}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
            {userDetails?.submittedAnswers?.length === allQuestions?.length && (
              <div className=" text-end px-10 ">
              <button onClick={handleDownloadMCQS} className="bg-green-400 text-white font-bold px-6 py-1 rounded-md cursor-pointer">
                Download All MCQ'S
              </button>
            </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MCQS;
