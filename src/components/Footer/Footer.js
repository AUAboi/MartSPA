import React from "react";
import img from "../../Asset/image/logo_5-removebg-preview.png";
import FooterItem from "../FooterItem/FooterItem";
import MenCollection from "../FooterItem/MenFooterLink";
import WomenCollection from "../FooterItem/WomenFooterLink";
import OtherCollection from "../FooterItem/OtherFooterLink";
import QuickCollection from "../FooterItem/QuickFooterLink";
import {
  ShowIfLoggedIn,
  ShowIfLoggedOut,
} from "../../protectLinks/protectedLinks";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
export default function Footer() {
  const year = new Date().getFullYear();
  const followUs = [
    {
      icon: <FaYoutubeSquare />,
      link: "https://www.google.com/",
    },
    {
      icon: <FaInstagramSquare />,
      link: "https://www.google.com/",
    },
    {
      icon: <FaFacebookSquare />,
      link: "https://www.google.com/",
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.google.com/",
    },
  ];

  return (
    <>
      <ShowIfLoggedIn>
        <div className="bg-black text-white lg:px-[10rem] pt-20">
          <div className="flex flex-wrap justify-center ">
            <div className="py-10 px-10 flex-1  ">
              <div>
                <img src={img} className="cursor-pointer w-40" alt="logo" />
              </div>
              <div className="flex gap-3 mt-6">
                {followUs.map((item) => (
                  <NavLink to={item.link} target="_blank" className="text-3xl">
                    {item.icon}
                  </NavLink>
                ))}
              </div>
            </div>
            {/* <div className="flex flex-wrap flex-2 ">
              <FooterItem item={MenCollection} />
              <FooterItem item={WomenCollection} />
              <FooterItem item={OtherCollection} />
              <FooterItem item={QuickCollection} />
            </div> */}
          </div>
          <hr className="w-[90%] mx-auto mt-20" />
          <div className="text-center py-6">
            Copyright &copy; {year} | Created by Dreamers with 💝.
          </div>
        </div>
                </ShowIfLoggedIn>
      <ShowIfLoggedOut>
        <div className="text-center py-6 bg-black text-white">
          Copyright &copy; {year} | Created by Dreamers with 💝.
        </div>
      </ShowIfLoggedOut>
    </>
  );
}
