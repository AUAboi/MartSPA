import React from "react";
import { NavLink } from "react-router-dom";

export default function Card({ title, description, image, value }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleDetailPage = () => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  };

  return (
    <div className=" w-60 p-2 bg-slate-100 rounded-xl transform transition-all hover:-translate-y-2 duration-300 ">
      <img className="h-40 object-cover rounded-xl" src={image} alt={title} />
      <div className="p-2 flex flex-col items-center">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-sm text-gray-600">{truncateText(description, 60)}</p>
      </div>

      <div className="flex items-center justify-center px-2 mb-2">
        <NavLink
          role="button"
          to={`/query/${value.toLowerCase()}`}
          onClick={handleDetailPage}
          className="text-white bg-green-500 px-3 py-1 rounded-md hover:bg-purple-700"
        >
          Shop Now
        </NavLink>
      </div>
    </div>
  );
}
