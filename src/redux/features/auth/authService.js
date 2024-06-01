import axios from "axios";
import { BACKEND_BASEURL } from "../../../db/baseUrl";


export const API_USERS = `${BACKEND_BASEURL}api/users/`;

// Register user function
const register = async (userData) => {
  const response = await axios.post(API_USERS + "signUp", userData);
  return response.data;
};

// Login user function 
const login=async(userData)=>{
const response = await axios.post(API_USERS + "signin", userData)
return response.data
}

// Logout user function 
const logout=async()=>{
  const response = await axios.get(API_USERS + "logout")
  return response.data
}

// Login Status function, it will return true or false 
const getLoginStatus=async()=>{
  const response = await axios.get(API_USERS + "loginStatus")
  return response.data
}

// get user profile details
const getProfile=async()=>{
  const response = await axios.get(API_USERS + "profile")
  return response.data
}

//Update the user profile
const updateUser=async(userData)=>{
const response = await axios.patch(API_USERS + "updateProfile", userData)
return response.data
}

//Send verification email
const sendVerificationEmail= async()=>{
  const response = await axios.post(API_USERS + "sendVerificationMail")
  return response.data
}

//verify user by email verificationToken
const verifyUser= async(verificationToken)=>{
  const response = await axios.patch(`${API_USERS}verifyUser/${verificationToken}`)
  return response.data
}

//change password 
const changePassword= async(userData)=>{
  const response = await axios.patch(API_USERS + "changePassword", userData)
  return response.data.message
}

//forgot password 
const forgotPassword= async(email)=>{
  const response = await axios.post(API_USERS + "forgotPassword", email)
  return response.data
}

//reset password 
const resetPassword= async(newPassword,resetToken)=>{
  const response = await axios.patch(`${API_USERS}resetPassword/${resetToken}`,newPassword)
  return response.data
}

//get users list 
const getUsersList= async()=>{
  const response = await axios.get(API_USERS + "getUsers")
  return response.data
}

//delete user by id
const deleteUser= async(id)=>{
  const response = await axios.delete(API_USERS + id)
  return response.data.message
}

//change user role by id
const upgradeUser= async(data)=>{
  const response = await axios.post(API_USERS + "upgradeRole",data)
  return response.data.message
}

//Send login code otp
const sendLoginCode= async(email)=>{
  const response = await axios.post(API_USERS + `sendOTP/${email}`)
  return response.data.message
}

//Login with code
const loginWithCode= async(email,otp)=>{
  const response = await axios.post(API_USERS + `loginWithOTP/${email}`,otp)
  return response.data
}

// make object to export, we can directly export but we have to follow the convention
const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getProfile,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsersList,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode
};

export default authService;
