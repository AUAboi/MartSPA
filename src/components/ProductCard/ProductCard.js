// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// export default function ProductCard({
//   productName,
//   storeName,
//   price,
//   discount,
//   id,
//   handleAddToCart,
//   image,
//   rating,
// }) {
//   const [sale, setSale] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const handleDetailPage = (id) => {
//     if (id) {
//       navigate(`/item/${id}`);
//     }
//   };
//   console.log("rating is", rating);
//   // Extract the ratings
//   const ratingsArray = rating.map((item) => item.rating);

//   // Calculate the sum of the ratings
//   const sum = ratingsArray.reduce((acc, rating) => acc + rating, 0);

//   // Calculate the average
//   const average = sum / ratingsArray.length;

//   return (
//     <>
//       <div
//         className=" w-[320px] rounded-lg overflow-hidden shadow-lg bg-white  transition-all ease-linear duration-300 cursor-pointer m-2 flex justify-center flex-col"
//         onClick={() => handleDetailPage(id)}
//       >
//         <div className="relative p-4 ">
//           <img
//             className="w-full h-64 object-cover rounded hover:scale-110 transition-all ease-linear duration-300"
//             src={image && image}
//             alt={productName}
//           />
//           {discount && discount > 0 && (
//             <div className="absolute top-1 -right-10 outline-none text-white rotate-45 ">
//               <span className="bg-yellow-600 py-4 px-9 text-[9px]">{`${(
//                 (discount / price) *
//                 100
//               ).toFixed(2)}% OFF`}</span>
//             </div>
//           )}
//         </div>
//         <div className="hover:bg-neutral-300 transition-all ease-linear duration-300">
//           <div className="p-4 flex justify-between items-center">
//             <div className="flex-1">
//               <h3 className="text-[.9rem] font-semibold text-wrap">
//                 {productName}
//               </h3>
//               <p className="text-gray-300 text-[.6rem] font-semibold bg-gray-700 py-1 px-2 w-max rounded-full">
//                 {`By ${storeName}`}
//               </p>
//             </div>
//             {/* <div className="flex-2" id="addToCart">
//               <button className="px-4 py-2 rounded-full bg-purple-600 text-white  hover:bg-purple-800 transition-all ease-linear duration-300">
//                 Add to cart
//               </button>
//             </div> */}
//           </div>
//           <div className="p-4 flex justify-between items-center">
//             <div>
//               <span
//                 className={`font-bold ${
//                   discount ? "text-xs line-through text-gray-400" : "text-lg"
//                 }`}
//               >
//                 {`Rs: ${price}`}
//               </span>
//               {discount && discount > 0 && (
//                 <span className="text-lg font-bold ml-3 ">{`Rs: ${
//                   price - discount
//                 }`}</span>
//               )}
//             </div>
//             <div>
//               <span className="bg-yellow-500 px-2 py-1 rounded-full text-[.6rem] text-white">
//                 {average
//                   ? `Rating ${average === 5 ? average : `${average}+`}`
//                   : "No rating"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProductCard({
  productName,
  storeName,
  price,
  discount,
  id,
  handleAddToCart,
  image,
  rating,
}) {
  const productname = productName;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const [sale, setSale] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleDetailPage = (id) => {
    if (id) {
      navigate(`/item/${id}`);
      window.scrollTo(0, 0, { behavior: "smooth" });
    }
  };
  // console.log("rating is", rating);
  // Extract the ratings
  const ratingsArray = rating.map((item) => item.rating);

  // Calculate the sum of the ratings
  const sum = ratingsArray.reduce((acc, rating) => acc + rating, 0);

  // Calculate the average
  const average = sum / ratingsArray.length;

  return (
    <div
      className="relative w-60 p-2 bg-white cursor-pointer rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl m-2"
      onClick={() => handleDetailPage(id)}
    >
      {discount && discount > 0 && (
        <div className="absolute top-2 right-2 transform bg-red-500 text-white px-2 py-1 text-[.8rem] rounded-md">
          {`${((discount / price) * 100).toFixed(2)}% OFF`}
        </div>
      )}
      <div>
        <img
          className="w-full h-52 object-cover rounded-xl"
          src={image && image}
          alt={truncateText(productname, 10)}
        />
      </div>
      <div className="p-2 flex justify-between items-center">
        <h2 className="font-bold text-normal">
          {truncateText(productname, 12)}
        </h2>
        <span className="bg-yellow-500 px-2 py-1 rounded-full text-[.6rem] text-white">
          {average
            ? `Rating ${average === 5 ? average : `${average}+`}`
            : "No rating"}
        </span>
      </div>
      <div className="px-2 mb-2">
        <p className="text-gray-300 text-[.6rem] font-semibold bg-gray-700 py-1 px-2 w-max rounded-full">
          {`By ${storeName}`}
        </p>
      </div>
      <div className="flex items-center mb-2 p-2 gap-2">
        <span
          className={`font-bold ${
            discount ? "text-xs line-through text-gray-400" : "text-lg"
          }`}
        >
          {`Rs: ${price}`}
        </span>
        {discount && discount > 0 && (
          <span className="text-lg font-bold ml-3 ">{`Rs: ${
            price - discount
          }`}</span>
        )}
      </div>
    </div>
  );
}
