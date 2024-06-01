import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function FAQs() {
  const data = [
    {
      q: "What is EazyMart?",
      a: "EazyMart is an online shopping platform where you can find the items you want",
    },
    {
      q: "How do I contact customer support?",
      a: "You can contact customer support through our website page or you can email us at: m.nasir712.d@gmail.com",
    },
    {
      q: "How do I place an order?",
      a: "You can place an order by simply adding items to the cart and then proceeding to the order page.",
    },
    {
      q: "Can I change or cancel my order?",
      a: "After placing the order, you can cancel the order within 10 minutes; after that, you can't cancel your order.",
    },
    {
      q: "How do I apply a discount code?",
      a: "If any item has a discount, you don't need to apply the discount code separately; it will automatically reflect when placing the order.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept only cash on delivery.",
    },
    {
      q: "Do you ship internationally?",
      a: "No, we only ship to Pakistan right now.",
    },
    {
      q: "How can I track my order?",
      a: "You can get the status of your order from the website in your orders list.",
    },
    {
      q: "In how many days will I get my order?",
      a: "You will get your order within 7 working days from placing the order.",
    },
    {
      q: "How do I return an item?",
      a: "If you have any concern related to the item return, you can return it within 7 days at the same address with your account details for a refund.",
    },
    {
      q: "When will I receive my refund?",
      a: "You will receive your refund within 7 days after general processing.",
    },
    {
      q: "How do I create an account?",
      a: "You can simply create your account with a valid email address.",
    },
    {
      q: "How do I reset my password?",
      a: "You can reset your password with the email you entered at the time of registration.",
    },
    {
      q: "How do you protect my personal information?",
      a: "Your information is safe with us and is in encrypted form.",
    },
    {
      q: "How do I find the right size of product?",
      a: "You can find the size of each product on the detail page of the item.",
    },
    {
      q: "What if an item is out of stock?",
      a: "If you place your order before it goes out of stock, you will definitely receive your parcel.",
    },
    {
      q: "How do I leave a product review?",
      a: "You can leave a review in the product details section.",
    },
    {
      q: "Does the website have any search functionality?",
      a: "Yes, you can search by product name or seller store name.",
    },
    {
      q: "I added an item to the cart, but it disappeared automatically?",
      a: "This happens when a seller deletes their product from the website.",
    },
    {
      q: "What if my account is blocked?",
      a: "If your account is blocked, you cannot access website functionality. If you are registered as a seller and your account gets blocked, you will lose your listed products.",
    },
  ];

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      <div className="bg-red-600 text-white w-full flex justify-center items-center py-6 text-3xl font-semibold">
        <h1>FAQs</h1>
      </div>
      <div className="container mx-auto w-[80] md:w-[70%]  my-[3rem] rounded-[2rem] shadow-2xl p-4">
        {data.map((item, i) => (
          <Accordion
            key={i}
            open={open === i + 1}
            icon={<Icon id={i + 1} open={open} />}
          >
            <AccordionHeader onClick={() => handleOpen(i + 1)}>
              {item.q}
            </AccordionHeader>
            <AccordionBody>{item.a}</AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
