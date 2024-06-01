import React, { useEffect, useState } from "react";
import logo from "../../Asset/image/logo2.png";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import { IoIosClose, IoIosMenu } from "react-icons/io";

import {
  ShowIfLoggedIn,
  ShowIfLoggedOut,
} from "../../protectLinks/protectedLinks";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../loader/Loader";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
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
  const SmLink = [
    { label: "Home", path: "/" },
    { label: "About", path: "/aboutus" },
    { label: "Contact", path: "/contactus" },
    { label: "FAQs", path: "/faqs" },
    { label: "Privacy Policy", path: "/privacypolicy" },
    { label: "Add to Cart ", path: "/user/myWishList" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/home", onclick: { handleLogout } },
  ];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) {
        setNavbarOpen(false);
      }
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

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="navbar">
        <div className="lg:hidden flex justify-between w-[90%] mx-auto h-[80px] items-center">
          <div className="cursor-pointer w-40 max-sm:w-32">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-40 max-sm:w-32" />
            </NavLink>
          </div>
          <ShowIfLoggedOut>
            <div className="flex flex-col gap-4 py-4 ps-12">
              <NavLink
                to="/login"
                className="flex justify-center w-max items-center cursor-pointer bg-red-600 text-white px-2 py-2 rounded text-lg hover:bg-red-800 hover:-translate-y-1 transition-all ease-linear duration-300 hover:shadow-xl"
              >
                <span className="me-2">Sign In</span>
                <FaRegUser />
              </NavLink>
            </div>
          </ShowIfLoggedOut>
          <ShowIfLoggedIn>
            <div className="lg:hidden flex items-center md:gap-4 gap-3">
              <div>
                <form onSubmit={handleSearch}>
                  <div
                    className={`flex items-center search ${
                      isExpanded
                        ? "border border-gray-300 rounded-full pl-1"
                        : "border-none"
                    }`}
                  >
                    <IoSearch
                      className="cursor-pointer hover:scale-125 text-xl  transition-all ease-linear duration-300 ms-4"
                      onClick={toggleSearchBar}
                    />
                    <input
                      type="text"
                      className={`transition-width ease-linear  duration-300 bg-transparent text-xl outline-none ${
                        isExpanded ? "w-48 px-3 py-1" : "w-0"
                      }`}
                      placeholder="Search..."
                      style={{ width: isExpanded ? "16rem" : "0rem" }}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="hidden">Search</button>
                  </div>
                </form>
              </div>
              <div onClick={toggleNavbar} className="text-4xl cursor-pointer">
                {isNavbarOpen ? <IoIosClose /> : <IoIosMenu />}
              </div>
            </div>
            <div
              className={`lg:flex lg:items-center lg:static absolute left-0 w-full lg:w-auto lg:pl-0 transition-all duration-500 ease-in ${
                isNavbarOpen ? "top-[5rem] z-10" : "top-[-490px]"
              }`}
            >
              <ul className="lg:flex lg:items-center w-full text-xl bg-slate-200 lg:bg-transparent gap-8 lg:pb-0 pb-2 ps-6">
                {SmLink.map((item, i) => (
                  <li
                    key={i}
                    onClick={item.onclick}
                    className="py-2 px-1 cool-link w-max font-semibold"
                  >
                    <NavLink to={item.path}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </ShowIfLoggedIn>
        </div>
      </div>
    </>
  );
};

export default Navbar;
