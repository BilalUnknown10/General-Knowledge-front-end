import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Store/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PointsTable() {
  const { User_Api } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("GKT");

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchData = async () => {
      try {
        const [usersRes, quesRes] = await Promise.all([
          axios.get(`${User_Api}/getAllUsers`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${User_Api}/getAllQuestions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAllUsers(usersRes.data);
        setAllQuestions(quesRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token]);

  const totalQ = allQuestions.length || 1;

  const getCorrect = (user) =>
    user?.submittedAnswers?.filter((i) => i.status).length || 0;

  const getWrong = (user) =>
    user?.submittedAnswers?.filter((i) => !i.status).length || 0;

  const getPercent = (user) =>
    Math.floor((getCorrect(user) / totalQ) * 100);

  const sortedUsers = [...allUsers].sort((a, b) => {
    const diff = getCorrect(b) - getCorrect(a);
    return diff;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-3 py-8">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-500 mt-2">
          Top performers based on MCQ performance
        </p>
      </div>

      {/* Table Header (Desktop) */}
      <div className="hidden md:flex max-w-5xl mx-auto bg-green-600 text-white rounded-xl px-6 py-4 font-bold">
        <div className="w-1/5">Name</div>
        <div className="w-1/5 text-center">Questions</div>
        <div className="w-1/5 text-center">Correct / Wrong</div>
        <div className="w-1/5 text-center">%</div>
        <div className="w-1/5 text-end">Points</div>
      </div>

      {/* Users */}
      <div className="max-w-5xl mx-auto mt-4 space-y-4">

        {sortedUsers.map((user, i) => (
          <div
            key={i}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 flex flex-col md:flex-row md:items-center"
          >

            {/* Name */}
            <div className="md:w-1/5 font-semibold text-lg text-gray-800">
              #{i + 1} {user.userName}
            </div>

            {/* Total */}
            <div className="md:w-1/5 text-gray-600 md:text-center mt-2 md:mt-0">
              {user?.submittedAnswers?.length} / {totalQ}
            </div>

            {/* Correct / Wrong */}
            <div className="md:w-1/5 md:text-center mt-2 md:mt-0">
              <span className="text-green-600 font-semibold">
                {getCorrect(user)}
              </span>{" "}
              /{" "}
              <span className="text-red-500 font-semibold">
                {getWrong(user)}
              </span>
            </div>

            {/* Percentage */}
            <div className="md:w-1/5 md:text-center mt-2 md:mt-0 font-semibold">
              {getPercent(user)}%
            </div>

            {/* Points */}
            <div className="md:w-1/5 md:text-end mt-2 md:mt-0 font-bold text-green-700">
              {getCorrect(user)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PointsTable;