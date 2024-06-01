import React, { useEffect, useState } from "react";
import Image from "../../Asset/image/logo2.png";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "./Link";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShowIfLoggedIn,
  ShowIfLoggedOut,
} from "../../protectLinks/protectedLinks";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../loader/Loader";
import Categorybar from "../../Pages/CategoryBar/Categorybar";
const Navbar = () => {
  const [data, setData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(RESET());
    navigate("/");
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search")) {
        setSearchOpen(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
    setSearchOpen(!isSearchOpen);
  };
  const getCartItemLength = async () => {
    try {
      const response = await axios.get(
        BACKEND_BASEURL + "api/user/getFromCart"
      );
      setData(response.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      // toast.error(message);
    }
  };

  useEffect(() => {
    getCartItemLength();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (!searchQuery) {
        toast.error("Enter your search query");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASEURL}api/query/${searchQuery}`
      );
      console.log(response.data);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchResult) {
      navigate("/item/search", { state: searchResult && searchResult });
    }
  }, [searchResult]);
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="hidden lg:flex justify-between w-[90%] mx-auto h-[80px] items-center   ">
        <div className="cursor-pointer w-40 max-sm:w-32">
          <NavLink to={"/"}>
            <img src={Image} alt="Logo" className="w-40 max-sm:w-32" />
          </NavLink>
        </div>
        <div className="lg:block hidden">
          <ul className="flex gap-8 text-xl">
            {Link.map((item, i) => (
              <ShowIfLoggedIn key={i}>
                <NavLink to={item.path}>
                  <li className="py-2 px-1  cool-link">{item.label}</li>
                </NavLink>
              </ShowIfLoggedIn>
            ))}
          </ul>
        </div>
        <div className="md:flex gap-10 text-xl hidden items-center justify-center">
          <ShowIfLoggedIn>
            <form onSubmit={handleSearch}>
              <div
                className={`flex items-center search ${
                  isExpanded
                    ? "border border-gray-300  rounded-full pl-1"
                    : "border-none"
                }`}
              >
                <NavLink>
                  <IoSearch
                    className="cursor-pointer hover:scale-125 transition-all ease-linear duration-300 ms-4"
                    onClick={toggleSearchBar}
                  />
                </NavLink>
                <input
                  type="text"
                  className={`transition-width ease-linear duration-300 bg-transparent text-[.9rem] outline-none ${
                    isExpanded ? "w-48 px-3 py-1" : "w-0"
                  }`}
                  placeholder="Search..."
                  style={{ width: isExpanded ? "16rem" : "0rem" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="hidden">Search</button>
              </div>
            </form>
          </ShowIfLoggedIn>

          <ShowIfLoggedOut>
            <NavLink
              to={"/login"}
              className="flex justify-center items-center cursor-pointer bg-red-600 text-white px-2 py-2 rounded text-lg hover:bg-red-800 hover:-translate-y-1 transition-all ease-linear duration-300 hover:shadow-xl"
            >
              <span className="me-2">Sign In</span>
              <FaRegUser className="" />
            </NavLink>
          </ShowIfLoggedOut>

          <ShowIfLoggedIn>
            <NavLink to={"/user/myWishList"}>
              <div className="relative hover:scale-125 transition-all ease-linear duration-300">
                <IoCartOutline className="cursor-pointer" />
                {data.length > 0 && (
                  <span className="absolute top-[-8px] right-[-10px] text-white text-sm bg-[rgba(220,38,38,0.5)] px-[6px] rounded-full">
                    {data.length}
                  </span>
                )}
              </div>
            </NavLink>
          </ShowIfLoggedIn>
          <ShowIfLoggedIn>
            <NavLink to={"/profile"}>
              <CgProfile className="cursor-pointer hover:scale-125 transition-all ease-linear duration-300" />
            </NavLink>
          </ShowIfLoggedIn>
          <ShowIfLoggedIn>
            <NavLink to={"/home"} onClick={handleLogout}>
              <LuLogOut className="cursor-pointer hover:scale-125 transition-all ease-linear duration-300" />
            </NavLink>
          </ShowIfLoggedIn>
        </div>
      </div>
      <div className="hidden lg:block">
        <Categorybar />
      </div>
    </>
  );
};

export default Navbar;
