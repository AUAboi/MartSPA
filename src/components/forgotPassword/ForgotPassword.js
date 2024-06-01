import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, forgotPassword } from '../../redux/features/auth/authSlice';
import LoadingSpinner from '../loader/Loader';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
      } = useForm();
      const {isLoading,message}=useSelector((state)=>state.auth)


      const onSubmit = async (data) => {
       await dispatch(forgotPassword(data))
       await dispatch(RESET())
       
      };
  return (
    <div>
    {isLoading&&<LoadingSpinner/>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center my-6">
          <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
            <h1 className="text-3xl font-bold py-2 px-10">Password Forgot</h1>
            <h2 className=" py-2 px-10 pb-6 max-sm:text-sm">
              Provide the email address associated with your account to recover
              your password.
            </h2>
            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Email<span className='text-red-600'>*</span>
              </label>
              <input
                type="email"
                id="email"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your email"
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
              />
              {errors.email && (
                <div className="text-red-600 text-sm p-1 ps-0">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
              <button
                type="submit"
                className="bg-red-600 w-[100%] text-white rounded-md max-sm:py-2 py-3"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
