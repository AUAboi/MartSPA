import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loader/Loader";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PM9HJ1ftmZ17YNeroa0RH1odxSCVHyjZQXVjxZu9qbDxWqUVa3oMMyD6BCq8uAEvh0LI4RUqsqiPHwUyarzW3o700Ud7Ho4e3"
);

function CheckOut() {
  const states = {
    "Select State": [],
    Punjab: [
      "Select City",
      "Lahore",
      "Faisalabad",
      "Rawalpindi",
      "Gujranwala",
      "Multan",
      "Sialkot",
      "Bahawalpur",
      "Sargodha",
      "Sheikhupura",
      "Gujrat",
    ],
    Sindh: [
      "Select City",
      "Karachi",
      "Hyderabad",
      "Sukkur",
      "Larkana",
      "Nawabshah",
      "Mirpur Khas",
      "Khairpur",
      "Dadu",
      "Shikarpur",
      "Thatta",
    ],
    "Khyber Pakhtunkhwa (KP)": [
      "Select City",
      "Peshawar",
      "Mardan",
      "Mingora (Swat)",
      "Abbottabad",
      "Kohat",
      "Dera Ismail Khan",
      "Mansehra",
      "Bannu",
      "Charsadda",
      "Haripur",
    ],
    Balochistan: [
      "Select City",
      "Quetta",
      "Khuzdar",
      "Turbat",
      "Chaman",
      "Gwadar",
      "Sibi",
      "Zhob",
      "Loralai",
      "Dera Murad Jamali",
      "Kalat",
    ],
    "Azad Jammu and Kashmir (AJK)": [
      "Select City",
      "Muzaffarabad",
      "Mirpur",
      "Kotli",
      "Bhimber",
      "Rawalakot",
      "Bagh",
      "Hajira",
      "Pallandri",
      "Sudhnoti",
      "Neelum",
    ],
    "Gilgit-Baltistan (GB)": [
      "Select City",
      "Gilgit",
      "Skardu",
      "Hunza",
      "Diamer",
      "Ghizer",
      "Ghanche",
      "Nagar",
      "Shigar",
      "Kharmang",
      "Astore",
    ],
    "Islamabad Capital Territory (ICT)": ["Select City", "Islamabad"],
  };

  const cityZipCodes = {
    Lahore: 54000,
    Faisalabad: 38000,
    Rawalpindi: 46000,
    Gujranwala: 52250,
    Multan: 60000,
    Sialkot: 51310,
    Bahawalpur: 63100,
    Sargodha: 40100,
    Sheikhupura: 39350,
    Gujrat: 50700,
    Karachi: 74000,
    Hyderabad: 71000,
    Sukkur: 65200,
    Larkana: 77150,
    Nawabshah: 67450,
    MirpurKhas: 69000,
    Khairpur: 66020,
    Dadu: 76200,
    Shikarpur: 78100,
    Thatta: 73130,
    Peshawar: 25000,
    Mardan: 23200,
    Mingora: 19130,
    Abbottabad: 22010,
    Kohat: 26000,
    DeraIsmailKhan: 29050,
    Mansehra: 21300,
    Bannu: 28100,
    Charsadda: 24630,
    Haripur: 22620,
    Quetta: 87300,
    Khuzdar: 89100,
    Turbat: 92600,
    Chaman: 86000,
    Gwadar: 91200,
    Sibi: 82000,
    Zhob: 85200,
    Loralai: 84800,
    DeraMuradJamali: 79220,
    Kalat: 87300,
    Muzaffarabad: 13100,
    Mirpur: 10250,
    Kotli: 11100,
    Bhimber: 10040,
    Rawalakot: 12300,
    Bagh: 12500,
    Hajira: 12420,
    Pallandri: 12200,
    Sudhnoti: 12110,
    Neelum: 13300,
    Gilgit: 15100,
    Skardu: 16100,
    Hunza: 15750,
    Diamer: 14100,
    Ghizer: 15000,
    Ghanche: 16150,
    Nagar: 15050,
    Shigar: 16200,
    Kharmang: 16250,
    Astore: 14300,
    Islamabad: 44000,
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cartItem, setCartItem] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  const stripe = useStripe();
  const elements = useElements();

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    const cardElement = elements.getElement(CardNumberElement);
    let result = null;
    
    if(paymentType === 'card') {
      try {
        result = await stripe.createToken(cardElement);
      } catch (e) {
        console.log(e);
      }
    }

    const expectedZipCode = cityZipCodes[data.city.replace(/\s+/g, "")];
    if (expectedZipCode !== parseInt(data.zipCode, 10)) {
      setError("zipCode", {
        type: "manual",
        message: `The ZIP code does not match the selected city. Expected: ${expectedZipCode}`,
      });
      return;
    }
    const orderData = {
      ...cartItem,
      name: data.name,
      email: data.email,
      address: `${data.address} ${data.city} ${data.state} ${data.zipCode}`,
      mobile: data.phoneNumber,
      paymentType: paymentType,
      token: result ? result.token : null,
    };

    console.log(orderData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASEURL}api/user/order/userOrders`,
        orderData
      );
      toast.success(response.data.message);
      if (response.data.message === "Your order has been successfully placed") {
        navigate(`/user/myWishList/myOrderList`);
      }
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

  const getCartData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASEURL}api/user/getCartItem/${id}`
      );
      console.log(response.data[0]);
      setCartItem(response.data[0]);
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
    getCartData(id);
  }, [id]);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center my-6">
          <div className="flex flex-col items-start py-7 shadow-2xl max-lg:w-[100%] lg:w-[60%] max-sm:mx-4 max-md:mx-6 max-lg:mx-8 max-xl:mx-10 max-2xl:mx-10">
            <h1 className="text-3xl font-bold py-2 px-10">Check out</h1>

            <div className="w-full mx-auto px-10 my-10">
              <div className="flex items-center space-x-4">
                <img
                  src={cartItem?.image}
                  alt={cartItem?.name}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-slate-300"
                />
                <div>
                  <h2 className="text-lg font-semibold">{cartItem?.name}</h2>
                  <p className="text-gray-500">
                    Size: {cartItem?.size}, Color: Default
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    Rs:{" "}
                    {cartItem?.price ? cartItem?.price * cartItem?.quantity : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>Rs: 200.00</span>
                </div>

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    Rs:{" "}
                    {cartItem?.price
                      ? cartItem?.price * cartItem?.quantity + 200
                      : 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Name
              </label>
              <input
                type="text"
                {...register("name", {
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
                id="name"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Name"
              />
              {errors.name && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is required*" },
                })}
                id="email"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Email"
              />
              {errors.email && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="address"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Shipping Address
              </label>
              <input
                type="text"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Shipping Address is required*",
                  },
                  minLength: {
                    value: 10,
                    message: "Min length is 10 character*",
                  },
                  maxLength: {
                    value: 50,
                    message: "Max length is 50 character*",
                  },
                })}
                id="address"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Shipping Address"
              />
              {errors.address && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.address.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Phone Number
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Phone Number is required*",
                  },
                })}
                id="phoneNumber"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Phone number"
              />
              {errors.phoneNumber && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
                State
              </label>
              <select
                {...register("state", {
                  required: { value: true, message: "State is required*" },
                })}
                onChange={handleStateChange}
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
              >
                {Object.keys(states).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.state.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label className="block text-sm font-bold leading-6 text-gray-900 pb-2">
                City
              </label>
              <select
                {...register("city", {
                  required: {
                    value: true,
                    message: "City is required*",
                  },
                })}
                onChange={handleCityChange}
                value={selectedCity}
                disabled={!selectedState}
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
              >
                {selectedState &&
                  states[selectedState].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              {errors.city && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.city.message}
                </div>
              )}
            </div>

            <div className="text-start w-[100%] px-10 py-4">
              <label
                htmlFor="Zip Code"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Zip Code
              </label>
              <input
                type="number"
                {...register("zipCode", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Zip Code is required*",
                  },
                })}
                id="zipCode"
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                placeholder="Enter your Zip Code"
              />
              {errors.zipCode && (
                <div className="text-red-600 text-sm pt-1">
                  {errors.zipCode.message}
                </div>
              )}
            </div>
            <div className="text-start w-[100%] px-10 py-4 ">
              <label
                htmlFor="paymentType"
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Select payment method
              </label>
              <select
                className="outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300"
                id="paymentType"
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option selected value="cash">
                  Cash
                </option>
                <option value="card">Card</option>
              </select>
            </div>
            {paymentType === "card" && (
              <div className="text-start w-[100%] px-10 py-4 ">
                <label
                className="block text-sm font-bold leading-6 text-gray-900 pb-2"
              >
                Enter your card details
              </label>
              <div className="flex">
              <CardNumberElement
                  options={{
                    classes: {
                      base: "outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300",
                    },

                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />

                <CardExpiryElement
                  options={{
                    classes: {
                      base: "outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300",
                    },

                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />

                <CardCvcElement
                  options={{
                    classes: {
                      base: "outline-none max-sm:px-3 px-6 py-3 ring-1 ring-neutral-300 focus:ring-[3px] focus:ring-blue-400 w-full rounded transition-all ease-linear duration-300",
                    },

                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
                </div>
                
              </div>
            )}

            <div className="flex justify-center items-center py-6 w-[100%] px-10 max-sm:flex-wrap">
              <button
                type="submit"
                className="bg-blue-600 w-[100%] text-white text-xl font-bold py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const Payment = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
  );
};
export default Payment;
