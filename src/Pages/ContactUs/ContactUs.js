import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import { useSelector } from "react-redux";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const {user}=useSelector((state)=>state.auth)
  const onSubmit = async (data, e) => {
    const userData={
      ...data,
      name:user?.name,
      email:user?.email
    }
    try {
      const response = await axios.post(
        BACKEND_BASEURL + "api/contactUs",
        userData
      );
      toast.success(response.data.message);
      e.target.reset();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  return (
    <>
      {isSubmitting && <LoadingSpinner />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-red-600 text-white w-full flex justify-center items-center py-6 text-3xl font-semibold">
            <h1>Contact Us</h1>
          </div>
          <div className="max-sm:m-2 w-full flex justify-center items-center my-12">
            <div className="p-8 sm:m-4 max-sm:p-2 max-sm:m-2 rounded-md max-sm:text-sm w-[70%] max-md:w-[70%] max-sm:w-full shadow-2xl">
              <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 text-gray-400 bg-neutral-200"
                  placeholder="your name"
                  id="name"
                  value={user?.name}
                  disabled
                />
              </div>

              <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("email")}
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 text-gray-400 bg-neutral-200"
                  placeholder="your email"
                  id="email"
                  value={user?.email}
                  disabled
                />
              </div>

              <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Subject <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register("subject", {
                    required: { value: true, message: "Subject is required*" },
                    minLength: {
                      value: 3,
                      message: "Min length is 3 character*",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length is 50 character*",
                    },
                  })}
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  placeholder="subject"
                  id="subject"
                />
                {errors.subject && (
                  <div className="text-red-600 text-sm pt-1">
                    {errors.subject.message}
                  </div>
                )}
              </div>
              <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  type="text"
                  {...register("message", {
                    required: { value: true, message: "Message is required*" },
                    minLength: {
                      value: 10,
                      message: "Min length is 10 character*",
                    },
                    maxLength: {
                      value: 500,
                      message: "Max length is 500 character*",
                    },
                  })}
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 min-h-36"
                  placeholder="message"
                  id="message"
                />
                {errors.message && (
                  <div className="text-red-600 text-sm pt-1">
                    {errors.message.message}
                  </div>
                )}
              </div>

              <div className="text-start w-[100%] max-sm:px-2 px-10 py-4">
                <button className="max-sm:px-4 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-800 transition-all ease-linear duration-300 w-full ring-1 ring-red-600">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
