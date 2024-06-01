import React, { useEffect, useMemo, useRef, useState } from "react";
import ImageBox from "./ImageBox";
import Counter from "./Counter";
import ProductReview from "./ProductReview";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";
import LoadingSpinner from "../../components/loader/Loader";
import SizeSelector from "./SizeSelector";
import { BsChatLeftText } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

import Message from "./Message";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectUser } from "../../redux/features/auth/authSlice";
import { ShowOnlyUser, ShowOnlyVendor, ShowToUsernVendor } from "../../protectLinks/protectedLinks";

export default function ProductDetail() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const increment = () => {
    data[0]?.discount
      ? count < data[0]?.totalStock && count < 5 && setCount(count + 1)
      : count < data[0]?.totalStock && setCount(count + 1);
  };
  const decrement = () => {
    count > 1 && setCount(count - 1);
  };

  const addToCart = async (id) => {
    if (count === 0) {
      toast.error("Please number of item");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASEURL}api/user/addtoCart/${id}`,
        {
          selectedSize: selectedSize,
          quantity: count,
          name: data[0]?.productName,
          price:
            data[0]?.discount > 0
              ? data[0]?.price - data[0]?.discount
              : data[0]?.price,
        }
      );
      setLoading(false);
      toast.success(response.data.message);
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

  const getProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_BASEURL}api/vendor/getProduct/${id}`
      );
      setData(response.data);
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
    getProduct(id);
  }, []);

  // const [large,setLarge]=useState("w-20 h-20 me-8 mb-8 rounded-full bg-red-300 fixed bottom-0 right-0")
  // const [open,setOpen]=useState(false)

  // const handleExpand = ()=>{
  // if(open){
  //   setLarge("w-[400px] h-[400px] me-8 mb-8  bg-red-300 fixed bottom-0 right-0 m-2")
  //   setOpen(!open)
  // }else{
  //   setLarge("w-20 h-20 me-8 mb-8 rounded-full bg-red-300 fixed bottom-0 right-0")
  //   setOpen(!open)
  // }
  // }

  function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const socket = useMemo(() => io.connect(BACKEND_BASEURL), []);

  const { user } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [uid, setUid] = useState("");
  const [showed, setShowed] = useState(false);

  const messagesEndRef = useRef(null);

  const addMessage = async () => {
    if (message.trim() !== "") {
let messageData ;
      if(user?.role==="user"){
        messageData = {
          myId: userId,
          userId:data[0]?.vendorId,
          message: message,
          // userName: user?.name,
          // time: getTime(),
        };
      }
      else{
        messageData = {
          myId: userId,
          userId:uid,
          message: message,
          role:"vendor"
          // userName: user?.name,
          // time: getTime(),
        };
      }




      await socket.emit("sendMessage", messageData);
      setMessages((msgs) => [...msgs, {msg:messageData.message,sender:messageData.myId}]);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    user && socket.emit("register", user?._id);
    user && setUserId(user?._id)
    //   socket.on("connect",()=>{
    //     setUid(socket.id)
    // console.log(socket.id)
    //   })

    // return ()=>{
    //   socket.disconnect()
    //   console.log("diconnect")
    // }
  }, [user]);

  useEffect(() => {
    socket.on("messageReceive", (data) => {
      console.log(data);
      // setUid(data.sender);
      setMessages((msgs) => [...msgs, {msg:data.msg,sender:data.sender}]);
      setUid(data.sender)
      !showed &&setShowed(true)
    });
  }, [socket]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div
        className={`flex justify-around md:flex-row flex-col md:my-16 md:mx-16 mx-6 my-6 gap-6 ${
          data[0]?.totalStock === 0 && "disabledbutton"
        }`}
      >
        <div className="lg:w-[40%] md:w-[50%] w-[80%] lg:mx-0 h-max mx-auto border-2 border-gray-300 p-4">
          <ImageBox image={data[0]?.image} totalStock={data[0]?.totalStock} />
        </div>

        <div className="flex flex-col lg:w-[40%] md:w-[50%] w-[80%] lg:mx-0 mx-auto">
          <div className="md:mb-4 mb-2">
            <h1 className="md:text-2xl text-xl font-bold  uppercase">
              {data[0]?.productName}
            </h1>
            <p>by {data[0]?.storeName}</p>
            <p className="my-4">
              <span className="font-semibold">Item left: </span>{" "}
              {data[0]?.totalStock}
            </p>
          </div>
          <p className="md:text-xl text-[1rem] font-semibold mb-4">
            Rs:{" "}
            {`${
              data[0]?.discount > 0
                ? data[0]?.price - data[0]?.discount
                : data[0]?.price
            }`}
            {data[0]?.discount > 0 && (
              <>
                <span className="text-gray-300 line-through ml-3">
                  Rs: {data[0]?.discount && data[0]?.discount}
                </span>
                <span className="text-red-700 ml-3">
                  {data &&
                    Math.round((data[0]?.discount / data[0]?.price) * 100)}
                  % off
                </span>
              </>
            )}
          </p>
          <div className="md:mb-4 mb-2 ">
            <h1 className=" font-semibold capitlize my-4">Size/Specs </h1>

            <SizeSelector
              sizes={data[0]?.size}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="mb-4">
            <h1 className=" font-semibold  capitalize my-4">Decsription*</h1>
            {data[0]?.productDescription && (
              <>
                <p>{data[0]?.productDescription}</p>
              </>
            )}
          </div>
          <div className="mb-4">
            <Counter
              totalStock={data[0]?.totalStock}
              decrement={decrement}
              increment={increment}
              count={count}
            />
          </div>
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-800 transition-all ease-linear duration-300"
              onClick={() => addToCart(id)}
            >
              Add To Cart
            </button>
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded">
              Buy
            </button> */}
          </div>
        </div>
      </div>
      <div>
        <ProductReview id={id} data={data && data} />
        {/* {showed&&} */}
        <ShowOnlyUser>

        
        <button
          onClick={toggleSidebar}
          className=" bg-green-500 p-4 text-white fixed bottom-1 right-4 z-20 rounded-full"
        >
          <BsChatLeftText size={28} />
        </button>

        <div
          className={`chat-container p-2 fixed bottom-16 right-0 w-[50%] transform transition-transform duration-300 ease-in-out z-10 ${
            isOpen ? "md:-translate-x-16 -translate-x-0" : "translate-x-full "
          }`}
        >
          <div className="messages">
            {/* <h1 className="text-gray-500 font-bold bg-slate-200 p-3 w-max rounded-xl">
              Chat with {data[0]?.storeName}
            </h1> */}
            {messages.map((msg, index) => (
              <Message
                text={msg.msg}
                sender={msg.sender}
                // name={msg.userName}
                // time={msg.time}
                id={user?._id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <input
              id="input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMessage()}
            />
            <button onClick={addMessage} id="send_btn">
              <IoMdSend size={44} className="text-green-500" />
            </button>
          </div>
        </div>

        </ShowOnlyUser>
        {showed&&
        <ShowOnlyVendor>

        
        <button
          onClick={toggleSidebar}
          className=" bg-green-500 p-4 text-white fixed bottom-1 right-4 z-20 rounded-full"
        >
          <BsChatLeftText size={28} />
        </button>

        <div
          className={`chat-container p-2 fixed bottom-16 right-0 w-[50%] transform transition-transform duration-300 ease-in-out z-10 ${
            isOpen ? "md:-translate-x-16 -translate-x-0" : "translate-x-full "
          }`}
        >
          <div className="messages">
            {/* <h1 className="text-gray-500 font-bold bg-slate-200 p-3 w-max rounded-xl">
              Chat with {data[0]?.storeName}
            </h1> */}
            {messages.map((msg, index) => (
              <Message
                text={msg.msg}
                sender={msg.sender}
                // name={msg.userName}
                // time={msg.time}
                id={user?._id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <input
              id="input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMessage()}
            />
            <button onClick={addMessage} id="send_btn">
              <IoMdSend size={44} className="text-green-500" />
            </button>
          </div>
        </div>

        </ShowOnlyVendor>}
        
      </div>
    </>
  );
}
