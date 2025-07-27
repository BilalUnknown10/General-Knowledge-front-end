import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {questions} from '../components/homePageComponents/json.js'

function MCQS() {

  const [nextTooltip, setNextToolTip] = useState(false);
  const [prevTooltip, setPrevToolTip] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  // next mcqs
const nextMcqs = (e) => {
  e.preventDefault();
  if (questionNumber < questions.length - 1) {
    setQuestionNumber(prev => prev + 1);
  }
};

// previous mcqs
const prevMcqs = () => {
  if (questionNumber > 0) {
    setQuestionNumber(prev => prev - 1);
  }
};

  return (
    <div className="p-5 md:p-10 bg-green-100 h-[90vh] flex justify-center flex-col items-center">
       <div className="flex items-center justify-between  text-white p-5 bg-green-500 w-full md:w-1/2 rounded-t-md">
          <h1 className="text-2xl font-bold">Question</h1>
          <div className="flex items-center gap-5 ">
            <div
              className=" "
              onMouseEnter={() => setPrevToolTip(true)}
              onMouseLeave={() => setPrevToolTip(false)}
            >
              <ArrowRightAltIcon onClick = {prevMcqs} className="rotate-180 cursor-pointer !text-4xl" />
              <span
                className={`hidden md:block md:absolute md:top-1 md:right-16 md:px-2 md:rounded-b-sm  md:bg-green-800 md:text-white md:transition-all md:ease-in-out md:duration-500 ${
                  prevTooltip ? "md:translate-x-[0px] md:opacity-100" : "md:translate-y-[-10px] md:opacity-0"
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
              <ArrowRightAltIcon onClick = {nextMcqs} className={`cursor-pointer !text-4xl`} />
              <span
                className={`hidden md:block absolute top-1 right-2 px-2 rounded-b-sm bg-green-800 text-white transition-all ease-in-out duration-500 ${
                  nextTooltip ? "translate-x-[0px] opacity-100" : "translate-y-[-10px] opacity-0"
                }`}
              >
                Next
              </span>
            </div>
          </div>
        </div>
      <div className="border border-green-500 rounded-b-md h-[48vh] w-full md:w-1/2 md:min-h-1/2  relative overflow-x-hidden">
        <ul className={`md:px-10 px-5 mt-10`}>
          <li className=" flex gap-2 font-bold text-xl">
            {questionNumber+1}
            <p>{questions[questionNumber].question}</p>
          </li>
        </ul>
        <form className="space-y-4 p-10">
          {questions[questionNumber].answers.map((answer, i) => {
            return <label className="block" key={i}>
            <input
              type="radio"
              name="question1"
              value="option1"
              className="mr-2"
            />
            {answer}
          </label>
          })}
        </form>
        <div className=" text-right m-5">
            <button onClick={nextMcqs} className="bg-green-500 px-5 py-2 rounded-md hover:cursor-pointer text-white hover:bg-green-700 transition-all duration-500 ease-in-out border-none">Move Next</button>
          </div>
      </div>
    </div>
  );
}

export default MCQS;

