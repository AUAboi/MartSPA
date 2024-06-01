import { useEffect } from "react";
import authService from "../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRedirectLogInUser(path) {
    const navigate=useNavigate()
    useEffect(() => {
      let isLoggedIn;
      const redirectLogInUser = async () => {
        try {
          isLoggedIn = await authService.getLoginStatus();
        } catch (error) {console.log(error.message)}
        if(isLoggedIn){
            toast.success("Already logged in")
            navigate(path)
            return;
        }
      };
      redirectLogInUser();
    }, [path,navigate]);
}
