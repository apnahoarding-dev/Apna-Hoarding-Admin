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
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffba08");
  const [unreadCount, setUnreadCount] = useState(0);

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "Messages", id));
      toast.success("Message deleted successfully");
      fetchMessages(); // Refresh messages after deletion
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const fetchMessages = async () => {
    let datalist = [];
    let unread = 0;

    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "Messages"));
      querySnapshot.forEach((doc) => {
        const message = { id: doc.id, ...doc.data() };
        if (!message.isRead) unread++;
        datalist.push(message);
      });

      setData(datalist);
      setUnreadCount(unread);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const messageRef = doc(db, "Messages", id);
      await updateDoc(messageRef, { isRead: true });
      fetchMessages(); // Refresh messages after marking as read
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
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
            className="my-20"
            color={color}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center justify-center w-[50%] px-4">
            <div className="flex items-center justify-between w-full max-w-4xl mt-8 mb-4">
              <h1 className="text-2xl font-semibold">All Messages</h1>
              {unreadCount > 0 && (
                <span className="text-lg text-yellow-600">
                  ({unreadCount} Unread)
                </span>
              )}
            </div>

            {data.length === 0 ? (
              <p className="text-gray-500 mt-4">No messages found.</p>
            ) : (
              <div className="flex flex-col gap-6 w-full max-w-4xl">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col p-4 border rounded-lg shadow-md bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xl my-2 font-medium text-gray-700">
                        {item.name}
                      </span>
                      {!item.isRead && (
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{item.email}</span>
                      {!item.isRead && (
                        <button
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => markAsRead(item.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600">{item.number}</p>
                    <p className="text-gray-600 mb-4">{item.city}</p>
                    <textarea
                      readOnly
                      value={item.message}
                      className="text-base text-gray-700 mt-2 bg-gray-50 p-2 rounded border focus:outline-none  w-full min-h-[100px]"
                      style={{ resize: "none" }}
                      maxLength={200}
                    ></textarea>
                    <div className="flex justify-end my-6">
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
