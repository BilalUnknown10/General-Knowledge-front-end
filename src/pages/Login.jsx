import React, { useState } from "react";
import Input from "../components/Input";
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  

  const visiblePassword = () => {
    setVisiblePass(!visiblePass);
  }

  const handleInput = async (e) => {
    try {
      const {name, value} = e.target;

      if(name === "email") setEmail(value);
      if(name === "password") setPassword(value);

    } catch (error) {
      console.log("error in login component handle input function",error);
    }
  };

  const Login = async () => {
    try {
      console.log("Email : ", email);
      console.log("Password : ", password);

      setEmail("");
      setPassword("")
    } catch (error) {
      console.log("error in login component login function",error)
    }
  }

  return (
    <div className="p-20 flex flex-col items-center h-[100vh] justify-center bg-green-800">
      <div className=" relative border border-gray-500 shadow-md shadow-gray-500 rounded-md md:w-[400px] w-[380px] md:p-10 py-10 px-5 bg-green-50">
        <Link to={'/'}><ClearIcon className="absolute text-white bg-red-500 top-2 cursor-pointer right-2"/></Link>
        <h1 className="md:text-3xl text-2xl text-center border-b pb-2 font-bold tracking-widest">
          Login
        </h1>
        <div>
          <Input
          mainDivClassName={"my-5 mt-12"}
          label={"Email : "}
          type={"email"}
          name={"email"}
          inputId={"email"}
          inputValue={email}
          inputClassName={"border w-full"}
          placeholder={"Example123@gmail.com"}
          onChange={handleInput}
        />
        </div>
       <div className="relative">
         <Input
          mainDivClassName={"my-5"}
          label={"Password : "}
          type={`${visiblePass ? "text" : "password"}`}
          name={"password"}
          inputId={"password"}
          inputValue={password}
          inputClassName={"border w-full"}
          placeholder={"Password"}
          onChange={handleInput}
        />
        {visiblePass ? 
        <VisibilityIcon className="absolute top-8 md:top-12 cursor-pointer right-4" onClick={visiblePassword}/> :
        <VisibilityOffIcon className="absolute top-8 md:top-12 cursor-pointer right-4" onClick={visiblePassword}/>
      }
       </div>
        <div className="text-end">
          <button onClick={Login} className="bg-green-500 cursor-pointer md:text-xl md:tracking-widest text-white px-8 py-2 rounded transition-all duration-300 w-full hover:bg-green-600">
            Login
          </button>
        </div>
        <div className="border-t w-full mt-10 relative">
          <h1 className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-sm text-gray-600">
            OR
          </h1>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-500 cursor-pointer md:text-xl md:tracking-widest text-white px-4 py-2 rounded transition-all duration-300 w-full hover:bg-blue-600">
            Login with Google
          </button>
        </div>
        <div className="mt-8 text-center">
         <Link to={'/signup'}>
           <button className="bg-green-500 cursor-pointer md:text-xl md:tracking-widest text-white px-4 py-2 rounded transition-all duration-300 w-full hover:bg-green-600">
            Signup
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
