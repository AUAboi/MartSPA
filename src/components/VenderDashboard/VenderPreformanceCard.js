import React from "react";

export default function VenderPreformanceCard({
  title,
  members,
  icon,
  bgColor,
}) {
  return (
    <>
      <div className="cursor-pointer hover:translate-y-1 transition-all ease-linear duration-300 shadow-xl">
        <div
          className={`flex items-center ${bgColor} text-white py-2 px-4 w-[16rem] space-x-6 h-[6rem] rounded-md`}
        >
          <div className="text-5xl ">{icon}</div>
          <div className=" flex flex-col ">
            <span className="text-xl font-semibold">{title}</span>
            <span className="text-xl ">{members}</span>
          </div>
        </div>
      </div>
    </>
  );
}
