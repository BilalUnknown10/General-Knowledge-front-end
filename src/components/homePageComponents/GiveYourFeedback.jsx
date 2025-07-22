import React from "react";

function GiveYourFeedback() {
  return (
    <div className="mt-20">
      <h1 className="md:text-3xl font-bold tracking-wider text-center">
        Give Your Feedback
      </h1>
      <div className="md:flex py-10 md:py-20">
        <div className="md:w-1/2 md:border-b-2 border-green-200">
          <h1 className="md:text-3xl font-bold tracking-wider">💬 We’d Love Your Feedback!</h1>
          <p className="md:text-2xl my-4 md:my-10 leading-loose md:leading-20">
            Your opinion matters to us. Whether you enjoyed the quiz, faced any
            issue, or have a cool idea to improve the site — we’d love to hear
            it! <br />
            ✅ Tell us what you liked <br />
            ✅ Share anything we can improve <br />
            ✅ Help us make this platform better for everyone! <br />
            Just drop your thoughts below — short or long, we’re all ears. 👂😊
          </p>
        </div>
        <div className="md:border border-green-200 shadow-md "></div>
        <div className="md:w-1/2 border-t-2 border-green-200 pt-10">
          <form action="">
            <div className="text-xl font-bold tracking-wider text-center">Your Feedback</div>
            <div className="text-xl md:p-4 py-4">
              <label className="font-bold" htmlFor="userName">
                Name :{" "}
              </label>
              <input
                type="text"
                className="border w-full border-gray-300 shadow-md rounded-md outline-0 py-2 px-4 text-xl"
              />
            </div>
            <div className="text-xl md:p-4 py-4">
              <label className="font-bold" htmlFor="email">
                Email :{" "}
              </label>
              <input
                type="email"
                className="border border-gray-300 shadow-md w-full rounded-md outline-0 py-2 px-4 text-xl"
              />
            </div>
            <div className="text-xl md:p-4 py-4">
              <label className="font-bold" htmlFor="email">
                Message :{" "}
              </label>
              <textarea
                cols={"30"}
                rows={"5"}
                className="border border-gray-300 shadow-md w-full rounded-md outline-0 py-2 px-4 text-xl"
              />
            </div>
            <div className="p-2 text-end">
                <button className="shadow-md cursor-pointer hover:tracking-wider transition-all ease-in-out duration-500 hover:bg-green-500 hover:text-white font-semibold text-black md:text-xl py-2 px-5 rounded-md bg-green-400">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GiveYourFeedback;
