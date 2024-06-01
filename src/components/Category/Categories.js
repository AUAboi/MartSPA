import React from "react";
import { NavLink } from "react-router-dom";

const Categories = ({ category, image }) => {
  return (
    <div>
      <div className="flex justify-center flex-col lg:m-3 md:m-4 m-5 max-sm:my-2 group">
        <div className="group-hover:opacity-60  transition ease-in-out duration-500">
          <img
            className="md:w-[300px] lg:w-[350px] w-[300px] object-cover md:object-none"
            src={image}
            alt="category img"
          />
        </div>
        <div className="flex items-center flex-col mt-[-30%] md:mt-[-25%] space-y-1  group-hover:-translate-y-8 transition-transform duration-1000">
          <h1 className="md:text-[1.7rem] text-[1.2rem] text-white font-bold transition ease-in-out duration-500 group-hover:text-[#000000ff]">
            {category}
          </h1>
          <NavLink
            className="text-white invisible group-hover:visible underline md:text-[1rem] text-[.7rem] font-semibold group-hover:text-[#000000ff]"
            to={"/"}
          >
            Shop Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Categories;
