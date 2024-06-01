import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import { confirmAlert } from "react-confirm-alert";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item._id === id && item
    );
    setCartItems(updatedCartItems);
  };
 
  const handleDelete = (id) => {
    confirmAlert({
      title: "Delete this Item",
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
        `${BACKEND_BASEURL}api/user/deleteFromCart/${id}`
      );
      toast.success(response.data.message);
      let tempData =[];
      const temporaryData = cartItems.filter(
        (item) =>
          !item.id.includes(id) 
      )
      tempData = temporaryData;
      setCartItems(tempData)
    
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



  const getCartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASEURL}api/user/getFromCart`
      );
console.log(response.data)
      setCartItems(response.data);
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
    getCartData();
  }, []);

 

  // const total = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      {loading&&<LoadingSpinner/>}
      <div className="my-10">
        <div className="py-4">
          <div className="flex justify-between flex-wrap w-full mt-2">
            <div>
              <h1 className="text-2xl font-bold">Your Cart</h1>
            </div>
            <div>
              <NavLink to="/user/myWishList/myOrderList">
              <h1 className="text-xl font-[bold] p-2 bg-blue-600 rounded hover:bg-blue-800 transition-all ease-linear duration-300 cursor-pointer text-white" >My Order list</h1>
              </NavLink>
            </div>
            {/* {cartItems.length === 0 ? (
              ""
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="bg-black text-white px-3 py-2 rounded uppercase"
                  onClick={() => setCartItems([])}
                >
                  Empty Cart
                </button>
              </div>
            )} */}
          </div>

          {cartItems.length === 0 ? (
            <>
              <p className="mt-4 text-lg"> There is nothing in your cart.</p>
              <div className="my-5 flex justify-start items-center">
                <NavLink to="/">
                <button className="bg-green-500 text-white px-3 py-2 rounded uppercase">
                  continue browsing
                </button>
                </NavLink>
              </div>
            </>
          ) : (
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
                      {/* <th
                        className="py-3 px-2 font-bold tracking-wide text-left"
                        scope="col"
                      >
                        Item left
                      </th> */}
                      <th
                        className="py-3 px-2 font-bold tracking-wide text-left"
                        scope="col"
                      >
                        SubTotal
                      </th>
                      <th
                        className="py-3 px-2 font-bold tracking-wide text-left"
                        scope="col"
                      >
                        Action
                      </th>
                      <th
                        className="py-3 px-2 font-bold tracking-wide text-left"
                        scope="col"
                      >
                        Paying
                      </th>
                    </tr>
                  </thead>

                  <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-slate-100">
                    {cartItems.map((item, i) => (
                      <CartItems
                        key={i}
                        index={i+1}
                        id={item.id}
                        product_image={item.image}
                        product_name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        handleDelete={handleDelete}
                        value={item.value}
                      />
                    ))}
                  </tbody>
                  {/* <tfoot className="border-b-2 border-t-2 border-sky-500">
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="p-3 text-sm font-bold text-gray-700 whitespace-nowrap">
                        Total (excl. delivery):
                      </td>
                      <td></td>
                      <td className="p-3 text-sm font-bold text-gray-700 whitespace-nowrap">
                        Rs: None
                      </td>
                    </tr>
                  </tfoot> */}
                </table>
              </div>
              {/* <div className="my-10 flex justify-end items-center">
                <button className="bg-green-600 text-white px-3 py-2 rounded uppercase hover:bg-green-800 transition-all ease-linear duration-300">
                  Check Out
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
