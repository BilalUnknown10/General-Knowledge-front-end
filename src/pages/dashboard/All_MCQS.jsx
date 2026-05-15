import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Store/UserContext";
import { toast } from "react-toastify";

function All_MCQS() {
  const [allMCQS, setAllMCQS] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const { Admin_Api } = useContext(UserContext);
  const token = localStorage.getItem("GKT");

  const getAllMCQS = async () => {
    try {
      const res = await axios.get(`${Admin_Api}/allMCQS`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllMCQS(res.data.getAllMCQS || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllMCQS = async () => {
    setActionLoading(true);
    try {
      const res = await axios.delete(`${Admin_Api}/deleteAllMCQS`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      setAllMCQS([]);
    } catch (err) {
      toast.error("Failed to delete MCQs");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteAllAnswers = async () => {
    setActionLoading(true);
    try {
      const res = await axios.delete(`${Admin_Api}/deleteAllAnswers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete answers");
    } finally {
      setActionLoading(false);
    }
  };

  const sendMailToAllUsers = async () => {
    setActionLoading(true);
    try {
      const res = await axios.post(
        `${Admin_Api}/sendEmailToAllUser`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error("Email sending failed");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    getAllMCQS();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 text-2xl font-bold">
        MCQ Management
      </div>

      {/* Action Bar */}
      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-3 md:justify-end">

        <button
          onClick={deleteAllMCQS}
          disabled={actionLoading}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
          Delete All MCQs
        </button>

        <button
          onClick={deleteAllAnswers}
          disabled={actionLoading}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
          Delete All Answers
        </button>

        <button
          onClick={sendMailToAllUsers}
          disabled={actionLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
          {actionLoading ? "Processing..." : "Send Email"}
        </button>

      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : allMCQS.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No MCQs found
        </p>
      ) : (
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-5">

          {allMCQS.map((q, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 border border-gray-100"
            >

              {/* Question */}
              <h2 className="text-lg font-bold text-gray-800">
                {i + 1}. {q.question}
              </h2>

              {/* Options */}
              <div className="mt-3 grid gap-2">
                {q.answers.map((ans, idx) => (
                  <p
                    key={idx}
                    className="px-3 py-1 bg-gray-50 rounded-md text-gray-700"
                  >
                    {ans}
                  </p>
                ))}
              </div>

              {/* Correct Answer */}
              <p className="mt-3 text-green-700 font-semibold">
                Correct Answer: {q.correctAnswer}
              </p>

              {/* Actions */}
              <div className="mt-5 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default All_MCQS;