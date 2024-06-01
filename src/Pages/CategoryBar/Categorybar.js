import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "Clothing",
    nameValue: "clothing",
    subcategories: [
      "Men wear",
      "Women wear",
      "Kids wear",
      "Casual wear",
      "Formal wear",
      "Party wear",
      "Beach wear",
    ],
    value: [
      "menWear",
      "womenWear",
      "kidsWear",
      "casualWear",
      "formalWear",
      "partyWear",
      "beachWear",
    ],
  },
  {
    name: "Jewelry",
    nameValue: "jewelry",
    subcategories: [
      "Necklaces",
      "Earrings",
      "Rings",
      "Bracelets",
      "Anklets",
      "Brooches & pins",
      "Nose Rings",
      "Lip rings",
    ],
    value: [
      "necklaces",
      "earrings",
      "rings",
      "bracelets",
      "anklets",
      "broochesPins",
      "noseRings",
      "lipRings",
    ],
  },
  {
    name: "Shoes",
    nameValue: "shoes",
    subcategories: [
      "Casual",
      "Dress shoes",
      "Boots",
      "Athletic shoes",
      "Sandals",
      "Heels",
    ],
    value: [
      "casual",
      "dressShoes",
      "boots",
      "athleticShoes",
      "sandals",
      "heels",
    ],
  },
  {
    name: "Grocery",
    nameValue: "grocery",
    subcategories: [
      "Dairy",
      "Bakery",
      "Meat",
      "Chicken",
      "Seafood",
      "Pantry staples",
      "Beverages",
    ],
    value: [
      "dairy",
      "bakery",
      "meat",
      "chicken",
      "seafood",
      "pantryStaples",
      "beverages",
    ],
  },
  {
    name: "Electronics",
    nameValue: "electronics",
    subcategories: [
      "Computers",
      "Mobile Phones",
      "Home Entertainment",
      "Cameras",
      "Home Appliances",
    ],
    value: [
      "computers",
      "mobilePhones",
      "homeEntertainment",
      "cameras",
      "homeAppliances",
    ],
  },
  {
    name: "Home & Kitchen",
    nameValue: "homeAndKitchen",
    subcategories: [
      "Furniture",
      "Home Decor",
      "Kitchen Appliances",
      "Bedding & Linens",
      "Lighting",
    ],
    value: [
      "furniture",
      "homeDecor",
      "kitchenAppliances",
      "beddingLinens",
      "lighting",
    ],
  },
  {
    name: "Sports & Outdoors",
    nameValue: "sportsAndOutdoors",
    subcategories: [
      "Athletic Clothing",
      "Sports Equipment",
      "Camping Gear",
      "Outdoor Recreation",
      "Fitness Trackers",
    ],
    value: [
      "athleticClothing",
      "sportsEquipment",
      "campingGear",
      "outdoorRecreation",
      "fitnessTrackers",
    ],
  },
  {
    name: "Toys & Games",
    nameValue: "toysAndGames",
    subcategories: [
      "Children's Toys",
      "Board Games",
      "Educational Toys",
      "Collectibles",
    ],
    value: ["childrensToys", "boardGames", "educationalToys", "collectibles"],
  },
  {
    name: "Other",
    nameValue: "other",
    subcategories: [],
    value: [],
  },
];

const Categorybar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-green-800 text-white hidden md:block">
      <div className="container mx-auto py-2 flex justify-center items-center md:w-[85%]">
        <ul className="flex justify-around items-center">
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative group p-3"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={`/query/${category.nameValue.toLowerCase()}`}
                className="hover:text-gray-300"
              >
                {category.name}
              </NavLink>
              {openDropdown === index && (
                <div className="absolute left-0 mt-4 w-40 bg-white text-black rounded-md shadow-lg z-10">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={`/query/${category.nameValue.toLowerCase()}/${
                        category.value[subIndex]
                      }`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {subcategory}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Categorybar;
