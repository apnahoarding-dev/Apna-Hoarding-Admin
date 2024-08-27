import React, { useState, useEffect } from "react";
import Header from "../global/Header";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Messages = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffba08");

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
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "Messages"));
      querySnapshot.forEach((doc) => {
        datalist.push({ id: doc.id, ...doc.data() });
      });
      console.log(datalist);
      setData(datalist);
      setLoading(false);
    } catch (error) {
      console.log("Error getting messages", error);
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
            <div className="flex items-start w-[46%] text-[32px] font-medium ">
              All Messages
            </div>

            {data.map((item, key) => (
              <div className="flex flex-col  w-[50%]  m-6 p-4 border-2 rounded-lg shadow-md">
                <div className="text-[18px]  text-[#555] ">{item.name}</div>
                <div className="text-[16px]  text-[#555] ">{item.email}</div>
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
