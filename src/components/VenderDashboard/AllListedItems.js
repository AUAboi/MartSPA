import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import ItemData from "./ItemData";
import LoadingSpinner from "../loader/Loader";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

export default function AllListedItems({ data }) {
  const [search, setSearch] = useState("");
  const [tempListing, setTempListing] = useState([]);
  const [loading,setLoading]=useState(false)

  const filterListing = (value, search) => {
    const temporaryUsers = value?.filter((item) =>
      item.productName.toLowerCase().includes(search.toLowerCase())
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

  const handleDelete = (id) => {
    confirmAlert({
      title: "Delete Listed Item",
      message: `Are you sure to delete this item`,
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteItem(id),
        },
        {
          label: "Cancel",
        },
      ],
      closeOnClickOutside: false,
    });
  };




  const handleDeleteItem = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `${BACKEND_BASEURL}api/vendor/deleteProduct/${id}`
      );
      setTempListing((tempListing)=>tempListing.filter((itemId)=>itemId._id!==id))
      toast.success(response.data.message);
      setLoading(false)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setLoading(false)
    }
  };
  return (
    <>
    {loading && <LoadingSpinner/>}
      <div className="mt-10">
        <div className="py-4">
          <div className="flex justify-between flex-wrap w-full mt-2 gap-3">
            <div>
              <h1 className="text-2xl  font-bold ">Product</h1>
            </div>
            <div className="flex items-center gap-3 outline-none px-4 py-3 ring-1 ring-neutral-300 rounded">
              <IoMdSearch />
              <input
                type="search"
                className="outline-none bg-transparent"
                name="search"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end flex-wrap w-full mt-4">
            <NavLink to={"/profile/dashboard/venderListing"}>
              <button className="bg-blue-500 w-max text-white text-xl font-semibold px-4 py-2 rounded-md">
                Add Product
              </button>
            </NavLink>
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
                    Price
                  </th>
                  <th
                    className="py-3 px-2 font-bold tracking-wide text-left"
                    scope="col"
                  >
                    Total Items
                  </th>
                  <th
                    className="py-3 px-2 font-bold tracking-wide text-left"
                    scope="col"
                  >
                    Discount
                  </th>
                  {/* <th
                    className="py-3 px-2 font-bold tracking-wide text-left"
                    scope="col"
                  >
                    Check Items/Size
                  </th> */}
                  <th
                    className="py-3 px-2 font-bold tracking-wide text-left"
                    scope="col"
                  >
                    Detail|Edit
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
                {!data ? (
                  <LoadingSpinner />
                ) : (
                  currentItems?.map((item, i) => (
                    <ItemData
                      id={item._id}
                      sn={i}
                      image={item.image}
                      productName={item.productName}
                      price={item.price}
                      totalStock={item.totalStock}
                      discount={item.discount}
                      handleDeleteItem={handleDelete}
                    />
                  ))
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
      </div>
    </>
  );
}
