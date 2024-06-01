import React from "react";
import Card from "./Card";
import clothing from "../../Asset/categories/clothing.jpeg";
import jewelry from "../../Asset/categories/jewelry.jpeg";
import shoes from "../../Asset/categories/shoes.jpeg";
import grocery from "../../Asset/categories/grocery.jpeg";
import electronics from "../../Asset/categories/images.jpeg";
import homeKitchen from "../../Asset/categories/home & kicten.jpeg";
import sports from "../../Asset/categories/sports.jpeg";
import games from "../../Asset/categories/toys.jpeg";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../css/CategoryCard.css";

// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

export default function CategoryCard() {
  const categories = [
    {
      category: "Clothing",
      value: "clothing",
      description:
        "Explore a wide range of apparel for men, women, and children, suitable for every occasion. From casual t-shirts and jeans to elegant dresses and suits, our clothing collection offers the perfect outfit to match your style and comfort needs.",
      image: clothing,
    },
    {
      category: "Jewelry",
      value: "jewelry",
      description:
        "Discover a stunning collection of jewelry, including necklaces, earrings, rings, and bracelets. Whether you're looking for fine jewelry crafted from precious metals and gemstones or trendy fashion accessories, you'll find the perfect pieces to adorn every outfit and express your personal style.",
      image: jewelry,
    },
    {
      category: "Shoes",
      value: "shoes",
      description:
        "Step into comfort and style with our diverse selection of shoes for all occasions. Choose from casual sneakers, elegant dress shoes, sturdy boots, and stylish heels to complete your look. Our footwear collection ensures you find the right pair for work, play, and everything in between.",
      image: shoes,
    },
    {
      category: "Grocery",
      value: "grocery",
      description:
        "Stock your pantry with fresh and packaged foods, including dairy, bakery items, meats, and more. Our grocery section offers everything you need for your kitchen, from beverages and snacks to seafood and pantry staples, ensuring you have all the essentials for delicious meals and snacks.",
      image: grocery,
    },
    {
      category: "Electronics",
      value: "electronics",
      description:
        "Stay up-to-date with the latest technology in computers, mobile phones, and home entertainment systems. Browse our selection of cameras, home appliances, and accessories to enhance your digital lifestyle and keep your home running smoothly with cutting-edge devices and gadgets.",
      image: electronics,
    },
    {
      category: "Home and Kitchen",
      value: "homeAndKitchen",
      description:
        "Transform your living space with our range of furniture, home decor, and kitchen appliances. Find everything from cozy bedding and stylish lighting to essential kitchen gadgets and home accessories, helping you create a comfortable and beautiful home environment.",
      image: homeKitchen,
    },
    {
      category: "Sports and Outdoors",
      value: "sportsAndOutdoor",
      description:
        "Gear up for adventure with our athletic clothing, sports equipment, and camping gear. Enjoy outdoor activities with high-quality products for fitness tracking, hiking, biking, and more, helping you stay active and enjoy the great outdoors to the fullest.",
      image: sports,
    },
    {
      category: "Toys and Games",
      value: "toysAndGames",
      description:
        "Ignite imagination and fun with our toys for children of all ages, board games, and educational toys. Our collection also includes collectibles and hobby items, catering to enthusiasts and hobbyists who seek to expand their collections and enjoy their favorite pastimes.",
      image: games,
    },
  ];

  return (
    <div className="lg:w-[85%] md:w-[90%] sm:w-[65%] w-[55%] md:mx-[7%] mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        // spaceBetween={40}
        // slidesPerView={4}
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
      >
        {categories.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-between items-center py-10">
              <Card
                title={item.category}
                description={item.description}
                image={item.image}
                value={item.value}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
