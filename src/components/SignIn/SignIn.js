import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RESET, login, sendLoginCode } from "../../redux/features/auth/authSlice";
import useRedirectLogInUser from "../../customHooks/useRedirectLogInUser";
import LoadingSpinner from "../loader/Loader";

export default function SignIn() {
  useRedirectLogInUser("/profile");
  const [email, setEmail] = useState("");
  const [isPasswordShown, setIsPasswprdShown] = useState(false);
  const handleChange = () => {
    if (isPasswordShown) {
      setIsPasswprdShown(false);
    } else {
      setIsPasswprdShown(true);
    }
  };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    // setEmail(data.email)
    const {email}=data
    setEmail(email)
    await sendData(data);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess ,isError,twoFactor} = useSelector(
    (state) => state.auth
  );

  const sendData = async (data) => {
    await dispatch(login(data));
    
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/profile");
    }
    if(isError && twoFactor){
      dispatch(sendLoginCode(email))
      navigate(`/loginWithCode/${email}`)
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, dispatch, navigate,isError,twoFactor]);
  return (
    <>
    {isLoading&&<LoadingSpinner/>}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center my-6">
          <div className="flex flex-col items-center py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-2 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
            <h1 className="text-3xl font-bold py-4">Sign In</h1>
            <h2 className="font-thin py-4 pb-8 max-sm:text-sm">
              Enter Login details to get access
            </h2>
      
            <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required*",
                  },
                })}
                // name="email"
                id="email"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] max-sm:px-2 px-10">
              <label
                htmlFor="password"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2 pt-6"
              >
                Password
              </label>
              <input
                type={`${isPasswordShown ? "text" : "password"}`}
                {...register("password", {
                  required: { value: true, message: "Password is required*" },
                  minLength: {
                    value: 8,
                    message: "Min length is 8 character*",
                  },
                  maxLength: {
                    value: 20,
                    message: "Max length is 20 character*",
                  },
                })}
                // name="password"
                id="password"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="flex items-center w-[100%] max-sm:px-2 px-10 py-3">
              <input
                type="checkbox"
                name="showPassword"
                id="showPassword"
                checked={isPasswordShown}
                onClick={handleChange}
                className="cursor-pointer w-4 h-4"
              />
              <label htmlFor="showPassword" className="px-2 cursor-pointer">
                Show Password
              </label>
            </div>

            <div className="flex justify-between items-center py-6 max-sm:flex-col-reverse max-sm:items-start w-[100%] max-sm:px-2 px-10 max-sm:flex-wrap">
              <div className="my-4">
                Don’t have an account?{" "}
                <NavLink to={"/signup"} className="text-red-600">
                  Sign Up
                </NavLink>{" "}
                here
              </div>
              <div>
                <button
                  type="submit"
                  className={`${
                    isSubmitting
                      ? "bg-neutral-700 cursor-not-allowed hover:bg-neutral-700"
                      : "bg-red-700 hover:bg-red-500"
                  } text-white px-8 py-3 rounded  hover:transition ease-out duration-1000 max-sm:px-4 max-sm:py-2 `}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Sign In"}
                </button>
              </div>
            </div>
            <NavLink to="/forgotPassword" className="grid place-self-start max-sm:mx-2 mx-10 hover:text-red-800 transition-all ease-linear duration-300">
              <div className=" text-red-600">
                <span className="cursor-pointer">Forgot password?</span>
              </div>
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
}
