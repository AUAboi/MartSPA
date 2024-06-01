import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../loader/Loader";

export default function LoginWithCode() {
  const [code, setCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = useParams();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleSendCodeAgain = async () => {
    await dispatch(sendLoginCode(email));
    dispatch(RESET());
  };
  const handleLoginWithOtp = async (e) => {
    if (code.length !== 6) {
      toast.error("OTP should 6 characters");
      return;
    }
    const otp = {
      otp: code,
    };
    dispatch(loginWithCode({ email, otp }));
    // console.log(email,otp)
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center my-20">
      {isLoading&&<LoadingSpinner/>}
      <div className="max-sm:w-full max-sm:m-2 w-[50%] shadow-2xl p-4 rounded">
        <div className="py-4">
          <h1 className="text-3xl font-bold">Enter Access Code</h1>
          <p>Check your email for login code</p>
        </div>
        <div></div>

        <div className="my-4">
          <input
            onChange={(e) => setCode(e.target.value)}
            placeholder="OTP"
            type="number"
            className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
          />
        </div>
        <div className="my-8">
          <button
            onClick={handleLoginWithOtp}
            className="max-sm:px-4 px-6 py-3 bg-red-600 cursor-pointer text-white rounded hover:bg-red-800 transition-all ease-linear duration-300"
          >
            Proceed to login
          </button>
        </div>
        <div className="flex justify-end my-4">
          <p>
            Did not recieve code?{" "}
            <span
              className="cursor-pointer p-1 hover:text-red-600 transition-all ease-linear duration-300 text-blue-400"
              onClick={handleSendCodeAgain}
            >
              Send Code again
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
