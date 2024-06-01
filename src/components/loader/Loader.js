import React from "react";
import "../../css/loader.css";
function LoadingSpinner() {
  return (
    <>
      {/* loader 1 with tailwind
    <div className="flex ">
      <div className=" bg-transparent w-[5rem] h-[5rem] border-8 border-t-red-600  rounded-t-full rounded-r-full border-gray-300 mx-auto animate-spin rounded-full"></div>
    </div> */}
    {/* loader 2 with css */}
    {/* <div className="outer_div">

    <div class="wrapper">
      <div class="box-wrap">
        <div class="box one"></div>
        <div class="box two"></div>
        <div class="box three"></div>
        <div class="box four"></div>
        <div class="box five"></div>
        <div class="box six"></div>
      </div>
    </div>
    </div> */}

<div class="loading">Loading&#8230;</div>

{/* <div class="loader"></div> */}
  </>
  );
}

export default LoadingSpinner;
