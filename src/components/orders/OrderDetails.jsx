import React, { useEffect, useState } from "react";
import Header from "../global/Header";
// import Footer from "../footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ClipLoader } from "react-spinners";

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

  console.log(userData);
  console.log(orderData);

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
          <div className="flex flex-col  w-[45%]  m-6 p-8 border-2  rounded-lg">
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
              <div className="flex flex-col  w-[full] gap-[12px] ">
                <div className="flex items-center justify-between w-full p-4 rounded-lg">
                  <div className="text-[18px] text-[#626060] font-bold uppercase ">
                    Hoarding
                  </div>
                  <div className="text-[16px] text-[#626060] font-bold uppercase">
                    Location
                  </div>
                  <div className="text-[16px] text-[#626060] font-bold uppercase">
                    Contact No.
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
                  </div>
                ))}
                <div className="flex justify-end my-[24px] w-full">
                  <div
                    className=" text-black p-[5px_20px]  max-w-[100px] border-2 rounded-[2px] hover:bg-[#ebeaea] cursor-pointer"
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
