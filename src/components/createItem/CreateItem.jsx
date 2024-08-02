import React from "react";
import { db, storage } from "../../../firebase.config";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

const CreateItem = () => {
  // ---> hooks for data
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setlocation] = useState("");
  const [locality, setLocality] = useState("");

  const [city, setcity] = useState("");
  const [desc, setDesc] = useState("");
  const [pincode, setpincode] = useState(0);
  const [size, setSize] = useState("");
  const [illuminate, setIlluminate] = useState("");
  const [area, setArea] = useState("");
  const [monthlyprice, setMonthlyprice] = useState("");
  const [perdayprice, setPerdayprice] = useState("");
  const [img, setImg] = useState({});
  // ---->

  const [file, setfile] = useState("");
  const [perc, setPerc] = useState(null); // upload percent state

  // uplaod image

  useEffect(() => {
    const UploadImage = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // setdata((prev) => ({ ...prev, img: downloadURL }));
            setImg(downloadURL);
          });
        }
      );
    };
    file && UploadImage();
  }, [file]);

  // upload data

  const SubmitItem = async () => {
    try {
      const res = await addDoc(collection(db, "CompleteItems"), {
        title,
        type,
        location,
        locality,
        city,
        desc,
        pincode,
        size,
        area,
        illuminate,
        monthlyprice,
        perdayprice,
        img,
        Timestamp: serverTimestamp(),
      });

      alert("Advertisement Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center my-[24px] ">
      <div className="flex flex-col items-center gap-[32px] p-[16px]">
        <div className="flex flex-col gap-[32px] py-[24px] px-[64px] border-2 rounded-xl ">
          {/*  */}
          <div className="flex justify-center  items-center  w-full">
            <div className="text-[32px] text-[#333] font-[600]">
              Create Advertisement
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">Title</div>
            <input
              className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="text"
              placeholder="eg- Digital Screen at Elevation..."
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/*  */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">
              Hoarding Type{" "}
            </div>
            <input
              className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="text"
              placeholder="eg- Billboard "
              onChange={(e) => setType(e.target.value)}
              required

              // value={type}
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">
              Location
            </div>
            <input
              className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="text"
              placeholder="eg- IBC Pipload "
              onChange={(e) => setlocation(e.target.value)}
              required
              // value={location}
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">
              Locality
            </div>
            <input
              className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="text"
              placeholder="eg- West Bandra  "
              onChange={(e) => setLocality(e.target.value)}
              required
              // value={location}
            />
          </div>
          {/*  */}

          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">City </div>
            <input
              className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="text "
              onChange={(e) => setcity(e.target.value)}
              required
              placeholder="eg- Mumbai  "

              // value={price}
            />
          </div>
          {/*  */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">
              Description
            </div>
            <input
              className="min-h-[120px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pb-[38px] px-[12px] "
              type="number "
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="About the hoarding in detail... "

              // value={price}
            />
          </div>

          {/* ---> */}
          <div className="flex justify-between w-full ">
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">
                Area Pincode{" "}
              </div>
              <input
                className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="number "
                onChange={(e) => setpincode(e.target.value)}
                required
                placeholder="789XXX "

                // value={price}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">
                Area(in Sq.ft)
              </div>
              <input
                className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="number "
                onChange={(e) => setArea(e.target.value)}
                required
                placeholder="eg- 436"

                // value={price}
              />
            </div>
          </div>
          {/* ---> */}

          <div className="flex justify-between w-full ">
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">
                illumination{" "}
              </div>
              <input
                className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="text"
                onChange={(e) => setIlluminate(e.target.value)}
                required
                placeholder="eg- Ledscreen "

                // value={price}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">Size</div>
              <input
                className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="number "
                onChange={(e) => setSize(e.target.value)}
                required
                placeholder="eg- 8x15"

                // value={price}
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between w-full ">
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">
                Monthly Price
              </div>
              <input
                className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="number "
                onChange={(e) => setMonthlyprice(e.target.value)}
                required
                placeholder="eg- 27500 "

                // value={price}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start">
              <div className="text-[16px] text-[#666666] font-[400]">
                Per Day Price
              </div>
              <input
                className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                type="number "
                onChange={(e) => setPerdayprice(e.target.value)}
                required
                placeholder="eg- 950"

                // value={price}
              />
            </div>
          </div>
          {/*  */}

          {/* -----> more input fields */}
          <div className="flex flex-col gap-[8px] items-start">
            <div className="text-[16px] text-[#666666] font-[400]">
              Upload Image{" "}
            </div>
            <input
              //   className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
              type="file"
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>

          <button
            onClick={SubmitItem}
            disabled={perc != null && perc < 100}
            className="  text-[18px] text-[#FFF] bg-[#B88E2F] hover:bg-[#a37c20] w-full font-[600] p-[16px] cursor-pointer disabled:bg-[#dbbb6f]"
          >
            Submit
          </button>
          {/* </div> */}
          <div className="text-[16px] font-[400] text-[#666]">
            *all fields are required to be filled
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
