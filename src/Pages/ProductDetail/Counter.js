import React, { useState } from "react";

export default function Counter({ totalStock ,increment,decrement,count}) {


  return (
    <div className="flex items-center ring-1 ring-neutral-300 rounded border-gray-600 w-max p-2">
      <button
        className={`px-2 text-2xl text-black hover:bg-neutral-600 hover:text-white rounded transition-all ease-linear duration-300`}
        onClick={decrement}
      >
        -
      </button>
      <span className="mx-4">{count}</span>
      <button
        className="px-2 text-2xl text-black hover:bg-neutral-600 hover:text-white rounded transition-all ease-linear duration-300"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
