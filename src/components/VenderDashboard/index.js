import React from "react";
import VenderDashboard from "./VenderDashboard";
import ProfileNav from "../profileNav/ProfileNav";

export default function index() {
  return (
    <>
    <ProfileNav/>
    <div className="bg-gray-200">
      <VenderDashboard />
    </div>
    </>
  );
}
