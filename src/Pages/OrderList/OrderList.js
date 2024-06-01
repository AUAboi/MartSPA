import React, { useEffect, useState } from "react";
import OrderData from "./OrderData";
import OrderItems from "./OrderItems";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import ReactPaginate from "react-paginate";

export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");


  const getItemData=async()=>{
try {
  setLoading(true);
  const response= await axios.get(`${BACKEND_BASEURL}api/user/order/getOrderList`)
 setData(response.data)
 console.log(response.data)
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
  }


  useEffect(()=>{
getItemData()
  },[])





   //pagination start

 const itemsPerPage = 5;

 const [itemOffset, setItemOffset] = useState(0);

 const endOffset = itemOffset + itemsPerPage;
 const currentItems = data?.slice(itemOffset, endOffset);
 const pageCount = Math.ceil(data?.length / itemsPerPage);

 // Invoke when user click to request another page.
 const handlePageClick = (event) => {
   const newOffset = (event.selected * itemsPerPage) % data?.length;
   setItemOffset(newOffset);
 };

 //pagination end





  return (
    <div>
      {loading&& <LoadingSpinner/>}
      <div className="my-10">
        <div className="py-4">
          <div className="flex justify-between flex-wrap w-full mt-2">
            <div>
              <h1 className="text-2xl font-bold">Your Order</h1>
            </div>
          </div>

          <div>
            <div className="mt-8 overflow-auto touch-auto">
              <table className="w-full">
                <thead className="border-b-2 border-t-2 border-sky-500">
                  <tr>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      s/n
                    </th>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Product Image
                    </th>
                    <th
                      className="w-48 py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Product Name
                    </th>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Quantity
                    </th>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Price
                    </th>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Payment Status
                    </th>
                    <th
                      className="py-3 px-2 font-bold tracking-wide text-left"
                      scope="col"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-slate-100">
                  {data && currentItems?.map((item, index) => (
                    <OrderItems
                      key={index}
                      id={item._id}
                      sn={index+1}
                      paymentType={item.paymentType}
                      product_image={item.image}
                      product_name={item.productName}
                      price={item.price}
                      quantity={item.quantity}
                      status={item.status}
                      getItemData={getItemData}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
    </div>
  );
}
