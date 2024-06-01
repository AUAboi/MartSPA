import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  RESET,
  changePassword,
  logout,
} from "../../redux/features/auth/authSlice";
import useRedirectLogoutUser from "../../customHooks/useRedirectLogoutUser";
import { sendAutoMail } from "../../redux/features/email/emailSlice";
import LoadingSpinner from "../loader/Loader";
import ProfileNav from "../profileNav/ProfileNav";
import { toast } from "react-toastify";

export default function ChangePassword() {
  useRedirectLogoutUser("/login");
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isLoggedIn, changePassMsg, user } = useSelector(
    (state) => state.auth
  );

  const emailData = {
    subject: "Password Changed - App Name",
    sendTo: user?.email,
    url: "/forgotPassword",
  };

  const onSubmit = async (data,e) => {
    await dispatch(RESET());
    await dispatch(changePassword(data));
e.target.reset()
    // if(changePassMsg==="Password changed successfully,"){
    // await dispatch(logout())
    // navigate("/login")
    // dispatch(RESET())
    // }else{
    //   toast.error("Try Again")
    // }
  };
  // useEffect(() => {
  //   const email = async (data) => {
  //     if (
  //       isSuccess &&
  //       changePassMsg &&
  //       changePassMsg.includes("Password changed successfully,")
  //     ) {
  //       await dispatch(sendAutoMail(data));
  //       await dispatch(RESET());
  //       await dispatch(logout());
  //       navigate("/login");
  //       dispatch(RESET());
  //     }
  //   };
  //   email(emailData);
  // }, [dispatch, navigate, isSuccess, changePassMsg]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ProfileNav/>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center my-20"
      >
        <div className="w-[70%] max-md:w-[80%] max-sm:w-full mx-auto ">
          <div className="max-sm:mx-2 flex flex-col justify-center items-center">
            <h1 className="max-sm:text-xl max-md:text-2xl text-3xl font-semibold mt-4 mb-2">
              Create a new password
            </h1>
            <p className="mb-8 max-sm:text-xs">
              Please create your new password
            </p>
          </div>
          <div className="max-sm:m-2">
            <div className="my-4 flex flex-col">
              <label htmlFor="oldPassword" className="mb-2 font-semibold">
                Old Password:
              </label>
              <input
                className=" outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Old password"
                type={isPasswordShown ? "text" : "password"}
                id="oldPassword"
                {...register("oldPassword", {
                  required: { value: true, message: "required*" },
                  minLength: {
                    value: 8,
                    message: "Min length is 8 character*",
                  },
                })}
              />
              {errors.oldPassword && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.oldPassword.message}
                </div>
              )}
            </div>
            <div className="my-4 flex flex-col">
              <label htmlFor="newPassword" className="mb-2 font-semibold">
                New Password:
              </label>
              <input
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="New password"
                type={isPasswordShown ? "text" : "password"}
                id="newPassword"
                {...register("newPassword", {
                  required: { value: true, message: "required*" },
                  minLength: {
                    value: 8,
                    message: "Min length is 8 character*",
                  },
                })}
              />
              {errors.newPassword && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.newPassword.message}
                </div>
              )}
            </div>
            <div className="mt-4 mb-1 flex flex-col">
              <label htmlFor="cPassword" className="mb-2 font-semibold">
                Confirm Password
              </label>
              <input
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                type={isPasswordShown ? "text" : "password"}
                id="cPassword"
                placeholder="Retype password"
                {...register("cPassword", {
                  required: { value: true, message: "Confirm your password*" },
                  validate: (val) => {
                    if (watch("newPassword") !== val) {
                      return "Your password do not match";
                    }
                  },
                })}
              />
              {errors.cPassword && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.cPassword.message}
                </div>
              )}
            </div>
            <div className="my-4 flex items-center">
              <input
                type="checkbox"
                name="showPassword"
                id="showPassword"
                checked={isPasswordShown}
                onClick={handleChange}
                className="cursor-pointer"
              />
              <label htmlFor="showPassword" className="px-2 cursor-pointer">
                Show Password
              </label>
            </div>
            <button className="max-sm:px-4 px-6 py-3 bg-red-600 text-white rounded my-6 w-full hover:bg-red-800 transition-all ease-linear duration-300">
              Change password
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
