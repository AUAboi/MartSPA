import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loader/Loader";
import {
  ref,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";
export default function Lisitng() {
  const [selectedSize, setSelectedSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const categories = {
 
    
    clothing: {
      name: "Clothing",
      subcategories: {
        menWear: "Men wear",
        womenWear: "Women wear",
        kidsWear: "Kids wear",
        casualWear: "Casual wear",
        formalWear: "Formal wear",
        partyWear: "Party wear",
        beachWear: "Beach wear"
      }
    },
    jewelry: {
      name: "Jewelry",
      subcategories: {
        necklaces: "Necklaces",
        earrings: "Earrings",
        rings: "Rings",
        bracelets: "Bracelets",
        anklets: "Anklets",
        broochesPins: "Brooches & pins",
        noseRings: "Nose Rings",
        lipRings: "Lip rings"
      }
    },
    shoes: {
      name: "Shoes",
      subcategories: {
        casual: "Casual",
        dressShoes: "Dress shoes",
        boots: "Boots",
        athleticShoes: "Athletic shoes",
        sandals: "Sandals",
        heels: "Heels"
      }
    },
    grocery: {
      name: "Grocery",
      subcategories: {
        dairy: "Dairy",
        bakery: "Bakery",
        meat: "Meat",
        chicken: "Chicken",
        seafood: "Seafood",
        pantryStaples: "Pantry staples",
        beverages: "Beverages"
      }
    },
    electronics: {
      name: "Electronics",
      subcategories: {
        computers: "Computers",
        mobilePhones: "Mobile Phones",
        homeEntertainment: "Home Entertainment",
        cameras: "Cameras",
        homeAppliances: "Home Appliances"
      }
    },
    homeAndKitchen: {
      name: "Home & Kitchen",
      subcategories: {
        furniture: "Furniture",
        homeDecor: "Home Decor",
        kitchenAppliances: "Kitchen Appliances",
        beddingLinens: "Bedding & Linens",
        lighting: "Lighting"
      }
    },
    sportsAndOutdoors: {
      name: "Sports & Outdoors",
      subcategories: {
        athleticClothing: "Athletic Clothing",
        sportsEquipment: "Sports Equipment",
        campingGear: "Camping Gear",
        outdoorRecreation: "Outdoor Recreation",
        fitnessTrackers: "Fitness Trackers"
      }
    },
    toysAndGames: {
      name: "Toys & Games",
      subcategories: {
        childrensToys: "Children's Toys",
        boardGames: "Board Games",
        educationalToys: "Educational Toys",
        collectibles: "Collectibles"
      }
    },
    other: {
      name: "Other",
      subcategories: {}
    }
  };
  

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [picPreview, setPicPreview] = useState(null);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageHeight, setImageHeight] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data, e) => {
    try {
      setLoading(true);
      if (imageHeight !== imageWidth) {
        toast.error("Please select 1:1 picture");
        return;
      }
      const imageRef = ref(storage, `images/${fileName}`);
      const upload = uploadBytesResumable(imageRef, image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (progress === 100) {
            // make a toast
            // toast.success("Picture uploaded");
          }
        },
        (error) => {
          setLoading(false);
          toast.error("Fail to update, please try again");
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(upload.snapshot.ref)
            .then((downloadUrl) => {
              return downloadUrl;
            })
            .then((imageUrl) => {
              axios.post(`${BACKEND_BASEURL}api/vendor/productListing`, {
                data,
                imageUrl,
              });
            })
            .then((res) => {
              setLoading(false);
              toast.success("Your product has been listed");
              e.target.reset();
              setSelectedCategory("");
              setSelectedSubCategory("");
              setPicPreview("");
              setImage("");
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.message);
            });
        }
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setLoading(false);
      toast.error(message);
    }
  };

  // const uploadData=async(e,data,imageUrl)=>{
  //     try {
  //       const response = await
  //       );
  //       if (response && response.data) {
  //         toast.success(response.data.message);
  //       }
  // e.target.reset()
  // setSelectedCategory("")
  // setSelectedSubCategory("")
  // } catch (error) {
  // const message =
  // (error.response &&
  //   error.response.data &&
  //   error.response.data.message) ||
  // error.message ||
  // error.toString();
  // toast.error(message);
  // }}

  const handlePreview = (e) => {
    try {
      if (e.target.files.length === 0) {
        setPicPreview("");
        setImage("");
        setFileName("");
        return;
      }
      let src = e.target.files[0];
      if (src) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();

          img.onload = () => {
            setImageHeight(img.height);
            setImageWidth(img.width);
          };

          img.src = e.target.result;
        };

        reader.readAsDataURL(src);
      }
      if (src.size > 4194500) {
        toast.error("File size must be 4mb or less");
        return;
      }
      setImage(src);
      setPicPreview(URL.createObjectURL(e.target.files[0]));
      const fileExt = src?.name.split(".").pop();
      // setFileExtension(fileExt);

      const nameOfFile = src?.name;

      const randomNumber1 = Math.random().toString(36).slice(2);
      const randomNumber2 = Math.random().toString(36).slice(2);
      const randomNumber3 = Math.random().toString(36).slice(2);
      const fileName =
        nameOfFile.toString() +
        randomNumber1 +
        randomNumber2 +
        randomNumber3 +
        randomNumber2 +
        randomNumber1 +
        "." +
        fileExt;
      setFileName(fileName);
      console.log(`Name is ${fileName} & extension is ${fileExt}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleImageUpload = async (data) => {
  //   try {

  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  //   useEffect(()=>{
  // uploadData(userData,imageUrl)
  //   },[imageUrl])

  return (
    <div>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center my-6">
          <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
            <h1 className="text-3xl font-bold py-2 px-10">Add New Product</h1>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="product_name"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                {...register("productName", {
                  required: { value: true, message: "Name is required*" },
                  minLength: {
                    value: 3,
                    message: "Min length is 3 character*",
                  },
                  maxLength: {
                    value: 50,
                    message: "Max length is 50 character*",
                  },
                })}
                id="product_name"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Product Name"
              />
              {errors.productName && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.productName.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="price"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Price
              </label>
              <input
                type="number"
                {...register("price", {
                  required: { value: true, message: "Price is required*" },
                  minLength: {
                    value: 2,
                    message: "Min length is 2 character*",
                  },
                  maxLength: {
                    value: 1000000,
                    message: "Max length is 8 character*",
                  },
                  valueAsNumber: true,
                })}
                id="price"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Price"
              />
              {errors.price && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.price.message}
                </div>
              )}
            </div>
            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="price"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                No. of items
              </label>
              <input
                type="number"
                {...register("totalStock", {
                  required: { value: true, message: "Items is required*" },
                  min: {
                    value: 10,
                    message: "Items must be a greater then 10*",
                  },
                  valueAsNumber: true,
                })}
                id="items"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your No. Items"
              />
              {errors.totalStock && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.totalStock.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="discount"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Discount
              </label>
              <input
                type="number"
                {...register("discount", {
                  valueAsNumber: true,
                  validate: (value) => {
                    if (value >= watch("price")) {
                      return "Discount must be less than price";
                    }
                  },
                })}
                id="discount"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Discount price"
              />
              {errors.discount && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.discount.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
            <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
          Product Category
        </label>
        <select
          {...register("category", {
            required: { value: true, message: "Category is required*" },
          })}
          onChange={handleCategoryChange}
          className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
        >
          <option value="">Select a category</option>
          {Object.entries(categories).map(([key, category]) => (
            <option key={key} value={key}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <div className="text-red-600 text-sm pt-1">
            {errors.category.message}
          </div>
        )}
      </div>

      <div className="text-start w-[100%] px-10 py-4">
        <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
          Product SubCategory
        </label>
        <select
          {...register("subCategory", {
            required: {
              value: true,
              message: "Sub-category is required*",
            },
          })}
          onChange={handleSubCategoryChange}
          value={selectedSubCategory}
          disabled={!selectedCategory}
          className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
        >
          <option value="">Select a subCategory</option>
          {selectedCategory && 
            Object.entries(categories[selectedCategory].subcategories).map(([key, subCategory]) => (
              <option key={key} value={key}>
                {subCategory}
              </option>
          ))}
        </select>
        {errors.subCategory && (
          <div className="text-red-600 text-sm pt-1">
            {errors.subCategory.message}
          </div>
        )}

            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="sizeType"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Size/color
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <label className="block text-sm font-normal leading-6 text-gray-900 pb-2">
                    <input
                      type="radio"
                      {...register("sizeType", {
                        required: "Size type is required*",
                      })}
                      value="Numerical sizes"
                      className="mr-2 w-4 h-4"
                      onChange={handleSizeChange}
                    />
                    Numerical sizes
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="block text-sm font-normal leading-6 text-gray-900 pb-2">
                    <input
                      type="radio"
                      {...register("sizeType", {
                        required: "Size type is required*",
                      })}
                      value="General sizes"
                      className="mr-2 w-4 h-4"
                      onChange={handleSizeChange}
                    />
                    General sizes
                  </label>
                </div>
              </div>
              {errors.sizeType && (
                <div className="text-red-600 text-sm py-1">
                  {errors.sizeType.message}
                </div>
              )}

              {selectedSize === "Numerical sizes" && (
                <>
                  <input
                    type="text"
                    {...register("size", {
                      pattern: {
                        value: /^(([a-zA-Z0-9](,)?)*)+$/,
                        message: "a-z,A-Z,0-9 and only comma allowd",
                      },
                      required:
                        watch("sizeType") === "Numerical sizes" &&
                        "Numerical size is required*",
                    })}
                    placeholder="Enter numerical size like 38,39,40,41 etc"
                    className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  />
                  {errors.size && (
                    <div className="text-red-600 text-sm pt-1">
                      {errors.size.message}
                    </div>
                  )}
                </>
              )}
              {selectedSize === "General sizes" && (
                <>
                  <input
                    type="text"
                    {...register("size", {
                      pattern: {
                        value: /^(([a-zA-Z0-9 ](,)?)*)+$/,
                        message: "Only comma separated allow",
                      },
                      required:
                        watch("sizeType") === "General sizes" &&
                        "General size is required*",
                    })}
                    placeholder="Enter general size like sm,md,lg,xl,xxl etc"
                    className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                  />
                  {errors.size && (
                    <div className="text-red-600 text-sm pt-1">
                      {errors.size.message}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="description"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                {...register("productDescription", {
                  required: {
                    value: true,
                    message: "Description is required*",
                  },
                  minLength: {
                    value: 10,
                    message: "Min length is 10 characters*",
                  },
                  maxLength: {
                    value: 700,
                    message: "Max length is 700 characters*",
                  },
                })}
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 min-h-32 max-h-32"
                id="description"
                rows={5}
              ></textarea>
              {errors.productDescription && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.productDescription.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <img
                src={picPreview}
                alt="img"
                className="h-40 w-40 rounded ring-1 ring-neutral-400 my-6 p-2"
              />
              <label
                htmlFor="image"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Add image
              </label>
              <input
                type="file"
                {...register("image", {
                  required: { value: true, message: "Image is required*" },
                })}
                name="image"
                id="image"
                onChange={handlePreview}
              />
              {errors.image && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.image.message}
                </div>
              )}
            </div>

            <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
              <button
                type="submit"
                className="bg-blue-600 w-[100%] text-white text-xl font-bold py-2 rounded hover:bg-blue-800 transition-all ease-linear duration-300"
              >
                List Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
