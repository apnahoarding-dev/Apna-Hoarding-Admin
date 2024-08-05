import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import SingleItem from "./SingleItem";
import Header from "../global/Header";
import { ClipLoader } from "react-spinners";

const AllItems = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // const items = data.slice(0, 8);
  // console.log(items);
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
        <div className="flex flex-col items-center w-full pb-[84px]">
          {/* <div className=" bg-[#F9F1E7] h-[100px] w-full" /> */}
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
      )}
    </>
  );
};

export default AllItems;
