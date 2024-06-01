import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import OrderItem from "./OrderItem";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loader/Loader";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import ReactPaginate from "react-paginate";

export default function AllListedItems({data,getAllOrders}) {
  


  const [search, setSearch] = useState("");
  const [tempListing, setTempListing] = useState([]);

  const filterListing = (value, search) => {
    const temporaryUsers = value?.filter((item) =>
      item.status.toLowerCase().includes(search.toLowerCase()) || item.userName.toLowerCase().includes(search.toLowerCase()) || item.productName.toLowerCase().includes(search.toLowerCase())
    );
    setTempListing(temporaryUsers);
  };

  useEffect(() => {
    data && filterListing(data, search);
  }, [search, data]);







   //pagination start

 const itemsPerPage = 5;

 const [itemOffset, setItemOffset] = useState(0);

 const endOffset = itemOffset + itemsPerPage;
 const currentItems = tempListing?.slice(itemOffset, endOffset);
 const pageCount = Math.ceil(tempListing?.length / itemsPerPage);

 // Invoke when user click to request another page.
 const handlePageClick = (event) => {
   const newOffset = (event.selected * itemsPerPage) % tempListing?.length;
   setItemOffset(newOffset);
 };

 //pagination end

  return (
    <div className="mt-10">
      <div className="py-4">
        <div className="flex justify-between flex-wrap w-full mt-2">
          <div>
            <h1 className="text-2xl  font-bold ">Customer</h1>
          </div>
          <div className="flex items-center gap-3 outline-none px-4 py-3 ring-1 ring-neutral-300 rounded">
            <IoMdSearch />
            <input
              type="search"
              className="outline-none bg-transparent"
              name="search"
              placeholder="Search item"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className=" mt-[2rem] overflow-auto touch-auto">
          <table className="w-full ">
            <thead className=" border-b-2 border-t-2 border-sky-500 ">
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
                  Customer Name
                </th>
                <th
                  className="w-48 py-3 px-2 font-bold tracking-wide text-left "
                  scope="col"
                >
                  Product Name
                </th>
                <th
                  className="w-48 py-3 px-2 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Delivery Address
                </th>
                <th
                  className="w-48 py-3 px-2 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Mobile
                </th>
                <th
                  className="py-3 px-2 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Payable Price
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
                  Order Status
                </th>
              </tr>
            </thead>

            <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-slate-100 ">
              {!data || data.length === 0 ? (
                <>
                  <h1 className="text-center text-2xl font-semibold text-red-600">
                    Now order to show
                  </h1>
                </>
              ) : (
                <>
                  {currentItems?.map((item, i) => (
                    <OrderItem
                    id={item._id}
                    sn={i+1}
                      userName={item.userName}
                      productName={item.productName}
                      address={item.address}
                      mobile={item.mobile}
                      price={item.price}
                      quantity={item.quantity}
                      status={item.status}
                      getAllOrders={getAllOrders}
                                    />
                  ))}
                </>
              )}
              {/* {currentItems?.map((item, i) => (
                <UserTable
                  key={i}
                  id={item._id}
                  i={i + 1}
                  name={item.name}
                  email={item.email}
                  isVerified={item.isVerified}
                  role={item.role}
                />
              ))} */}
            </tbody>
          </table>
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
  );
}
