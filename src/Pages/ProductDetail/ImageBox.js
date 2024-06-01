import React from "react";

export default function ImageBox({ image,totalStock }) {
  return (
    <div className="relative max-w-full max-h-[28rem] overflow-hidden">
      {totalStock===0 &&  <h1 className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold max-sm:text-2xl max-md:text-3xl text-5xl text-black">Unavailable</h1>}
      <img
        className="w-full h-full object-cover block"
        src={image}
        alt="Product"
      />
    </div>
  );
}
