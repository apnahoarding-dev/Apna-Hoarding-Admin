import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import SingleItem from "./SingleItem";
import Header from "../global/Header";
import { ClipLoader } from "react-spinners";
import deleat from "../../assets/deleat.svg";

const AllItems = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ItemCount, setItemCount] = useState({});
  let [color, setColor] = useState("#ffba08");

  useEffect(() => {
    const fetchData = async () => {
      let datalist = [];
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "CompleteItems"));
        querySnapshot.forEach((doc) => {
          datalist.push({ id: doc.id, ...doc.data() });
        });
        console.log(datalist);
        setdata(datalist);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(data);
  }, []);

  useEffect(() => {
    const countItems = () => {
      const counts = {};

      for (let i = 0; i < data.length; i++) {
        const itemName = data[i].type;
        if (counts[itemName]) {
          counts[itemName] += 1;
        } else {
          counts[itemName] = 1;
        }
      }

      setItemCount(counts);
    };
    countItems();
  }, [data]);

  return (
    <>
      <Header />

      {loading ? (
        <div className="flex items-center justify-center w-full">
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
        <div className="flex justify-center w-full ">
          <div className="flex flex-col justify-center gap-[20px]  items-center w-full pb-[84px]">
            <div className="flex items-center justify-start shadow-xl border-t-[#cdcaca] border-t-2 rounded-lg px-12 w-[60%] my-[12px] py-[16px]">
              <div>
                <div className="text-[28px] my-[10px] ">
                  Total Advertisements:
                  <span className="font-semibold  mx-[10px]">
                    {data.length}
                  </span>
                </div>
                <ul className="flex flex-col text-[20px] gap-[6px] text-[#626060] font-medium">
                  {Object.entries(ItemCount).map(([itemName, count]) => (
                    <ul className="list list-disc ml-8">
                      <li key={itemName}>
                        <div className="flex">
                          <span className=" font-[400] mr-[12px]">
                            {itemName}:
                          </span>
                          <strong className="min-w-[120px] text-[#a9a131]">
                            {count}
                          </strong>
                        </div>
                      </li>
                    </ul>
                  ))}
                </ul>
              </div>
            </div>
            {data.map((item, key) => (
              <>
                <SingleItem
                  key={key}
                  title={item.title}
                  type={item.type}
                  img={item.img}
                  illuminate={item.illuminate}
                  size={item.size}
                  area={item.area}
                  location={item.location}
                  locality={item.locality}
                  city={item.city}
                  pincode={item.pincode}
                  desc={item.desc}
                  monthlyprice={item.monthlyprice}
                  perdayprice={item.perdayprice}
                  id={item.id}
                />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllItems;
