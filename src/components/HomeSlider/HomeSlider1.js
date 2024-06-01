import React from "react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import zimal from "../../Asset/image/colours-fashion-banner-feb15.jpg"
import banner2 from "../../Asset/image/banner2.jpg"
import banner3 from "../../Asset/image/banner3.jpg"
import banner4 from "../../Asset/image/banner4.jpg"
// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import { NavLink } from "react-router-dom";
const HomeSlider1 = () => {
  const description = `Elevate your sleep experience with our premium memory foam mattress, designed to provide unparalleled support and comfort. Now on sale, this mattress contours to your body, relieving pressure points and ensuring a restful night's sleep. Perfect for all sleeping positions, its breathable fabric keeps you cool throughout the night. Don't miss out on this limited-time offer to transform your sleep quality!`;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        const
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
    
        <SwiperSlide>
          <div
            className=" bg-no-repeat lg:h-screen md:h-[90vh] h-[70vh]"
            // style={{
            //   backgroundImage: `url('https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero2.jpg.webp')`,
            // }}

            style={{
              background: `linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(117, 19, 93, 0.73)),url(${banner3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col  lg:h-screen md:h-[90vh] h-[70vh] justify-center items-start  ">
              <div className="text-center lg:mr-[10%] md:mr-[5%] mr-[4%] lg:ml-[50%] md:ml-[30%] ml-[4%] mx-auto space-y-3 md:space-y-6 ">
                <h1 className="text-white md:text-3xl text-2xl font-semibold">
                  Fashion Sale
                </h1>
                <h2 className="text-black md:text-4xl text-2xl font-bold ">
                  UpTo 30% Off
                </h2>
                <p className="md:text-xl text-madium text-gray-400 pb-6">
                  {truncateText(description, 180)}
                </p>
                <NavLink to="/offers/discount">
                  <button className="bg-black text-white px-12 md:text-2xl text-madium font-semibold py-2 uppercase rounded">
                    Shop Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-no-repeat lg:h-screen md:h-[90vh] h-[70vh]"
            style={{
              background: `linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(117, 19, 93, 0.73)) ,url('${banner4}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}

            // style={{
            //   background: `linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(117, 19, 93, 0.73)),url('https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero1.jpg.webp')`,
            //   // backgroundSize: "cover",
            // }}
          >
            <div className="flex flex-col  lg:h-screen md:h-[90vh] h-[70vh] justify-center items-start  ">
              <div className="text-center lg:mr-[50%] md:mr-[30%] mr-[4%] lg:ml-[10%] md:ml-[5%] ml-[4%] mx-auto  space-y-3 md:space-y-6 ">
                <h1 className="text-white md:text-3xl text-2xl font-semibold">
                  Fashion Sale
                </h1>
                <h2 className="text-black md:text-4xl text-2xl font-bold ">
                  UpTo 50% OFF
                </h2>
                <p className="md:text-xl text-madium text-gray-400 pb-6">
                  {truncateText(description, 180)}
                </p>
                <NavLink to="/offers/biggestDiscount">
                  <button className="bg-black text-white px-12 md:text-2xl text-madium font-semibold py-2 uppercase rounded">
                    Shop Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider1;
