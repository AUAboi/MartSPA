import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  sendVerificationMail,
} from "../../redux/features/auth/authSlice";
import { register as signup } from "../../redux/features/auth/authSlice";
import LoadingSpinner from "../loader/Loader";
import { toast } from "react-toastify";
import {
  ref,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";



export default function SignUp() {
  const [isPasswordShown, setIsPasswprdShown] = useState(false);
  // const [validPassword, setValidPassword] = useState(true);
  // const [validName, setValidName] = useState(true);
  // const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [profilePreview, setProfilePreview] = useState(null);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  // const [fileExtension, setFileExtension] = useState("");




  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = () => {
    if (isPasswordShown) {
      setIsPasswprdShown(false);
    } else {
      setIsPasswprdShown(true);
    }
  };
  // useEffect(() => {
  //   var regexp = /^[A-Za-z\s]+$/i;
  //   let validName = regexp.test(name);
  //   if (!validName) {
  //     setValidName(false);
  //   } else if (validName) {
  //     setValidName(true);
  //   }
  // }, [name]);

  // useEffect(() => {
  //   if (validPassword.length < 8) {
  //     setValidPassword(false);
  //   } else if (validPassword.length >= 8) {
  //     setValidPassword(true);
  //   }
  // }, [validPassword]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data,e) => {
      e.preventDefault();

      if(data.roleType==="User"){
        await dispatch(signup(data));
        await dispatch(sendVerificationMail());
      }else if(data.roleType==="Vendor"){
        try {
          const imageRef = ref(storage, `images/${fileName}`);
          const upload = uploadBytesResumable(imageRef, image);
    
          upload.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              if (progress === 100) {
                // make a toast
                // toast("image uploaded");
              }
            },
            (error) => {
              toast.error("Fail to update, please try again");
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;
                case "storage/unknown":
                  break;
                default:
                  break;
              }
            },
            () => {
              getDownloadURL(upload.snapshot.ref)
                .then((downloadUrl) => {
                  console.log(downloadUrl)
                  const userData={
                    ...data,
                    document:downloadUrl
                  }
                     dispatch(signup(userData));
                    }).then(()=>{
                  dispatch(sendVerificationMail());
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            }
          );
        } catch (err) {
          toast.error(err.message);
        }
      }
      
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // here auth is the name in the create slice
  const { isLoading, isSuccess, isLoggedIn } = useSelector(
    (state) => state.auth
  );







  const handlePreview = (e) => {
    try {
      console.log("length is", e.target.files.length);
      if (e.target.files.length === 0) {
        setProfilePreview("");
        setImage("");
        setFileName("");
        return;
      }
      let src = e.target.files[0];
      if (src.size > 102500) {
        toast.error("File size must be 100kb or less");
        return;
      }
      setImage(src);
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
      const fileExt = src?.name.split(".").pop();
      // setFileExtension(fileExt);

      const nameOfFile = src?.name;

      const randomNumber1 = Math.random().toString(36).slice(2);
      const randomNumber2 = Math.random().toString(36).slice(2);
      const randomNumber3 = Math.random().toString(36).slice(2);
      const fileName =
        nameOfFile.toString() +
        randomNumber1 +
        randomNumber2 +
        randomNumber3 +
        "." +
        fileExt;
      setFileName(fileName);
      // console.log(Name is ${fileName} & extension is ${fileExt});
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center my-6">
            <div className="flex flex-col items-center py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4  max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
              <h1 className="text-3xl font-bold py-4">Sign Up</h1>
              <h2 className="font-thin py-4 sm:text-sm">
                Create your account to get full access
              </h2>
             
                <div className="text-start w-[100%] max-sm:px-2 px-10 mb-6">
                <label
                  htmlFor="roleType"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                >
                  Registering as <span className="text-red-600">*</span>
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <label className="block text-sm font-normal leading-6 text-gray-900 pb-2">
                      <input
                        type="radio"
                        {...register("roleType", {
                          required: "role type is required*",
                        })}
                        value="User"
                        className="mr-2 w-4 h-4"
                        onChange={handleRoleChange}
                      />
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm font-normal leading-6 text-gray-900 pb-2">
                      <input
                        type="radio"
                        {...register("roleType", {
                          required: "role type is required*",
                        })}
                        value="Vendor"
                        className="mr-2 w-4 h-4"
                        onChange={handleRoleChange}
                      />
                      Vendor
                    </label>
                  </div>
                </div>
                {errors.roleType && (
                  <div className="text-red-600 text-sm py-1">
                    {errors.roleType.message}
                  </div>
                )}
                {selectedRole==="Vendor"&&<div className="text-red-500 text-sm py-1">
                    Don't provide wrong information <br />
                    Verification may take upto 5 working days
                  </div>}
                </div>

                <div className="text-start w-[100%] max-sm:px-2 px-10 ">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                  >
                    {selectedRole==="Vendor"?"Store Name":"Full Name"}<span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: "Only characters & space allow",
                      },
                      required: { value: true, message: "Name is required*" },
                      minLength: {
                        value: 3,
                        message: "Min length is 3 character*",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length is 50 character*",
                      },
                    })}
                    // name="name"
                    // onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <div className="text-red-600 text-sm pt-1">
                      {errors.name.message}
                    </div>
                  )}
                  {/* {!validName && (
                    <div className="text-red-600 text-sm pt-1">
                      Enter valid name
                    </div>
                  )} */}
                </div>


              <div className="text-start w-[100%] max-sm:px-2 px-10">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2 pt-6"
                >
                  Email Address<span className="text-red-600">*</span>
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
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  type={isPasswordShown ? "text" : "password"}
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
                  // onChange={(e) => setValidPassword(e.target.value)}
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
               
                  <div className="text-sm pt-1">
                    Password should be 8 characters
                  </div>
              
              </div>

              <div className="text-start w-[100%] max-sm:px-2 px-10">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-bold leading-6 text-gray-900 pb-2 pt-6"
                >
                  Confirm Password<span className="text-red-600">*</span>
                </label>
                <input
                  type = {isPasswordShown ? "text" : "password"}
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
                  // name="confirm_password"
                  id="confirm_password"
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  placeholder="Confirm your password"
                />
                {errors.cpassword && (
                  <div className="text-red-600 text-sm pt-1">
                    {errors.cpassword.message}
                  </div>
                )}
                <div className="flex items-center w-[100%] py-3">
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
              </div>

              <div className="text-start w-[100%] px-10 py-3">
                

                {/* {selectedRole === "User" && null} */}
                {selectedRole === "Vendor" && (
                  <>
                    {/* <div className="text-start w-[100%] py-4">
                      <label
                        htmlFor="shopName"
                        className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                      >
                        Shop Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("shopName", {
                          required: {
                            value: true,
                            message: "Shop Name is required*",
                          },
                          minLength: {
                            value: 6,
                            message: "Min length is 6 character*",
                          },
                          maxLength: {
                            value: 50,
                            message: "Max length is 50 character*",
                          },
                        })}
                        placeholder="Enter your shop name"
                        className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                      />
                      {errors.shopName && (
                        <div className="text-red-600 text-sm pt-1">
                          {errors.shopName.message}
                        </div>
                      )}
                    </div> */}

                    <div className="text-start w-[100%] py-4">
                      <label
                        htmlFor="ntn"
                        className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                      >
                        National Tax Number
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        {...register("ntn", {
                          required: {
                            value: true,
                            message: "National Tax Number is required*",
                          },
                          length: {
                            value: 7,
                            message:
                              "Please enter valid NTN 7 digit registration no*",
                          },
                        })}
                        // name="name"
                        // onChange={(e) => setName(e.target.value)}
                        id="name"
                        className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                        placeholder="Enter your National Tax Number"
                      />
                      {errors.ntn && (
                        <div className="text-red-600 text-sm pt-1">
                          {errors.ntn.message}
                        </div>
                      )}
                    </div>

                    <div className="text-start w-[100%] py-4">
                      <img
                        src={profilePreview}
                        alt="CNIC front img"
                        className="h-40 w-60 rounded ring-1 ring-neutral-400 my-6 p-2"
                      />
                      <label
                        htmlFor="cnicImage"
                        className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                      >
                        Add front CNIC image
                      </label>
                      <input
                        type="file"
                        {...register("cnicImage", {
                          required: {
                            value: true,
                            message: "CNIC Image is required*",
                          },
                        })}
                        name="cnicImage"
                        id="cnicImage"
                        onChange={handlePreview}
                      />
                      {errors.cnicImage && (
                        <div className="text-red-600 text-sm pt-1">
                          {errors.cnicImage.message}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center w-full px-10 py-6 max-sm:flex-col-reverse max-sm:items-start">
                <div className="my-4">
                  Already have an account?{" "}
                  <NavLink to={"/login"} className="text-red-600">
                    Login
                  </NavLink>{" "}
                  here
                </div>
                {/* <button
                  type="submit"
                  className={${isSubmitting?"bg-neutral-700 cursor-not-allowed hover:bg-neutral-700":"bg-red-700 hover:bg-red-500"} text-white px-8 py-3 rounded hover:transition ease-out duration-1000 max-sm:px-4 max-sm:py-2 max-sm:mt-51}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Sign Up"}
                </button> */}
                <div>
                  <button
                    type="submit"
                    className={`${
                      isSubmitting
                        ? "bg-neutral-700 cursor-not-allowed hover:bg-neutral-700"
                        : "bg-red-700 hover:bg-red-500"
                    } text-white px-8 py-3 rounded hover:transition ease-out duration-1000 max-sm:px-4 max-sm:py-2 max-sm:mt-51`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting" : "Sign Up"}
                  </button>
                  {/* <div className="mt-4">
                          Already have an account?{" "}
                          <NavLink to={"/login"} className="text-red-600">
                            Login
                          </NavLink>{" "}
                          here
                        </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}