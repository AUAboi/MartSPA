import React, { useEffect, useState } from "react";

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }) {
  const [size, setSize] = useState("");
  const [sizeList, setSizeList] = useState("");

  const sizeSpliting = (sizes) => {
    if (sizes?.includes(",")) {
      setSizeList(sizes?.split(","));
    } else {
      setSize(sizes);
    }
  };

  useEffect(() => {
    sizeSpliting(sizes);
  }, [sizes]);

  return (
    <div className="flex md:flex-row flex-col gap-2  md:items-center items-start flex-wrap">
      {sizeList ? (
        sizeList.map((size) => (
          <button
            key={size}
            className={`py-2 px-4 border rounded ${
              selectedSize === size
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))
      ) : (
        <button
          className={`py-2 px-4 border rounded ${
            selectedSize === size
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      )}
    </div>
  );
}
