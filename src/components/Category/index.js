import React from "react";
import Categories from "./Categories";

const index = () => {
  return (
    <div className="flex  justify-center  flex-wrap  2xl:w-[85%] md:w-[85%] w-[70%]  mx-auto md:mx-[7%] my-14 ">
      <Categories
        image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items1.jpg.webp"
        category="Men's Clothing"
      />
      <Categories
        image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items2.jpg.webp"
        category="Women's Clothing"
      />
      <Categories
        image="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/items3.jpg.webp"
        category="Kid's Clothing"
      />
    </div>
  );
};

export default index;
