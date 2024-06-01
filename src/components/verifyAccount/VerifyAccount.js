import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../loader/Loader";

export default function VerifyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const { isLoading } = useSelector((state) => state.auth);

  const handleVerifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="max-sm:text-xl max-md:text-2xl text-3xl font-semibold my-4">
          Account Verification
        </h1>
        <p className="mb-4">
          To verify your account, click the button below...
        </p>
        <button
          className="max-sm:px-4 px-6 max-sm:py-2 py-3 bg-blue-600 text-white rounded hover:bg-blue-800 transition-all ease-linear duration-300"
          onClick={handleVerifyAccount}
        >
          Verify Account
        </button>
      </div>
    </>
  );
}
