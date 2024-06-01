import React, { useEffect, useState } from "react";
// import Card from "./Card";
import { Navigation, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
// import CardData from "./CardData";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { toast } from "react-toastify";
import LoadingSpinner from "../loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

const CardSlider = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const getThreeRating = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_BASEURL}api/rating3`);
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      toast.error(message);
    }
  };

  useEffect(() => {
    getThreeRating();
  }, []);
  return (
    <div className="lg:w-[85%] md:w-[90%] sm:w-[65%] w-[55%] md:mx-[7%] mx-auto ">
      <Swiper
        modules={[Navigation, Autoplay, FreeMode, Pagination]}
        // spaceBetween={false}
        // slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1080: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1780: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {loading && <LoadingSpinner />}
        {data &&
          data?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center pb-10">
                <ProductCard
                  productName={item.productName}
                  storeName={item.storeName}
                  price={item.price}
                  discount={item.discount}
                  id={item._id}
                  image={item.image}
                  rating={item.rating}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
