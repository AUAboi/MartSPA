import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
const ProductReview = ({id ,data}) => {
  const [reviews, setReviews] = useState([]);
  const [idFromBackend, setIdFromBackend] = useState("");

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };
const {user}=useSelector((state)=>state.auth)

   //pagination start

   const itemsPerPage = 15;

   const [itemOffset, setItemOffset] = useState(0);
 
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = data[0]?.rating.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(data[0]?.rating.length / itemsPerPage);
 
   // Invoke when user click to request another page.
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % data[0]?.rating.length;
     setItemOffset(newOffset);
   };

 
   //pagination end
 
const handleDeleteReview=async ()=>{
  toast.success(id)
try {
  const response= await axios.delete(`${BACKEND_BASEURL}api/vendor/deleteReview/${id}`)
toast.success(response.data.message)
} catch (error) {
  const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
}
}

  return (
    <div className="p-4">
      <ReviewForm onSubmit={handleReviewSubmit}  id={id} data={data &&data}/>
      <div className=" w-[90%] mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {currentItems?.length === 0 ? (
          <p className="text-gray-700">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <ul>
            {currentItems?.map((item, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-4  relative">
                  <div>
                    <img
                      className="size-8 rounded-full"
                      src={item.img}
                      alt=""
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600">{item.userName}</p>
                    {user?._id===item.userId &&
                    <button className="max-sm:px-2 px-3 py-2 ms-4 bg-red-600 absolute right-0 top-0 text-white rounded hover:bg-red-800 transition-all ease-linear duration-300 cursor-pointer" onClick={handleDeleteReview}>Delete</button>}
                    
                </div>
                <div className="flex">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < item.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-800">{item.review}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="my-20">
            <ReactPaginate
              breakLabel="***"
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
              containerClassName="flex_pagination"
              pageLinkClassName="page"
              previousLinkClassName="pageNavigater"
              nextLinkClassName="pageNavigater"
              activeLinkClassName="active_page"
            />
          </div>
    </div>
  );
};

export default ProductReview;
