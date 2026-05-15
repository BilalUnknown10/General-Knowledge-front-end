import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "../../Store/UserContext";
import { toast } from "react-toastify";
import Admin_Navbar from "./Admin_Navbar";

function DashboardMain() {
  const { Admin_Api, loginUserToken } = useContext(UserContext);

  const [addMcq, setAddMcq] = useState({
    question: "",
    answers: "",
    correctAnswer: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddMcq((prev) => ({ ...prev, [name]: value }));
  };

  const uploadMcq = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${Admin_Api}/uploadMCQ`,
        addMcq,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUserToken}`,
          },
        }
      );

      toast.success("MCQ Posted Successfully 🎉");

      setAddMcq({
        question: "",
        answers: "",
        correctAnswer: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 text-2xl font-bold">
        Admin Dashboard - Add MCQ
      </div>

      {/* Navbar */}
      <Admin_Navbar />

      {/* Form Container */}
      <div className="flex justify-center px-4 py-10">

        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New MCQ
          </h2>

          <form onSubmit={uploadMcq} className="space-y-6">

            {/* Question */}
            <div>
              <label className="font-semibold text-green-600">
                Question
              </label>
              <textarea
                name="question"
                value={addMcq.question}
                onChange={handleInput}
                rows={4}
                placeholder="Write your question here..."
                className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Answers */}
            <div>
              <label className="font-semibold text-green-600">
                Answers
                <span className="text-sm text-gray-500 ml-2">
                  (comma separated)
                </span>
              </label>

              <input
                type="text"
                name="answers"
                value={addMcq.answers}
                onChange={handleInput}
                placeholder="Option A, Option B, Option C"
                className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Correct Answer */}
            <div>
              <label className="font-semibold text-green-600">
                Correct Answer
              </label>

              <input
                type="text"
                name="correctAnswer"
                value={addMcq.correctAnswer}
                onChange={handleInput}
                placeholder="Enter correct option"
                className="w-full mt-2 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Posting..." : "Post MCQ"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;