import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RESET, sendVerificationMail } from "../../redux/features/auth/authSlice";

export default function Alert() {
  const dispatch = useDispatch();

  const handleSendVerificationEmail =async () => {
    await dispatch(sendVerificationMail());
    await dispatch(RESET())
  };

  return (
    <div className="px-4 py-6 flex justify-center items-center bg-red-200">
      <p className="md:text-xl font-medium">
        <span className="font-semibold">Alert!: </span>Your account is not
        verified yet, {" "}
        <span onClick={handleSendVerificationEmail}>
          <button className="text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-all ease-linear duration-300">Resend Link</button>
        </span>
      </p>
    </div>
  );
}
