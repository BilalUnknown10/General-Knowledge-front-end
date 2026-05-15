import React, { useEffect, useState, useContext } from "react";
import UserContext from "../Store/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FeedbackForm() {
  const { userDetails, User_Api, loginUserToken } = useContext(UserContext);

  const [userFeedback, setUserFeedback] = useState({
    name: "",
    email: "",
    image: "",
    feedback: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFeedback = (e) => {
    const { name, value } = e.target;
    setUserFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${User_Api}/feedback`,
        userFeedback,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUserToken}`,
          },
        }
      );

      toast.success(res.data.message || "Feedback submitted");

      setUserFeedback((prev) => ({
        ...prev,
        feedback: "",
      }));

      navigate("/");
    } catch (err) {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
      return;
    }

    setUserFeedback({
      name: userDetails.userName || "",
      email: userDetails.email || "",
      image: userDetails?.userProfileImage || "",
      feedback: "",
    });
  }, [userDetails]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      <form
        onSubmit={submitFeedback}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6"
      >

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600">
          Share Your Feedback
        </h1>

        {/* Name */}
        <div>
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            readOnly
            value={userFeedback.name}
            className="w-full mt-2 p-3 border rounded-xl bg-gray-100 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            readOnly
            value={userFeedback.email}
            className="w-full mt-2 p-3 border rounded-xl bg-gray-100 outline-none"
          />
        </div>

        {/* Feedback */}
        <div>
          <label className="font-semibold text-gray-700">Feedback</label>
          <textarea
            name="feedback"
            value={userFeedback.feedback}
            onChange={handleFeedback}
            rows={5}
            placeholder="Write your experience..."
            className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-400"
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
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </form>

    </div>
  );
}

export default FeedbackForm;