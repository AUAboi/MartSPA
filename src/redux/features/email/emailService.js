import axios from "axios";
import { API_USERS } from "../auth/authService";

// Send automated email 
const sendAutoEmail = async(emailData)=>{
    const response = await axios.post(API_USERS + "sendAutoMail", emailData)
    return response.data
}


const emailService={
    sendAutoEmail
}


export default emailService