import React, { useEffect } from "react";
import Card from "./Card";
import AllUser from "./AllUser";
import Data from "./CardData";
import { NavLink } from "react-router-dom";
import useRedirectLogoutUser from "../../customHooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  SUBSCRIBER_USER,
  SUSPENDED_USER,
  VENDER_USER,
  getLoginStatus,
  getProfile,
  getUsersList,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaUserShield, FaUsers, FaUsersSlash } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { ShowOnlyAdmin } from "../../protectLinks/protectedLinks";
import LoadingSpinner from "../../components/loader/Loader";
import ProfileNav from "../../components/profileNav/ProfileNav";

const AdminDashBoard = () => {
  useRedirectLogoutUser("/login");

  const {
    isLoading,
    isLoggedIn,
    isSuccess,
    user,
    users,
    vendorUser,
    subscriber,
    suspended,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (users.length === 0) {
        await dispatch(getUsersList());
      }
    };
    getData();
  }, [dispatch]);
  useEffect(() => {
    dispatch(VENDER_USER());
    dispatch(SUBSCRIBER_USER());
    dispatch(SUSPENDED_USER());
  }, [dispatch, users]);
  const userStats = [
    {
      title: "Registered",
      members: users?.length,
      icon: <FaUsers />,
      bgColor: "bg-violet-700",
    },
    {
      title: "Vendor",
      members: vendorUser&&vendorUser,
      icon: <FaUserShield />,
      bgColor: "bg-green-700",
    },
    {
      title: "Users",
      members: subscriber&&subscriber,
      icon: <FaUserGroup />,
      bgColor: "bg-sky-500",
    },
    {
      title: "Suspended",
      members: suspended&&suspended,
      icon: <FaUsersSlash />,
      bgColor: "bg-red-700",
    },
  ];
  return (
    <div>
      <ProfileNav/>
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div>
          <h1 className="text-2xl font-bold py-4">User Stats</h1>
        </div>
        <div className="flex flex-row mx-auto justify-center gap-4 flex-wrap">
         {userStats.map((item, i) => (
            <Card
              key={i}
              title={item.title}
              members={item.members} //exlclude the admin so users-1
              icon={item.icon}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
      <div className="w-[90%] md:w-[80%] mx-auto">
        <AllUser users={users && users} />
      </div>
    </div>
  );
};

export default AdminDashBoard;
