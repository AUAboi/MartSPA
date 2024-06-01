import React from "react";

export default function ProductCheckoutPaymentDetail({ item }) {
  return (
    <>
      <div className="flex justify-between text-neutral-400 my-4">
        <h3>Product</h3>
        <h3>Count</h3>
        <h3>Total</h3>
      </div>
      <hr />

      {item.map((singleItem, i) => (
        <div key={i}>
          <div className="flex justify-between text-neutral-400 my-4">
            <h3>{singleItem.name}</h3>
            <h3>{singleItem.count}</h3>
            <h3>{singleItem.count*singleItem.total}</h3>
          </div>
          <hr />
        </div>
      ))}


<div className="flex justify-between text-neutral-400 my-4">
        <h3>Total</h3>
        <h3>Price</h3>
      </div>
    </>
  );
}
