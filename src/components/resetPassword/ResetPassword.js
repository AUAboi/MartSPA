import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
import LoadingSpinner from "../loader/Loader";

export default function ResetPassword() {
  const [isPasswordShown, setIsPasswprdShown] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const token = useParams();
  const onSubmit = async (data) => {
    console.log(data);
    const resetToken = token.resetToken;
    await dispatch(resetPassword({ data, resetToken }));
  };
  useEffect(() => {
    if (isSuccess && message.includes("Password reset successfully")) {
      navigate("/login");
      dispatch(RESET());
    }
  },[dispatch,navigate,isSuccess,message]);
  return (
    <div>
      <div>
        {isLoading&&<LoadingSpinner/>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center my-6">
            <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
              <h1 className="text-3xl font-bold py-2 px-10">Reset Password</h1>
              <h2 className="font-semibold py-2 px-10 pb-6 max-sm:text-sm">
                Please create the new password
              </h2>

              <div className="text-start w-[100%] px-10 py-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  New Password
                </label>
                <input
                  type={`${isPasswordShown ? "text" : "password"}`}
                  id="password"
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  placeholder="Create new Password"
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
                />
                {errors.password && (
                  <div className="text-red-600 text-sm pt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="text-start w-[100%] px-10 py-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Confirm Password
                </label>
                <input
                  type={`${isPasswordShown ? "text" : "password"}`}
                  id="password"
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  placeholder="Confirm your Password"
                  {...register("cpassword", {
                    required: {
                      value: true,
                      message: "Confirm your password*",
                    },
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.cpassword && (
                  <div className="text-red-600 text-sm pt-1">
                    {errors.cpassword.message}
                  </div>
                )}
              </div>
              <div className="flex items-center w-[100%] px-10 pb-3">
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  checked={isPasswordShown}
                  onClick={() => setIsPasswprdShown(!isPasswordShown)}
                  className="cursor-pointer w-4 h-4"
                />
                <label htmlFor="showPassword" className="px-2 cursor-pointer">
                  Show Password
                </label>
              </div>

              <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
                <button
                  type="submit"
                  className="bg-red-600 w-[100%] text-white text-xl font-bold py-2 rounded-md"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
