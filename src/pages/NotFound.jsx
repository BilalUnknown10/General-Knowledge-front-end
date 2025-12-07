import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="h-[100vh] flex justify-center flex-col gap-5 items-center">
      <h1 className="text-3xl">404 Page Not Found</h1>
      <button
        className="px-20 py-2 bg-[var(--primary)] cursor-pointer text-white rounded-lg hover:bg-green-700"
        onClick={backToHome}
      >
        Back
      </button>
    </div>
  );
}

export default NotFound;
