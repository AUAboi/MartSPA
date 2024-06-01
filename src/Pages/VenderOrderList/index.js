import React from "react";
import VenderOrderList from "./VenderOrderList";
import ProfileNav from "../../components/profileNav/ProfileNav";

export default function index() {
  return (
    <>
    <ProfileNav/>
    <div className="bg-white min-h-screen">
      <VenderOrderList />
    </div>
    </>
  );
}
