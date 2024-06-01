import axios from 'axios';
import noResult from "../../Asset/image/noresultfound.jpg";
import React, { useEffect, useState } from 'react'
import { BACKEND_BASEURL } from '../../db/baseUrl';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Discount30Percent() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
  
    const getData50 = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_BASEURL}api/get30Discount`);
        setData(response.data);
        console.log(response.data);
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
      getData50();
    }, []);
  
    return (
      <div className="flex justify-center items-baseline flex-wrap space-x-8 space-y-6">
        {
          loading&&<LoadingSpinner/>
        }
        {data && data.length === 0 ? (
          <div className="flex justify-center items-center text-2xl max-sm:text-lg text-red-600 my-32 font-semibold">
            <div className="flex flex-col justify-center items-center">
              <img src={noResult} alt="noResult" />
              No Result found
            </div>
          </div>
        ) : (
          data &&
          data.map((item, i) => (
            <div className="flex justify-center items-center">
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
          ))
        )}
      </div>
  )
}
