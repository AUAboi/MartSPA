import React from "react";

const Testimonial = ({ text, image, name, workAt }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 bg-[#F3EAD8] px-24 py-16 lg:w-[50%] md:w-[70%] w-full mx-auto">
      <div className="flex flex-col justify-center items-center space-y-14">
        <h1 className="text-3xl font-bold text-center">Customer Testimonial</h1>
        <p className="text-[1rem] tracking-wider font-medium text-gray-500 mx-auto text-center">
          {text}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <img className="size-16 rounded-full" src={image} alt="img" />
        <div className="flex flex-col text-center ">
          <span className="text-[1.1rem] font-semibold text-gray-600">
            {name}
          </span>
          <span className="font-medium text-gray-400">{workAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
