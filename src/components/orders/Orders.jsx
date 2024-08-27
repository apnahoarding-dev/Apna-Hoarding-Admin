import React, { useState, useEffect } from "react";
import Header from "../global/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffba08");

  // const { id } = useParams();

  const DeleatOrder = async (id) => {
    try {
      setLoading(true);
      const subcollectionRef = collection(db, "Orders", id, `Order${id}`);
      const querySnapshot = await getDocs(subcollectionRef);

      for (const documentSnapshot of querySnapshot.docs) {
        const docRef = doc(db, "Orders", id, `Order${id}`, documentSnapshot.id);
        await deleteDoc(docRef); // Delete each document one by one
        console.log(`Deleted document with ID: ${documentSnapshot.id}`);
      }

      await deleteDoc(doc(db, "Orders", id));
      toast.success("Order deleated successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let datalist = [];
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "Orders"));
        querySnapshot.forEach((doc) => {
          datalist.push({ id: doc.id, ...doc.data() });
        });
        console.log(datalist);
        setOrders(datalist);
        setLoading(false);
      } catch (err) {
        toast.error("Error in geting orders ", err);
      }
    };
    fetchData();
    console.log(orders);
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
        <div className="flex w-full  ">
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="text-[36px] font-medium my-[18px]">All Orders</div>
            <div className="flex flex-col  w-full max-w-[1000px]  m-6 p-8 gap-[14px] rounded-lg">
              {orders.map((item, key) => (
                <div
                  key={key}
                  className="flex justify-between items-end p-[20px_25px] border-[1px] shadow-md rounded-[6px] w-full"
                >
                  <div className="flex gap-[10px]">
                    <div className="text-[22px] cursor-pointer text-[#2c2a2a] ">
                      {key + 1}.
                    </div>
                    <div className="font-[500] text-[22px] cursor-pointer text-[#2c2a2a] flex flex-col gap-[4px]">
                      <div className="pb-[5px]">
                        {item.fname} {item.lname}
                      </div>
                      <div className="flex text-[12px] text-[#555] font-[500]">
                        {item.Email}
                      </div>
                      <div className="flex text-[12px] text-[#555]">
                        {item.contact}
                      </div>
                      <div className="flex text-[12px] text-[#555]">
                        Ordered Date: <strong>{"12 Aug, 2024"}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[12px] items-center">
                    <button
                      className=" text-black p-[5px_20px]  max-w-[100px] border-2 rounded-[2px] hover:bg-[#ebeaea]"
                      onClick={() => navigate(`/order/${item.id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="bg-[#f44336] text-white p-[5px_20px]  max-w-[100px] rounded-[2px] hover:bg-[#e53124]"
                      onClick={() => {
                        DeleatOrder(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
