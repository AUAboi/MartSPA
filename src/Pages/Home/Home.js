import React from "react";
import HomeSlider from "../../components/HomeSlider";
import Categories from "../../components/Category";
import Testimonial from "../../components/Customer";
import CardSlider from "../../components/Cards/CardSlider";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const Home = () => {
  return (
    <div>
      <div>
        <HomeSlider />
      </div>
      <div className="my-10">
        <h1 className="mx-[10%] lg:text-3xl text-2sxl font-semibold">
          Categories
        </h1>
        <hr className="w-[83%] mx-auto  mt-6" />

        <CategoryCard />
      </div>
      <div className="mx-auto my-20">
        <h1 className="mx-[10%] lg:text-3xl text-2sxl font-semibold">
          Our Top Rated Sellers
        </h1>
        <hr className="w-[83%] mx-auto mb-10 mt-6" />
        <CardSlider />
      </div>
      <div className="-z-1">
        <Testimonial />
      </div>
      {/* <div className="mx-auto my-20">
        <h1 className="text-center text-3xl font-semibold mb-10 ">
          May you like
        </h1>
        <Card />
      </div> */}
    </div>
  );
};

export default Home;
