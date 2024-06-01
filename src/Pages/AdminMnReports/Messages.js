import React, { useEffect, useState } from "react";
import MnRNav from "./MnRNav";
import LoadingSpinner from "./../../components/loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_BASEURL } from "../../db/baseUrl";

export default function Messages() {
  const [messages, setMessages] = useState("");
const [loading,setLoading]=useState(false)
  const getMessagesData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BACKEND_BASEURL}api/getMessages`);
      setMessages(response.data);
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
  useEffect(() => {
    getMessagesData();
  }, []);

  const handleDelete = async (id) => {
    // toast.success(id);
    try {
        // setLoading(true)
        const response  = await axios.delete(`${BACKEND_BASEURL}api/deleteMessage/${id}`)
        response && getMessagesData()
        toast.success(response.data.message)
        // setLoading(false)

    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      // setLoading(false)
    }
  };

  return (
    <>
      <MnRNav />
      <div className="flex flex-col justify-center items-center w-full">
        <div>
          <h1 className="text-2xl font-semibold my-6">Messages from user</h1>
        </div>
        <div className="shadow-2xl rounded-md p-8 my-6 w-full">
          {messages.length===0 && <div className="flex justify-center items-center font-semibold text-2xl">No Messages found</div>}
          {!messages ? (
            <LoadingSpinner />
          ) : messages&& (
            messages.map((item, i) => (
              <div key={i} className={`shadow-2xl rounded-md my-6 p-4 `}>
                <div className="flex max-sm:items-center space-x-4 rounded-full">
                  <img src={item.image} alt="img" className="w-14 h-14 rounded-full" />
                  <h2 className="font-semibold">{item.name}</h2>
                </div>
                <div className="flex flex-col justify-center my-4">
                  <h2>
                    <span className="font-semibold">Subject:</span>{" "}
                    {item.subject}
                  </h2>
                  <p>{item.message}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className={` max-sm:px-6 px-4 py-3  rounded text-white transition-all ease-linear duration-300 bg-red-600 hover:bg-red-800`}
                    onClick={() => handleDelete(item._id)}
                  >Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
