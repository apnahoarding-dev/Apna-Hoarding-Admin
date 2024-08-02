import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import SingleItem from "./SingleItem";

const AllItems = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let datalist = [];
      try {
        const querySnapshot = await getDocs(collection(db, "CompleteItems"));
        querySnapshot.forEach((doc) => {
          datalist.push({ id: doc.id, ...doc.data() });
        });
        console.log(datalist);
        setdata(datalist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(data);
  }, []);

  const items = data.slice(0, 8);
  console.log(items);
  return (
    <div className="flex flex-col items-center gap-[28px] w-full">
      {/* <div className=" bg-[#F9F1E7] h-[100px] w-full" /> */}

      {items.map((item, key) => (
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
          />
        </>
      ))}
    </div>
  );
};

export default AllItems;
