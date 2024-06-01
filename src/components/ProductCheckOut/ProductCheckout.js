import React from "react";
import ProductCheckoutPaymentDetail from "../../components/ProductCheckOut/ProductCheckoutPaymentDetail";
import dummy from "../other/dummy";

export default function ProductCheckout() {
  return (
    <div className="px-16 py-3 max-sm:px-2 max-md:px-4 max-lg:px-8">
      <div>
        <h1 className="text-2xl font-medium py-2">Billing Details</h1>
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          <div className="flex flex-col">
            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="First Name"
                className="my-3 mx-1 block w-[50%] max-sm:w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="my-3 mx-1 block w-[50%] max-sm:w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="Phone"
                className="my-3 mx-1 block w-[50%] max-sm:w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
              <input
                type="text"
                placeholder="Email"
                className="my-3 mx-1 block w-[50%] max-sm:w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="Address"
                className="my-3 mx-1 block w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="City"
                className="my-3 mx-1 block w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="District"
                className="my-3 mx-1 block w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <input
                type="text"
                placeholder="Zip code"
                className="my-2 mx-1 block w-[100%] rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-red-200 sm:text-sm sm:leading-6 px-3"
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:items-center">
              <textarea
                name="order_note"
                id="order_note"
                cols="30"
                rows="10"
                placeholder="Order Notes"
                className="my-3 mx-1 w-[100%] rounded-md p-3 border-2 min-h-[100px] max-h-[300px] h-[100px]"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end max-lg:justify-start">
            <div className="my-3 w-[80%] bg-gray-100 p-8 max-lg:w-full">
              <h1 className="text-lg font-medium">Payment Details</h1>
              <hr className="my-3"/>
              <ProductCheckoutPaymentDetail item={dummy}/>


              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
