import React from "react";
import { Link } from "react-router-dom";

function GiveYourFeedback() {
  return (
    <div className="md:mt-10 mt-10">
      <h1 className="md:text-3xl text-2xl font-bold tracking-wider text-center">
        Give Your Feedback
      </h1>
      <div className="py-10 md:py-20">
        <div className="">
          <h1 className="md:text-2xl font-bold tracking-wider">💬 We’d Love Your Feedback!</h1>
          <p className="md:text-2xl my-4 md:my-10 leading-loose md:leading-12 md:mx-10">
            Your opinion matters to us. Whether you enjoyed the quiz, faced any
            issue, or have a cool idea to improve the site — we’d love to hear
            it! <br />
            ✅ Tell us what you liked <br />
            ✅ Share anything we can improve <br />
            ✅ Help us make this platform better for everyone! <br />
            Just drop your thoughts below — short or long, we’re all ears. 👂😊
          </p>
          <div className="text-center">
            <Link to={'/feedback'}>            
            <button className="border px-10 py-2 rounded-md cursor-pointer font-bold bg-[var(--primary)] text-white border-none">Feedback</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiveYourFeedback;
