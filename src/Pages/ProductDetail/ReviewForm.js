import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";

const ReviewForm = ({ onSubmit, id, data }) => {
  const ratingStar = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASEURL}api/vendor/leaveReview/${id}`,
        { rating, review }
      );
      toast.success(response.data.message);
      console.log({rating,review})
      onSubmit({ rating, review });

      setLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReview = () => {
    setIsExpanded(!isExpanded);
  };

  const { user } = useSelector((state) => state.auth);


  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="text-center py-6 px-10">
        <button
          onClick={toggleReview}
          className=" bg-blue-600  text-white text-xl font-bold py-2 px-4 rounded-md"
        >
          Write Review
        </button>
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className={`transition duration-500 ease-in-out ${
            isExpanded ? "block opacity-100 max-h-screen" : "hidden"
          }`}
        >
          <div className=" flex justify-center items-center my-6">
            <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
              <h1 className="text-3xl font-bold py-2 px-10">Leave Review</h1>

              <div className="flex items-center gap-3 text-start w-[100%] px-10 py-4">
                <img
                  className="size-16 rounded-full"
                  src={user?.photo}
                  alt=""
                />
                <div>
                  <span className="text-xl font-bold py-2 px-1">
                    {user?.name}
                  </span>
                </div>
              </div>
              <div className="text-start w-[100%] px-10 py-4">
                <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {ratingStar.map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`text-2xl ${
                        star <= (hover || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-start w-[100%] px-10 py-4">
                <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
                  Review 
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
                <button
                  type="submit"
                  className="bg-blue-600 w-[100%] text-white text-xl font-bold py-2 rounded-md"
                >
                  Submit Review
                </button>
              </div>
              <h2 className="text-center w-full my-2">Or</h2>
              <div className="grid place-self-center">
               <NavLink to={`/support/contactUs/${data[0]?.vendorId}`}>
        <h1 className="font-semibold text-xl max-sm:px-4 px-6 py-3 bg-red-600 rounded text-white hover:bg-red-800 transition-all ease-linear duration-300 cursor-pointer">Report seller</h1>
               </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
