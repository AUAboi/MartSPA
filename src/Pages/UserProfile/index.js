import React from "react";
import Profile from "./UserProfile";
import ProfileNav from "../../components/profileNav/ProfileNav";

const index = () => {
  return (<>
  <ProfileNav/>
    <div className="bg-gray-200">
      <Profile />;
    </div>
  </>
  );
};

export default index;
