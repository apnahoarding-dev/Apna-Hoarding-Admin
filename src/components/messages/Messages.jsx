import React, { useState, useEffect } from "react";
import Header from "../global/Header";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Messages = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffba08");
  const [unreadCount, setUnreadCount] = useState(0);

  const DeleatItem = async (id) => {
    try {
      await deleteDoc(doc(db, "Messages", id));
      toast.success("Message deleated successfully");
      navigate("/allItem");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async () => {
    let datalist = [];
    let unread = 0;

    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "Messages"));
      querySnapshot.forEach((doc) => {
        const messages = { id: doc.id, ...doc.data() };

        if (!messages.isRead) {
          unread++; // Increment unread count
        }

        datalist.push(messages);
      });
      console.log(datalist);

      setData(datalist);
      setUnreadCount(unread); // Update unread count

      setLoading(false);
    } catch (error) {
      console.log("Error getting messages", error);
    }
  };

  // const MarkRead = async (data) => {

  //   data.forEach(async (order) => {
  //     if (!order.isRead) {
  //       const orderRef = doc(db, "Orders", order.id);
  //       await updateDoc(orderRef, { isRead: true }); // Update each order as read
  //     }
  //   });
  //   setUnreadCount(0); // Reset unread count
  // };

  const MarkRead = async (id) => {
    try {
      setLoading(true);
      const orderRef = doc(db, "Messages", id);
      await updateDoc(orderRef, { isRead: true }); // Update each order as read
      setLoading(false);

      // setUnreadCount(1--);y
    } catch (error) {
      console.log("Error in marking read ", error);
    }
    // orders.forEach(async (order) => {
    //   if (!order.isRead) {
    //     const orderRef = doc(db, "Orders", order.id);
    //     await updateDoc(orderRef, { isRead: true }); // Update each order as read
    //   }
    // });
    // setUnreadCount(0); // Reset unread count
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full">
          <ClipLoader
            className="my-[84px]"
            color={color}
            loading={loading}
            // cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full ">
          <div className="flex flex-col items-center  w-full my-8 ">
            <div className="flex items-center  w-[46%] text-[32px] font-medium  ">
              All Messages
              {unreadCount > 0 && (
                <span className="text-[#aea529] ml-4 text-[24px] ">
                  ({unreadCount})
                </span>
              )}
            </div>

            {data.map((item, key) => (
              <div className="flex flex-col  w-[50%]  m-6 p-4 border-2 rounded-lg shadow-md">
                <div className="flex  items-center justify-between text-[18px]  text-[#555] ">
                  {item.name}
                  {!item.isRead && (
                    <div className=" mr-4 h-3 w-3 rounded-full bg-[#bfb63e] "></div>
                  )}
                </div>
                <div className="flex items-center justify-between text-[16px]  text-[#555] ">
                  {item.email}
                  {!item.isRead && (
                    <div
                      className=" text-[#949292] hover:text-[#555555] font-medium cursor-pointer  "
                      onClick={() => MarkRead(item.id)}
                    >
                      Read
                    </div>
                  )}
                </div>
                <div className="text-[16px]  text-[#555] ">{item.number}</div>
                <div className="text-[16px] text-[#555] ">{item.city}</div>
                <div className=" text-[20px] my-[14px]">{item.message}</div>
                <button
                  className="bg-[#f44336] text-white p-[10px]  max-w-[100px] rounded-md hover:bg-[#ef392c] my-[6px]"
                  onClick={() => {
                    DeleatItem(item.id);
                    // setLoading(true);
                  }}
                >
                  Deleat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
