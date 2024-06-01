import { useEffect } from "react";
import authService from "../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRedirectLogoutUser(path) {
    const navigate=useNavigate()
  useEffect(() => {
    let isLoggedIn;
    const redirectLogoutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
      } catch (error) {console.log(error.message)}
      if(!isLoggedIn){
          toast.info("Session expire, please login again")
          navigate(path)
          return;
      }
    };
    redirectLogoutUser();
  }, [path,navigate]);
}
