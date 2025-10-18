import React, { useContext, useState } from "react";
import Input from "./Input";
import axios from 'axios';
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPasswordLink() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const {User_Api} = useContext(UserContext);

  const sendForgePasswordLink = async () => {
    try {
        const response = await axios.post(`${User_Api}/forgetPasswordLink`,{email});
        if(response.status === 200) {
            toast.success(response.data);
            navigate("/login", {replace : true});
        }
    } catch (error) {
        console.log("error in send password forget link", error);
        toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-green-500 h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="bg-white h-[90vh] w-[90vw] rounded-md flex flex-col justify-center items-center">
        <div className="text-center py-5 md:py-10">
          <h1 className="font-bold text-2xl md:text-4xl">Please Enter Your Registered Email</h1>
          <p className="font-bold text-xl py-5">We will send forget password link on your register email</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <Input
            mainDivClassName={"my-5 mt-12"}
            // label={"Email : "}
            type={"email"}
            name={"email"}
            inputId={"email"}
            inputValue={email}
            inputClassName={"border w-[70vw]"}
            placeholder={"Example123@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-center w-[70vw] flex justify-between mt-6">
            <button className="md:w-[30vh] w-[15vh] hover:cursor-pointer font-bold md:text-2xl bg-green-500 py-3 rounded-md text-white ">Back</button>
            <button onClick={sendForgePasswordLink} className="md:w-[30vh] w-[15vh] hover:cursor-pointer font-bold md:text-2xl bg-green-500 py-3 rounded-md text-white ">Send Email Link</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordLink;
