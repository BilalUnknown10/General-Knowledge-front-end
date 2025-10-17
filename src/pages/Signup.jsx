import React, { useContext, useState } from "react";
import Input from "../components/Input";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Store/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [CPasswordError, setCPasswordError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [existUser, setExistUser] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { User_Api, savedTokeInLocalStorage } = useContext(UserContext);

  // Functions
  const visiblePassword = () => {
    setVisiblePass(!visiblePass);
  };

  const handleInput = async (e) => {
    try {
      const { name, value } = e.target;
      if (name === "name") setUserName(value);
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "CPassword") setCPassword(value);
    } catch (error) {
      console.log("error in login component handle input function", error);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${User_Api}/userRegistration`, {
        userName,
        email,
        password,
        CPassword
      });

      if (response.status === 201) {
        const { message, token } = response.data;
        await savedTokeInLocalStorage(token);

        toast.success(message);

        setUserName("");
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      // console.log("error in signup component signup function", error.response.data);
      const responseError = error.response.data;
      if (!userName) return setUserNameError(responseError);
      if (!email) return setEmailError(responseError);
      if (!password) return setPasswordError(responseError);
      if(!CPassword) return setCPasswordError(responseError);
      if (responseError.field === "invalidGmail") {
        setInvalidEmail(responseError.message);
      }
      if (responseError.field === "existUser") {
        setExistUser(responseError.message);
      }

      if(password !== CPassword){
        setPasswordError(responseError);
      }
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20 flex flex-col items-center justify-center bg-green-800">
      <div className=" relative border border-gray-500 shadow-md shadow-gray-500 rounded-md md:w-[400px] w-[90vw] md:p-10 py-10 px-5 bg-green-50">
        <Link to={"/"}>
          <ClearIcon className="absolute text-white bg-red-500 top-2 cursor-pointer right-2" />
        </Link>
        <h1 className="md:text-3xl text-2xl text-center border-b pb-2 font-bold tracking-widest">
          Sign Up
        </h1>
        {existUser ? (
          <p className="text-red-500 text-center mt-3">{existUser}</p>
        ) : (
          ""
        )}
        <div>
          <Input
            mainDivClassName={"mt-5 mt-12"}
            label={"Name"}
            type={"text"}
            name={"name"}
            inputId={"name"}
            inputValue={userName}
            inputClassName={"border w-full"}
            placeholder={"Enter Your Name"}
            onChange={handleInput}
          />
          {!userName  && (
            <span className="text-red-500">{userNameError}</span>
          )}
        </div>
        <div>
          <Input
            mainDivClassName={"mt-5"}
            label={"Email"}
            type={"email"}
            name={"email"}
            inputId={"email"}
            inputValue={email}
            inputClassName={"border w-full"}
            placeholder={"Example123@gmail.com"}
            onChange={handleInput}
          />
          {!email && <span className="text-red-500">{emailError}</span>}
          {invalidEmail && (
            <span className="text-red-500">{invalidEmail}</span>
          )}
        </div>
        <div className="relative mb-5">
          <Input
            mainDivClassName={"mt-5"}
            label={"Password"}
            type={`${visiblePass ? "text" : "password"}`}
            name={"password"}
            inputId={"password"}
            inputValue={password}
            inputClassName={"border w-full"}
            placeholder={"Password"}
            onChange={handleInput}
          />
          {!password && (
            <span className="text-red-500">{passwordError}</span>
          )}
          {visiblePass ? (
            <VisibilityIcon
              className="absolute top-8 md:top-12 cursor-pointer right-4"
              onClick={visiblePassword}
            />
          ) : (
            <VisibilityOffIcon
              className="absolute top-8 md:top-12 cursor-pointer right-4"
              onClick={visiblePassword}
            />
          )}
        </div>
        <div className="relative mb-5">
          <Input
            mainDivClassName={"mt-5"}
            label={"Confirm Password"}
            type={`${visiblePass ? "text" : "password"}`}
            name={"CPassword"}
            inputId={"CPassword"}
            inputValue={CPassword}
            inputClassName={"border w-full"}
            placeholder={"Confirm Password"}
            onChange={handleInput}
          />
          {!CPassword && (
            <span className="text-red-500">{CPasswordError}</span>
          )}
          {visiblePass ? (
            <VisibilityIcon
              className="absolute top-8 md:top-12 cursor-pointer right-4"
              onClick={visiblePassword}
            />
          ) : (
            <VisibilityOffIcon
              className="absolute top-8 md:top-12 cursor-pointer right-4"
              onClick={visiblePassword}
            />
          )}
        </div>
        <div className="text-end">
          <button
            onClick={signUp}
            disabled={loading}
            className={`md:text-xl md:tracking-widest text-white px-8 py-2 rounded transition-all duration-300 w-full
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 cursor-pointer"
    }
  `}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
        <div className="border-t w-full mt-10 relative">
          <h1 className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-sm text-gray-600">
            OR
          </h1>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-500 cursor-pointer md:text-xl md:tracking-widest text-white px-4 py-2 rounded transition-all duration-300 w-full hover:bg-blue-600">
            Signup with Google
          </button>
        </div>
        <div className="mt-8 text-center">
          <Link to={"/login"}>
            <button className="bg-green-500 cursor-pointer md:text-xl md:tracking-widest text-white px-4 py-2 rounded transition-all duration-300 w-full hover:bg-green-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
