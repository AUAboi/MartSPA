import React from "react";
import img from "../../Asset/image/vendor_dummy.jpeg";
import qasimProfile from "../../Asset/image/qasim.png"
import zimalProfile from "../../Asset/image/zimalProfile.jpeg"
import nasirProfile from "../../Asset/image/Nasir.jpg"
export default function AboutUs() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-red-600 text-white w-full flex justify-center items-center py-6 text-3xl font-semibold">
        <h1>About Us</h1>
      </div>
      <div className=" w-[80] md:w-[70%]  my-[3rem] rounded-[2rem] shadow-2xl">
        <div className="p-8 m-4 max-sm:p-2 max-sm:m-2 max-sm:text-sm w-[90%]">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Welcome to our e-commerce store
          </h2>
          <p className="mb-4">
            We set out with a simple mission: to provide our customers with
            high-quality products, exceptional service, and a seamless online
            shopping experience
          </p>
          <p className="mb-4">
            At EazyMart where your online shopping experience is our top
            priority.{" "}
          </p>
          <p className="mb-4">
            Our website is meticulously designed with you in mind. With
            intuitive navigation, clear product descriptions, and a streamlined
            checkout process, we strive to make your online shopping journey as
            effortless and enjoyable as possible.
          </p>
          <p className="mb-4">
            Our responsive customer support team is always just a click away,
            ready to address any questions or concerns you may have.
          </p>
          <p className="mb-4">
            Thank you for choosing EazyMart. Happy shopping!
          </p>
        </div>
        <div className="flex flex-wrap justify-around items-center  p-8 max-sm:p-2 my-6 space-y-2">
          <div className="flex flex-col justify-center items-center ring-1 ring-gray-300 p-4 w-72 h-72">
            <div>
              <img src={qasimProfile} alt="img" className="w-48 h-48 rounded-full my-2" />
              <hr className="mb-2"/>
            </div>
            <div>
              <span>M.Qasim</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center ring-1 ring-gray-300 p-4 w-72 h-72">
            <div className="rounded-full">
              <img src={zimalProfile} alt="img" className="w-48 h-48 rounded-full my-2" />
              <hr className="mb-2"/>
            </div>
            <div>
              <span>Zimal</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center ring-1 ring-gray-300 p-4 w-72 h-72">
            <div>
              <img src={nasirProfile} alt="img" className="w-48 h-48 rounded-full my-2" />
              <hr className="mb-2"/>
            </div>
            <div>
              <span>M.Nasir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
