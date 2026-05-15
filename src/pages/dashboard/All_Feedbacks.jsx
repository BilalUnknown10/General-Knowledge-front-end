import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Store/UserContext";
import { toast } from "react-toastify";

function All_Feedbacks() {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Admin_Api } = useContext(UserContext);
  const token = localStorage.getItem("GKT");

  const getAllFeedbacks = async () => {
    try {
      const res = await axios.get(`${Admin_Api}/allFeedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      const res = await axios.delete(
        `${Admin_Api}/deleteFeedbackById/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);
      setAllFeedbacks((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const deleteAllFeedbacks = async () => {
    try {
      const res = await axios.delete(`${Admin_Api}/deleteAllFeedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      setAllFeedbacks([]);
    } catch (err) {
      toast.error("Failed to delete all");
    }
  };

  useEffect(() => {
    if (token) getAllFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 text-2xl font-bold">
        Feedback Management
      </div>

      {/* Actions */}
      {allFeedbacks.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-6 flex justify-end">
          <button
            onClick={deleteAllFeedbacks}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition"
          >
            Delete All
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : allFeedbacks.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No feedback found
        </p>
      ) : (
        <div className="max-w-5xl mx-auto px-4 mt-6 space-y-4">

          {allFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-5 border border-gray-100"
            >

              {/* Name */}
              <h2 className="text-lg font-bold text-gray-800">
                {feedback.name}
              </h2>

              {/* Message */}
              <p className="mt-2 text-gray-600 leading-relaxed">
                {feedback.feedback}
              </p>

              {/* Actions */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => deleteFeedback(feedback._id)}
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

export default All_Feedbacks;