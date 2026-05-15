import React, { useContext, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleDownloadPdf } from "../Store/Download_pdf";

function MCQS() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const token = localStorage.getItem("GKT");
  const navigate = useNavigate();

  const { User_Api, userDetails, refreshUserDetails } =
    useContext(UserContext);

  const prev = () => qIndex > 0 && setQIndex((p) => p - 1);

  const next = () => {
    if (qIndex < allQuestions.length - 1) setQIndex((p) => p + 1);
  };

  const submit = async (id) => {
    if (!answer) return toast.error("Select an answer first");

    setSubmitLoading(true);
    try {
      const res = await axios.post(
        `${User_Api}/userSubmitAnswer/${id}`,
        { submitAnswer: answer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setAnswer("");
        refreshUserDetails(token);
      }
    } catch (err) {
      toast.error("Submission failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const download = () => handleDownloadPdf(allQuestions);

  useEffect(() => {
    document.title = "MCQ Quiz | General Knowledge";

    if (!token) navigate("/login");

    const fetch = async () => {
      try {
        const res = await axios.get(`${User_Api}/getAllQuestions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllQuestions(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const q = allQuestions[qIndex];
  const isAnswered =
    userDetails?.submittedAnswers?.length > qIndex;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-3 py-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-green-600 text-white flex justify-between items-center px-5 py-4">
          <h1 className="text-lg sm:text-2xl font-bold">
            Question {qIndex + 1}
          </h1>

          <div className="flex gap-3">
            <button onClick={prev}>
              <ArrowRightAltIcon className="rotate-180 !text-4xl" />
            </button>
            <button onClick={next}>
              <ArrowRightAltIcon className="!text-4xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8">

          {/* Loading */}
          {loading ? (
            <div className="h-60 flex flex-col justify-center items-center">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-green-600 font-semibold">
                Loading Questions...
              </p>
            </div>
          ) : !q ? (
            <p className="text-center text-gray-500">No Questions Found</p>
          ) : (
            <>
              {/* Question */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {qIndex + 1}. {q.question}
              </h2>

              {/* Options / Result */}
              {!isAnswered ? (
                <div className="mt-6 space-y-3">

                  {q.answers.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition
                      hover:border-green-500 hover:bg-green-50
                      ${answer === opt ? "border-green-600 bg-green-50" : ""}`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={opt}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                      <span className="text-gray-700 font-medium">
                        {opt}
                      </span>
                    </label>
                  ))}

                  {/* Submit */}
                  <button
                    onClick={() => submit(q._id)}
                    disabled={submitLoading}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    {submitLoading ? "Submitting..." : "Submit Answer"}
                  </button>
                </div>
              ) : (
                <div className="mt-6">

                  {userDetails?.submittedAnswers?.[qIndex]?.status ? (
                    <div className="text-green-600 font-bold text-lg">
                      ✅ Correct Answer
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold text-lg">
                      ❌ Wrong Answer
                    </div>
                  )}

                  <div className="mt-4 space-y-2 text-gray-700">
                    <p>
                      Your Answer:{" "}
                      <span className="font-semibold">
                        {userDetails?.submittedAnswers?.[qIndex]?.answer}
                      </span>
                    </p>

                    <p>
                      Correct Answer:{" "}
                      <span className="font-semibold text-green-600">
                        {q.correctAnswer}
                      </span>
                    </p>
                  </div>

                  {qIndex < allQuestions.length - 1 && (
                    <button
                      onClick={next}
                      className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Download */}
          {userDetails?.submittedAnswers?.length ===
            allQuestions?.length &&
            qIndex === allQuestions.length - 1 && (
              <button
                onClick={download}
                className="mt-6 w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-black"
              >
                Download Results PDF
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default MCQS;