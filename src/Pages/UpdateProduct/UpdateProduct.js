import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import axios from "axios";
import LoadingSpinner from "../../components/loader/Loader";
import {
  ref,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";

export default function UpdateProduct() {
  const [selectedSize, setSelectedSize] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // const categories = {
  //   "": [],
  //   "Category 1": [
  //     "Select sub-category",
  //     "Sub-Category 1.1",
  //     "Sub-Category 1.2",
  //   ],
  //   "Category 2": [
  //     "Select sub-category",
  //     "Sub-Category 2.1",
  //     "Sub-Category 2.2",
  //   ],
  //   "Category 3": [
  //     "Select sub-category",
  //     "Sub-Category 3.1",
  //     "Sub-Category 3.2",
  //   ],
  // };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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

  const { id } = useParams();
















  const [picPreview, setPicPreview] = useState(null);
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageHeight, setImageHeight] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);







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










































  const onSubmit = async (data,e) => {
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
              const response = axios.post(
                `${BACKEND_BASEURL}api/vendor/updateProduct/${id}`,
                {data,imageUrl:downloadUrl}
              );
              setData(response.data);
              // toast.success(response);
              console.log(response.data)
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
    // try {
    //   setLoading(true);
    //   const response = await axios.post(
    //     `${BACKEND_BASEURL}api/vendor/updateProduct/${id}`,
    //     data
    //   );
    //   setData(response.data);
    //   toast.success(response.data[0].message);
    //   setLoading(false);
    // } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //   toast.error(message);
    //   setLoading(false);
    // }


  const getData = async (id) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASEURL}api/vendor/getProduct/${id}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  
 
  return (
    <>
      {loading? (
        <LoadingSpinner />
      ) : (
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center items-center my-6">
                <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
                  <h1 className="text-3xl font-bold py-2 px-10">
                    Product Update
                  </h1>

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
                      defaultValue={data && data[0].productName}
                      id="product_name"
                      className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                      placeholder="Product Name"
                    />
                    {errors.name && (
                      <div className="text-red-600 text-sm pt-1">
                        {errors.name.message}
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
                        required: {
                          value: true,
                          message: "Price is required*",
                        },
                        minLength: {
                          value: 2,
                          message: "Min length is 2 character*",
                        },
                        maxLength: {
                          value: 1000000,
                          message: "Max length is 8 character*",
                        },
                        min: {
                          value: 0,
                          message: "Price must be postive",
                        },
                        valueAsNumber: true,
                      })}
                      defaultValue={data && data[0].price}
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
                        required: {
                          value: true,
                          message: "Items is required*",
                        },
                        min: {
                          value: 10,
                          message: "Items must be a greater then 10*",
                        },
                        valueAsNumber: true,
                      })}
                      defaultValue={data && data[0].totalStock}
                      id="items"
                      className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                      placeholder="Enter your No. Items"
                    />
                    {errors.items && (
                      <div className="text-red-600 text-sm pt-1">
                        {errors.items.message}
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
                        min: {
                          value: 0,
                          message: "Discount must be postive",
                        },
                      })}
                      defaultValue={data && data[0].discount}
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
                      disabled
                      // {...register("category", {
                      //   required: { value: true, message: "Category is required*" },
                      // })}
                      defaultValue={data && data[0].category}
                      onChange={handleCategoryChange}
                      className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 text-gray-400 bg-neutral-200 capitalize"
                    >
                      <option
                        selected
                        value={data && data[0].category.toLowerCase()}
                      >
                        {data && data[0].category}
                      </option>
                      {/* {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))} */}
                    </select>
                    {errors.category && (
                      <div className="text-red-600 text-sm pt-1">
                        {errors.category.message}
                      </div>
                    )}
                  </div>

                  <div className="text-start w-[100%] px-10 py-4">
                    <select
                      {...register("subCategory", {
                        // required: {
                        //   value: true,
                        //   message: "Sub-category is required*",
                        // },
                      })}
                      defaultValue={data && data[0].subCategory}
                      onChange={handleSubCategoryChange}
                      // value={selectedSubCategory}
                      disabled={!selectedCategory}
                      className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300 text-gray-400 bg-neutral-200 capitalize"
                    >
                      <option
                        selected
                        value={data && data[0].subCategory.toLowerCase()}
                      >
                        {data && data[0].subCategory}
                      </option>
                      {/* {selectedCategory &&
                  categories[selectedCategory].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))} */}
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
                              required: {
                                value: true,
                                message: "size is required*",
                              },
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
                              required: {
                                value: true,
                                message: "size is required*",
                              },
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
                          defaultValue={data && data[0].size}
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
                          defaultValue={data && data[0].size}
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
                          value: 300,
                          message: "Max length is 300 characters*",
                        },
                      })}
                      defaultValue={data && data[0].productDescription}
                      className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                      id="description"
                      rows={5}
                    ></textarea>
                    {errors.description && (
                      <div className="text-red-600 text-sm pt-1">
                        {errors.description.message}
                      </div>
                    )}
                  </div>

                  <div className="text-start w-[100%] px-10 py-4">
                    <img
                      src={picPreview}
                      alt="img"
                      className="h-32 w-32 ring-1 ring-neutral-400 my-6"
                    />
                    <label
                      htmlFor="image"
                      className="block text-sm font-bold leading-6 text-gray-900 pb-2"
                    >
                      Add image
                    </label>
                    <input
                      type="file"
                      {...register("imageUrl", {
                        required: {
                          value: true,
                          message: "Image is required*",
                        },
                      })}
                      name="image"
                      id="image"
                      onChange={handlePreview}
                    />
                    {errors.imageUrl && (
                      <div className="text-red-600 text-sm pt-1">
                        {errors.imageUrl.message}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
                    <button
                      type="submit"
                      className="bg-blue-600 w-[100%] text-white text-xl font-bold py-2 rounded-md"
                    >
                      Update Product
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
