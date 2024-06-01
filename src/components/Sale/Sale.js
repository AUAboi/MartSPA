import React from "react";
import { NavLink } from "react-router-dom";

const Sale = () => {
  return (
    <div className=" bg-black text-white py-5 text-center text-[1.2rem] space-x-4 ">
      <span className="md:text-[1rem] text-sm">
        Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer
      </span>
      <NavLink
        className="text-orange-300 md:text-xl text-sm border-b-2 p-1 border-orange-300 hover:tracking-widest hover:transition-all hover:ease-in hover:duration-500"
        to={"/offers/biggestDiscount"}
      >
        Shop Now
      </NavLink>
    </div>
  );
};

export default Sale;
