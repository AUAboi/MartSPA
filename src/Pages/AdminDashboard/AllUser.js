import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import userData from "./UserData";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_USERS,
  selectFilterUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../components/loader/Loader";

const AllUser = ({ users }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  const filterUserFromState = useSelector(selectFilterUsers);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  //pagination start

  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterUserFromState.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterUserFromState.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filterUserFromState.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  //pagination end
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="py-4">
        <div className="flex justify-between flex-wrap w-full mt-2 gap-3">
          <div>
            <h1 className="text-2xl  font-bold ">All Users</h1>
          </div>
          <div className="flex items-center gap-3 outline-none px-4 py-3 ring-1 ring-neutral-300 rounded">
            <IoMdSearch />
            <input
              type="search"
              className="outline-none"
              name="search"
              placeholder="Search Users"
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
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  s/n
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Email
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Status
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Role
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Change Role
                </th>
                <th
                  className="p-3 font-bold tracking-wide text-left"
                  scope="col"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-slate-100">
              {currentItems?.map((item, i) => (
                <UserTable
                  key={i}
                  id={item._id}
                  i={i + 1}
                  name={item.name}
                  email={item.email}
                  isVerified={item.isVerified}
                  role={item.role}
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
    </>
  );
};

export default AllUser;
