import React, { useEffect, useState } from "react";
import Header from "../global/Header";
// import Footer from "../footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ClipLoader } from "react-spinners";
import rejectIcon from "../../assets/Reject.svg";
import acceptIcon from "../../assets/Accept.svg";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState({});
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffba08");

  useEffect(() => {
    fetchOrdersData();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "Orders", id);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrdersData = async () => {
    let datalist = [];
    try {
      const orderDocRef = doc(db, "Orders", id);
      const cartItemsSubcollectionRef = collection(orderDocRef, `Order${id}`);
      const cartItemsSnapshot = await getDocs(cartItemsSubcollectionRef);
      cartItemsSnapshot.forEach((doc) => {
        datalist.push({ id: doc.id, ...doc.data() });
      });
      setOrderData(datalist);
    } catch (error) {
      console.error("Error getting  items:", error);
    }
  };

  // const handleAccept = async (id) => {
  //   try {
  //     const orderRef = doc(db, "Orders", id);
  //     const orderItemRef = collection(orderRef, `Order${id}`);

  //     await updateDoc(orderItemRef, { orderStatus: "Accepted" });
  //     toast.info(" Order item Accepted");
  //   } catch (error) {
  //     toast.error("Error in accepting order  ", error);
  //     console.log("given error", error);
  //   }
  // };

  const handleAccept = async (itemId) => {
    const updatedData = { orderStatus: "Accepted" };
    try {
      // Create a reference to the specific document
      const docRef = doc(db, "Orders", id, "Order" + id, itemId);

      // Update the document with the provided data
      await updateDoc(docRef, updatedData);

      toast.success("Document updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating document");
      console.error("Error details:", error);
    }
  };

  const handleReject = async (itemId) => {
    const updatedData = { orderStatus: "Cancelled" };
    try {
      // Create a reference to the specific document
      const docRef = doc(db, "Orders", id, "Order" + id, itemId);

      // Update the document with the provided data
      await updateDoc(docRef, updatedData);

      toast.success("Document updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating document");
      console.error("Error details:", error);
    }
  };

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
        <div className="flex items-center justify-center w-full mb-[144px] ">
          <div className="flex flex-col  w-[50%]  m-6 p-8 border-2  rounded-lg">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 shadow-md py-[16px] border-t-[#bfb63e] ">
              <div className="text-[28px] font-medium  ">
                {userData.fname} {userData.lname}
              </div>
              <div className="text-[18px] text-[#626060] font-medium">
                {userData.email}
              </div>
              <div className="text-[18px] text-[#626060] font-medium">
                {userData.contact}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className=" text-[24px] p-4 font-medium my-2 ">
                Pusrchasing Items
              </div>
              <div className="flex flex-col  gap-[12px] ">
                <div className="flex items-center px-6  ">
                  <div className="flex items-center justify-between w-[85%]  py-4 rounded-lg">
                    <div className="text-[18px] text-[#626060] font-bold uppercase ">
                      Hoarding
                    </div>
                    <div className="text-[16px] text-[#626060] font-bold uppercase">
                      Location
                    </div>
                    <div className="text-[16px] text-[#626060] font-bold uppercase">
                      Contact
                    </div>
                  </div>
                  <div className="text-[16px] text-[#626060] font-bold uppercase ml-10">
                    Action
                  </div>
                </div>

                {orderData.map((item, key) => (
                  <div
                    className="flex items-center justify-between w-full p-4 border-b-2 rounded-lg"
                    key={key}
                  >
                    <div className="text-[18px] text-[#626060]">
                      {key + 1}. {item.type}
                    </div>
                    <div className="text-[16px] text-[#626060]">
                      {item.locality}, {item.location} , {item.city}
                    </div>
                    <div className="text-[16px] text-[#626060] font-semibold">
                      {item.contactNumber}
                    </div>

                    {item.orderStatus === "Pending" ? (
                      <div className="flex gap-2">
                        {/* Accept Button */}
                        <img
                          src={acceptIcon}
                          className="h-[34px] w-[34px] bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                          onClick={() => handleAccept(item.id)}
                        />

                        {/* Reject Button */}
                        <img
                          src={rejectIcon}
                          className="h-[34px] w-[34px] bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
                          onClick={() => handleReject(item.id)}
                        />
                      </div>
                    ) : (
                      <div
                        className={`${
                          item.orderStatus === "Accepted"
                            ? "text-green-600 "
                            : "text-red-500"
                        } px-4 `}
                      >
                        {item.orderStatus}{" "}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end my-[24px] w-full">
                  <div
                    className=" text-black p-[5px_20px]  max-w-[100px] border-2 rounded-[2px] hover:bg-[#beb4b4] cursor-pointer"
                    onClick={() => navigate("/orders")}
                  >
                    Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
