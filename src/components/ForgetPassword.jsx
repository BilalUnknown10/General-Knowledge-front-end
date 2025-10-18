import React, { useContext, useState } from 'react'
import Input from './Input';
import axios from 'axios';
import UserContext from '../Store/UserContext'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-toastify';

function ForgetPassword() {
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [visiblePass, setVisiblePass] = useState(false);

    const {User_Api} = useContext(UserContext);
    const navigate = useNavigate();

    // Extract id from url
    const {id} = useParams();

    const updatePassword = async () => {
      setLoading(true)
      try {
        const response = await axios.patch(`${User_Api}/forgetPassword/${id}`,{password,CPassword});
        console.log(response);
        if(response.status === 200){
          setPassword("");
          setCPassword("");
          toast.success(response.data.message);
          navigate("/login",{replace : true});
        }
      } catch (error) {
        console.log("error in update password front end");
        toast.error(error.response.data.message);
      }finally {
        setLoading(false);
      }
    }


  return (
    <div className='bg-green-500 h-[100vh] flex flex-col justify-center items-center'>
    <div className='flex-col space-y-10 p-5  md:p-20 rounded-md bg-white'>
        <div className='text-center'>
            <h1 className='md:text-4xl'>New Password</h1>
        </div>
          <div >
        <Input
                  mainDivClassName={" w-[80vw]"}
                  label={"New Password : "}
                  type={"password"}
                  name={"password"}
                  inputId={"password"}
                  inputValue={password}
                  inputClassName={"border w-full"}
                  placeholder={"New Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
      </div>

      <div>
        <Input
                  mainDivClassName={" w-[80vw]"}
                  label={"Confirm Password : "}
                  type={"password"}
                  name={"CPassword"}
                  inputId={"CPassword"}
                  inputValue={CPassword}
                  inputClassName={"border w-full"}
                  placeholder={"Confirm Password"}
                  onChange={(e) => setCPassword(e.target.value)}
                  disabled={loading}
                />
      </div>

      <div className="text-center w-[80vw] flex justify-between mt-6">
            <button className="w-[30vh] hover:cursor-pointer font-bold md:text-2xl bg-green-500 py-3 rounded-md text-white ">Back</button>
            <button disabled={loading} onClick={updatePassword} className="w-[30vh] hover:cursor-pointer font-bold md:text-2xl bg-green-500 py-3 rounded-md text-white ">{loading ? "Loading..." : "Update Password"}</button>
        </div>
    </div>
    </div>
  )
}

export default ForgetPassword;
