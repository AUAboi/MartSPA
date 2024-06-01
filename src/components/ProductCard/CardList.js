import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASEURL } from "./../../db/baseUrl";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../loader/Loader";

export default function CardList() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        BACKEND_BASEURL + "api/user/getAllProductsForUser"
      );
      setData(response.data);

      console.log("response from card"+response.data)
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
  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex flex-wrap justify-center my-20">
        {data.length > 0 &&
          data &&
          data?.map((item, i) => (
            <>
            <ProductCard
              productName={item.productName}
              storeName={item.storeName}
              price={item.price}
              discount={item.discount}
              id={item._id}
              image={item.image}
              rating={item.rating}
              />
              </>
          ))}
      </div>
    </>
  );
}
