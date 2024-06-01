import React from "react";
import Testimonial from "./Testimonial";
import TestimonialData from "./TestimonialData";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

const index = () => {
  return (
    <div className="bg-[#F3EAD8]">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay, FreeMode]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        // pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {TestimonialData.map((testimonial) => (
          <SwiperSlide key={testimonial}>
            <Testimonial
              text={testimonial.text}
              image={testimonial.img}
              name={testimonial.name}
              workAt={testimonial.workAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default index;
